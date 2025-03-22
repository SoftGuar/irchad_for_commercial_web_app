import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Notifications from "@/components/popups/Notifications";

const Navbar = () => {
  const user = { name: "Aouinine Lylia", role: "Commercial" };
  const router = useRouter()

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
    { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
    { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
    { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },
  ];

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="bg-[#2E2E2E] text-white py-3 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#2E2E2E] px-3 py-2 rounded-md border-[#FF8B0029] border-1">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 " />
        <input type="text" placeholder="Search..." className="bg-transparent text-white placeholder-gray-500 focus:outline-none px-2" />
      </div>

      {/* Notification & User Info */}
      <div className="flex items-center gap-4">
      <div className="relative">
          <BellIcon
            onClick={() => setShowNotifications((prev) => !prev)}
            className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white"
          />

          {/* Notification Popup */}
          {showNotifications && (
            <div ref={notificationRef} className="absolute  right-0 mt-2 w-80 bg-[#2E2E2E] shadow-lg rounded-md text-[#D3D3D3] p-4 border border-gray-600 z-50">
              <Notifications notifications={notifications} />
            </div>
          )}
        </div>        <div className="flex items-center gap-2">
          <UserCircleIcon onClick={()=> router.push('/profile')}  className="h-8 w-8 text-gray-400 cursor-pointer" />
          <div className="text-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-400 text-xs">{user.role}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
