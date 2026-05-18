import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        principal: "#ffffff",
        rosaClaro: "#fce7f3",
        rosaFuerte: "#ec4899",
        texto: "#111827",
      },
    },
  },
  plugins: [],
};

export default config;