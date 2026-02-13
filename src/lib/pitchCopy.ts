/**
 * Textos centralizados del pitch "PITCH SOLWARE EMPRENDE TECH" (5 min, estilo Jobs).
 * Fuente: PDF del guion. Editar aquí para cambiar copy sin tocar JSX.
 */

export const pitchCopy = {
	// --- ALARMA (primer slide: 6:00) ---
	alarma: {
		time: '6:00 de la mañana',
		notificaciones: [
			{ label: 'WhatsApp', count: 5 },
			{ label: 'Gmail', count: 7 },
			{ label: 'PDF', count: 3 },
			{ label: 'Correo', count: 4 },
			{ label: 'Excel', count: 2 },
		] as const,
	},

	// --- HOOK (0:00–0:15) ---
	hook: {
		headline: 'TU DIAGNÓSTICO ESTÁ REGADO',
		subline: 'WhatsApp • Correo • PDF • Papel • Excel • Carpeta',
		pieces: ['chat', 'correo', 'pdf', 'papel', 'excel', 'carpeta'] as const,
	},

	// --- PROBLEMA (0:15–1:05) ---
	problema: {
		dataLabel: 'DATA',
		headline: 'Tu data está en todas partes. Y en ninguna.',
		phrases: ['Nadie la analiza', 'Nadie la evalúa', 'Nadie se guía por ella'],
		short: ['Nadie la analiza', 'Nadie la evalúa', 'Nadie se guía por ella'],
		bigNumber: '+1.700',
		bigNumberSub: 'parches digitales',
		/** Fase 2: número grande */
		bigNumberLine: '+1.700 centros de salud',
		/** Fase 3: texto de impacto */
		followUpLine: 'Con un estimado de 800 pacientes mensuales por centro da más de 1.300.000 informes mensuales',
		/** Fase 2: 3 cards separadas — índice 1 es la central (número más grande). value y prefix para SlidingNumber */
		numeroCards: [
			{ value: 1700, prefix: '+', label: 'centros de salud' },
			{ value: 1300000, prefix: '', label: 'informes mensuales' },
			{ value: 800, prefix: '', label: 'pacientes/centro' },
		] as const,
	},

	// --- REVEAL (1:05–1:25) ---
	reveal: {
		title: 'CONTROL.',
		brand: 'SolHub',
		bullets: [
			'Pacientes + casos + informes + cobros, en un solo flujo',
			'Roles, trazabilidad y métricas en vivo',
			'Personalizable sin romper el sistema',
		],
		/** Frases cortas para el slide (icono + título de card) */
		short: ['Un solo flujo', 'Métricas en vivo', 'Personalizable y estable'],
		/** Hasta 3 bullets por card (mismo orden que short) */
		cardBullets: [
			['Pacientes + casos + informes + cobros, en un solo flujo'],
			['Roles, trazabilidad y métricas en vivo'],
			['Personalizable sin romper el sistema'],
		],
		signature: 'Eugenio Andreone · Jesús Freites',
	},

	// --- EVIDENCIA (1:25–1:55) ---
	evidencia: {
		title: 'VALIDADO EN 4 CENTROS DE SALUD',
		metrics: [
			{ value: '2:00 → 0:30', sub: '−75%' },
			{ value: '12–15 → 6–9 MIN', sub: '' },
			{ value: 'HASTA 195 HORAS / MES', sub: 'tiempo recuperado' },
		],
	},

	// --- DEMO (1:55–4:10) ---
	demo: {
		placeholderTitle: 'Demo en vivo',
		screens: [
			{ label: 'VISIBILIDAD', phrase: 'Dashboard: operación en tiempo real' },
			{ label: 'HISTORIAL', phrase: 'Paciente: historial en un solo lugar' },
			{ label: 'TRAZABILIDAD', phrase: 'Casos: quién, qué, qué falta' },
			{ label: 'INFORMES', phrase: 'Informes estandarizados, firma, entrega' },
		],
	},

	// --- CIERRE (4:10–5:00) ---
	cierre: {
		islands: [
			{ id: 'paciente', label: 'PACIENTE', sub: 'app' },
			{ id: 'doctor', label: 'DOCTOR', sub: 'citas' },
			{ id: 'clinica', label: 'CLÍNICA', sub: 'admin' },
			{ id: 'laboratorio', label: 'LABORATORIO', sub: 'operación' },
			{ id: 'farmacia', label: 'FARMACIA', sub: 'POS' },
			{ id: 'seguro', label: 'SEGURO', sub: 'plataforma' },
		],
		remateLine1: 'UNA SOLA HISTORIA.',
		remateLine2: 'EN UN SOLO LUGAR.',
		signature: 'Eugenio Andreone · Jesús Freites — SolHub',
		cliffhangerLine1: 'Una sola historia',
		cliffhangerLine2: 'Un solo lugar',
	},

	// --- QUIZ FINAL ---
	quizFinal: {
		signature: 'Eugenio Andreone · Jesús Freites — SolHub',
	},
} as const
