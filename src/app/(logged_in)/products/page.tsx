"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductList from "@/components/lists/ProductList";
import { commercialApi } from "@/services/commercialApi";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await commercialApi.products.getAll();

        console.log('Raw API Response:', response);
        const formattedProducts = response.data.map((product: any) => ({
          id: product.id,
          name: product.name || `Product ${product.id}`,
          description: product.description || "No description available",
          price: product.price || 0,
        }));
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
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
          Products
          <p className="text-[20px] font-roboto-light">
            Where you find available products
          </p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <ProductList 
            title="Product" 
            productsData={products} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;