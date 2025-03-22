import Image from "next/image";


interface AddCustomerProps {
    closePopup: () => void;
}
  
const AddCustomer: React.FC<AddCustomerProps> = ({ closePopup }) => {
    const handleSubmit = () => {
      closePopup();
    };
  
    return (
      <div className="flex flex-col items-center relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/3">       
        
        <div className="flex items-center gap-2 text-xl font-bold text-white mt-6 mb-8">
            <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
            <span>IRCHAD</span>
        </div>

        <p className="text-xl text-irchad-white font-roboto-bold">Add a customer</p>
        <p className="text-sm text-irchad-gray-light font-roboto">Insert Informations below</p>


        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Name</p>
            <input
                type="text"
                className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Email</p>
            <input
                type="text"
                className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Phone</p>
            <input
                type="text"
                className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Note</p>
            <input
                type="text"
                className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
            />
        </div>



        <div className="flex flex-col w-2/3 pt-4">
          <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none">
            Add
          </button>

          <button onClick={closePopup} className="bg-irchad-gray-light text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none">
            Cancel
          </button>
        </div>
      </div>
    );
};
  
export default AddCustomer;