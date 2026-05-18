import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-pink-100 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-pink-600">
        Tienda Reyna
      </h1>

      <div className="flex gap-6 text-black font-medium">
        <Link href="/">Inicio</Link>
        <Link href="/productos">Productos</Link>
        <Link href="/login">Login</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}