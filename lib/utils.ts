import { format } from "date-fns";

export function formatDate(date: Date): string {
    return format(new Date(date), "MMMM do, yyyy HH:mm") ?? "Date not available";
}

export function formatDateCalendar(date: Date): string {
    return format(new Date(date), "dd/M/yyyy") ?? "Date not available";
}

export const slugify = (str: string) => {
    return str.toLowerCase().trim().replace(/[\s\W-]+/g, "-").replace(/^-+|-+$/g, "");
}

export const pageLocation = () => {
    return window.location;
}

import { Exo, Staatliches } from "next/font/google";

const exo2_init = Exo({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-main',
});

const staatliches_init = Staatliches({ 
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-secondary',
});

export const mainFont = exo2_init.variable; 
export const secondaryFont = staatliches_init.variable;
