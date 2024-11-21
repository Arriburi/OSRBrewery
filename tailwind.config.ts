import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ashgray: '#CAD2C5',
        cambridge: '#84A98C',
        hooker: '#52796F',
        darkslate: '#354F52',
        charcoal: '#2F3E46',
      },
    },
  },
  plugins: [],
} satisfies Config;
