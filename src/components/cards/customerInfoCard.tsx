"use client";
import { useState } from "react";

interface CustomerInfoProps {
  user: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    id: string;
    avatar: string;
    role: string;
    joinedAt: string;
    accountState: string;
    deviceId: string;
    status: string
  };
}



const CustomerInfoCard: React.FC<CustomerInfoProps> = ({ user }) => {
    const userData = [
        { name: "userName", label: "Username", value: user.userName },
        { name: "email",label: "E-mail address", value: user.email },
        { name: "phone",label: "Phone number", value: user.phone },
        { name: "firstName",label: "First name", value: user.firstName },
        { name: "lastName",label: "Last name", value: user.lastName },
        { name: "joinedAt",label: "User since", value: user.joinedAt },
        { name: "id",label: "User Id", value: user.id },
        { name: "accountState",label: "Account state", value: user.accountState },
        { name: "deviceId",label: "Device Id", value: user.deviceId },
      ];
  return (
        <div>
                      <div className="relative flex items-center bg-[#2E2E2E] mx-8 my-8 px-12 py-2 rounded-lg shadow-md text-[]">
              <div className="relative -translate-y-5">
                  <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-secondary_color"
                  />
                  {user.status === "Active" && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2E2E2E]" />
                  )}
              </div>

              <div className="ml-8">
                  <h3 className="text-lg font-semibold">{user.userName}</h3>
                  <p className="text-sm text-[#D1D5DB]">{user.status}</p>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white">
  <div className="grid grid-cols-1 xl:grid-cols-2  gap-6 pl-16">
    {/* Split the data into two halves */}
    <div>
      {userData.slice(0, Math.ceil(userData.length / 2)).map(({ name, label, value }) => (
        <div className="flex mb-6" key={label}>
          <span className="text-white text-lg font-semibold min-w-[250px] capitalize">
            {label.replace(/([A-Z])/g, " $1").trim()}:
          </span>
          <span>{value}</span>
        </div>
      ))}
    </div>
    <div>
      {userData.slice(Math.ceil(userData.length / 2)).map(({ name, label, value }) => (
        <div className="flex mb-6" key={label}>
          <span className="text-white text-lg font-semibold min-w-[250px] capitalize">
            {label.replace(/([A-Z])/g, " $1").trim()}:
          </span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  </div>
</div>



    </div>
  );
};

export default CustomerInfoCard;