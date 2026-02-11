'use client'

import { motion } from 'framer-motion'
import { slideBg } from '@src/lib/slideTheme'

const DEMO_VIDEO_URL =
	'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/videos/DemoSolHub.mp4'

export function Demo() {
	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			<div className="relative z-10 w-full max-w-4xl flex items-center justify-center flex-1 min-h-0 py-4">
				<motion.div
					className="w-full rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black"
					style={{ aspectRatio: '16/9', minHeight: '280px', maxHeight: 'min(70vh, 560px)' }}
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<video
						src={DEMO_VIDEO_URL}
						controls
						className="w-full h-full object-contain block"
						playsInline
						preload="auto"
						autoPlay
						muted
						loop
						style={{ minHeight: '240px' }}
					>
						Tu navegador no soporta la reproducción de video.
					</video>
				</motion.div>
			</div>
		</div>
	)
}
