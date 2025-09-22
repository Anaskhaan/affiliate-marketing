import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const prisma = new PrismaClient();

function generateSlug(title: string | null | undefined) {
  if (!title) {
    return "untitled-" + Math.random().toString(36).substring(2, 8);
  }
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main() {
  const blogs: any[] = [];
  const filePath = path.join(process.cwd(), "blog.csv"); // root folder

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => blogs.push(row))
      .on("end", () => {
        console.log("✅ CSV file successfully processed.");
        resolve();
      })
      .on("error", (err) => reject(err));
  });

  try {
    for (const blog of blogs) {
      await prisma.blog.create({
        data: {
          title: blog.title || "Untitled Blog",
          slug: blog.slug || generateSlug(blog.title),
          excerpt: blog.excerpt || null,
          content: blog.content || "",
          author: blog.author || "Anonymous",
          coverImage: blog.image_url || null,
          category: blog.category || null,
          tags: blog.tags
            ? blog.tags.split(",").map((t: string) => t.trim())
            : [],
          createdAt: blog.created_at ? new Date(blog.created_at) : undefined,
          updatedAt: blog.updated_at ? new Date(blog.updated_at) : undefined,
          isPublished: blog.is_published === "true" || false,
        },
      });
    }
    console.log("✅ Blogs seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding blogs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
