// src/account/admin/pages/Setting/Setting.jsx
import React, { useState } from 'react';
import { 
  FiUser, 
  FiShoppingBag, 
  FiBell, 
  FiLock, 
  FiCreditCard, 
  FiTruck,
  FiSettings,
  FiSave,
  FiRefreshCw
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileSettings from './components/ProfileSettings';
// import StoreSettings from './components/StoreSettings';
// import NotificationSettings from './components/NotificationSettings';
// import SecuritySettings from './components/SecuritySettings';
// import PaymentSettings from './components/PaymentSettings';
// import ShippingSettings from './components/ShippingSettings';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'store', label: 'Store Settings', icon: FiShoppingBag },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'payment', label: 'Payment', icon: FiCreditCard },
    { id: 'shipping', label: 'Shipping', icon: FiTruck },
  ];

  const handleSaveAll = () => {
    setSaving(true);
    setTimeout(() => {
      toast.success('All settings saved successfully!');
      setSaving(false);
    }, 1000);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'store':
        return <StoreSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'payment':
        return <PaymentSettings />;
      case 'shipping':
        return <ShippingSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <FiSettings className="text-red-600" />
                Settings
              </h1>
              <p className="text-gray-600">Manage your store settings and preferences</p>
            </div>
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-md disabled:opacity-50"
            >
              {saving ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save All Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden mb-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all relative ${
                    activeTab === tab.id
                      ? 'text-red-600 border-b-2 border-red-600'
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
          {renderContent()}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-xl shadow-lg border-l-4 border-red-500"
      />
    </div>
  );
};

export default Setting;