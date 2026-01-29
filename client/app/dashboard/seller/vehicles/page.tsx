import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { Vehicle, VehicleRow } from "@/interfaces/interface"
import {getVehicles} from "./_action";

export default async function Page() {

  const { vehicles }: { vehicles: Vehicle[] } = await getVehicles()

  const tableData: VehicleRow[] = vehicles.map((vehicle) => ({
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    condition: vehicle.condition,
    status: vehicle.status,
    category: vehicle.category.category_name,
    seller: vehicle.seller.business_name,
    datePosted: new Date(vehicle.date_posted).toLocaleDateString(),
  }))

  return (
    <div className="mx-auto py-6">
      <DataTable<VehicleRow, unknown> columns={columns} data={tableData} />
    </div>
  )
}
