// routes/AdminAuthRoutes.jsx
import { Route } from "react-router-dom";
import { AdminLogin, AdminSignup } from "../account/admin/pages/auth";

const AdminAuthRoutes = (
  <Route path="/account/admin/auth">
    <Route path="login" element={<AdminLogin />} />
    <Route path="Signup" element={<AdminSignup/>} />
    
  </Route>
);

export default AdminAuthRoutes;