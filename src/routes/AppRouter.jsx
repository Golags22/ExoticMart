import { BrowserRouter, Routes } from "react-router-dom";
import CustomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";
import AdminAuthRoutes from "./AdminAuthRoutes";
import AuthRoute from './AuthRoutes';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {CustomerRoutes}
        {AdminAuthRoutes}
        {AdminRoutes}
        {AuthRoute}
      </Routes>
    </BrowserRouter>
  );
}