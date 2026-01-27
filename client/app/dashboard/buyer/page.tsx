
import { SERVER_URI } from "@/constants/constant";
import Image from "next/image";
import VehicleCard from "@/components/ui/vehicle-card";
import { Vehicle } from "@/interfaces/interface";

// type Vehicle = {
//   id: number;
//   brand: string;
//   model: string;
//   year: number;
//   price: number;
//   mileage: number;
//   fuel_type: string;
//   transmission: string;
//   category: {
//     category_name: string;
//   };
//   images: {
//     image_url: string;
//   }[];
// };

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
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
          />
        ))}
      </div>
    </div>
  );
}
