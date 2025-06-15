'use client';
import Link from 'next/link';
import api from '@/lib/api';

interface Vendor {
  _id: string;
  vendorName: string;
  bankAccountNumber: string;
  bankName: string;
}

export default function VendorCard({ vendor, onDelete }: { vendor: Vendor; onDelete: (id: string) => void }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      await api.delete(`/vendors/${vendor._id}`);
      onDelete(vendor._id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-4 transition hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-800">{vendor.vendorName}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Bank Acc No:</span> {vendor.bankAccountNumber}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Bank Name:</span> {vendor.bankName}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link
            href={`/edit/${vendor._id}`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:text-white border border-red-600 hover:bg-red-600 px-3 py-1 rounded transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
