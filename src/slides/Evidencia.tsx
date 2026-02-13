'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { SlidingNumber } from '@src/components/ui/sliding-number'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

/** Logos de los 4 centros de salud validados */
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
	{
		name: 'Cendilab',
		src: '/logo-cendilab.png',
		alt: 'Cendilab',
	},
] as const

const CARD_STAGGER = 0.5
const CARD_DELAY_FIRST = 0.5
const NUM_DURATION = 1.2
const EXIT_DURATION = 0.4

interface EvidenciaProps {
	phase?: number
}

export function Evidencia({ phase = 0 }: EvidenciaProps) {
	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />

			<div className="relative z-10 flex flex-col items-center w-full">
				<AnimatePresence mode="wait">
					{/* Fase 0: título + logos (más grandes) */}
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
								className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tv:text-5xl tv-4k:text-6xl text-center mb-6 sm:mb-8"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.45, delay: 0 }}
							>
								{pitchCopy.evidencia.title}
							</motion.h2>
							<div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 tv:gap-14 max-w-4xl tv:max-w-5xl">
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
									<div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 tv:w-52 tv:h-52 tv-4k:w-60 tv-4k:h-60 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-3 overflow-hidden">
										<img
											src={lab.src}
											alt={lab.alt}
											className={`w-full h-full object-contain ${lab.name === 'Cendilab' ? 'invert' : ''}`}
										/>
									</div>
								</motion.div>
							))}
							</div>
						</motion.div>
					)}

					{/* Fase 1: 1) Título "tiempo recuperado"  2) 12-15 → 6-9  3) +200 + encoger primero */}
					{phase === 1 && (
						<motion.div
							key="phase1"
							className="flex flex-col items-center justify-center gap-6 sm:gap-8 tv:gap-10 w-full max-w-2xl tv:max-w-4xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							{/* Título: TIEMPO RECUPERADO — mismo estilo que fase 0 */}
							<motion.h2
								className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tv:text-5xl tv-4k:text-6xl text-center mb-6 sm:mb-8"
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.15 }}
							>
								TIEMPO RECUPERADO
							</motion.h2>

							{/* Primera data: 1) 12-15 aparece  2) →6-9 + línea roja  3) se encoge cuando sale +200 */}
							<motion.div
								className="flex flex-col items-center"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{
									opacity: [0, 1, 1, 0.85],
									scale: [0.9, 1, 1, 0.6],
								}}
								transition={{
									duration: 2.5,
									times: [0, 0.2, 0.62, 1],
									ease: ['easeOut', 'easeOut', [0.25, 0.46, 0.45, 0.94]],
								}}
							>
								<div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
									{/* 12-15: aparece después del título */}
									<motion.span
										className="relative inline-block text-white/60 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tv:text-5xl tv-4k:text-6xl"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.35, delay: 0.5 }}
									>
										12–15
										{/* Línea roja: aparece cuando sale 6-9 */}
										<motion.span
											className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500 -translate-y-1/2 origin-left pointer-events-none"
											initial={{ scaleX: 0 }}
											animate={{ scaleX: 1 }}
											transition={{ duration: 0.3, delay: 1.1 }}
										/>
									</motion.span>
									{/* → y 6-9 MIN: aparecen después de 12-15 */}
									<motion.span
										className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tv:text-5xl tv-4k:text-6xl inline-flex items-baseline gap-1"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.4, delay: 1.0 }}
									>
										→
									</motion.span>
									<motion.span
										className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tv:text-6xl tv-4k:text-7xl tabular-nums inline-flex items-baseline gap-0.5"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.4, delay: 1.0 }}
									>
										<SlidingNumber from={0} to={6} duration={NUM_DURATION} delay={1.25} countStartsAfterVisible className="text-inherit" />
										<span>–</span>
										<SlidingNumber from={0} to={9} duration={NUM_DURATION} delay={1.25} countStartsAfterVisible className="text-inherit" />
										<span className="ml-1">MIN</span>
									</motion.span>
								</div>
							</motion.div>

							{/* Segunda data: +200 — sale último, al mismo tiempo que el primero se encoge */}
							<motion.div
								className="flex flex-col items-center"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.5,
									delay: 1.6,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
							>
								<div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
									<span className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tv:text-6xl tv-4k:text-7xl tabular-nums inline-flex items-baseline">
										<SlidingNumber from={0} to={200} duration={NUM_DURATION} delay={2.0} prefix="+" countStartsAfterVisible className="text-inherit" />
										<span className="ml-1">HORAS / MES</span>
									</span>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
