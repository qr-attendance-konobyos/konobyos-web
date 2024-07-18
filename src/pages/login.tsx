import { useAuth } from "../context";

export function Login() {
  const { login } = useAuth();
  return (
    <>
      <h1> Login</h1>
      <button onClick={() => login("token")}>log in</button>
    </>
  );
}
