import Image from "next/image";
import { useState, useEffect } from "react";
import { commercialApi } from "@/services/commercialApi";
import { salesApi } from "@/services/salesApi";
import { User } from "@/types/user";
import { Product } from "@/types/product";

interface AddSaleProps {
  closePopup: () => void;
  onSaleAdded: () => void;
}

const AddSale: React.FC<AddSaleProps> = ({ closePopup, onSaleAdded }) => {
  const [email, setEmail] = useState("");
  const [dispositiveId, setDispositiveId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commercialId, setCommercialId] = useState<number | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        const accountResponse = await commercialApi.account.getCurrent();
        if (accountResponse.success) {
          setCommercialId(accountResponse.data.id);
        } else {
          throw new Error("Failed to fetch commercial info");
        }
        
        const productsResponse = await commercialApi.products.getAll();
        if (productsResponse.success) {
          setProducts(productsResponse.data);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setError("Failed to initialize form data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async () => {
    if (!email || !dispositiveId || !commercialId) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const usersResponse = await commercialApi.users.getAll();
      if (!usersResponse.success) {
        throw new Error("Failed to fetch users");
      }
      
      const user = usersResponse.data.find((u: User) => u.email === email);
      if (!user) {
        throw new Error("User with this email not found");
      }

      const saleResponse = await salesApi.orders.create({
        user_id: user.id,
        product_id: dispositiveId,
        commercial_id: commercialId
      });

      if (!saleResponse.success) {
        throw new Error("Failed to create sale");
      }

      onSaleAdded();
      closePopup();
    } catch (err) {
      console.error("Error creating sale:", err);
      setError(err instanceof Error ? err.message : "Failed to create sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/3">       
      <div className="flex items-center gap-2 text-xl font-bold text-white mt-6 mb-8">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      <p className="text-xl text-irchad-white font-roboto-bold">Add a sale</p>
      <p className="text-sm text-irchad-gray-light font-roboto">Insert Informations below</p>

      {error && (
        <div className="text-red-500 text-sm w-full text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Customer Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
          disabled={loading}
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Product</p>
        <select
          value={dispositiveId || ""}
          onChange={(e) => setDispositiveId(Number(e.target.value))}
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
          disabled={loading || products.length === 0}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (${product.price})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-2/3 pt-4">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-irchad-orange text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Add"}
        </button>

        <button 
          onClick={closePopup}
          disabled={loading}
          className="bg-irchad-gray-light text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSale;