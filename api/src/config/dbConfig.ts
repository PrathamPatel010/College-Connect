import { PrismaClient } from "@prisma/client";

const prismaService = new PrismaClient({
    log: ["query"],
});

export default prismaService;