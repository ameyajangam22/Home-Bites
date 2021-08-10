module.exports = {
	purge: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html",
		"./src/components/*.{js,jsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#ffa500",
				secondary: {
					100: "#E2E2D5",
					200: "#888883",
				},
			},

			height: {
				xl: "30rem",
			},
		},
	},
	variants: {
		extend: {
			opacity: ["disabled"],
		},
	},
	plugins: [],
};
