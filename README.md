# Secret Tunnel

Your journey has brought you to the base of a rocky mountain. You must **authenticate**
yourself to the guardians of the secret tunnel before you are **authorized** to pass!

A [live demo of the finished project](https://fsa-secret-tunnel.netlify.app/) is available as reference.

## Instructions

Before you start, read the documentation of [this practice API](https://fsa-jwt-practice.herokuapp.com).

### Register the user

1. In `AuthContext`, write and provide a `signup` function which takes in a username to send to the
   `POST /signup` endpoint on the API. If the request is successful, update `token`
   in state to the token that the API sends back, and set the location to `"TABLET"`.
2. Update `<Entrance>` to call `signup` with the user's name when the form is
   submitted.

### Authenticate the user

3. In `AuthContext`, write and provide an `authenticate` function. If there is
   no token in state, it should throw an error. Otherwise, it will attempt to
   `GET /authenticate` on the API. Make sure to attach the token in the request headers!
   If the request fails, throw an error. If the request succeeds, set the location to `"TUNNEL"`.
4. Update `<Tablet>` to call `authenticate` when the form is submitted.

## Extensions

If you finish early, try working on the following extensions:

- Use [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) to store the token. Then, add a `useEffect` in `AuthContext` to try loading the token from session storage when the app first loads. This lets users skip typing in their credentials even if they refresh the page.
- Give the user feedback if there are any errors with the requests. Currently, the app
  just freezes if something goes wrong. Add some conditional text to tell the user what
  happened e.g. the token was malformed, or they mistyped their username.

## Submission

Please submit the link to your public GitHub repository.
