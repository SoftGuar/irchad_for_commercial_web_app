"use client";
import Image from "next/image";
import AccountList from "@/components/lists/CustomersList";
import { useEffect, useState } from "react";
import { commercialApi } from "@/services/commercialApi";
import { User } from "@/types/user";

interface FormattedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  addingDate: string;
  lastEdited: string;
  note: string;
}


const CustomersPage = () => {
  const [users, setUsers] = useState<FormattedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await commercialApi.users.getAll();
        
        if (response.success) {
          const formattedUsers = response.data.map((user: User) => ({
            id: user.id.toString(),
            name: `${user.first_name} ${user.last_name}`.trim(),
            email: user.email,
            phone: user.phone,

            //for now
            addingDate: new Date().toISOString().split('T')[0], 
            lastEdited: new Date().toISOString().split('T')[0], 
            note: '',
          }));
          setUsers(formattedUsers);
        } else {
          setError('Failed to fetch users');
        }
      } catch (err) {
        setError('An error occurred while fetching users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-irchad-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image 
          src="/images/headers/header.svg" 
          alt="header" 
          width={1663} 
          height={236}
          priority
        />
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Customers
          <p className="text-[20px] font-roboto-light">Where you manage your customers</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <AccountList 
            title="Customer" 
            accountsData={users} 
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;