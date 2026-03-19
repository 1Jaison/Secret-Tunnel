import { useAuth } from "./AuthContext";

import Entrance from "./Entrance";
import Tablet from "./Tablet";
import Tunnel from "./Tunnel";

export default function App() {
  const { location } = useAuth();

  if (location === "GATE") return <Entrance />;
  if (location === "TABLET") return <Tablet />;
  return <Tunnel />;
}
