"use client";
import Image from "next/image";
import ProductList from "@/components/lists/ProductList";

//sample data
const products = Array.from({ length: 10 }, (_, index) => ({
    id: `${index + 1}`,
    name: `Product ${index + 1}`,
    description: `Description of the product here`,
    price: 1000 + index * 10, // Example numeric price

}));



  

const ProductsPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Products
          <p className="text-[20px] font-roboto-light">Where you find available products</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <ProductList title="Product" productsData={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;