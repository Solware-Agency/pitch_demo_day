'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg, solhubColors } from '@src/lib/slideTheme'

const LOGO_SOLHUB_SIN_ESLOGAN =
	'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/SolHub/SolHub_ORIG%20-%20SIN%20ESLOGAN.svg'

const CARD_STAGGER = 0.45
const CARD_DELAY_FIRST = 0.5
const NUM_CARDS = 6
const LOGO_DELAY = CARD_DELAY_FIRST + NUM_CARDS * CARD_STAGGER + 0.25
const LINES_DELAY_BASE = LOGO_DELAY + 0.6
const LINES_STAGGER = 0.12
const TEXTS_DELAY = LINES_DELAY_BASE + NUM_CARDS * LINES_STAGGER + 0.5
const CARD_GLOW_DELAY = TEXTS_DELAY - 0.2

const ISLAND_POSITIONS = [
	{ top: '10%', left: '12%' },
	{ top: '14%', right: '14%' },
	{ top: '42%', left: '6%' },
	{ top: '42%', right: '6%' },
	{ bottom: '32%', left: '18%' },
	{ bottom: '32%', right: '18%' },
]

type Point = { x: number; y: number }

export function Cierre() {
	const containerRef = useRef<HTMLDivElement>(null)
	const centerRef = useRef<HTMLDivElement>(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([])

	const [lines, setLines] = useState<{ start: Point; ends: Point[] } | null>(null)

	const measure = useCallback(() => {
		const container = containerRef.current
		const center = centerRef.current
		if (!container || !center) return

		const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[]
		if (cardEls.length !== 6) return

		const cr = container.getBoundingClientRect()
		const centerRect = center.getBoundingClientRect()
		const cx = ((centerRect.left - cr.left + centerRect.width / 2) / cr.width) * 100
		const cy = ((centerRect.top - cr.top + centerRect.height / 2) / cr.height) * 100

		const ends: Point[] = cardEls.map((el) => {
			const r = el.getBoundingClientRect()
			return {
				x: ((r.left - cr.left + r.width / 2) / cr.width) * 100,
				y: ((r.top - cr.top + r.height / 2) / cr.height) * 100,
			}
		})

		setLines({ start: { x: cx, y: cy }, ends })
	}, [])

	useEffect(() => {
		measure()
		const container = containerRef.current
		if (!container) return
		const ro = new ResizeObserver(measure)
		ro.observe(container)
		return () => ro.disconnect()
	}, [measure])

	// Re-medir cuando las cards y el centro hayan pintado (animaciones)
	useEffect(() => {
		const t = setTimeout(measure, 100)
		const t2 = setTimeout(measure, 800)
		const t3 = setTimeout(measure, 2000)
		const t4 = setTimeout(measure, 4000) // después de que el logo haya aparecido
		return () => {
			clearTimeout(t)
			clearTimeout(t2)
			clearTimeout(t3)
			clearTimeout(t4)
		}
	}, [measure])

	return (
		<div
			ref={containerRef}
			className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}
		>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />

			{/* 6 islas */}
			{pitchCopy.cierre.islands.map((island, i) => {
				const color = solhubColors.cierreLines[i]
				const baseShadow = '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)'
				const glowStrong = `0 10px 15px -3px rgb(0 0 0 / 0.3), 0 0 22px 3px ${color}50`
				const glowSoft = `0 10px 15px -3px rgb(0 0 0 / 0.3), 0 0 14px 1px ${color}30`
				return (
				<motion.div
					key={island.id}
					ref={(el) => {
						cardRefs.current[i] = el
					}}
					className="absolute bg-white/25 backdrop-blur-md rounded-2xl border-2 border-white/50 px-5 py-4 sm:px-6 sm:py-4.5 text-center min-w-[110px] sm:min-w-[140px] md:min-w-[160px] z-10 ring-1 ring-white/30"
					style={ISLAND_POSITIONS[i]}
					initial={{ opacity: 0, scale: 0.6, boxShadow: baseShadow }}
					animate={{
						opacity: 1,
						scale: 1,
						boxShadow: [glowStrong, glowSoft, glowStrong],
					}}
					transition={{
						opacity: { duration: 0.5, delay: CARD_DELAY_FIRST + i * CARD_STAGGER, ease: [0.25, 0.46, 0.45, 0.94] },
						scale: { duration: 0.5, delay: CARD_DELAY_FIRST + i * CARD_STAGGER, ease: [0.25, 0.46, 0.45, 0.94] },
						boxShadow: {
							delay: CARD_GLOW_DELAY + i * 0.08,
							duration: 2.2,
							repeat: Infinity,
							ease: 'easeInOut',
						},
					}}
				>
					<p className="text-white font-bold text-sm sm:text-base drop-shadow-sm">{island.label}</p>
					<p className="text-white/90 text-xs sm:text-sm mt-0.5">{island.sub}</p>
				</motion.div>
				)
			})}

			{/* Logo SolHub centro — después de las cards */}
			<motion.div
				ref={centerRef}
				className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 z-20"
				initial={{ opacity: 0, scale: 0.3 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.65, delay: LOGO_DELAY, ease: [0.25, 0.46, 0.45, 0.94] }}
			>
				<motion.img
					src={LOGO_SOLHUB_SIN_ESLOGAN}
					alt="SolHub"
					className="h-20 w-auto sm:h-24 md:h-28 lg:h-32 object-contain"
					animate={{ scale: [1, 1.04, 1] }}
					transition={{ duration: 2.5, delay: LOGO_DELAY + 0.8, ease: 'easeInOut' }}
				/>
			</motion.div>

			{/* Líneas centro → cada card: se desvanecen en el centro y detrás del logo hay solo gradiente */}
			{lines && (
				<svg
					className="absolute inset-0 w-full h-full pointer-events-none z-0"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						{/* Gradiente radial detrás del logo: las líneas “se vuelven” esta mancha */}
						<radialGradient
							id="centerBlendCierre"
							cx="50%"
							cy="50%"
							r="50%"
							fx="50%"
							fy="50%"
						>
							<stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
							<stop offset="50%" stopColor="#4338ca" stopOpacity="0.15" />
							<stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
						</radialGradient>
						{lines.ends.map((end, i) => (
							<linearGradient
								key={i}
								id={`lineGradCierre-${i}`}
								gradientUnits="userSpaceOnUse"
								x1={lines.start.x}
								y1={lines.start.y}
								x2={end.x}
								y2={end.y}
							>
								<stop offset="0%" stopColor={solhubColors.cierreLines[i]} stopOpacity="0" />
								<stop offset="18%" stopColor={solhubColors.cierreLines[i]} stopOpacity="0" />
								<stop offset="35%" stopColor={solhubColors.cierreLines[i]} stopOpacity="0.6" />
								<stop offset="100%" stopColor={solhubColors.cierreLines[i]} stopOpacity="1" />
							</linearGradient>
						))}
						<filter id="glowCierre" x="-30%" y="-30%" width="160%" height="160%">
							<feGaussianBlur stdDeviation="0.35" result="coloredBlur" />
							<feMerge>
								<feMergeNode in="coloredBlur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>
					{/* Primero el gradiente central (detrás del logo) */}
					<circle
						cx={lines.start.x}
						cy={lines.start.y}
						r="12"
						fill="url(#centerBlendCierre)"
					/>
					{/* Líneas que salen del centro pero transparentes ahí, visibles hacia las cards */}
					{lines.ends.map((end, i) => (
						<motion.path
							key={i}
							d={`M ${lines.start.x} ${lines.start.y} L ${end.x} ${end.y}`}
							fill="none"
							stroke={`url(#lineGradCierre-${i})`}
							strokeWidth="0.9"
							strokeLinecap="round"
							filter="url(#glowCierre)"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{
								pathLength: { duration: 0.75, delay: LINES_DELAY_BASE + i * LINES_STAGGER, ease: 'easeOut' },
								opacity: { duration: 0.3, delay: LINES_DELAY_BASE + i * LINES_STAGGER },
							}}
						/>
					))}
				</svg>
			)}

			<motion.div
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-indigo-500/20 blur-2xl -z-10"
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.9, delay: LOGO_DELAY }}
			/>

			<motion.div
				className="absolute bottom-8 sm:bottom-12 left-0 right-0 flex flex-col items-center z-30 px-4"
				initial="hidden"
				animate="visible"
				variants={{
					visible: { transition: { staggerChildren: 0.12, delayChildren: TEXTS_DELAY } },
					hidden: {},
				}}
			>
				<motion.p
					className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center"
					variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
					transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
				>
					{pitchCopy.cierre.remateLine1}
				</motion.p>
				<motion.p
					className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mt-2"
					variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
					transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
				>
					{pitchCopy.cierre.remateLine2}
				</motion.p>
				<motion.p
					className="text-white/60 text-xs sm:text-sm mt-4 max-w-xl text-center"
					variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					{pitchCopy.cierre.cliffhanger}
				</motion.p>
			</motion.div>
		</div>
	)
}
