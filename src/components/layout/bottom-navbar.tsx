import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { TbCalendarUser } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import "./bottom-navbar.scss";

export const BottomNavbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath.includes(path);
  return (
    <nav className="bottom-navbar">
      <Link
        to="/app/students"
        className={`nav-item ${isActive("/app/students") ? "active" : ""}`}
      >
        <span className="icon">
          <BsFillPeopleFill />
        </span>
        <span className="text">Students</span>
      </Link>
      <Link
        to="/app/attendance"
        className={`nav-item ${isActive("/app/attendance") ? "active" : ""}`}
      >
        <span className="icon">
          <TbCalendarUser />
        </span>
        <span className="text">Attendance</span>
      </Link>
      <Link
        to="/app/settings"
        className={`nav-item ${isActive("/app/settings") ? "active" : ""}`}
      >
        <span className="icon">
          <IoIosSettings />
        </span>
        <span className="text">Settings</span>
      </Link>
    </nav>
  );
};
