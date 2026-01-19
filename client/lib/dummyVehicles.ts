import { VehicleEntity } from "@/types/vehicle";

export const vehicles: VehicleEntity[] = [
  {
    id: "1",
    title: "Toyota Corolla 2018",
    brand: "Toyota",
    model: "Corolla",
    year: 2018,
    price: 18000000,
    location: "Dar es Salaam",
    mileage: 60000,
    fuelType: "Petrol",
    transmission: "Automatic",
    sellerId: "seller-1",
  },
  {
    id: "2",
    title: "Nissan X-Trail 2020",
    brand: "Nissan",
    model: "X-Trail",
    year: 2020,
    price: 32000000,
    location: "Arusha",
    mileage: 42000,
    fuelType: "Petrol",
    transmission: "Automatic",
    sellerId: "seller-2",
  },
];
