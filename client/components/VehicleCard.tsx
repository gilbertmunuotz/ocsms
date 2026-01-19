import Link from "next/link";
import { Vehicle } from "@/types/vehicle";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/dashboard/vehicles/${vehicle.id}`}>
      <div className="border rounded p-4 hover:shadow cursor-pointer">
        <div className="h-40 bg-gray-200 mb-2" />
        <h3 className="font-semibold">{vehicle.title}</h3>
        <p className="text-sm">{vehicle.location}</p>
        <p className="font-bold text-green-600">
          TZS {vehicle.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
