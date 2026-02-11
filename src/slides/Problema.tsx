'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { SearchX, BarChart3, Compass, Building2, FileBarChart } from 'lucide-react'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

const PROBLEMA_ICONS = [SearchX, BarChart3, Compass] as const
const CARD_STAGGER = 0.55
const CARD_DELAY_FIRST = 0.6
const DATA_STAGGER = 0.65

const EXIT_DURATION = 0.4

interface ProblemaProps {
	phase?: number
}

export function Problema({ phase = 0 }: ProblemaProps) {
	const short = pitchCopy.problema.short ?? pitchCopy.problema.phrases

	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			<div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
				<AnimatePresence mode="wait">
					{/* Fase 0: solo headline + 3 cards (sin +1.700) */}
					{phase === 0 && (
						<motion.div
							key="phase0"
							className="flex flex-col items-center w-full"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{
								opacity: 0,
								scale: 0.85,
								transition: { duration: EXIT_DURATION, ease: 'easeIn' },
							}}
						>
							<motion.h2
								className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center max-w-3xl mb-8 sm:mb-10 leading-tight"
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								{pitchCopy.problema.headline}
							</motion.h2>

							<ul className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full max-w-4xl justify-center" role="list">
								{short.slice(0, 3).map((phrase, i) => {
									const Icon = PROBLEMA_ICONS[i]
									return (
										<motion.li
											key={i}
											className="flex flex-col items-center text-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-6 sm:px-8 sm:py-8 flex-1 min-w-0 shadow-xl"
											initial={{ opacity: 0, scale: 0.6, y: 20 }}
											animate={{ opacity: 1, scale: 1, y: 0 }}
											transition={{
												type: 'spring',
												stiffness: 280,
												damping: 22,
												delay: CARD_DELAY_FIRST + i * CARD_STAGGER,
											}}
										>
											<motion.span
												className="flex shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-300 mb-4"
												style={{
													boxShadow: '0 0 20px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
												}}
											>
												{Icon && (
													<Icon
														className="w-8 h-8 sm:w-10 sm:h-10"
														strokeWidth={2}
													/>
												)}
											</motion.span>
											<span className="text-white font-semibold text-lg sm:text-xl leading-tight">
												{phrase}
											</span>
										</motion.li>
									)
								})}
							</ul>
						</motion.div>
					)}

					{/* Fase 1: 2 bloques de datos con animación y estilo (sin headline) */}
					{phase === 1 && (
						<motion.div
							key="phase1"
							className="flex flex-col items-center w-full gap-8 sm:gap-10 max-w-3xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							{/* Bloque 1: Más de 1.700 centros de salud — card con ícono */}
							<motion.div
								className="flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-purple-500/10 backdrop-blur-sm border border-indigo-400/30 px-8 py-6 sm:px-12 sm:py-8 w-full"
								initial={{ opacity: 0, scale: 0.85, y: 30 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{
									type: 'spring',
									stiffness: 200,
									damping: 22,
									delay: 0,
									duration: 0.6,
								}}
								style={{
									boxShadow: '0 0 40px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
								}}
							>
								<motion.div
									className="rounded-xl bg-indigo-500/20 border border-indigo-400/40 p-3"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										type: 'spring',
										stiffness: 300,
										damping: 20,
										delay: 0.2,
									}}
									style={{
										boxShadow: '0 0 24px rgba(99, 102, 241, 0.25)',
									}}
								>
									<Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-300" strokeWidth={2} />
								</motion.div>
								<span className="text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
									{pitchCopy.problema.bigNumberLine}
								</span>
							</motion.div>

							{/* Bloque 2: frase de impacto — card con ícono */}
							<motion.div
								className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-400/20 px-6 py-5 sm:px-8 sm:py-6 w-full"
								initial={{ opacity: 0, x: -40 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.6,
									delay: DATA_STAGGER,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
								style={{
									boxShadow: '0 0 30px rgba(245, 158, 11, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
								}}
							>
								<motion.div
									className="flex shrink-0 rounded-xl bg-amber-500/20 border border-amber-400/30 p-3"
									initial={{ opacity: 0, rotate: -10 }}
									animate={{ opacity: 1, rotate: 0 }}
									transition={{
										duration: 0.4,
										delay: DATA_STAGGER + 0.15,
									}}
								>
									<FileBarChart className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" strokeWidth={2} />
								</motion.div>
								<p className="text-white/95 text-base sm:text-lg md:text-xl text-center sm:text-left leading-relaxed">
									{pitchCopy.problema.followUpLine}
								</p>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
