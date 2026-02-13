'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import EyeTrackingComponent from '@src/components/RobotTraking'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

export function QuizFinal() {
	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />

			<div className="relative z-10 flex flex-col items-center justify-center w-full">
				{/* Isotipo + QR + Solwy lado a lado */}
				<motion.div
					className="flex flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
				>
					{/* Isotipo SolHub a la izquierda del QR — mismo tamaño que Solwy, con glow */}
					<div className="relative w-24 sm:w-28 md:w-32 tv:w-40 tv-4k:w-48 aspect-square pointer-events-none flex items-center justify-center shrink-0">
						<div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-15 z-0" />
						<div className="relative w-full h-full z-[1] flex items-center justify-center p-1">
							<Image
								src="/solhub-isotipo.png"
								alt="SolHub"
								width={128}
								height={128}
								className="w-full h-full object-contain"
								priority
							/>
						</div>
					</div>
					<div className="rounded-xl overflow-hidden bg-white p-3 shadow-2xl flex-shrink-0 tv:scale-125 tv-4k:scale-150 origin-center">
						<Image
							src="/qr-quiz-solware.png"
							alt="QR Quiz Solware"
							width={200}
							height={200}
							className="object-contain"
							priority
						/>
					</div>
					{/* Solwy al lado del QR */}
					<div className="relative w-24 sm:w-28 md:w-32 tv:w-40 tv-4k:w-48 aspect-[647.42/831.52] pointer-events-none flex items-center justify-center shrink-0">
						<div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse z-0" />
						<div className="relative w-full h-full z-[1]">
							<EyeTrackingComponent className="w-full h-full opacity-90" />
						</div>
					</div>
				</motion.div>

				{/* Nombres */}
				<motion.p
					className="mt-8 text-white/80 text-center text-base sm:text-lg tv:text-xl tv-4k:text-2xl font-semibold"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					{pitchCopy.quizFinal.signature}
				</motion.p>
			</div>
		</div>
	)
}
