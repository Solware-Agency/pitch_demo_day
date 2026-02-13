'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiWhatsapp, SiGmail } from 'react-icons/si'
import { SiAdobeacrobatreader } from 'react-icons/si'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg, solhubColors } from '@src/lib/slideTheme'

const LOGO_SOLHUB_SIN_ESLOGAN =
	'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/SolHub/SolHub_ORIG%20-%20SIN%20ESLOGAN.svg'

const CARD_STAGGER = 0.45
const CARD_DELAY_FIRST = 0.5
const NUM_CARDS = 6
const LINES_PHASE0_DELAY = CARD_DELAY_FIRST + NUM_CARDS * CARD_STAGGER + 0.4
const LOGO_DELAY = 0.3
const LINES_PHASE1_DELAY = LOGO_DELAY + 0.5
const LINES_STAGGER = 0.1
const TEXTS_DELAY = LINES_PHASE1_DELAY + NUM_CARDS * LINES_STAGGER + 0.4
const CARD_GLOW_DELAY = TEXTS_DELAY - 0.2

const ISLAND_POSITIONS = [
	{ top: '10%', left: '12%' },
	{ top: '14%', right: '14%' },
	{ top: '42%', left: '6%' },
	{ top: '42%', right: '6%' },
	{ bottom: '32%', left: '18%' },
	{ bottom: '32%', right: '18%' },
]

/** Pares de cards para líneas en fase 0 (solo algunas, no todas) */
const CARD_PAIRS: [number, number][] = [
	[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5],
]

const LINE_ICONS = [SiWhatsapp, SiGmail, SiAdobeacrobatreader] as const

type Point = { x: number; y: number }

interface CierreProps {
	phase?: number
}

