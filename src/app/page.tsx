import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="p-8">
        <h2 className="text-2xl font-bold text-black mb-6">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border rounded-xl p-4 shadow bg-white">
            <h3 className="font-bold text-black">Playera manga corta</h3>
            <p className="text-pink-600">$150 MXN</p>
          </div>

          <div className="border rounded-xl p-4 shadow bg-white">
            <h3 className="font-bold text-black">Calcetas largas</h3>
            <p className="text-pink-600">$80 MXN</p>
          </div>

          <div className="border rounded-xl p-4 shadow bg-white">
            <h3 className="font-bold text-black">Perfume floral</h3>
            <p className="text-pink-600">$350 MXN</p>
          </div>

          <div className="border rounded-xl p-4 shadow bg-white">
            <h3 className="font-bold text-black">Labial rosa</h3>
            <p className="text-pink-600">$120 MXN</p>
          </div>
        </div>
      </section>
    </main>
  );
}