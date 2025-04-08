import Image from "next/image";
import { useState } from "react";
import { commercialApi } from "@/services/commercialApi";
import { Account } from "@/types/account";

interface EditCustomerProps {
  closePopup: () => void;
  user: Account;
  onUserUpdated: () => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ closePopup, user, onUserUpdated }) => {
  const [firstName, lastName] = user.name.split(' ');
  
  const [formData, setFormData] = useState({
    first_name: firstName || '',
    last_name: lastName || '',
    email: user.email || '',
    phone: user.phone || '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setError('First name, last name, and email are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const changes: Record<string, string> = {};
      if (formData.first_name !== firstName) changes.first_name = formData.first_name;
      if (formData.last_name !== lastName) changes.last_name = formData.last_name;
      if (formData.email !== user.email) changes.email = formData.email;
      if (formData.phone !== user.phone) changes.phone = formData.phone;

      if (Object.keys(changes).length > 0) {
        const response = await commercialApi.users.update(user.id, changes);
        
        if (!response.success) {
          throw new Error('Failed to update user');
        }
      }

      closePopup();
      onUserUpdated(); 
    } catch (err) {
      console.error('Error updating user:', err);
      setError('An error occurred while updating the user');
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

      <p className="text-xl text-irchad-white font-roboto-bold">Edit Customer</p>
      <p className="text-sm text-irchad-gray-light font-roboto">Modify customer details below</p>

      {error && (
        <div className="text-red-500 text-sm w-full text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">First Name</p>
        <input
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
          required
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Last Name</p>
        <input
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
          required
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Email</p>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
          required
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Phone</p>
        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
        />
      </div>

      <div className="flex flex-col w-2/3 pt-4">
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-2 mt-3 rounded-lg outline-none disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
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

export default EditCustomer;