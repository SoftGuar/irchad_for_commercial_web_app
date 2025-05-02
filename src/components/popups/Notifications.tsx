"use client";
import { useState } from "react";
import { Eye, EyeClosed, Trash2 } from "lucide-react";
import { NotificationType } from "@/types/notifications";
import { notificationsApi } from "@/services/notificationsApi";
import { useNotifications } from "@/utils/notificationsContext";

interface NotificationsProps {
  notifications: NotificationType[];
}

const Notifications = ({ notifications }: NotificationsProps) => {
  const { wsConnected } = useNotifications();
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const unreadCount = localNotifications.filter(n => !n.is_read).length;

  const updateNotification = (id: number, updates: Partial<NotificationType>) => {
    setLocalNotifications(prev =>
      prev.map(notification => 
        notification.id === id ? { ...notification, ...updates } : notification
      )
    );
  };

  const markAsRead = (id: number) => {
    updateNotification(id, { is_read: true });
    notificationsApi.notifications.markAsRead(id).catch(console.error);
  };
  
  const deleteNotification = (id: number) => {
    setLocalNotifications(prev => prev.filter(n => n.id !== id));
    notificationsApi.notifications.delete(id).catch(console.error);
  };
  
  const markAllAsRead = () => {
    setLocalNotifications(prev =>
      prev.map(n => n.is_read ? n : { ...n, is_read: true })
    );
    
    const unreadIds = localNotifications
      .filter(n => !n.is_read)
      .map(n => n.id);
    
    Promise.all(
      unreadIds.map(id => notificationsApi.notifications.markAsRead(id))
    ).catch(console.error);
  };

  const markAsUnread = (id: number) => {
    updateNotification(id, { is_read: false });
    notificationsApi.notifications.markAsUnread(id).catch(console.error);
  };

  return (
    <div className="w-full max-w-md bg-[#2E2E2E] rounded shadow-lg">
      <div className="flex justify-between items-center px-4 py-3 bg-[#2E2E2E] border-b">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium text-gray-200">
            Notifications {wsConnected ? '🟢' : '🔴'}
          </h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <button 
          onClick={markAllAsRead} 
          className="text-sm text-blue-400 hover:text-blue-800"
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {localNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          localNotifications.map((notification) => (
            <div 
              key={`notification-${notification.id}`}
              className={`p-4 border-b border-gray-100 ${!notification.is_read ? "bg-[#2E2E2E]" : ""}`}
            >
              <div className="flex">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-50">
                      {notification.title || 'Notification'}
                    </h4>
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
                          onClick={() => markAsUnread(notification.id)}
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
                  <p className="text-gray-100 my-1">
                    {notification.message || 'No message content'}
                  </p>
                  <span className="text-xs text-gray-200">
                    {notification.created_at || 'Unknown date'}
                  </span>
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