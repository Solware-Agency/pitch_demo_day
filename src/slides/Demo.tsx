'use client'

import { motion } from 'framer-motion'
import { FloatingLinesBackground } from '@src/components/FloatingLines'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

export function Demo() {
	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<FloatingLinesBackground />
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			<div className="relative z-10 w-full flex flex-col items-center">
			<motion.h2
				className="text-white font-bold text-xl sm:text-2xl md:text-3xl text-center mb-8"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0 }}
			>
				{pitchCopy.demo.placeholderTitle}
			</motion.h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl w-full">
				{pitchCopy.demo.screens.map((screen, i) => (
					<motion.div
						key={i}
						className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 sm:p-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.3,
							delay: 0.15 + i * 0.1,
							ease: [0.4, 0, 0.2, 1],
						}}
					>
						<p className="text-indigo-300 font-black text-sm sm:text-base uppercase tracking-wide">
							{screen.label}
						</p>
						<p className="text-white/90 text-sm sm:text-base mt-2">
							{screen.phrase}
						</p>
					</motion.div>
				))}
			</div>

			<motion.p
				className="text-white/60 text-sm mt-8 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 1.4 }}
			>
				Máximo 4 pantallas · 1 frase de valor por pantalla
			</motion.p>
			</div>
		</div>
	)
}
