"use client"

import { ColumnDef } from "@tanstack/react-table"
import { VehicleRow } from "@/interfaces/interface";
import { ArrowUpDown } from "lucide-react"
import { Button } from "./ui/button";


export const columns: ColumnDef<VehicleRow>[] = [
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "model",
        header: "Model",
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "seller",
        header: "Seller",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price.toLocaleString()}`,
    },
    {
        accessorKey: "condition",
        header: "Condition",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "datePosted",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Date Posted
                <ArrowUpDown className="" />
            </Button>
        ),
    },
]