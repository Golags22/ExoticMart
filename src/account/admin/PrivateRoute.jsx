// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export function AdminRoute({ children }) {
//   const { currentUser, userProfile, loading } = useAuth();
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   if (!currentUser || userProfile?.role !== "admin") {
//     return <Navigate to="/admin/login" />;
//   }
  
//   return children;
// }