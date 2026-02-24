import { Route } from "react-router-dom";
import PublicStatusPage from "./pages/PublicStatusPage";

export const publicRoutes = (
  <Route path="/status/:token" element={<PublicStatusPage />} />
);