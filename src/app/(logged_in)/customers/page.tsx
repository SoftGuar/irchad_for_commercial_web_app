"use client";
import Image from "next/image";
import AccountList from "@/components/lists/CustomersList";

//sample data
const userAccounts = Array.from({ length: 10 }, (_, index) => ({
  id: `${index + 1}`,
  name: `Customer ${index + 1}`,
  email: `customer${index + 1}@gmail.com`,
  phone: `123-456-789${index}`,
  addingDate: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
  lastEdited: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
  note: `Note ${index + 1}`,
  previlegeLevel: '2',
}));

const CustomersPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Customers
          <p className="text-[20px] font-roboto-light">Where you manage your customers</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <AccountList title="Customer" accountsData={userAccounts} />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;