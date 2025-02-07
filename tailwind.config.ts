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
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        accentColor: 'var(--accentColor)',
        secondColor: 'var(--secondColor)', 
        thirdColor: 'var(--thirdColor)', 

        darkGrey: 'var(--darkGrey)',
        mediumGrey: 'var(--mediumGrey)',
        lightGrey: 'var(--lightGrey)',
        neutralWhite: 'var(--whiteColor)',
      },
      fontFamily: {
        staatliches: ['var(--font-staatliches)'],
        exo2: ['var(--font-exo2)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
