import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-40 h-40 object-contain mb-6"
        />

        <h1 className="text-6xl font-bold text-pink-600">
          Tienda Reyna
        </h1>

        <p className="text-black text-xl mt-6 max-w-2xl">
          Ropa, cosméticos, perfumería y accesorios
          para hombre y mujer.
        </p>

        <div className="flex gap-4 mt-10">
  
          <Link
            href="/login"
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl text-lg"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/registro"
            className="border border-pink-500 text-pink-500 hover:bg-pink-100 px-8 py-4 rounded-xl text-lg"
          >
            Registrarse
          </Link>

          <Link
            href="/productos"
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      <section className="bg-pink-50 py-20 px-8">
        <h2 className="text-4xl font-bold text-center text-black mb-12">
          Categorías principales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h3 className="text-2xl font-bold text-pink-600">
              Vestimenta
            </h3>

            <p className="text-black mt-4">
              Playeras y calcetines.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h3 className="text-2xl font-bold text-pink-600">
              Cosméticos
            </h3>

            <p className="text-black mt-4">
              Cremas, labiales y cuidado personal.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h3 className="text-2xl font-bold text-pink-600">
              Perfumería
            </h3>

            <p className="text-black mt-4">
              Perfumes y lociones.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h3 className="text-2xl font-bold text-pink-600">
              Accesorios
            </h3>

            <p className="text-black mt-4">
              Hola Gera y accesorios varios.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h3 className="text-2xl font-bold text-pink-600">
              Accesorios
            </h3>

            <p className="text-black mt-4">
              Productos y accesorios varios.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}