"use client";
import Image from "next/image";
import SalesList from "@/components/lists/SalesList";
import { useEffect, useState } from "react";
import { salesApi } from "@/services/salesApi";
import { Sale } from "@/types/sale";


const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await salesApi.transactions.getAllSales();
        
        if (response.success) {
          const formattedSales = response.data.map((sale: Sale) => ({
            id: sale.id,
            userName: sale.userName,
            commercialName: sale.commercialName,
            dispositiveId: sale.dispositiveId,
            Status: sale.Status,
            date: new Date(sale.date).toISOString().split('T')[0],
          }));
          
          setSales(formattedSales);
        } else {
          setError('Failed to fetch sales');
        }
      } catch (err) {
        console.error('Error fetching sales:', err);
        setError('An error occurred while fetching sales');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
          Sales
          <p className="text-[20px] font-roboto-light">Where you manage your sales</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <SalesList title="Sale" salesData={sales} />
        </div>
      </div>
    </div>
  );
};

export default SalesPage;