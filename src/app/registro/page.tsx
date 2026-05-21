"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Usuario registrado");
      router.push("/productos");
    } else {
      alert("Error al registrar");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-md mx-auto p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Registro
        </h1>

        <form
          onSubmit={registrar}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full border p-3 rounded text-black"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            Regresar a la página de inicio
          </Link>
        </div>
      </section>
    </main>
  );
}