import { PrismaClient } from "../app/generated/prisma";
const db = new PrismaClient();

async function main() {
  // Grab the first AffiliateProduct
  const product = await db.affiliateProduct.findFirst();
  console.log("First product:", product);

  // Or grab multiple
  const products = await db.affiliateProduct.findMany({
    take: 5, // limit to 5 rows
  });
  console.log("Some products:", products);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
