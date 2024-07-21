import { Outlet } from "react-router-dom";
import { BottomNavbar } from "../components";

export function Home() {
  // const { logout } = useAuth();
  // const { data: user } = useUser();
  return (
    <>
      <Outlet />
      {/*
      <button className="button primary" onClick={() => logout()}>
        Logout
      </button> */}
      <BottomNavbar />
    </>
  );
}
