"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FiltersProps } from "@/interfaces/interface"
import { VehicleFilterValues } from "@/interfaces/interface"

// type FiltersProps = {
//   filters: Record<string, string>
//   onChange: (filters: Record<string, string>) => void
// }

export default function VehicleFilters({ filters, onChange }: FiltersProps) {
  function updateFilter<K extends keyof VehicleFilterValues>(
    key: K,
    value: string
) {
  onChange({
    ...filters,
    [key]: value === "All" ? "" : value,
  })
}

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filter Vehicles</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Category */}
        <div className="grid gap-2">
          <Label>Category</Label>
          <Select
            value={filters.categoryId}
            onValueChange={(v) => updateFilter("categoryId", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="1">Sedan / Hatchback</SelectItem>
              <SelectItem value="2">SUV / Pickup</SelectItem>
              <SelectItem value="3">Compact / Economy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div className="grid gap-2">
          <Label>Fuel Type</Label>
          <Select
            value={filters.fuel_type}
            onValueChange={(v) => updateFilter("fuel_type", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All fuel types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="PETROL">Petrol</SelectItem>
              <SelectItem value="DIESEL">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div className="grid gap-2">
          <Label>Transmission</Label>
          <Select
            value={filters.transmission}
            onValueChange={(v) => updateFilter("transmission", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="AUTOMATIC">Automatic</SelectItem>
              <SelectItem value="MANUAL">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="grid gap-2">
          <Label>Min Price</Label>
          <Input
            type="number"
            placeholder="e.g. 5000"
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Max Price</Label>
          <Input
            type="number"
            placeholder="e.g. 50000"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
          />
        </div>

        {/* Condition */}
        <div className="grid gap-2">
          <Label>Condition</Label>
          <Select
            value={filters.condition}
            onValueChange={(v) => updateFilter("condition", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="USED">Used</SelectItem>
              <SelectItem value="REFURBISHED">Refurbished</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </CardContent>
    </Card>
  )
}
