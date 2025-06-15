'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export type Vendor = {
  _id?: string;
  vendorName: string;
  bankAccountNumber: string;
  bankName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  zipCode: string;
};

export default function VendorForm({ initialData }: { initialData?: Vendor }) {
  const router = useRouter();

  const [formData, setFormData] = useState<Vendor>({
    vendorName: '',
    bankAccountNumber: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData && initialData._id) {
        await api.put(`/vendors/${initialData._id}`, formData);
      } else {
        await api.post('/vendors', formData);
      }
      router.push('/');
    } catch (err) {
      console.error('Error saving vendor:', err);
      alert('Error saving vendor');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {initialData ? 'Update Vendor' : 'Create New Vendor'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            'vendorName',
            'bankAccountNumber',
            'bankName',
            'addressLine1',
            'addressLine2',
            'city',
            'country',
            'zipCode',
          ].map((field) => (
            <div key={field}>
    <label
      htmlFor={field}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {field.replace(/([A-Z])/g, ' $1')}
    </label>
   <input
  id={field}
  name={field}
  required={['vendorName', 'bankAccountNumber', 'bankName', 'addressLine2'].includes(field)}
  value={formData[field as keyof Vendor] || ''}
  onChange={handleChange}
  placeholder={field.replace(/([A-Z])/g, ' $1')}
  className="w-full p-3 border border-gray-300 rounded-lg !text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


  </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              {initialData ? 'Update Vendor' : 'Create Vendor'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
