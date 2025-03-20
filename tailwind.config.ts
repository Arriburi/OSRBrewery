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
        "background": "#1F2937", //"#2c3153",  //bg blue dark
        "foreground": "#ffffff",  //text white
        "primary": "#2d3b51",//"#363f84",     //2nd bg blue dark light
        "secondary": "#1F2937",   //2md bg blue dark dark
        "tertiary": "#3d4896",
        "accent": "#ecc472",    //buttons
        "accent2": "#eeca80",  //tags
      },
    },
  },
  plugins: [],
} satisfies Config;
