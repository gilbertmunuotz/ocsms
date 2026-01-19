import { VehicleRepository } from "@/lib/repositories/vehicle.repository";

export default function VehiclesPage() {
  const vehicles = VehicleRepository.findAll();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Available Vehicles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="border p-4 rounded">
            <h3 className="font-semibold">{v.title}</h3>
            <p>{v.location}</p>
            <p className="font-bold text-green-600">
              TZS {v.price.toLocaleString()}
            </p>
            <a
              href={`/dashboard/vehicles/${v.id}`}
              className="text-sm underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
