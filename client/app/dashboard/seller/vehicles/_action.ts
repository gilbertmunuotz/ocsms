/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { SERVER_URI } from "@/constants/constant"
import axios from "axios"
import { Vehicle } from "@/interfaces/interface";
import { auth } from "@/auth";

export async function getVehicles(): Promise<{ vehicles: Vehicle[] }> {
    try {
        const response = await axios.get(`${SERVER_URI}/api/v1/vehicle/all`);

        return response.data; // return the balance data

    } catch (error: any) {
        console.error("Failed to fetch vehicles:", error.message);
        throw new Error("Could not fetch vehicles");
    }
}

export async function createVehicle(formData: FormData) {

    const session = await auth();
    try {
        const response = await axios.post(
            `${SERVER_URI}/api/v1/vehicle/new`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `token ${session?.user.token}`
                }
            }
        )

        return response.data
    } catch (error: any) {
        console.error("Failed to create vehicle:", error.message)
        throw new Error("Could not create vehicle")
    }
}