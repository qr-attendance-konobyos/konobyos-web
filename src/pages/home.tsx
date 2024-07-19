import { useUser } from "../api/user";
import { useAuth } from "../context";
import "./home.scss";

export function Home() {
  const { logout } = useAuth();
  const { data: user } = useUser();
  return (
    <div className="home">
      <h1> Home Page</h1>
      <h2>Hello {user?.name}</h2>
      <button className="button primary" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
