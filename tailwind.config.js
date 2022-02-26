
module.exports = {
    mode: "jit",
    content: [
        "./src/views/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme: {
    container: {
        center: true,
        },
      extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        
    ],
  }