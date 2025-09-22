import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "../app/generated/prisma"; // adjust path if needed

const db = new PrismaClient();

async function main() {
  const users: { name: string; email: string }[] = [];

  // Read the CSV
  fs.createReadStream("users.csv")
    .pipe(csv())
    .on("data", (row) => {
      users.push({ name: row.name, email: row.email });
    })
    .on("end", async () => {
      console.log("CSV file processed:", users);

      // Insert all users into the database
      await db.user.createMany({ data: users, skipDuplicates: true });

      console.log("Users imported into database!");
      await db.$disconnect();
    });
}

main();
