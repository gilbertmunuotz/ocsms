import { vehicles } from "@/lib/dummyVehicles";

export default function VehicleDetail({
  params,
}: {
  params: { id: string };
}) {
  const vehicle = vehicles.find((v) => v.id === params.id);

  if (!vehicle) return <p className="p-6">Vehicle not found</p>;

  return (
    <div className="p-6 max-w-3xl">
      <div className="h-64 bg-gray-200 mb-4" />
      <h1 className="text-2xl font-semibold">{vehicle.title}</h1>
      <p className="text-gray-600">{vehicle.location}</p>

      <p className="text-xl font-bold text-green-600 mt-2">
        TZS {vehicle.price.toLocaleString()}
      </p>

      <div className="mt-4 space-y-1">
        <p>Brand: {vehicle.brand}</p>
        <p>Year: {vehicle.year}</p>
        <p>Mileage: {vehicle.mileage} km</p>
        <p>Fuel: {vehicle.fuelType}</p>
        <p>Transmission: {vehicle.transmission}</p>
      </div>

      <button className="mt-6 bg-black text-white px-4 py-2">
        Send Inquiry
      </button>
    </div>
  );
}
