"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

type Producto = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

export default function AdminPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const cargarProductos = async () => {
    const res = await fetch("/api/productos");
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

 const guardarProducto = async (e: React.FormEvent) => {
  e.preventDefault();

  const metodo = editandoId ? "PUT" : "POST";
  const url = editandoId
    ? `/api/productos/${editandoId}`
    : "/api/productos";

  await fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  setForm({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  setEditandoId(null);
  cargarProductos();
  alert(editandoId ? "Producto actualizado" : "Producto guardado");
};

  const eliminarProducto = async (id: string) => {
    await fetch(`/api/productos/${id}`, {
      method: "DELETE",
    });

    cargarProductos();
  };

  const [authorized, setAuthorized] = useState(false);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "/login";
    return;
  }

  const user = JSON.parse(storedUser);

  if (user.role !== "admin") {
    alert("No autorizado");
    window.location.href = "/";
    return;
  }

  setAuthorized(true);
}, []);

if (!authorized) {
  return null;
}

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Panel de Administrador
        </h1>

        <form onSubmit={guardarProducto} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="text"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="text"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();

              setForm({
                ...form,
                image: data.filePath,
              });
            }}
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full border p-3 rounded text-black"
          />

          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-3 rounded-lg"
          >
            Guardar producto
          </button>
        </form>

        <hr className="my-10" />

        <h2 className="text-2xl font-bold text-black mb-4">
          Productos registrados
        </h2>

        <div className="space-y-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border p-4 rounded-lg shadow-sm"
            >
              <h3 className="font-bold text-black text-lg">{producto.name}</h3>

                <p className="text-black">
                Descripción: {producto.description}
                </p>

                <p className="text-black">
                Precio: ${producto.price}
                </p>

                <p className="text-black">
                Categoría: {producto.category}
                </p>

                <p className="text-black">
                Stock: {producto.stock}
                </p>

                <p className="text-black">
                Imagen: {producto.image || "Sin imagen"}
                </p>

              <div className="flex gap-2 mt-3">
                <button
                type="button"
                onClick={() => {
                    setForm({
                    name: producto.name,
                    description: producto.description,
                    price: String(producto.price),
                    category: producto.category,
                    image: producto.image,
                    stock: String(producto.stock),
                    });

                    setEditandoId(producto.id);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                Editar
                </button>

                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}