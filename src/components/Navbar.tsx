"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="bg-pink-500 text-white px-8 py-4 flex justify-between items-center">
      
      <Link
        href="/"
        className="font-bold text-2xl"
      >
        Tienda Reyna
      </Link>

      {user && (
        <div className="flex gap-6 items-center">
          
          <Link href="/productos">
            Productos
          </Link>

          <Link href="/carrito">
            Carrito
          </Link>

          {user.role === "admin" && (
            <>
              <Link href="/admin">
                Admin
              </Link>

              <Link href="/admin/pedidos">
                Pedidos
              </Link>
            </>
          )}

          <span>
            Hola, {user.name}
          </span>

          <button
            onClick={() => {
              localStorage.removeItem("user");

              window.location.href = "/";
            }}
            className="bg-white text-pink-500 px-4 py-2 rounded-lg"
          >
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}