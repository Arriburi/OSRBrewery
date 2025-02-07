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
        "sand": '#f0deb6',
        "olive-drab": '#495040',
        "char-coal": '#323431',
        "apri-cot": '#efab6e',
        "muted-Olive": '#767154',


        "background": "#495040",  //bg
        "foreground": "#FFFFFF",  //main text color
        "primary": "#efab6e",     //buttons
        "secondary": "#495040",   //UI secondary buttons
        "accent": "#767154",      //allerts, borders accents
      },
    },
  },
  plugins: [],
} satisfies Config;
