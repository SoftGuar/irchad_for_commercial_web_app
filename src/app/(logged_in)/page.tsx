"use client";
import MetricCards from "@/components/cards/MetricCards";
import SalesChart from "@/components/cards/SalesCostChart";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";
import Image from "next/image";

// Define the card data type
interface CardData {
  title: string;
  value: number | string;
  unit?: string;
  percentage: number;
  iconColor: string;
}

// Sample Data for Metric Cards
const cardData: CardData[] = [
  { title: "Total Sales", value: "8k", unit: "", percentage: 75, iconColor: "#f97316" }, // Orange
  { title: "Total Earnings", value: "120K", unit: "D.A", percentage: 60, iconColor: "#0ea5e9" }, // Blue
  { title: "Total Customers", value: "6K", percentage: 60, iconColor: "#facc15" }, // Yellow
  { title: "Warnings", value: 2, percentage: 40, iconColor: "#ef4444" }, // Red
];

// Sample Data for the Chart
const chartData = [
  { month: "Jan", sales: 90 },
  { month: "Feb", sales: 85},
  { month: "Mar", sales: 95 },
  { month: "Apr", sales: 88 },
  { month: "May", sales: 92 },
  { month: "Jun", sales: 87},
  { month: "Jul", sales: 94 },
  { month: "Aug", sales: 96 },
];
const notifications = [
    { message: "order #AGYDGYW32 is delayed.", timestamp: "11 JUL 8:10 PM" },
    { message: "New order received: #8744152.", timestamp: "11 JUL 11 PM" },
    { message: 'Customer "Ahmed Kada" requested assistance.', timestamp: "11 JUL 7:54 PM" },
    { message: 'New customer account created: "Remache Islam".', timestamp: "11 JUL 1:21 AM" },


  ];
  

export default function Dashboard() {
  return (
    <div className="relative min-h-screen text-white bg-irchad-gray-dark w-full overflow-x-hidden">
      {/* Background Image */}
      <div className="absolute h-1/4 w-full rounded-b-lg overflow-hidden">
        <Image
          src="/images/headers/header.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-lg"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Hello Commercial !</h1>
          <p className="text-lg drop-shadow-md">Discover what’s new in Irchad</p>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-0 w-full mt-40">
        <div className="w-full max-w-7xl mx-auto space-y-6 px-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {cardData.map((card, index) => (
              <MetricCards key={index} {...card} />
            ))}
          </div>

          {/* Sales Chart & Notifications Container */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="w-full lg:w-2/3 bg-[#2E2E2E] p-6 rounded-xl shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Sales Chart</h2>
              <SalesChart data={chartData} />
            </div>

            <div className="w-full lg:w-1/3 bg-[#2E2E2E] rounded-xl shadow-lg">
              <ActivityHistoryCard title="Notifications" activities={notifications} />
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}
