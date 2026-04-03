import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
        <Outlet />
    </div>
  );
}