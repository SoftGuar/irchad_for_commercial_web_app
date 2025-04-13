"use client";
import Image from "next/image";
import SalesList from "@/components/lists/SalesList";
import PopUpScreen from "@/components/popups/popUpScreen";
import AddDevis from "@/components/popups/AddDevis";



const DevisPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          New Quotation
          <p className="text-[20px] font-roboto-light">Where you manage your quotations</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="flex justify-center w-[95%]">
          <AddDevis  />
        </div>
      </div>
    </div>
  );
};

export default DevisPage;