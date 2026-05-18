type Props = {
  nombre: string;
  precio: number;
  categoria: string;
};

export default function ProductCard({ nombre, precio, categoria }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
      <div className="h-40 bg-pink-50 rounded-lg mb-4"></div>

      <h2 className="text-lg font-bold text-black">
        {nombre}
      </h2>

      <p className="text-pink-600 font-semibold">
        ${precio}
      </p>

      <p className="text-gray-600">
        {categoria}
      </p>
    </div>
  );
}