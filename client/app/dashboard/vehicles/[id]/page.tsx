import { VehicleRepository } from "@/lib/repositories/vehicle.repository";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const vehicle = VehicleRepository.findById(id);

  if (!vehicle) return <p>Vehicle not found</p>;

  return <div>{vehicle.title}</div>;
}
