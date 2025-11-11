import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    if (token && user) {
      // ✅ Determine backend socket URL
      const backendUrl =
        import.meta.env.VITE_SOCKET_URL ||
        import.meta.env.VITE_API_ORIGIN ||
        "https://flexify-vr5l.onrender.com";

      // ✅ Connect to the backend socket
      const newSocket = io(backendUrl, {
        transports: ["websocket"],
        withCredentials: true,
        auth: { token },
      });

      newSocket.on("connect", () => {
        console.log("✅ Connected to WebSocket server:", backendUrl);

        // Ask for browser notification permission once
        if ("Notification" in window && Notification.permission === "default") {
          Notification.requestPermission().catch(() => {});
        }

        // Join the appropriate room based on user role
        if (user.role === "provider") {
          newSocket.emit("join-provider-room");
        } else if (user.role === "user") {
          newSocket.emit("join-user-room");
        }
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ WebSocket connection error:", err?.message || err);
      });

      newSocket.on("disconnect", () => {
        console.log("🔌 Disconnected from WebSocket server");
      });

      // 🔔 Handle incoming events
      newSocket.on("new-booking", (data) => {
        console.log("📦 New booking event:", data);
        addNotification(data);
      });

      newSocket.on("booking-status-update", (data) => {
        console.log("📢 Booking status update:", data);
        addNotification(data);
      });

      newSocket.on("payment-confirmed", (data) => {
        console.log("💸 Payment confirmed:", data);
        addNotification(data);
      });

      newSocket.on("payment-received", (data) => {
        console.log("💰 Payment received:", data);
        addNotification(data);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [token, user]);

  // 🔔 Notification helpers
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      ...notification,
    };

    setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]); // keep last 10

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Flexify", {
        body: notification.message,
        icon: "/favicon.ico",
      });
    }
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return Notification.permission === "granted";
  };

  const value = {
    socket,
    notifications,
    addNotification,
    clearNotification,
    clearAllNotifications,
    requestNotificationPermission,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
