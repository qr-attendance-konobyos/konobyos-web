import { useUser } from "../api/user";
import { useAuth } from "../context";

export function Home() {
  const { logout } = useAuth();
  const { data: user } = useUser();
  return (
    <>
      <h1> Home Page</h1>
      <h2>Hello {user?.name}</h2>
      <button onClick={() => logout()}>logout</button>
    </>
  );
}
