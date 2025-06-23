/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", 
        "./index.html" 
    ],
    theme: {
        extend: {
            colors: {
                background:    '#17255a',  /* Midnight Blue */
                surface:       '#18206f',  /* Penn Blue */
                primary:       '#bd1e1e',  /* Cornell Red */
                secondary:     '#d88373',  /* Coral Pink */
                accent:        '#E0D68A',  
                text:          '#F4F7F5',  /* Seasalt */
            },
            fontFamily: {
                title: ['DM Serif Text', 'serif'],
                body: ['Roboto', 'sans-serif']
            },
    
        }
        
    },
    plugins: [],
}