import Image from "next/image";
import { Sale } from "@/types/sale";

interface EditSaleProps {
    closePopup: () => void;
    sale: Sale;
}

const EditSale: React.FC<EditSaleProps> = ({ closePopup, sale }) => {
    const handleSubmit = () => {
        closePopup();
    };

    return (
        <div className="flex flex-col items-center relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/3">       

            <div className="flex items-center gap-2 text-xl font-bold text-white mt-6 mb-8">
                <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
                <span>IRCHAD</span>
            </div>

            <p className="text-xl text-irchad-white font-roboto-bold">Edit Sale</p>
            <p className="text-sm text-irchad-gray-light font-roboto">Modify sale details below</p>

            <div className="flex flex-col space-y-2 w-full">
                <p className="text-[16px] text-irchad-gray-light font-roboto">User name</p>
                <input
                    type="text"
                    defaultValue={sale.userName}
                    className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
                />
            </div>

            <div className="flex flex-col space-y-2 w-full">
                <p className="text-[16px] text-irchad-gray-light font-roboto">Commercial Name</p>
                <input
                    type="text"
                    defaultValue={sale.commercialName}
                    className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
                />
            </div>

            <div className="flex flex-col space-y-2 w-full">
                <p className="text-[16px] text-irchad-gray-light font-roboto">Status</p>
                <input
                    type="text"
                    defaultValue={String(sale.Status)}
                    className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
                />
            </div>

            <div className="flex flex-col space-y-2 w-full">
                <p className="text-[16px] text-irchad-gray-light font-roboto">Dispositif Number</p>
                <input
                    type="text"
                    defaultValue={sale.dispositiveId}
                    className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
                />
            </div>

            <div className="flex flex-col w-2/3 pt-4">
                <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none">
                    Save
                </button>

                <button onClick={closePopup} className="bg-irchad-gray-light text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditSale;
