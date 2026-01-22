import Navbar from '@/components/navbar';
import getVehicles from './_action';
import VehicleCard from '@/components/ui/vehicle-card'
import { Vehicle } from '@/interfaces/interface';

export default async function Home() {

  const { vehicles }: { vehicles: Vehicle[] } = await getVehicles();

  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-6">
          Available Vehicles
        </h1>

        {vehicles.length === 0 ? (
          <p className="text-muted-foreground">
            No vehicles available at the moment.
          </p>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
