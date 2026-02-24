import { Routes } from "react-router-dom";

import { authRoutes } from "../feature/auth/routes";
import { dashboardRoutes } from "../feature/dashboard/routes";
import {borrowerRoutes} from "../feature/borrowers/routes" 
import {publicRoutes} from "../feature/public/routes" 

export default function AppRoutes() {
  return (
    <Routes>

      {authRoutes}
      {dashboardRoutes}
      {borrowerRoutes}
      {publicRoutes}

    </Routes>
  );
}
