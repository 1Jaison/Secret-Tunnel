import { createContext, useContext, useState, useEffect } from "react";
const API = "https://fsa-jwt-practice.herokuapp.com";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      setLocation("TABLET"); // skip entrance if already signed in
    }
  }, []);

  // TODO: signup
  async function signup(username) {
    setError("");

    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: "password123", // needed for API
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      setError(result.message || "Signup failed");
      return;
    }

    setToken(result.token);
    sessionStorage.setItem("token", result.token);
    setLocation("TABLET");
  }

  // TODO: authenticate
  async function authenticate() {
    setError("");

    if (!token) {
      setError("No token found");
      return;
    }

    const response = await fetch(`${API}/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      setError(result.message || "Authentication failed");
      return;
    }

    setLocation("TUNNEL");
  }

  const value = {
    location,
    signup,
    authenticate,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
