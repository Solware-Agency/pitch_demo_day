'use client'

import { motion } from 'framer-motion'
import { SearchX, BarChart3, Compass } from 'lucide-react'
import { SlidingNumber } from '@src/components/ui/sliding-number'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

const PROBLEMA_ICONS = [SearchX, BarChart3, Compass] as const
const COUNT_TARGET = 1700
const COUNT_DURATION = 1.8
// Cards entran una por una; el número empieza después
const CARD_STAGGER = 0.55
const CARD_DELAY_FIRST = 0.6
const NUMBER_BLOCK_DELAY = CARD_DELAY_FIRST + 3 * CARD_STAGGER // después de las 3 cards

export function Problema() {
	const short = pitchCopy.problema.short ?? pitchCopy.problema.phrases

	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			<div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
				{/* Headline */}
				<motion.h2
					className="text-white font-black text-xl sm:text-2xl md:text-3xl text-center max-w-2xl mb-8 sm:mb-10 leading-tight"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{pitchCopy.problema.headline}
				</motion.h2>

				{/* 3 pilares — icono + frase corta */}
				<ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-3xl justify-center mb-10 sm:mb-12" role="list">
					{short.slice(0, 3).map((phrase, i) => {
						const Icon = PROBLEMA_ICONS[i]
						return (
							<motion.li
								key={i}
								className="flex flex-col items-center text-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-5 sm:px-6 sm:py-6 flex-1 min-w-0 shadow-xl"
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
									className="flex shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-300 mb-3"
									style={{
										boxShadow: '0 0 20px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
									}}
								>
									{Icon && (
										<Icon
											className="w-7 h-7 sm:w-8 sm:h-8"
											strokeWidth={2}
										/>
									)}
								</motion.span>
								<span className="text-white font-semibold text-base sm:text-lg leading-tight">
									{phrase}
								</span>
							</motion.li>
						)
					})}
				</ul>

				{/* Número de cierre */}
				<motion.div
					className="text-center"
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						type: 'spring',
						stiffness: 260,
						damping: 20,
						delay: NUMBER_BLOCK_DELAY,
					}}
				>
					<span className="block text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
						<SlidingNumber
							from={0}
							to={COUNT_TARGET}
							duration={COUNT_DURATION}
							delay={NUMBER_BLOCK_DELAY}
							prefix="+"
							locale="de-DE"
							countStartsAfterVisible
							className="text-inherit"
						/>
					</span>
					<span className="text-white/80 text-base sm:text-lg mt-1 font-medium">
						{pitchCopy.problema.bigNumberSub}
					</span>
				</motion.div>
			</div>
		</div>
	)
}
