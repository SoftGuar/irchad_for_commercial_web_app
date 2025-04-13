import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { salesApi } from "@/services/salesApi";
import { commercialApi } from "@/services/commercialApi";

interface ProductCount {
  product: Product;
  count: number;
}

const AddDevis = () => {
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState<ProductCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await commercialApi.products.getAll();
        if (response.success) {
          setAvailableProducts(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      setError("Client email is required");
      return;
    }

    if (products.length === 0) {
      setError("At least one product is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const usersResponse = await commercialApi.users.getAll();
      if (!usersResponse.success) throw new Error("Failed to fetch users");
      
      const user = usersResponse.data.find((u: any) => u.email === email);
      if (!user) throw new Error("User with this email not found");

      const apiProducts = products.map(p => ({
        product_id: p.product.id,
        count: p.count
      }));

      const response = await salesApi.quotations.createDemand({
        user_id: user.id,
        products: apiProducts
      });

      if (!response.success) throw new Error("Failed to create quotation");

      setSuccess(true);
    } catch (err) {
      console.error("Error creating quotation:", err);
      setError(err instanceof Error ? err.message : "Failed to create quotation");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = () => {
    if (availableProducts.length > 0) {
      setProducts([
        ...products, 
        { product: availableProducts[0], count: 1 }
      ]);
    }
  };

  const updateProduct = (index: number, field: 'product' | 'count', value: Product | number) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      [field]: value
    };
    setProducts(newProducts);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  if (success) {
    return (
      <div className="flex flex-col items-center relative bg-[#181818] shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/2">
        <div className="text-center">
          <p className="text-xl text-green-500 font-roboto-bold mb-4">Quotation Created!</p>
          <p className="text-irchad-white">
            The quotation has been successfully submitted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative bg-[#181818] shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/2">       
      <div className="flex items-center gap-2 text-xl font-bold text-white mt-6 mb-8">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      <p className="text-xl text-irchad-white font-roboto-bold">Add a quotation</p>
      <p className="text-sm text-irchad-gray-light font-roboto">Insert Informations below</p>

      {error && (
        <div className="text-red-500 text-sm w-full text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Client's email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ex: example@gmail.com"
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
        />
      </div>

      {products.map((productCount, index) => (
        <div key={index} className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[16px] text-irchad-gray-light font-roboto">
              {index === 0 ? "Product" : `Product ${index + 1}`}
            </p>
            {index > 0 && (
              <button 
                onClick={() => removeProduct(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex space-x-2">
            <select
              value={productCount.product.id}
              onChange={(e) => {
                const selectedProduct = availableProducts.find(
                  p => p.id === parseInt(e.target.value)
                );
                if (selectedProduct) {
                  updateProduct(index, 'product', selectedProduct);
                }
              }}
              className="flex-1 focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
            >
              {availableProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (${product.price})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={productCount.count}
              onChange={(e) => updateProduct(index, 'count', parseInt(e.target.value) || 1)}
              className="w-20 focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
              placeholder="Count"
            />
          </div>
        </div>
      ))}

      <button 
        onClick={addProduct}
        disabled={availableProducts.length === 0}
        className="self-start text-irchad-orange text-sm flex items-center mt-2 disabled:opacity-50"
      >
        <span className="text-xl mr-1">+</span> Add another product
      </button>

      <div className="flex space-x-4 w-full pt-4">
        <button 
          onClick={handleSubmit}
          disabled={loading || products.length === 0}
          className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddDevis;