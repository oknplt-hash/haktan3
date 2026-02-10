
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.html"
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#ec9213",
                "secondary": "#f4f4f5",
                "surface": "#ffffff",
                "text-main": "#18181b",
                "text-muted": "#71717a",
                "border-light": "#e4e4e7",
                "background-light": "#ffffff",
                "card-light": "#f9f9f9",
                "text-secondary": "#666666",
            },
            fontFamily: { "display": ["Work Sans", "sans-serif"] },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [
        forms,
        containerQueries,
    ],
}
