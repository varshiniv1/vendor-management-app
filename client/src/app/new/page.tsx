import VendorForm from '@/components/VendorForm';

export default function NewVendorPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Create Vendor</h1>
      <VendorForm />
    </div>
  );
}