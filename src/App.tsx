import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./context";
import { Home, Login } from "./pages";
import { RecordAttendance } from "./pages/record-attendance";
import { RegisterStudent } from "./pages/register-student";
import { StudentDetail } from "./pages/student";
import { StudentsList } from "./pages/students";

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
          <Route path="attendance" element={<RecordAttendance />} />
          <Route
            path="settings"
            element={<h1>Settings ${import.meta.env.VITE_BUILD_TIME}</h1>}
          />

          <Route path="*" element={<Navigate to="/app/students" />} />
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