export function Cierre({ phase = 0 }: CierreProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([])

	const [cardPositions, setCardPositions] = useState<Point[] | null>(null)
	const [centerPoint, setCenterPoint] = useState<Point | null>(null)

	const measure = useCallback(() => {
		const container = containerRef.current
		if (!container) return

		const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[]
		if (cardEls.length !== 6) return

		const cr = container.getBoundingClientRect()
		const positions: Point[] = cardEls.map((el) => {
			const r = el.getBoundingClientRect()
			return {
				x: ((r.left - cr.left + r.width / 2) / cr.width) * 100,
				y: ((r.top - cr.top + r.height / 2) / cr.height) * 100,
			}
		})
		setCardPositions(positions)

		// Centro del logo: left-1/2 top-[44%] ≈ (50, 44) en viewBox
		setCenterPoint({ x: 50, y: 44 })
	}, [phase])

	useEffect(() => {
		measure()
		const container = containerRef.current
		if (!container) return
		const ro = new ResizeObserver(measure)
		ro.observe(container)
		return () => ro.disconnect()
	}, [measure])

	useEffect(() => {
		const t = setTimeout(measure, 100)
		const t2 = setTimeout(measure, 600)
		const t3 = setTimeout(measure, 1500)
		const t4 = setTimeout(measure, 3000)
		return () => {
			clearTimeout(t)
			clearTimeout(t2)
			clearTimeout(t3)
			clearTimeout(t4)
		}
	}, [measure, phase])

	return (
		<div
			ref={containerRef}
			className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}
		>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />

			{/* 6 islas siempre visibles */}
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

			{/* FASE 0: Líneas card-to-card + iconos */}
			<AnimatePresence mode="wait">
			{phase === 0 && cardPositions && cardPositions.length === 6 && (
				<motion.div
					key="phase0-lines"
					className="absolute inset-0 z-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 0.35 } }}
				>
				<svg
				className="absolute inset-0 w-full h-full pointer-events-none"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<filter id="glowCierrePhase0" x="-30%" y="-30%" width="160%" height="160%">
							<feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
							<feMerge>
								<feMergeNode in="coloredBlur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>
					<g filter="url(#glowCierrePhase0)">
						{CARD_PAIRS.map(([a, b], i) => {
							const from = cardPositions[a]
							const to = cardPositions[b]
							if (!from || !to) return null
							const color = solhubColors.cierreLines[a]
							return (
								<motion.path
									key={`${a}-${b}`}
									d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
									fill="none"
									stroke={color}
									strokeWidth="0.8"
									strokeLinecap="round"
									strokeOpacity="0.7"
									initial={{ pathLength: 0, opacity: 0 }}
									animate={{ pathLength: 1, opacity: 1 }}
									transition={{
										pathLength: { duration: 0.6, delay: LINES_PHASE0_DELAY + i * 0.08, ease: 'easeOut' },
										opacity: { duration: 0.3, delay: LINES_PHASE0_DELAY + i * 0.08 },
									}}
								/>
							)
						})}
					</g>
				</svg>
				<div className="absolute inset-0 pointer-events-none" aria-hidden>
					{CARD_PAIRS.map(([a, b], i) => {
						const from = cardPositions[a]
						const to = cardPositions[b]
						if (!from || !to) return null
						const Icon = LINE_ICONS[i % LINE_ICONS.length]
						return (
							<motion.div
								key={`icon-${a}-${b}`}
								className="absolute w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-white -translate-x-1/2 -translate-y-1/2"
								initial={{ opacity: 0, scale: 0.5, left: `${from.x}%`, top: `${from.y}%` }}
								animate={{
									opacity: 1,
									scale: 1,
									left: [`${from.x}%`, `${to.x}%`, `${from.x}%`],
									top: [`${from.y}%`, `${to.y}%`, `${from.y}%`],
								}}
								transition={{
									opacity: { delay: LINES_PHASE0_DELAY + i * 0.6 + 0.35 },
									scale: { delay: LINES_PHASE0_DELAY + i * 0.6 + 0.35 },
									left: { duration: 5.5, delay: i * 0.9, repeat: Infinity, ease: 'easeInOut' },
									top: { duration: 5.5, delay: i * 0.9, repeat: Infinity, ease: 'easeInOut' },
								}}
							>
								<Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
							</motion.div>
						)
					})}
				</div>
				</motion.div>
			)}
			{phase === 1 && (
					<motion.div
						key="phase1-content"
						className="absolute inset-0 z-[5]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4 }}
					>
						<motion.div
							className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 z-[25]"
							initial={{ opacity: 0, scale: 0.3, y: -30 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.6, delay: LOGO_DELAY, ease: [0.25, 0.46, 0.45, 0.94] }}
						>
							<motion.img
								src={LOGO_SOLHUB_SIN_ESLOGAN}
								alt="SolHub"
								className="h-20 w-auto sm:h-24 md:h-28 lg:h-32 tv:h-40 tv-4k:h-48 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
								animate={{ scale: [1, 1.04, 1] }}
								transition={{ duration: 2.5, delay: LOGO_DELAY + 0.8, ease: 'easeInOut' }}
							/>
						</motion.div>

						{/* Líneas centro → cada card (reorganizadas) */}
						{cardPositions && centerPoint && cardPositions.length === 6 && (
							<svg
								className="absolute inset-0 w-full h-full pointer-events-none z-0"
								viewBox="0 0 100 100"
								preserveAspectRatio="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs>
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
									{cardPositions.map((end, i) => (
										<linearGradient
											key={i}
											id={`lineGradCierre-${i}`}
											gradientUnits="userSpaceOnUse"
											x1={centerPoint.x}
											y1={centerPoint.y}
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
								<circle
									cx={centerPoint.x}
									cy={centerPoint.y}
									r="12"
									fill="url(#centerBlendCierre)"
								/>
								{cardPositions.map((end, i) => (
									<motion.path
										key={i}
										d={`M ${centerPoint.x} ${centerPoint.y} L ${end.x} ${end.y}`}
										fill="none"
										stroke={`url(#lineGradCierre-${i})`}
										strokeWidth="0.9"
										strokeLinecap="round"
										filter="url(#glowCierre)"
										initial={{ pathLength: 0, opacity: 0 }}
										animate={{ pathLength: 1, opacity: 1 }}
										transition={{
											pathLength: { duration: 0.7, delay: LINES_PHASE1_DELAY + i * LINES_STAGGER, ease: 'easeOut' },
											opacity: { duration: 0.35, delay: LINES_PHASE1_DELAY + i * LINES_STAGGER },
										}}
									/>
								))}
							</svg>
						)}

						{/* Iconos fluyendo por cada línea centro→card (uno por línea, secuencial) - z-[3] para que queden debajo del logo */}
						{cardPositions && centerPoint && cardPositions.length === 6 && (
							<div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden>
								{cardPositions.map((end, i) => {
									const Icon = LINE_ICONS[i % LINE_ICONS.length]
									return (
										<motion.div
											key={`phase2-icon-${i}`}
											className="absolute w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/25 backdrop-blur flex items-center justify-center text-white -translate-x-1/2 -translate-y-1/2"
											initial={{ opacity: 0, left: `${centerPoint.x}%`, top: `${centerPoint.y}%` }}
											animate={{
												opacity: [0, 1, 0],
												left: [`${centerPoint.x}%`, `${end.x}%`, `${centerPoint.x}%`],
												top: [`${centerPoint.y}%`, `${end.y}%`, `${centerPoint.y}%`],
											}}
											transition={{
												opacity: { duration: 2.5, delay: LINES_PHASE1_DELAY + i * 1.2, repeat: Infinity, ease: 'easeInOut' },
												left: { duration: 2.5, delay: LINES_PHASE1_DELAY + i * 1.2, repeat: Infinity, ease: 'easeInOut' },
												top: { duration: 2.5, delay: LINES_PHASE1_DELAY + i * 1.2, repeat: Infinity, ease: 'easeInOut' },
											}}
										>
											<Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
										</motion.div>
									)
								})}
							</div>
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
								className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tv:text-5xl tv-4k:text-6xl text-center max-w-3xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
								variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
								transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
							>
								{pitchCopy.cierre.cliffhangerLine1}
							</motion.p>
							<motion.p
								className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tv:text-5xl tv-4k:text-6xl text-center max-w-3xl mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
								variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
								transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
							>
								{pitchCopy.cierre.cliffhangerLine2}
							</motion.p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
