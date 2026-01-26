import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-light mb-6 tracking-wide">
        Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Vehicles" value="128" />
        <StatCard title="Active Users" value="54" />
        <StatCard title="Pending Inquiries" value="12" />
        <StatCard title="Dealers" value="8" />
      </div>
    </div>
  );
}
