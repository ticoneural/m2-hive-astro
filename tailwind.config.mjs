/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#0A192F', // Navy (Corrected from app.css analysis)
                    secondary: '#F8FAFC', // Light Text
                    accent: '#D4AF37', // Gold (Corrected from app.css analysis)
                    surface: '#112240', // Lighter Navy
                    text: '#94A3B8', // Muted Text
                    head: '#F8FAFC', // Headings
                },
            },
            fontFamily: {
                sans: ['"Lato"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            boxShadow: {
                'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                'glow': '0 0 15px rgba(212, 175, 55, 0.3)', // Gold glow
            },
        },
    },
    plugins: [],
}
