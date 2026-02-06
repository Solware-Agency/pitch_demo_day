import type { Config } from 'tailwindcss'

/**
 * Tailwind v4 ya no necesita `content`, ni mapear colores aquí.
 * Mantenemos un config mínimo por si usas plugins o futuras extensiones.
 * Si no usas nada aquí, igual está bien dejarlo.
 */
const config: Config = {
	// NOTA: el modo oscuro lo controlamos con la variant CSS .dark (ver globals.css)
	// darkMode en v4 ya no se usa como antes; se gestiona con @custom-variant.

	theme: {
		// En v4 el tema se define en CSS con @theme (ver globals.css).
		// Puedes extender spacing, fonts, etc. aquí si lo prefieres.
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				xl: 'calc(var(--radius) + 2px)',
				'2xl': 'calc(var(--radius) + 6px)',
			},
			animation: {
				float: 'float 20s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'25%': { transform: 'translateY(-20px) translateX(10px)' },
					'50%': { transform: 'translateY(-10px) translateX(-5px)' },
					'75%': { transform: 'translateY(-15px) translateX(8px)' },
				},
			},
		},
	},

	// Si usas plugins oficiales o de terceros, decláralos aquí:
	plugins: [
		// require('@tailwindcss/typography'),
		// require('@tailwindcss/forms'),
		// require('@tailwindcss/aspect-ratio'),
	],
}

export default config
