const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms'),
	]
};