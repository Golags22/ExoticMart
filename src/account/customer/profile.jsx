// pages/account/Profile.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock,
  Save,
  ChevronRight,
  Camera,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, userProfile, updateUserProfile, changePassword } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("profile"); // profile, password, addresses
  const [loading, setLoading] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    displayName: userProfile?.displayName || "",
    email: user?.email || "",
    phone: userProfile?.phone || "",
    newsletter: userProfile?.newsletter || false
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Address form state
  const [addresses, setAddresses] = useState(userProfile?.addresses || []);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    isDefault: false
  });

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validatePassword = () => {
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateUserProfile({
        displayName: profileForm.displayName,
        phone: profileForm.phone,
        newsletter: profileForm.newsletter
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setLoading(true);
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Password change error:", error);
      toast.error(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    
    try {
      const newAddresses = [...addresses, addressForm];
      await updateUserProfile({ addresses: newAddresses });
      setAddresses(newAddresses);
      setAddressForm({
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        isDefault: false
      });
      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Add address error:", error);
      toast.error("Failed to add address");
    }
  };

  const handleDeleteAddress = async (index) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const newAddresses = addresses.filter((_, i) => i !== index);
        await updateUserProfile({ addresses: newAddresses });
        setAddresses(newAddresses);
        toast.success("Address deleted");
      } catch (error) {
        console.error("Delete address error:", error);
        toast.error("Failed to delete address");
      }
    }
  };

  const handleSetDefaultAddress = async (index) => {
    try {
      const newAddresses = addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index
      }));
      await updateUserProfile({ addresses: newAddresses });
      setAddresses(newAddresses);
      toast.success("Default address updated");
    } catch (error) {
      console.error("Set default address error:", error);
      toast.error("Failed to update default address");
    }
  };

  // Redirect if not logged in
  if (!user) {
    navigate("/users/login", { state: { from: "/account/profile" } });
    return null;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <ChevronRight size={14} />
            <Link to="/account" className="hover:text-red-600">Account</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Profile Settings</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 relative">
                  <User size={32} className="text-red-600" />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Camera size={14} className="text-gray-600" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900">{userProfile?.displayName || "User"}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "profile"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <User size={18} />
                  Profile Information
                </button>
                
                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "password"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Lock size={18} />
                  Change Password
                </button>
                
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "addresses"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MapPin size={18} />
                  Saved Addresses
                  {addresses.length > 0 && (
                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                      {addresses.length}
                    </span>
                  )}
                </button>
              </nav>

              {/* Account stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  <p>Member since: {new Date().toLocaleDateString()}</p>
                  <p className="mt-1">Last active: Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                  {/* Display Name */}
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={profileForm.displayName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email (read-only) */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={profileForm.email}
                      readOnly
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Newsletter Subscription */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={profileForm.newsletter}
                      onChange={handleProfileChange}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                      Subscribe to newsletter for exclusive offers and updates
                    </label>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === "password" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
                
                <form onSubmit={handleChangePassword} className="space-y-6 max-w-2xl">
                  {/* Current Password */}
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Password requirements */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Password requirements:</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-2">
                        {passwordForm.newPassword.length >= 6 ? (
                          <CheckCircle size={12} className="text-green-600" />
                        ) : (
                          <AlertCircle size={12} className="text-gray-400" />
                        )}
                        At least 6 characters
                      </li>
                      <li className="flex items-center gap-2">
                        {/[a-z]/.test(passwordForm.newPassword) ? (
                          <CheckCircle size={12} className="text-green-600" />
                        ) : (
                          <AlertCircle size={12} className="text-gray-400" />
                        )}
                        Contains lowercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        {/[A-Z]/.test(passwordForm.newPassword) ? (
                          <CheckCircle size={12} className="text-green-600" />
                        ) : (
                          <AlertCircle size={12} className="text-gray-400" />
                        )}
                        Contains uppercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        {/[0-9]/.test(passwordForm.newPassword) ? (
                          <CheckCircle size={12} className="text-green-600" />
                        ) : (
                          <AlertCircle size={12} className="text-gray-400" />
                        )}
                        Contains number
                      </li>
                    </ul>
                  </div>

                  {/* Update Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Lock size={18} />
                          Update Password
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                  <button
                    onClick={() => setEditingAddress("new")}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <MapPin size={16} />
                    Add New Address
                  </button>
                </div>

                {/* Address List */}
                {addresses.length === 0 && !editingAddress ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MapPin size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No saved addresses yet</p>
                    <button
                      onClick={() => setEditingAddress("new")}
                      className="text-red-600 font-medium hover:text-red-700"
                    >
                      Add your first address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${
                          address.isDefault ? 'border-red-600 bg-red-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {address.isDefault && (
                              <span className="inline-block bg-red-600 text-white text-xs px-2 py-0.5 rounded-full mb-2">
                                Default
                              </span>
                            )}
                            <p className="font-medium text-gray-900">{address.fullName}</p>
                            <p className="text-sm text-gray-600 mt-1">{address.addressLine1}</p>
                            {address.addressLine2 && (
                              <p className="text-sm text-gray-600">{address.addressLine2}</p>
                            )}
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-600">{address.country}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefaultAddress(index)}
                                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                              >
                                Set Default
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteAddress(index)}
                              className="text-sm text-red-600 hover:text-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add/Edit Address Form */}
                {editingAddress === "new" && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Address</h3>
                    
                    <form onSubmit={handleAddAddress} className="space-y-4 max-w-2xl">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={addressForm.fullName}
                          onChange={handleAddressChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Address Line 1 */}
                      <div>
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          id="addressLine1"
                          name="addressLine1"
                          value={addressForm.addressLine1}
                          onChange={handleAddressChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          placeholder="123 Main St"
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div>
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          id="addressLine2"
                          name="addressLine2"
                          value={addressForm.addressLine2}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          placeholder="Apt, Suite, etc."
                        />
                      </div>

                      {/* City, State, Zip */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={addressForm.state}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            placeholder="NY"
                          />
                        </div>
                      </div>

                      {/* Zip Code and Country */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={addressForm.zipCode}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            placeholder="10001"
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={addressForm.country}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>

                      {/* Set as Default */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isDefault"
                          name="isDefault"
                          checked={addressForm.isDefault}
                          onChange={handleAddressChange}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label htmlFor="isDefault" className="ml-2 text-sm text-gray-600">
                          Set as default address
                        </label>
                      </div>

                      {/* Form Actions */}
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingAddress(null)}
                          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}