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
        "background": "#1F2937",    // bg dark blue
        "foreground": "#ffffff",    // text white
        "primary": "#2d3b51",      // boxes/forms lighter dark blue
        "secondary": "#1F2937",    // hover button
        "accent": "#ecc472",       // yellow button
      },
    },
  },
  plugins: [],
} satisfies Config;
