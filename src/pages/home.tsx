import { useAuth } from "../context";

export function Home() {
  const { logout } = useAuth();
  return (
    <>
      <h1> Home Page</h1>
      <button onClick={() => logout()}>logout</button>
    </>
  );
}
