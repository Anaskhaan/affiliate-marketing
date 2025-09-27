import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { category: string; sub: string } }
) {
  try {
    const category = decodeURIComponent(params.category);
    const sub = decodeURIComponent(params.sub);

    const products = await prisma.affiliateProduct.findMany({
      where: {
        category_name: { equals: category, mode: "insensitive" },
        sub_category: { equals: sub, mode: "insensitive" },
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
