import { useAuth } from "../../../../context/AuthContext";

export default function SidebarProfile() {
  const { userProfile } = useAuth();

  return (
    <div className="p-4 border-b">
      <p className="font-semibold">
        {userProfile?.fullName || userProfile?.displayName || "Admin"}
      </p>
      <p className="text-sm text-gray-500">
        {userProfile?.email || "Not available"}
      </p>
    </div>
  );
}