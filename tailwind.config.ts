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
        darkGreylowOpacity: 'var(--darkGreyLowOpacity)',
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
  safelist: [
    'border-red-500',
    'border-orange-500',
    'border-yellow-500',
    'border-green-300',
    'border-green-500',
    'border-gray-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-300',
    'bg-green-500',
    'bg-gray-500',
    'bg-[#2CC7E1]',
    'bg-[#ffffff]'
  ],
  plugins: [],
} satisfies Config;
