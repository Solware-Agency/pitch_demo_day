'use client'

import { motion } from 'framer-motion'
import { GitMerge, Activity, Puzzle } from 'lucide-react'
import { FloatingLinesBackground } from '@src/components/FloatingLines'
import EyeTrackingComponent from '@src/components/RobotTraking'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

const REVEAL_ICONS = [GitMerge, Activity, Puzzle] as const

const LOGO_SOLHUB_SIN_ESLOGAN =
	'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/SolHub/SolHub_ORIG%20-%20SIN%20ESLOGAN.svg'

export function Reveal() {
	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<FloatingLinesBackground />
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			{/* CONTROL: SolHub — mismo tamaño, centrados */}
			<motion.div
				className="flex flex-row items-center justify-center gap-3 sm:gap-4 z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<h1 className="text-white font-black tracking-tight">
					CONTROL:
				</h1>
				<img
					src={LOGO_SOLHUB_SIN_ESLOGAN}
					alt="SolHub"
					className="w-auto object-contain self-center"
					style={{ height: '1.45em', verticalAlign: 'middle' }}
				/>
			</motion.div>

			{/* Solwy bajando con glow */}
			<motion.div
				className="absolute top-8 right-8 sm:right-12 w-16 sm:w-20 aspect-[647.42/831.52] z-20"
				initial={{ opacity: 0, y: -80 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
				style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))' }}
			>
				<EyeTrackingComponent className="w-full h-full" />
			</motion.div>

			{/* 3 pilares — iconos grandes + frase corta, layout Shark Tank */}
			<motion.div
				className="mt-10 sm:mt-14 max-w-4xl mx-auto z-10 w-full px-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.35, delay: 0.5 }}
			>
				<ul
					className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-stretch"
					role="list"
				>
					{(pitchCopy.reveal.short ?? pitchCopy.reveal.bullets).map((phrase, i) => {
						const Icon = REVEAL_ICONS[i]
						return (
							<motion.li
								key={i}
								className="flex flex-col items-center text-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-6 sm:px-8 sm:py-8 flex-1 min-w-0 shadow-xl"
								initial={{ opacity: 0, scale: 0.5, y: 24 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{
									type: 'spring',
									stiffness: 320,
									damping: 22,
									delay: 0.75 + i * 0.15,
								}}
							>
								<motion.span
									className="flex shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-200 mb-4"
									style={{
										boxShadow: '0 0 28px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
									}}
								>
									{Icon && (
										<Icon
											className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
											strokeWidth={2}
										/>
									)}
								</motion.span>
								<span className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight">
									{phrase}
								</span>
							</motion.li>
						)
					})}
				</ul>
			</motion.div>
		</div>
	)
}
