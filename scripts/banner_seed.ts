import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { prisma } from "@/lib/prisma";

async function main() {
  const banners: any[] = [];
  const csvFilePath = path.join(process.cwd(), "banner.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      banners.push(row);
    })
    .on("end", async () => {
      console.log("CSV file successfully processed.");

      try {
        for (const banner of banners) {
          await prisma.banner.create({
            data: {
              title: banner.title ?? null,
              imageUrl: banner.imageUrl ?? null,
              category: banner.category ?? null,
              link: banner.link ?? null,
              isFeatured: banner.isFeatured === "true" ? true : false,
              startDate: banner.startDate ? new Date(banner.startDate) : null,
              endDate: banner.endDate ? new Date(banner.endDate) : null,
            },
          });
        }
        console.log("All banners seeded successfully!");
      } catch (error) {
        console.error("Error seeding banners:", error);
      }
    });
}

main();
