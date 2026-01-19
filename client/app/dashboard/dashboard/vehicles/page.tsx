import { vehicles } from "@/lib/dummyVehicles";
import VehicleCard from "@/components/VehicleCard";

export default function VehiclesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Vehicles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </div>
  );
}
