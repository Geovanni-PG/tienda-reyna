import Navbar from "@/components/Navbar";

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Todos los productos
        </h1>

        <p className="text-black mb-4">
          Aquí se mostrará todo el catálogo de Tienda Reyna.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-4 rounded-xl shadow">
            <h2 className="font-bold text-black">Playera manga larga</h2>
            <p className="text-pink-600">$180 MXN</p>
          </div>

          <div className="border p-4 rounded-xl shadow">
            <h2 className="font-bold text-black">Desodorante</h2>
            <p className="text-pink-600">$95 MXN</p>
          </div>

          <div className="border p-4 rounded-xl shadow">
            <h2 className="font-bold text-black">Crema facial</h2>
            <p className="text-pink-600">$220 MXN</p>
          </div>
        </div>
      </section>
    </main>
  );
}