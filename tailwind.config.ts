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

        "background": "#2c3153",  //bg blue dark
        "foreground": "#ffffff",  //text white
        "primary": "#363f84",     //2nd bg blue dark light
        "secondary": "#d6ad84",   //UI secondary buttons
        "accent": "#ecc472",
        "accent2": "#eeca80",  //tags
      },
    },
  },
  plugins: [],
} satisfies Config;
