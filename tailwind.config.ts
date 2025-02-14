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
        accentColor: 'var(--accentColor)',
        secondColor: 'var(--secondColor)', 
        thirdColor: 'var(--thirdColor)', 

        darkGrey: 'var(--darkGrey)',
        mediumGrey: 'var(--mediumGrey)',
        lightGrey: 'var(--lightGrey)',
        neutralWhite: 'var(--whiteColor)',

        gradientBg : 'var(--gradientBg)',
      },
      fontFamily: {
        main: ['var(--font-main)'], // Exo 2
        secondary: ['var(--font-secondary)'], // Staatliches
      }
    },
  },
  plugins: [],
} satisfies Config;
