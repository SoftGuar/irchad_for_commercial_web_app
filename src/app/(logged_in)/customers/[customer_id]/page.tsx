"use client";
import CustomerInfoCard from "@/components/cards/customerInfoCard";
import SalesHistoryCard from "@/components/cards/SalesHistoryCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { commercialApi } from "@/services/commercialApi";
import { salesApi } from "@/services/salesApi";
import { Dispositive } from "@/types/product";
import { Sale } from "@/types/sale";

const CustomerPage = () => {
  const params = useParams();
  const userId = params.customer_id as string;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        console.log("userId: ",userId);
        if (!userId) throw new Error('User ID is required');
        
        const userResponse = await commercialApi.users.getById(userId);
        if (!userResponse.success) throw new Error('Failed to fetch user');
        console.log("user: ",userResponse.data);
        
        const dispositivesResponse = await commercialApi.dispositives.getAll();
        if (!dispositivesResponse.success) throw new Error('Failed to fetch devices');
        console.log("dispositives: ",dispositivesResponse.data);
        
        const userDispositive = dispositivesResponse.data.find(
          (d: Dispositive) => d.user_id === parseInt(userId)
        );
        const foundDeviceId = userDispositive?.id?.toString() || 'Not assigned';
        
        let userSales: Sale[] = [];
        if (userDispositive) {
          const salesResponse = await salesApi.transactions.getAllSales();
          if (salesResponse.success) {
            // Filter sales to only those matching our dispositive ID
            userSales = salesResponse.data.filter(
              (sale: Sale) => sale.dispositiveId?.toString() === userDispositive.id.toString()
            );
          }
        }

        const transformedUser = {
          firstName: userResponse.data.first_name,
          lastName: userResponse.data.last_name,
          email: userResponse.data.email,
          phone: userResponse.data.phone,
          id: userResponse.data.id.toString(),
          avatar: "/images/ProfilePic.png",
          status: "Active", 
          accountState: "Active", 
          joinedAt: new Date().toISOString().split('T')[0], 
          deviceId: foundDeviceId,
          helpers: userResponse.data.helpers || []
        };

        setUser(transformedUser);
        setSales(userSales);
        setDeviceId(foundDeviceId);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-irchad-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>User not found</div>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="w-full rounded-lg">
        <img src="/images/headers/users_header.svg" alt="User header" />
      </div>

      <CustomerInfoCard user={user} />
      <SalesHistoryCard 
        items={sales.map(sale => ({
          product: "Product", 
          agent: sale.commercialName,
          id: sale.dispositiveId.toString(),
          date: new Date(sale.date).toLocaleDateString()
        }))} 
      />
    </div>
  );
};

export default CustomerPage;