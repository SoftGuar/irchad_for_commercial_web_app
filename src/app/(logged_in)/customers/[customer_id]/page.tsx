"use client";
import CustomerInfoCard from "@/components/cards/customerInfoCard";
import SalesHistoryCard from "@/components/cards/SalesHistoryCard";
import { useState } from "react";



const CustomerPage = () => {
  const [user,setUser] = useState({
    userName: "Remache Islam",
    firstName:"Islam",
    lastName:"Remache",
    email: "isalmrmh@gmail.com",
    phone: "+213 555 123 456",
    id: "0B26ECBAXD78CCVX12V",
    privilegeLvl: 2,
    avatar: "/images/ProfilePic.png",
    role: "admin",
    status:"Active",
    accountState:"Active",
    joinedAt:"2025-03-09",
    deviceId: "AV983NF0938FDHRAAC",
    sales:[
      {
        "product": "Smart glasses",
        "agent": "John Doe",
        "id": "123456",
        "date": "10/10/2025"
      },
      {
        "product": "Wireless Headphones",
        "agent": "Jane Smith",
        "id": "789012",
        "date": "12/05/2024"
      },
      {
        "product": "Gaming Laptop",
        "agent": "Alice Brown",
        "id": "345678",
        "date": "07/22/2023"
      },
      {
        "product": "Smartphone X",
        "agent": "Bob Williams",
        "id": "901234",
        "date": "03/15/2026"
      }
    ]
    
  })


    return (
      <div className="p-0">
        <div className="w-full rounded-lg">
          <img src="/images/headers/users_header.svg" />
        </div>

      <CustomerInfoCard user={user} />

     <SalesHistoryCard items={user.sales}/>
    </div>
    )
  }
  
  export default CustomerPage;
  