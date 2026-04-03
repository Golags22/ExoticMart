import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  // 1️⃣ Wait until Firebase auth finishes loading
  if (loading) return <div>Loading...</div>;

  // 2️⃣ Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/account/admin/auth/login" state={{ from: location }} replace />;
  }

  // 3️⃣ Redirect to home if logged in but not admin
  if (!userProfile?.role || userProfile.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ Admin is logged in → render children (AdminLayout + nested pages)
  return children;
}