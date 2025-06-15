'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import VendorCard from '@/components/VendorCard';
import { Vendor } from '@/types/vendor';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

async function getVendors(page = 1): Promise<Vendor[]> {
  const res = await api.get(`/vendors?page=${page}&limit=5`);
  return res.data.vendors;
}

export default function Home() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [page, setPage] = useState(1);
  const { status } = useSession();

  const fetchVendors = async () => {
    const data = await getVendors(page);
    setVendors(data);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchVendors();
    }
  }, [page, status]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/vendors/${id}`);
      fetchVendors();
    } catch (err) {
      console.error('Failed to delete vendor:', err);
    }
  };

  if (status === 'loading') return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
      <p className="text-xl animate-pulse">Loading...</p>
    </main>
  );

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-gray-800 px-6">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome to Vendor Management</h1>
        <p className="text-lg mb-6 text-center max-w-md">Manage vendor records securely and easily with your Google account.</p>
        <button
          onClick={() => signIn('google')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-6">
      <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 mb-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
        <div className="space-x-4 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <Link href="/new" className="text-blue-600 hover:underline">Create Vendor</Link>
          <button
            onClick={() => signOut()}
            className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto space-y-4">
        {vendors.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No vendors found.</p>
        ) : (
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor._id} vendor={vendor} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          ← Previous
        </button>
        <span className="text-gray-600 font-medium">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
