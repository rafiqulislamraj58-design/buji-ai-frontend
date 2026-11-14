import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF5FF", 100: "#DBE8FE", 200: "#BFD6FE", 300: "#93BBFD",
          400: "#609AFA", 500: "#3B7BF6", 600: "#2563EB", 700: "#1D4FD8",
          800: "#1E40AF", 900: "#1E3A8A",
        },
        canvas: "#F4F6FA",
        ink: { DEFAULT: "#101828", soft: "#475467", faint: "#98A2B3" },
      },
      fontFamily: {
        sans: ['"Hind Siliguri"', "system-ui", "sans-serif"],
        display: ['"Baloo Da 2"', '"Hind Siliguri"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.06), 0 4px 16px -4px rgba(16,24,40,.08)",
        lift: "0 12px 40px -12px rgba(37,99,235,.35)",
      },
    },
  },
  plugins: [],
};
export default config;
