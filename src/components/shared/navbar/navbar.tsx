import { useState, useRef, useEffect, useMemo } from "react";
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Notifications from "@/components/popups/Notifications";
import { useUser } from "@/utils/userContext";
import { notificationsApi } from "@/services/notificationsApi";
import { NotificationType } from "@/types/notifications";
import { useNotifications } from "@/utils/notificationsContext";

const Navbar = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { notifications: contextNotifications } = useNotifications();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Calculate unread count using useMemo
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.is_read).length;
  }, [notifications]);

  // Fetch notifications when user is available
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoadingNotifications(true);
        const userId = String(user.id);
        const response = await notificationsApi.notifications.getAll(userId);
        if (response.success) {
          // Sort immediately when setting
          const sorted = response.data.sort((a, b) => {
            if (a.is_read !== b.is_read) return a.is_read ? 1 : -1;
            return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
          });
          setNotifications(sorted);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  // Update notifications when new ones come through WebSocket
  useEffect(() => {
    if (contextNotifications.length === 0) return;
    
    setNotifications(prev => {
      // Create a map to avoid duplicates
      const notificationMap = new Map<number, NotificationType>();
      
      // Add all existing notifications
      prev.forEach(notif => notificationMap.set(notif.id, notif));
      
      // Add/update with new context notifications
      contextNotifications.forEach(notif => notificationMap.set(notif.id, notif));
      
      // Convert back to array and sort
      const merged = Array.from(notificationMap.values());
      return merged.sort((a, b) => {
        if (a.is_read !== b.is_read) return a.is_read ? 1 : -1;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
    });
  }, [contextNotifications]);

  // Handle clicks outside the notification popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <nav className="bg-[#2E2E2E] text-white py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold text-white">
          <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
          <span>IRCHAD</span>
        </div>
        <div className="animate-pulse bg-gray-600 h-8 w-32 rounded"></div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#2E2E2E] text-white py-3 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#2E2E2E] px-3 py-2 rounded-md border border-[#FF8B0029]">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent text-white placeholder-gray-500 focus:outline-none px-2" 
        />
      </div>

      {/* Notification & User Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="relative">
            <BellIcon
              onClick={() => setShowNotifications((prev) => !prev)}
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white"
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Notification Popup */}
          {showNotifications && (
            <div 
              ref={notificationRef} 
              className="absolute right-0 mt-2 w-80 bg-[#2E2E2E] shadow-lg rounded-md text-[#D3D3D3] p-4 border border-gray-600 z-50"
            >
              {isLoadingNotifications ? (
                <div className="py-4 text-center">Loading notifications...</div>
              ) : (
                <Notifications notifications={notifications} />
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <UserCircleIcon 
            onClick={() => router.push('/profile')}  
            className="h-8 w-8 text-gray-400 cursor-pointer hover:text-white" 
          />
          <div className="text-sm">
            {user ? `${user.first_name} ${user.last_name}` : 'Guest'}
            <p className="text-gray-400 text-xs">Commercial</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;