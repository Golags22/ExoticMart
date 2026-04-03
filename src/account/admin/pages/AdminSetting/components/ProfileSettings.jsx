// src/account/admin/pages/Setting/components/ProfileSettings.jsx
import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave, FiLoader, FiAlertCircle, FiCalendar, FiShield, FiEdit2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../../backend/firebase';
import { useAuth } from '../../../../../context/AuthContext';

const ProfileSettings = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    bio: '',
    avatarUrl: '',
    role: '',
    status: '',
    createdAt: null,
    lastActive: null
  });
  const [originalData, setOriginalData] = useState({});

  // Fetch admin data from Firestore
  useEffect(() => {
    if (userProfile && userProfile.role === 'admin') {
      loadProfileData(userProfile);
    } else if (user) {
      fetchAdminProfile();
    } else {
      setLoading(false);
      setError('No user logged in');
    }
  }, [userProfile, user]);

  const loadProfileData = (profile) => {
    setFormData({
      fullName: profile.fullName || profile.displayName || '',
      email: profile.email || user?.email || '',
      phoneNumber: profile.phoneNumber || '',
      address: profile.address || (profile.addresses && profile.addresses[0]) || '',
      bio: profile.bio || '',
      avatarUrl: profile.avatarUrl || profile.photoURL || '',
      role: profile.role || 'admin',
      status: profile.status || '',
      createdAt: profile.createdAt?.toDate?.() || profile.createdAt || null,
      lastActive: profile.lastActive?.toDate?.() || profile.lastActive || null
    });
    setOriginalData({
      fullName: profile.fullName || profile.displayName || '',
      email: profile.email || user?.email || '',
      phoneNumber: profile.phoneNumber || '',
      address: profile.address || (profile.addresses && profile.addresses[0]) || '',
      bio: profile.bio || '',
      avatarUrl: profile.avatarUrl || profile.photoURL || ''
    });
    setLoading(false);
  };

  const fetchAdminProfile = async () => {
    if (!user?.uid) {
      setError('No user UID available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const adminRef = doc(db, 'admins', user.uid);
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        const adminData = adminSnap.data();
        loadProfileData(adminData);
      } else {
        setError('Admin profile not found');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching admin profile:', err);
      setError('Failed to load profile: ' + err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) {
      toast.error('User not authenticated');
      return;
    }

    setSaving(true);
    try {
      const adminRef = doc(db, 'admins', user.uid);
      const updateData = {
        fullName: formData.fullName.trim(),
        displayName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber?.trim() || '',
        address: formData.address?.trim() || '',
        bio: formData.bio?.trim() || '',
        updatedAt: serverTimestamp(),
        lastActive: serverTimestamp()
      };

      if (formData.address?.trim()) {
        updateData.addresses = [formData.address.trim()];
      }

      await updateDoc(adminRef, updateData);

      setOriginalData({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        bio: formData.bio,
        avatarUrl: formData.avatarUrl
      });

      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditing(false);
  };

  const formatDate = (date) => {
    if (!date) return 'Not available';
    try {
      if (date.toDate) return date.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <FiLoader className="w-8 h-8 text-red-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Loading your profile data...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.fullName) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Load Profile</h3>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchAdminProfile}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiEdit2 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-md disabled:opacity-50"
            >
              {saving ? (
                <>
                  <FiLoader className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Admin Badge and Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <FiShield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Account Type</p>
              <p className="text-sm font-bold text-red-600 uppercase">{formData.role || 'Admin'}</p>
            </div>
          </div>
          
          {formData.status && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Store:</span>
              <span className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded">
                {formData.status}
              </span>
            </div>
          )}
          
          {formData.createdAt && (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
              <FiCalendar className="text-gray-400" size={14} />
              <span className="text-xs text-gray-600">
                Member since: {formatDate(formData.createdAt)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center overflow-hidden ring-4 ring-red-100">
            {formData.avatarUrl ? (
              <img 
                src={formData.avatarUrl} 
                alt={formData.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <FiUser className="w-12 h-12 text-white" />
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Profile Picture</p>
          <p className="text-xs text-gray-500 mt-1">
            {formData.avatarUrl ? 'Profile photo set' : 'No profile photo'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            * Avatar upload coming soon
          </p>
          <p><strong>Admin UID:</strong> {user?.uid || 'Not available'}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all ${
                editing 
                  ? 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
        </div>

        {/*phoneNumber */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
           phoneNumber
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!editing}
              placeholder="+1 234 567 8900"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all ${
                editing 
                  ? 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              placeholder="123 Business Street, City, Country"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all ${
                editing 
                  ? 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!editing}
            rows="3"
            placeholder="Tell us a little about yourself..."
            className={`w-full px-4 py-2.5 border rounded-lg transition-all resize-none ${
              editing 
                ? 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-200 bg-gray-50'
            }`}
          />
        </div>
      </div>

     
    </form>
  );
};

export default ProfileSettings;