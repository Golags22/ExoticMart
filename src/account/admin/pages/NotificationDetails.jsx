// src/account/admin/pages/NotificationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../backend/firebase";
import { FiArrowLeft, FiCheckCircle, FiX, FiClock, FiBell, FiShoppingBag, FiUser, FiPackage, FiAlertCircle } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notification
  const fetchNotification = async () => {
    try {
      const docRef = doc(db, "notifications", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNotification({ id: docSnap.id, ...data });

        // Mark as read if not already
        if (!data.read) {
          await updateDoc(docRef, { read: true });
        }
      } else {
        setError("Notification not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch notification");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [id]);

  // Delete notification
  const deleteNotification = async () => {
    try {
      await updateDoc(doc(db, "notifications", id), {
        deleted: true,
        deletedAt: serverTimestamp(),
      });
      toast.success("Notification deleted");
      navigate("/admin/notifications");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete notification");
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return "Invalid date";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <FiShoppingBag className="w-6 h-6 text-blue-500" />;
      case "user":
        return <FiUser className="w-6 h-6 text-green-500" />;
      case "product":
        return <FiPackage className="w-6 h-6 text-yellow-500" />;
      case "system":
        return <FiAlertCircle className="w-6 h-6 text-purple-500" />;
      default:
        return <FiBell className="w-6 h-6 text-red-500" />;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Normal";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notification...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full border border-red-100">
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/admin/notifications")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Back to Notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/admin/notifications")}
        className="flex items-center gap-2 text-red-600 mb-6 hover:underline"
      >
        <FiArrowLeft className="w-5 h-5" /> Back to Notifications
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
        <div className="flex items-center gap-4 mb-4">
          {getIcon(notification.type)}
          <h2 className="text-2xl font-bold text-gray-900">{notification.message}</h2>
        </div>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Type:</span> {notification.type || "General"}
          </p>
          <p>
            <span className="font-semibold">Priority:</span> {getPriorityLabel(notification.priority)}
          </p>
          {notification.orderId && (
            <p>
              <span className="font-semibold">Order ID:</span>{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate(`/admin/orders/${notification.orderId}`)}
              >
                {notification.orderId}
              </span>
            </p>
          )}
          {notification.userId && (
            <p>
              <span className="font-semibold">User ID:</span>{" "}
              <span
                className="text-green-500 cursor-pointer hover:underline"
                onClick={() => navigate(`/admin/customers/${notification.userId}`)}
              >
                {notification.userId}
              </span>
            </p>
          )}
          {notification.productId && (
            <p>
              <span className="font-semibold">Product ID:</span>{" "}
              <span
                className="text-yellow-500 cursor-pointer hover:underline"
                onClick={() => navigate(`/admin/products/${notification.productId}`)}
              >
                {notification.productId}
              </span>
            </p>
          )}
          <p className="flex items-center gap-2">
            <FiClock className="w-4 h-4 text-gray-400" />{" "}
            {formatTime(notification.createdAt)}
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={deleteNotification}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            <FiX /> Delete
          </button>
          {notification.read && (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
              <FiCheckCircle /> Read
            </span>
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

export default NotificationDetails;