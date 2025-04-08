import Image from "next/image";
import { useState } from "react";
import { commercialApi } from "@/services/commercialApi";

interface DeleteCustomerProps {
  closePopup: () => void;
  userId: string;
  onUserDeleted: () => void;
}

const DeleteCustomer: React.FC<DeleteCustomerProps> = ({ 
  closePopup, 
  userId,
  onUserDeleted 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await commercialApi.users.delete(userId);
      
      if (response.success) {
        closePopup();
        onUserDeleted(); 
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('An error occurred while deleting the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-4 w-1/3">       
      <div className="flex items-center gap-2 text-xl font-bold text-white mt-6 mb-4">
        <Image 
          src="/images/logo.png" 
          alt="IRCHAD" 
          width={32} 
          height={32} 
          priority
        />
        <span>IRCHAD</span>
      </div>

      <p className="text-xl text-irchad-white font-roboto-bold text-center">
        Delete Customer
      </p>
      
      <p className="text-sm text-irchad-gray-light font-roboto text-center">
        Are you sure you want to delete this customer? This action cannot be undone.
      </p>

      {error && (
        <div className="text-red-500 text-sm w-full text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col w-2/3 pt-4">
        <button 
          onClick={handleDelete}
          disabled={loading}
          className={`bg-red-600 text-irchad-white w-full px-4 py-2 mt-3 rounded-lg outline-none ${
            loading ? 'opacity-50' : 'hover:bg-red-700'
          }`}
        >
          {loading ? 'Deleting...' : 'Delete'}
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

export default DeleteCustomer;