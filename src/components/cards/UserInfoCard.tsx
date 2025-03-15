"use client";
import React, { useEffect, useState } from "react";

interface UserInfoCardProps {
  user: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    id: string;
    privilegeLvl: number;
    avatar: string;
    role: string;
    joinedAt: string;
    accountState: string;
    deviceId: string;
  };
  isEditing: boolean;
  onSave: () => void;
  setUser: (user: any) => void;
}



const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, isEditing, onSave, setUser }) => {

 
  
  const userData = [
    { name: "userName", label: "Username", value: user.userName },
    { name: "email",label: "E-mail address", value: user.email },
    { name: "phone",label: "Phone number", value: user.phone },
    { name: "firstName",label: "First name", value: user.firstName },
    { name: "lastName",label: "Last name", value: user.lastName },
    { name: "joinedAt",label: "Commercial since", value: user.joinedAt },
    { name: "id",label: "Commercial Id", value: user.id },
    { name: "accountState",label: "Account state", value: user.accountState },
    { name: "privilegeLvl",label: "Privilege level", value: user.privilegeLvl },
  ];



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white">
      <ul className="space-y-3 pl-16">
        {userData.map(({name, label, value}) => (
          label !== "avatar" && label !== "role" && (label !== "deviceId" || user.role === "user") ? (
            <li className="flex" key={label}>
              <span className="text-white text-lg font-semibold min-w-[250px] capitalize">{label.replace(/([A-Z])/g, ' $1').trim()}:</span>
              {isEditing ? (
                <input 
                  type="text" 
                  name={name} 
                  value={value} 
                  onChange={handleChange} 
                  className="focus:outline-none bg-[#333] text-white px-2 py-1 rounded-md"
                />
              ) : (
                <span>{value}</span>
              )}
            </li>
          ) : null
        ))}
      </ul>
      {isEditing && (
        <div className="mt-4 ml-16">
          <button 
              onClick={onSave} 
              className=" w-1/4 bg-[#7D511F] px-4 py-2 rounded-md text-white">
          Save
        </button>
        </div>
  
      )}
    </div>
  );
};

export default UserInfoCard;