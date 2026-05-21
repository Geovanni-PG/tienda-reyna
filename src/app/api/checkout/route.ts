import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  for (const item of body.items) {
    const producto = await prisma.product.findUnique({
      where: {
        id: item.id,
      },
    });

    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    if (producto.stock < item.quantity) {
      return NextResponse.json(
        {
          error: `Stock insuficiente para ${producto.name}`,
        },
        { status: 400 }
      );
    }
  }

  const order = await prisma.order.create({
    data: {
      userEmail: body.userEmail,
      total: body.total,

      items: {
        create: body.items.map((item: any) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },

    include: {
      items: true,
    },
  });

  for (const item of body.items) {
    await prisma.product.update({
      where: {
        id: item.id,
      },

      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  return NextResponse.json(order);
}