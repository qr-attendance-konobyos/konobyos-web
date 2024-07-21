import { Outlet } from "react-router-dom";
import { BottomNavbar } from "../components";

export function Home() {
  return (
    <>
      <Outlet />
      <BottomNavbar />
    </>
  );
}
