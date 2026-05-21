"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login correcto");

      router.push("/productos");
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-md mx-auto p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Iniciar sesión
        </h1>

        <form
          onSubmit={login}
          className="space-y-4"
        >
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
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}