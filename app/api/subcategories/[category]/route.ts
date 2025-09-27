import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  try {
    const category = decodeURIComponent(params.category);

    // Get distinct subcategories for this category
    const subcategories = await prisma.affiliateProduct.findMany({
      where: {
        category_name: { equals: category, mode: "insensitive" },
      },
      select: {
        sub_category: true,
      },
      distinct: ["sub_category"],
    });

    // Filter out null or empty subcategories
    const filtered = subcategories
      .map((s) => s.sub_category)
      .filter((s): s is string => !!s);

    return NextResponse.json(filtered);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
