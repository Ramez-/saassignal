/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'custom-red': '#FF4B2B',
                'custom-beige': '#F2E3DB',
            },
            fontFamily: {
                Lora: ["Lora", "serif"],
            },
        },
        plugins: [],
    }
}

