'use client'

import { motion } from 'framer-motion'
import { SlidingNumber } from '@src/components/ui/sliding-number'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

/** Logos de los 3 laboratorios validados (Supabase storage) */
const LAB_LOGOS = [
	{
		name: 'Salud para todos',
		src: 'https://sbqepjsxnqtldyvlntqk.supabase.co/storage/v1/object/public/Logos/SALUD%20PARA%20TODOS%20(1).svg',
		alt: 'Salud para todos',
	},
	{
		name: 'Marihorgen',
		src: 'https://sbqepjsxnqtldyvlntqk.supabase.co/storage/v1/object/public/Logos/logo_marihorgen.svg',
		alt: 'Marihorgen',
	},
	{
		name: 'Conspat',
		src: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Conspat/logo_blanco.png',
		alt: 'Conspat',
	},
] as const

const CARD_STAGGER = 0.5
const CARD_DELAY_FIRST = 0.5
const NUM_DURATION = 1.2
// Las métricas entran después de las 3 cards, una por una
const INFO_STAGGER = 0.5
const INFO_DELAY_BASE = CARD_DELAY_FIRST + LAB_LOGOS.length * CARD_STAGGER

export function Evidencia() {
	const delayRow1 = INFO_DELAY_BASE
	const delayRow2 = INFO_DELAY_BASE + INFO_STAGGER

	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />

			<div className="relative z-10 flex flex-col items-center w-full">
				<motion.h2
					className="text-white font-bold text-lg sm:text-xl md:text-2xl text-center mb-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.45, delay: 0 }}
				>
					{pitchCopy.evidencia.title}
				</motion.h2>

				<div className="flex flex-wrap justify-center gap-8 sm:gap-10 mb-8">
					{LAB_LOGOS.map((lab, i) => (
					<motion.div
						key={lab.name}
						className="flex items-center justify-center"
						initial={{ opacity: 0, scale: 0.85, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{
							type: 'spring',
							stiffness: 280,
							damping: 22,
							delay: CARD_DELAY_FIRST + i * CARD_STAGGER,
						}}
					>
						<div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-2.5 overflow-hidden">
							<img
								src={lab.src}
								alt={lab.alt}
								className="w-full h-full object-contain"
							/>
						</div>
					</motion.div>
					))}
				</div>

				<div className="space-y-6 sm:space-y-8 max-w-2xl w-full">
					{/* 12–15 → 6–9 MIN */}
					<motion.div
						className="flex flex-col items-center"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.5,
							delay: delayRow1,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
					>
						<div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
							<span className="text-white/60 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
								12–15
							</span>
							<span className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">→</span>
							<span className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tabular-nums inline-flex items-baseline gap-0.5">
								<SlidingNumber from={0} to={6} duration={NUM_DURATION} delay={delayRow1} countStartsAfterVisible className="text-inherit" />
								<span>–</span>
								<SlidingNumber from={0} to={9} duration={NUM_DURATION} delay={delayRow1} countStartsAfterVisible className="text-inherit" />
								<span className="ml-1">MIN</span>
							</span>
						</div>
					</motion.div>

					{/* +200 HORAS / MES */}
					<motion.div
						className="flex flex-col items-center"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.5,
							delay: delayRow2,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
					>
						<div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
							<span className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tabular-nums inline-flex items-baseline">
								<SlidingNumber from={0} to={200} duration={NUM_DURATION} delay={delayRow2} prefix="+" countStartsAfterVisible className="text-inherit" />
								<span className="ml-1">HORAS / MES</span>
							</span>
						</div>
						<p className="text-white/70 text-sm sm:text-base mt-1">tiempo recuperado</p>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
