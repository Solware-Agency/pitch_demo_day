/**
 * Fondos unificados para el deck del pitch.
 * Todas las slides usan fondo oscuro + FloatingLines (colores SolHub).
 */

/** Colores basados en el logo SolHub (indigo/violeta) para líneas flotantes y acentos */
export const solhubColors = {
	/** Paleta para el background FloatingLines (orden: oscuro → claro) */
	floatingLines: [
		'#4338ca', // indigo-700
		'#6366f1', // indigo-500 (principal logo)
		'#818cf8', // indigo-400
		'#a5b4fc', // indigo-300
		'#c7d2fe', // indigo-200
		'#e0e7ff', // indigo-100
	] as const,
	/** Color de cada “barra de luz” centro → card en el slide Cierre (orden: islands) */
	cierreLines: [
		'#6366f1', // PACIENTE — indigo
		'#8b5cf6', // DOCTOR — violeta
		'#06b6d4', // CLÍNICA — cyan
		'#10b981', // LABORATORIO — esmeralda
		'#f59e0b', // FARMACIA — ámbar
		'#ec4899', // SEGURO — rosa
	] as const,
}

export const slideBg = {
	/** Fondo base para todas las slides: oscuro + FloatingLines encima */
	base: 'bg-[#0a0a0f] min-h-dvh',
	/** Alias para compatibilidad */
	dark: 'bg-[#0a0a0f] min-h-dvh',
	/** Portada: mismo base oscuro (FloatingLines da el estilo) */
	portada: 'bg-[#0a0a0f] min-h-dvh',
} as const
