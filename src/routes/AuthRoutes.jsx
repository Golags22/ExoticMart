import { Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AuthLayout from "../layouts/AuthLayout";


   const  AuthRoutes = (
     <Route element={<AuthLayout />}>
 <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

</Route>


   );
  export default AuthRoutes;