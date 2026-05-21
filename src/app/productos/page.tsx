"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

type Producto = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const cargarProductos = async () => {
      const res = await fetch("/api/productos");
      const data = await res.json();

      setProductos(data);
    };

    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.name
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "" || producto.category === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Catálogo de productos
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border p-3 rounded w-full text-black"
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border p-3 rounded text-black"
          >
            <option value="">Todas las categorías</option>

            <option value="Vestimenta">
              Vestimenta
            </option>

            <option value="Cosméticos">
              Cosméticos
            </option>

            <option value="Perfumería">
              Perfumería
            </option>

            <option value="Accesorios">
              Accesorios
            </option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="border p-4 rounded-xl shadow bg-white hover:shadow-xl transition"
            >
              <Link href={`/productos/${producto.id}`}>
                <div>
                  {producto.image && (
                    <img
                      src={producto.image}
                      alt={producto.name}
                      className="w-full h-60 object-cover rounded-lg mb-4"
                    />
                  )}

                  <h2 className="font-bold text-black text-lg">
                    {producto.name}
                  </h2>

                  <p className="text-gray-700 mt-2">
                    {producto.description}
                  </p>

                  <p className="text-pink-600 font-semibold mt-2">
                    ${producto.price} MXN
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {producto.category}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock: {producto.stock}
                  </p>
                </div>
              </Link>

              <button
                onClick={() => {
                  const user =
                    localStorage.getItem("user");

                  if (!user) {
                    alert(
                      "Debes iniciar sesión para comprar"
                    );

                    return;
                  }

                  addToCart({
                    id: producto.id,
                    name: producto.name,
                    price: producto.price,
                    image: producto.image,
                    quantity: 1,
                  });
                }}
                className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}