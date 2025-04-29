"use client";
import { useState ,useEffect} from "react";
import { Bell, Check, Cross, Eye, EyeClosed, Trash2 } from "lucide-react";
import { Notification } from "@/types/notifications";
import { notificationsApi } from "@/services/notificationsApi";
import { useNotifications } from "@/utils/notificationsContext";
interface NotificationsProps {
  notifications: Notification[];
}

const Notifications = ({ notifications: initialNotifications = [] }: NotificationsProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const { notifications: contextNotifications, wsConnected } = useNotifications();
  useEffect(() => {
    if (contextNotifications.length === 0) return;
  
    // Get the latest one (assuming it's prepended in context)
    const latest = contextNotifications[0];
  
    // Check if it's already in local state
    const exists = notifications.some(n => n.message === latest.message && n.title === latest.title);
  
    if (!exists) {
      setNotifications(prev => [latest, ...prev]);
    }
  }, [contextNotifications]);
  const markAsRead = (id: number) => {
    notificationsApi.notifications.markAsRead(String(id)).then((response) => {
      if (response.success) {
        setNotifications(
          notifications.map(notification => 
            notification.id === id ? { ...notification, is_read: true } : notification
          )
        );
      }
    });
  };
  
  const deleteNotification = (id: number) => {
    notificationsApi.notifications.delete(String(id)).then((response) => {
      if (response.success) {
        setNotifications(
          notifications.filter(notification => notification.id !== id)
        );
      }
    });
  };
  
  const markAllAsRead = () => {
    notificationsApi.notifications.markAsRead(
      notifications.map(notification => String(notification.id)).join(",")
    ).then((response) => {
      if (response.success) {
        setNotifications(
          notifications.map(notification => ({ ...notification, is_read: true }))
        );
      }
    }
    )
    setNotifications(
      notifications.map(notification => ({ ...notification, is_read: true }))
    );
  };

  const markasUnread = (id: number) => {
    notificationsApi.notifications.markAsUnread(String(id)).then((response) => {
      if (response.success) {
        setNotifications(
          notifications.map(notification => 
            notification.id === id ? { ...notification, is_read: false } : notification
          )
        );
      }
    });
  }
  
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="w-full max-w-md bg-[#2E2E2E] rounded shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#2E2E2E] border-b">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium text-gray-200">Notifications {wsConnected ? '🟢' : '🔴'}</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <button 
          onClick={markAllAsRead} 
          className="text-sm text-blue-400 hover:text-blue-800"
        >
          Mark all as read
        </button>
      </div>
      
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 border-b border-gray-100 ${!notification.is_read ? "bg-[#2E2E2E]" : ""}`}
            >
              <div className="flex">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-50">{notification.title}</h4>
                    <div className="flex space-x-1">
                      {!notification.is_read ? (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-400 hover:text-blue-800"
                          title="Mark as read"
                        >
                          <Eye size={20} className="text-blue-400" />
                        </button>
                      ) : (
                        <button
                          onClick={() => markasUnread(notification.id)}
                          className="text-blue-400 hover:text-blue-800"
                          title="Mark as Unread"
                          >
                        <EyeClosed size={20} className="text-blue-400" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-100 my-1">{notification.message}</p>
                  <span className="text-xs text-gray-200">{notification.created_at}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;