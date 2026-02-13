'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SlidingNumber } from '@src/components/ui/sliding-number'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

const NUM_DURATION = 3.5
const SLIDING_ENTRANCE = 0.4
const SLIDING_DELAY = 0.3
const WAIT_AFTER_COUNT = 3

/** Orden visual: izq=centros, centro=informes, der=pacientes. Paso en que aparece cada una: 0, 2, 1 */
const PHASE1_ORDER = [0, 1, 2] as const // [centros, informes, pacientes]
const PHASE1_APPEAR_STEP: Record<number, number> = { 0: 0, 1: 2, 2: 1 }
const CARD0_COUNT_END = SLIDING_DELAY + SLIDING_ENTRANCE + NUM_DURATION
const CARD_APPEAR_DELAYS_MS = [
	0,
	(CARD0_COUNT_END + WAIT_AFTER_COUNT) * 1000,
	(CARD0_COUNT_END + WAIT_AFTER_COUNT + CARD0_COUNT_END + WAIT_AFTER_COUNT) * 1000,
] as const

export function Problema() {
	const [phase1Step, setPhase1Step] = useState(0)

	useEffect(() => {
		const t1 = setTimeout(() => setPhase1Step(1), CARD_APPEAR_DELAYS_MS[1])
		const t2 = setTimeout(() => setPhase1Step(2), CARD_APPEAR_DELAYS_MS[2])
		return () => {
			clearTimeout(t1)
			clearTimeout(t2)
		}
	}, [])

	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			<div className="relative z-10 w-full max-w-5xl lg:max-w-6xl tv:max-w-6xl tv-4k:max-w-7xl mx-auto flex flex-col items-center">
				{/* 3 slots fijos (izq, centro, der). Cards aparecen en su lugar, tamaños no cambian */}
				<motion.div
					key="phase1"
							className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-6 lg:gap-8 w-full max-w-5xl lg:max-w-6xl px-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							{PHASE1_ORDER.map((cardIndex) => {
								const card = pitchCopy.problema.numeroCards[cardIndex]
								const isCenter = cardIndex === 1
								const isVisible = phase1Step >= PHASE1_APPEAR_STEP[cardIndex]
								const shadowSoft = isCenter
									? '0 0 40px rgba(99, 102, 241, 0.25)'
									: cardIndex === 0
										? '0 0 30px rgba(99, 102, 241, 0.15)'
										: '0 0 30px rgba(245, 158, 11, 0.15)'
								const shadowStrong = isCenter
									? '0 0 50px rgba(99, 102, 241, 0.4)'
									: cardIndex === 0
										? '0 0 35px rgba(99, 102, 241, 0.25)'
										: '0 0 35px rgba(245, 158, 11, 0.25)'
								return (
									<motion.div
										key={cardIndex}
										className={`flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm border px-6 py-6 sm:px-8 sm:py-8 min-w-0 overflow-hidden ${!isVisible ? 'pointer-events-none' : ''} ${
											isCenter
												? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/15 border-indigo-400/40 flex-[1.3] sm:flex-[1.4]'
												: cardIndex === 0
													? 'bg-gradient-to-br from-indigo-500/12 to-purple-500/8 border-indigo-400/25 flex-1'
													: 'bg-gradient-to-br from-amber-500/12 to-orange-500/8 border-amber-400/25 flex-1'
												}`}
										initial={{ opacity: 0 }}
										animate={{
											opacity: isVisible ? 1 : 0,
											scale: isVisible ? (isCenter ? 1.05 : 1) : 0.95,
											boxShadow: [shadowSoft, shadowStrong, shadowSoft],
										}}
										transition={{
											opacity: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
											scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
											boxShadow: {
												duration: 2.5,
												delay: 0.5,
												repeat: isVisible ? Infinity : 0,
												ease: 'easeInOut',
											},
										}}
										style={{
											boxShadow: shadowSoft,
										}}
									>
										<div className="w-full min-w-0 overflow-hidden flex justify-center min-h-[2.5rem] sm:min-h-[3rem]">
											{isVisible ? (
												<SlidingNumber
													from={0}
													to={card.value}
													duration={isCenter ? NUM_DURATION * 1.5 : NUM_DURATION}
													delay={SLIDING_DELAY}
													prefix={card.prefix}
													countStartsAfterVisible
													locale="de-DE"
													className={`font-black text-white text-center block max-w-full ${
														isCenter
															? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tv:text-8xl tv-4k:text-9xl'
															: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl tv:text-6xl tv-4k:text-7xl'
													}`}
												/>
											) : (
												<span className={`font-black text-white/0 text-center block tabular-nums ${
													isCenter ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tv:text-8xl tv-4k:text-9xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl tv:text-6xl tv-4k:text-7xl'
												}`}>0</span>
											)}
										</div>
										<span
											className={`mt-1 text-center font-semibold text-white/90 ${
												isCenter ? 'text-base sm:text-lg md:text-xl lg:text-2xl tv:text-2xl tv-4k:text-3xl' : 'text-sm sm:text-base lg:text-lg tv:text-lg tv-4k:text-xl'
											}`}
										>
											{card.label}
										</span>
									</motion.div>
								)
							})}
				</motion.div>
			</div>
		</div>
	)
}
