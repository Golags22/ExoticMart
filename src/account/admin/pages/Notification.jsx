// src/account/admin/components/Notification.jsx
import React, { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../backend/firebase";
import {
  FiBell,
  FiCheckCircle,
  FiShoppingBag,
  FiUser,
  FiPackage,
  FiAlertCircle,
  FiX,
  FiFilter,
  FiClock,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNotifications } from "../../../hooks/useNotifications";

const Notification = () => {
  const { notifications, loading } = useNotifications();
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [typeFilter, setTypeFilter] = useState("all"); // all, order, user, product, system
  const navigate = useNavigate();

  // ✅ Mark as read
  const markAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await updateDoc(doc(db, "notifications", id), { read: true });
      toast.success("Marked as read");
    } catch (err) {
      console.error("Failed to mark as read:", err);
      toast.error("Failed to mark as read");
    }
  };

  // 📝 Mark all as read
  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.read && !n.deleted);
      await Promise.all(
        unread.map((n) => updateDoc(doc(db, "notifications", n.id), { read: true }))
      );
      toast.success(`Marked ${unread.length} notifications as read`);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
      toast.error("Failed to mark all as read");
    }
  };

  // 🗑️ Delete notification
  const deleteNotification = async (id, e) => {
    e.stopPropagation();
    try {
      await updateDoc(doc(db, "notifications", id), {
        deleted: true,
        deletedAt: serverTimestamp(),
      });
      toast.success("Notification deleted");
    } catch (err) {
      console.error("Failed to delete notification:", err);
      toast.error("Failed to delete notification");
    }
  };

  // ⏱️ Format time
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);

      if (diff < 60) return "Just now";
      if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
      if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
      return date.toLocaleDateString();
    } catch (e) {
      return "Invalid date";
    }
  };

  // 🎨 Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <FiShoppingBag className="w-5 h-5 text-blue-500" />;
      case "user":
        return <FiUser className="w-5 h-5 text-green-500" />;
      case "product":
        return <FiPackage className="w-5 h-5 text-yellow-500" />;
      case "system":
        return <FiAlertCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <FiBell className="w-5 h-5 text-red-500" />;
    }
  };

  // 🎨 Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500";
      case "medium":
        return "border-l-4 border-yellow-500";
      case "low":
        return "border-l-4 border-blue-500";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  // 🔗 Handle click (navigate to notification details)
  const handleClick = async (notification) => {
    if (!notification.read) await markAsRead(notification.id);
    navigate(`/admin/notifications/${notification.id}`);
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((n) => {
    if (n.deleted) return false;

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !n.read) ||
      (filter === "read" && n.read);

    const matchesType = typeFilter === "all" || n.type === typeFilter;

    return matchesFilter && matchesType;
  });

  const unreadCount = notifications.filter((n) => !n.read && !n.deleted).length;
  const totalCount = notifications.filter((n) => !n.deleted).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <FiBell className="text-red-600" /> Notifications
            </h1>
            <p className="text-gray-600">Stay updated with all your store activities</p>
          </div>
          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all"
              >
                <FiCheckCircle className="w-4 h-4" />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card title="Total" value={totalCount} icon={<FiBell className="w-6 h-6 text-red-600" />} />
          <Card title="Unread" value={unreadCount} icon={<FiEye className="w-6 h-6 text-yellow-600" />} />
          <Card title="Read" value={totalCount - unreadCount} icon={<FiCheckCircle className="w-6 h-6 text-green-600" />} />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 mb-8 flex flex-col sm:flex-row gap-4">
          <FilterSelect value={filter} onChange={setFilter} options={[{ label: "All Notifications", value: "all" }, { label: "Unread", value: "unread" }, { label: "Read", value: "read" }]} />
          <FilterSelect value={typeFilter} onChange={setTypeFilter} options={[{ label: "All Types", value: "all" }, { label: "Orders", value: "order" }, { label: "Users", value: "user" }, { label: "Products", value: "product" }, { label: "System", value: "system" }]} />
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <EmptyState />
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                handleClick={handleClick}
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
                formatTime={formatTime}
                getIcon={getIcon}
                getPriorityColor={getPriorityColor}
              />
            ))
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default Notification;

/* ==============================
   Helper Components
============================== */
const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">{icon}</div>
    </div>
  </div>
);

const FilterSelect = ({ value, onChange, options }) => (
  <div className="flex-1 relative">
    <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <FiBell className="w-10 h-10 text-red-500" />
    </div>
    <p className="text-gray-500 text-lg">No notifications found</p>
    <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
  </div>
);

const NotificationItem = ({ notification, handleClick, markAsRead, deleteNotification, formatTime, getIcon, getPriorityColor }) => (
  <div
    onClick={() => handleClick(notification)}
    className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-md relative ${
      notification.read ? "bg-white hover:bg-gray-50" : "bg-red-50/30 hover:bg-red-50"
    } ${getPriorityColor(notification.priority)}`}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {getIcon(notification.type)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className={`text-sm font-medium ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
              {notification.message}
            </p>
            {notification.orderId && (
              <p className="text-xs text-gray-400 mt-1">Order ID: {notification.orderId}</p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!notification.read && (
              <button
                onClick={(e) => markAsRead(notification.id, e)}
                className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                title="Mark as read"
              >
                <FiCheckCircle className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => deleteNotification(notification.id, e)}
              className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            {formatTime(notification.createdAt)}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
            {notification.type || "general"}
          </span>
          {!notification.read && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">New</span>
          )}
        </div>
      </div>
    </div>
  </div>
);