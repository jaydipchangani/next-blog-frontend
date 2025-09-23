import ProtectedRoute from "@/components/ProtectedRoute";
export default function AdminPage() {
  return (
    <ProtectedRoute>
    
    <div className="p-8 md:pl-70 pt-24">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin panel. Here you can manage your blog.</p>
    </div>
    </ProtectedRoute>
    
  );
}