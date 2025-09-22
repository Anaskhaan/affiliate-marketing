import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "../app/generated/prisma";
const db = new PrismaClient();

async function run() {
  const rows: any[] = [];

  fs.createReadStream("affiliate_products.csv")
    .pipe(csv())
    .on("data", (r) => {
      // pass decimals as strings; leave empties as null
      rows.push({
        aw_deep_link:        empty(r.aw_deep_link),
        product_name:        empty(r.product_name),
        aw_product_id:       empty(r.aw_product_id),
        merchant_product_id: empty(r.merchant_product_id),
        merchant_image_url:  empty(r.merchant_image_url),
        description:         empty(r.description),
        merchant_category:   empty(r.merchant_category),

        search_price:  numOrNull(r.search_price),
        store_price:   numOrNull(r.store_price),
        delivery_cost: numOrNull(r.delivery_cost),

        merchant_name:       empty(r.merchant_name),
        merchant_id:         empty(r.merchant_id),
        category_name:       empty(r.category_name),
        category_id:         empty(r.category_id),
        aw_image_url:        empty(r.aw_image_url),
        currency:            empty(r.currency),
        merchant_deep_link:  empty(r.merchant_deep_link),

        last_updated:  empty(r.last_updated),
        display_price: empty(r.display_price),
        data_feed_id:  empty(r.data_feed_id),
      });
    })
    .on("end", async () => {
      // Insert in batches to avoid oversized payloads
      const BATCH = 1000;
      for (let i = 0; i < rows.length; i += BATCH) {
        const chunk = rows.slice(i, i + BATCH);
        await db.affiliateProduct.createMany({
          data: chunk,
          skipDuplicates: true, // safe if you later add a unique constraint
        });
        console.log(`Inserted ${Math.min(i + BATCH, rows.length)} / ${rows.length}`);
      }
      await db.$disconnect();
      console.log("Import complete.");
    });
}

function empty(v: any) {
  return v === undefined || v === null || String(v).trim() === "" ? null : String(v);
}
function numOrNull(v: any) {
  const s = String(v ?? "").trim();
  if (s === "") return null;

  // Remove currency symbols and non-numeric characters (except . and -)
  const cleaned = s.replace(/[^0-9.-]/g, "");
  return cleaned === "" ? null : cleaned;
}
run().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
