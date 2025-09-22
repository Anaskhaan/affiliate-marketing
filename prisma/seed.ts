import { PrismaClient } from '../app/generated/prisma'; // adjust path if needed
const db = new PrismaClient();

async function main() {
  // Create one user
  const user = await db.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });
  console.log("Created user:", user);

  // Or multiple users
  await db.user.createMany({
    data: [
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
