import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("hola")
  const productos = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(productos);
}

export async function POST(req: Request) {
  const body = await req.json();

  const producto = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image || "",
      stock: Number(body.stock),
    },
  });

  return NextResponse.json(producto);
}
