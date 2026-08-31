import { PrismaClient} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" 
  ? ["query", "error", "warn"] 
  : ["error"],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via prisma");
        
    } catch (error) {
         console.log(`DB connnection error: ${error.message}`);
         process.exit(1);
    }
}
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

const disconnectDB = async () => {
    await prisma.$disconnect();
}

export {prisma, connectDB, disconnectDB};