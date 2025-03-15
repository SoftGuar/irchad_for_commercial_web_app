"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";


interface NotificationsProps {
  notifications: { message: string; timestamp:string }[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {


  return (
    <div className="w-full bg-[#2E2E2E] lg:col-span-2 p-1 ml-4 mr-20 my-4 rounded-lg  text-[#D3D3D3]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>

      </div>

      <div className="relative w-full">
      
        <div className="absolute left-5 top-1 h-full w-[1px] bg-[#959595]"></div>

      
        <ul className="space-y-4 pl-6 ">
          {notifications.map((activity, index) => (
            <li key={index} className="relative flex items-center gap-4">
          
              <div className="w-4 h-4 bg-[#2E2E2E] border-2 border-orange-500 rounded-full absolute top-1 left-[-12px] "></div>

            
              <div className="border-l-4 border-transparent pl-4">
                <p className="font-medium">{activity.message}</p>
                <span className="text-[#959595] text-sm">{activity.timestamp}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
