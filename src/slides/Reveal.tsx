'use client'

import { motion } from 'framer-motion'
import EyeTrackingComponent from '@src/components/RobotTraking'
import { slideBg } from '@src/lib/slideTheme'

const LOGO_SOLHUB_SIN_ESLOGAN =
	'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/SolHub/SolHub_ORIG%20-%20SIN%20ESLOGAN.svg'

export function Reveal() {
	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			{/* Logo SolHub */}
			<motion.div
				className="flex items-center justify-center z-10"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<img
					src={LOGO_SOLHUB_SIN_ESLOGAN}
					alt="SolHub"
					className="w-auto object-contain h-24 sm:h-28 md:h-36 lg:h-48 xl:h-56 tv:h-72 tv-4k:h-96"
				/>
			</motion.div>

			{/* Solwy - mismo glow que dashboard Solhub_prod */}
			<motion.div
				className="absolute top-8 right-8 sm:right-12 lg:right-14 tv:right-16 tv-4k:right-20 w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 tv:w-44 tv-4k:w-56 aspect-[647.42/831.52] z-20 flex items-center justify-center"
				initial={{ opacity: 0, y: -80 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
			>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse z-0" />
				<div className="relative w-full h-full z-[1]">
					<EyeTrackingComponent className="w-full h-full" />
				</div>
			</motion.div>
		</div>
	)
}
