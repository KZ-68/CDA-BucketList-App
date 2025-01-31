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