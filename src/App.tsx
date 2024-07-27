import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./context";
import {
  AttendanceReport,
  Home,
  Login,
  RecordAttendance,
  RegisterStudent,
  Settings,
  StudentDetail,
  StudentsList,
} from "./pages";
export function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route path="app" element={<Home />}>
          <Route index element={<StudentsList />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="attendance" element={<AttendanceReport />} />
          <Route path="settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/app/students" />} />
        </Route>
        <Route path="attendance" element={<Outlet />}>
          <Route index element={<RecordAttendance />} />
        </Route>
        <Route path="students" element={<Outlet />}>
          <Route path="register" element={<RegisterStudent />} />
          <Route path=":id" element={<StudentDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/app/student" />} />
      </Routes>
    </>
  );
}
