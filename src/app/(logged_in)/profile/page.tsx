"use client";
import UserHeaderBar from "@/components/cards/UserHeaderBar";
import UserInfoCard from "@/components/cards/UserInfoCard";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";
import { useState } from "react";
import { useUser } from "@/utils/userContext";
import { User } from "@/types/user";
import { userApi } from "@/services/userApi";

const ProfilePage = () => {
    const { user, fetchUser } = useUser();

    const activities = [
        { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
        { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
        { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
        { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },
    ]

    const [isEditing, setIsEditing] = useState(false)

    const handleSave = async (updatedUser: Partial<User>) => {
      try {
        const response = await userApi.updateUser({
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          email: updatedUser.email,
          phone: updatedUser.phone,
        });
        
        if (response.success) {
          await fetchUser(); 
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    };

    if (!user) {
      return <div>Loading user data...</div>;
    }

    return (
      <div className="p-0">
        <div className="w-full rounded-lg">
          <img src="/images/headers/profile_header.svg" />
        </div>

      <UserHeaderBar user={user} onEdit={() => setIsEditing(true)} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <UserInfoCard user={user} isEditing={isEditing} onSave={handleSave}/>
        </div>
        <ActivityHistoryCard title="Activity History" activities={activities} />
      </div>
    </div>
    )
  }
  
  export default ProfilePage;
  