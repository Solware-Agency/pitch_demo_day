import Image from 'next/image'
import EyeTrackingComponent from '@src/components/RobotTraking'
import { slideBg } from '@src/lib/slideTheme'

const LOGO_SOLHUB_URL =
	'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/SolHub/SolHub_ORIG.svg'

export function Portada() {
	return (
		<div className={`${slideBg.portada} w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			{/* Logo emprendeTECH arriba a la izquierda */}
			<div className="absolute top-4 left-4 sm:top-6 sm:left-6 tv:top-8 tv:left-8 z-20">
				<Image
					src="/emprende-tech-transparent.png"
					alt="emprendeTECH"
					width={280}
					height={168}
					className="h-20 sm:h-24 md:h-28 lg:h-36 xl:h-40 tv:h-48 tv-4k:h-56 w-auto object-contain"
					priority
				/>
			</div>
			<div className="relative z-10 flex flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
				<img
					src={LOGO_SOLHUB_URL}
					alt="SolHub"
					className="h-24 sm:h-28 md:h-36 lg:h-48 xl:h-56 tv:h-72 tv-4k:h-96 w-auto object-contain"
				/>
				{/* Solwy (mascota) al lado del logo - mismo glow que dashboard Solhub_prod */}
				<div className="relative w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 tv:w-44 tv-4k:w-56 aspect-[647.42/831.52] pointer-events-none flex items-center justify-center shrink-0">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse z-0" />
					<div className="relative w-full h-full z-[1]">
						<EyeTrackingComponent className="w-full h-full opacity-90" />
					</div>
				</div>
			</div>
		</div>
	)
}
