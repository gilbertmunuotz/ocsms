
import { SERVER_URI } from "@/constants/constant";
import Image from "next/image";

type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  category: {
    category_name: string;
  };
  images: {
    image_url: string;
  }[];
};

// const imageUrl = `${SERVER_URI}${vehicle.images[0].image_url}`;

async function getVehicles(): Promise<{ vehicles: Vehicle[] }> {
  const res = await fetch(
    `${SERVER_URI}/api/v1/vehicle/all`,
    {
      cache: "no-store",
    }
    
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  return res.json();
}

export default async function Page() {
  const { vehicles } = await getVehicles();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Browse Vehicles
      </h1>

      {vehicles.length === 0 && (
        <p className="text-gray-500">
          No vehicles available at the moment.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <Image
              src={
                vehicle.images?.[0]?.image_url ||
                "/cars.jpg"
              }
              alt={`${vehicle.brand} ${vehicle.model}`}
              width= {300}
              height={250}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-1">
              <h2 className="font-semibold text-lg">
                {vehicle.brand} {vehicle.model}
              </h2>

              <p className="text-sm text-gray-500">
                {vehicle.year} • {vehicle.category.category_name}
              </p>

              <p className="text-sm text-gray-500">
                {vehicle.mileage.toLocaleString()} km •{" "}
                {vehicle.fuel_type}
              </p>

              <p className="mt-2 text-red-600 font-bold">
                ${vehicle.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
