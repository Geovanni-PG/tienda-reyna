import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(
  req: Request,
  context: { params: Params }
) {
  const { id } = await context.params;

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}

export async function PUT(
  req: Request,
  context: { params: Params }
) {
  const { id } = await context.params;
  const body = await req.json();

  const productoActualizado = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image,
      stock: Number(body.stock),
    },
  });

  return NextResponse.json(productoActualizado);
}