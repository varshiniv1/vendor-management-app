import VendorForm from '@/components/VendorForm';
import api from '@/lib/api';

export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const res = await api.get(`/vendors/${params.id}`);
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8 transition hover:shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Vendor</h1>
        <VendorForm initialData={res.data} />
      </div>
    </main>
  );
}
