import { Route } from "react-router-dom";
import ProtectedLayout from "../../shared/layouts/ProtectedLayout";
import DashboardPage from "./pages/DashboardPage";

export const dashboardRoutes = (
  <Route element={<ProtectedLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
);