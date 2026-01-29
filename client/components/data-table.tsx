"use client"

import * as React from "react"
import { ColumnDef, ColumnFiltersState, getFilteredRowModel, flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { createVehicle } from "@/app/dashboard/seller/vehicles/_action"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const categories = [
    { id: 1, category_name: "suv" },
    { id: 2, category_name: "Truck" },
]
const CONDITIONS = ["NEW", "USED", "REFURBISHED"] as const
const STATUSES = ["AVAILABLE", "SOLD", "PENDING"] as const


export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

    const router = useRouter();
    const [open, setOpen] = React.useState(false)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(), onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(), onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(), state: { sorting, columnFilters },
    })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)

        try {
            await createVehicle(formData)
            setOpen(false)
            form.reset()
            router.refresh();
            toast.success("Vehicle created successfully")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>

            {/* Toolbar */}
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter Categories..."
                    value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("category")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <Button onClick={() => setOpen(true)} className="cursor-pointer">
                    New <Plus className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Vehicle</DialogTitle>
                    </DialogHeader>

                    <form className="grid gap-4" onSubmit={handleSubmit}>

                        {/* Brand + Model */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Brand</Label>
                                <Input name="brand" placeholder="Brand" required />
                            </div>

                            <div className="grid gap-2">
                                <Label>Model</Label>
                                <Input name="model" placeholder="Model" required />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <select
                                name="categoryId"
                                required
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year + Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Year</Label>
                                <Input name="year" type="number" placeholder="2024" required />
                            </div>

                            <div className="grid gap-2">
                                <Label>Price</Label>
                                <Input name="price" type="number" placeholder="12000" required />
                            </div>
                        </div>

                        {/* Mileage + Fuel */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Mileage</Label>
                                <Input name="mileage" type="number" placeholder="0" required />
                            </div>

                            <div className="grid gap-2">
                                <Label>Fuel Type</Label>
                                <Input name="fuel_type" placeholder="Petrol" required />
                            </div>
                        </div>

                        {/* Transmission + Condition */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Transmission</Label>
                                <Input name="transmission" placeholder="Automatic" required />
                            </div>

                            <div className="grid gap-2">
                                <Label>Condition</Label>
                                <select
                                    name="condition"
                                    required
                                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                                >
                                    <option value="">Select condition</option>
                                    {CONDITIONS.map((c) => (
                                        <option key={c} value={c}>
                                            {c.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <select
                                name="status"
                                required
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">Select status</option>
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                        {s.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Input name="description" placeholder="Description" required />
                        </div>

                        {/* Images */}
                        <div className="grid gap-2">
                            <Label>Images</Label>
                            <Input name="image" type="file" />
                        </div>

                        <DialogFooter>
                            <Button type="submit" className="cursor-pointer">Save Vehicle</Button>
                        </DialogFooter>

                    </form>

                </DialogContent>
            </Dialog>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}