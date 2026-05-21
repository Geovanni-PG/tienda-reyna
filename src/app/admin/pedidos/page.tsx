import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export default async function PedidosPage() {
  const pedidos = await prisma.order.findMany({
    include: {
      items: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Pedidos
        </h1>

        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="border rounded-xl p-6"
            >
              <h2 className="font-bold text-black">
                Pedido: {pedido.id}
              </h2>

              <p className="text-black">
                Cliente: {pedido.userEmail}
              </p>

              <p className="text-black">
                Total: ${pedido.total}
              </p>

              <p className="text-gray-500">
                {new Date(
                  pedido.createdAt
                ).toLocaleString()}
              </p>

              <div className="mt-4 space-y-2">
                {pedido.items.map((item) => (
                  <div
                    key={item.id}
                    className="border p-3 rounded"
                  >
                    <p className="text-black">
                      {item.name}
                    </p>

                    <p className="text-gray-600">
                      Cantidad: {item.quantity}
                    </p>

                    <p className="text-pink-600">
                      ${item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}