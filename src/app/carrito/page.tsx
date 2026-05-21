"use client";

import Navbar from "@/components/Navbar";

import {
  useEffect,
  useState,
} from "react";

import { useCart } from "@/context/CartContext";

export default function CarritoPage() {
  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const user =
      localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setAuthorized(true);
  }, []);

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Carrito de compras
        </h1>

        {cart.length === 0 ? (
          <p className="text-black">
            Tu carrito está vacío
          </p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex gap-4 items-center"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                <div className="flex-1">
                  <h2 className="font-bold text-black">
                    {item.name}
                  </h2>

                  <p className="text-pink-600">
                    ${item.price}
                  </p>

                  <div className="flex gap-2 mt-2 items-center">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="text-black">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div className="text-right">
              <h2 className="text-2xl font-bold text-black">
                Total: ${total}
              </h2>

              <button
                onClick={async () => {
                  const storedUser =
                    localStorage.getItem(
                      "user"
                    );

                  if (!storedUser) {
                    alert(
                      "Debes iniciar sesión"
                    );

                    return;
                  }

                  const user =
                    JSON.parse(storedUser);

                  const res = await fetch(
                    "/api/checkout",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify({
                        userEmail:
                          user.email,
                        total,
                        items: cart,
                      }),
                    }
                  );

                  const data =
                    await res.json();

                  if (res.ok) {
                    alert(
                      "Pedido realizado"
                    );

                    localStorage.removeItem(
                      "cart"
                    );

                    window.location.href =
                      "/";
                  } else {
                    alert(data.error);
                  }
                }}
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg"
              >
                Proceder al checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}