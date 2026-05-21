import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export default async function ProductoDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const producto = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!producto) {
    return (
      <main className="p-8">
        <h1 className="text-black">
          Producto no encontrado
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          {producto.image && (
            <img
              src={producto.image}
              alt={producto.name}
              className="w-full rounded-2xl shadow"
            />
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold text-black">
            {producto.name}
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            {producto.description}
          </p>

          <p className="text-pink-600 text-3xl font-bold mt-6">
            ${producto.price}
          </p>

          <p className="text-black mt-4">
            Stock disponible: {producto.stock}
          </p>

          <button className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl">
            Agregar al carrito
          </button>
        </div>
      </section>
    </main>
  );
}