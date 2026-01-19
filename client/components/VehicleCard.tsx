import Image from 'next/image';

export function VehicleCard({ vehicle }: { vehicle: any }) {
  return (
    <div className="bg-[#1F1F1F] rounded-xl overflow-hidden shadow hover:shadow-xl transition">
      <Image
        src={vehicle.image}
        alt={vehicle.name}
        width={400}
        height={192}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {vehicle.name}
        </h3>

        <p className="text-gray-400 text-sm">
          {vehicle.brand} • {vehicle.year}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-[#F9C80E] font-bold">
            ${vehicle.price}
          </span>

          <button className="bg-[#DA291C] px-4 py-1 rounded-md text-sm hover:bg-red-700">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
