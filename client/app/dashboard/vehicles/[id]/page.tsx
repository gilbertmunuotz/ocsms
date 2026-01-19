import { VehicleRepository } from "@/lib/repositories/vehicle.repository";
import InquiryForm from "./InquiryForm";


type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VehicleDetailPage({
  params,
}: PageProps) {
  const { id } = await params; 

  const vehicle = VehicleRepository.findById(id);

  if (!vehicle) {
    return <p>Vehicle not found</p>;
  }

  return (
    <>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold">{vehicle.title}</h1>
        <p className="text-gray-500">{vehicle.location}</p>

        <p className="text-xl font-bold text-green-600 mt-2">
          TZS {vehicle.price.toLocaleString()}
        </p>

        <div className="mt-4 space-y-1">
          <p>Brand: {vehicle.brand}</p>
          <p>Model: {vehicle.model}</p>
          <p>Year: {vehicle.year}</p>
          <p>Mileage: {vehicle.mileage} km</p>
          <p>Fuel: {vehicle.fuelType}</p>
          <p>Transmission: {vehicle.transmission}</p>
        </div>

        <button className="mt-6 bg-black text-white px-4 py-2">
          Send Inquiry
        </button>
      </div>
      <InquiryForm vehicleId={id} />
    </>
  );
 

}
