/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { SERVER_URI } from "@/constants/constant"
import axios from "axios"
import { Vehicle } from "@/interfaces/interface";

export default async function getVehicles(): Promise<{ vehicles: Vehicle[] }> {
    try {
        const response = await axios.get(`${SERVER_URI}/api/v1/vehicle/all`);

        return response.data; // return the balance data

    } catch (error: any) {
        console.error("Failed to fetch vehicles:", error.message);
        throw new Error("Could not fetch vehicles");
    }
}
