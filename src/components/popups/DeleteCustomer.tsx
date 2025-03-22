import Image from "next/image";

interface DeleteCustomerProps {
    closePopup: () => void;
}

const DeleteCustomer: React.FC<DeleteCustomerProps> = ({ closePopup }) => {
    return (
        <div className="flex flex-col items-center relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-4 w-1/3">       
            
            <div className="flex items-center gap-2 text-xl font-bold text-white mt-6 mb-4">
                <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
                <span>IRCHAD</span>
            </div>

            <p className="text-xl text-irchad-white font-roboto-bold text-center">Delete Customer</p>
            <p className="text-sm text-irchad-gray-light font-roboto text-center">
                Are you sure you want to delete this customer? This action cannot be undone.
            </p>

            <div className="flex flex-col w-2/3 pt-4">
                <button 
                    
                    className="bg-red-600 hover:bg-red-700 text-irchad-white w-full px-4 py-2 mt-3 rounded-lg outline-none"
                >
                    Delete
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

export default DeleteCustomer;
