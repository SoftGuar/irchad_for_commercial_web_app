import Image from "next/image";
import { useState } from "react";
import { salesApi } from "@/services/salesApi";

interface DeleteSaleProps {
    closePopup: () => void;
    saleId: number;
    onSaleDeleted: () => void;
}

const DeleteSale: React.FC<DeleteSaleProps> = ({ closePopup, saleId, onSaleDeleted }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setLoading(true);
        setError('');
    
        try {
          const response = await salesApi.transactions.delete(saleId);  //need to be changed with product transaction
          
          if (response.success) {
            closePopup();
            onSaleDeleted(); 
          } else {
            setError('Failed to delete sale');
          }
        } catch (err) {
          console.error('Error deleting sale:', err);
          setError('An error occurred while deleting the sale');
        } finally {
          setLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col items-center relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-4 w-1/3">       
            
            <div className="flex items-center gap-2 text-xl font-bold text-white mt-6 mb-4">
                <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
                <span>IRCHAD</span>
            </div>

            <p className="text-xl text-irchad-white font-roboto-bold text-center">Delete Sale</p>
            <p className="text-sm text-irchad-gray-light font-roboto text-center">
                Are you sure you want to delete this sale? This action cannot be undone.
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
                    className="bg-irchad-gray-light text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteSale;
