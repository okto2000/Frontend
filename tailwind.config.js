/** @type {import('tailwindcss').Config} */
export default {
content: [
  "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}",
  "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  "./node_modules/flowbite/**/*.js",
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

