import { Route } from "react-router-dom";
import ProtectedLayout from "../../shared/layouts/ProtectedLayout";
import BorrowersPage from "./pages/BorrowersPage";
import BorrowerDetailsPage from "./pages/BorrowerDetailsPage";

export const borrowerRoutes = (
  <Route element={<ProtectedLayout />}>
    <Route path="/borrowers" element={<BorrowersPage />} />
    <Route path="/borrowers/:id" element={<BorrowerDetailsPage />} />
  </Route>
);