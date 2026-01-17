import EnvVars from "../constants/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";

const adapter = new PrismaPg({
    connectionString: EnvVars.DatabaseUrl,
});

const prisma = new PrismaClient({
    adapter,
});

export default prisma;