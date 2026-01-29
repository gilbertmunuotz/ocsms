"use client"

import { useEffect, useMemo, useState } from "react"
import { SERVER_URI } from "@/constants/constant"
import VehicleCard from "@/components/ui/vehicle-card"
import VehicleFilters from "@/components/vehicle-filters"
import { Vehicle } from "@/interfaces/interface"

const DEFAULT_FILTERS = {
  categoryId: "",
  fuel_type: "",
  transmission: "",
  condition: "",
  minPrice: "",
  maxPrice: "",
}

export default function Page() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true)
        const res = await fetch(`${SERVER_URI}/api/v1/vehicle/all`)
        const data = await res.json()
        setVehicles(data.vehicles)
      } catch (error) {
        console.error("Failed to fetch vehicles", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles]

    if (filters.categoryId) {
      result = result.filter(
        v => String(v.category?.id) === filters.categoryId
      )
    }

    if (filters.fuel_type) {
      result = result.filter(
        v => v.fuel_type === filters.fuel_type
      )
    }

    if (filters.transmission) {
      result = result.filter(
        v => v.transmission === filters.transmission
      )
    }

    if (filters.condition) {
      result = result.filter(
        v => v.condition === filters.condition
      )
    }

    if (filters.minPrice) {
      result = result.filter(
        v => v.price >= Number(filters.minPrice)
      )
    }

    if (filters.maxPrice) {
      result = result.filter(
        v => v.price <= Number(filters.maxPrice)
      )
    }

    return result
  }, [vehicles, filters])

  return (
    <div className="w-full max-w-7xl">
      <h1 className="text-2xl font-semibold mb-6">
        Browse Vehicles
      </h1>

      <VehicleFilters
        filters={filters}
        onChange={setFilters}
      />

      {loading && (
        <p className="text-muted-foreground mt-4">
          Loading vehicles...
        </p>
      )}

      {!loading && filteredVehicles.length === 0 && (
        <p className="text-muted-foreground mt-4">
          No vehicles found.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredVehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
          />
        ))}
      </div>
    </div>
  )
}