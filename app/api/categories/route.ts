import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get distinct category names from the table
    const categories = await prisma.affiliateProduct.findMany({
      select: { category_name: true },
      distinct: ["category_name"],
    });

    const categoryList = categories
      .map((c) => c.category_name)
      .filter((c): c is string => !!c); // remove nulls

    return NextResponse.json(categoryList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
