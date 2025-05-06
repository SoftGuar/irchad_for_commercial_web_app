import Image from "next/image";
import { useState } from "react";
import { commercialApi } from "@/services/commercialApi";

interface AddCustomerProps {
  closePopup: () => void;
  onUserAdded: () => void;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ closePopup, onUserAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    mac: '',
    note: ''
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
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('First name, last name, email, and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || 'string',
        MAC: formData.mac || 'string'
      };

      console.log(userData);

      const response = await commercialApi.users.create(userData);
      
      if (response.success) {
        closePopup();
        onUserAdded(); // Refresh the user list
      } else {
        setError('Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('An error occurred while creating the user');
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

      <p className="text-xl text-irchad-white font-roboto-bold">Add a customer</p>
      <p className="text-sm text-irchad-gray-light font-roboto">Insert Informations below</p>

      {error && (
        <div className="text-red-500 text-sm w-full text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">First Name</p>
        <input
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          className="focus:outline-none bg-irchad-gray rounded-lg p-2 text-[16px] text-irchad-white font-roboto"
          required
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Last Name</p>
        <input
          name="lastName"
          type="text"
          value={formData.lastName}
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
        <p className="text-[16px] text-irchad-gray-light font-roboto">Password</p>
        <input
          name="password"
          type="password"
          value={formData.password}
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

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">MAC</p>
        <input
          name="mac"
          type="text"
          value={formData.mac}
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
          {loading ? 'Adding...' : 'Add'}
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

export default AddCustomer;