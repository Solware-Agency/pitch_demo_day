import EyeTrackingComponent from '@src/components/RobotTraking'
import { slideBg } from '@src/lib/slideTheme'

const LOGO_SOLHUB_URL =
	'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/SolHub/SolHub_ORIG%20-%20SIN%20ESLOGAN.svg'

export function Portada() {
	return (
		<div className={`${slideBg.portada} w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			{/* Solwy (mascota) - esquina inferior derecha, con glow pulse detrás */}
			<div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-24 aspect-[647.42/831.52] pointer-events-none z-10 flex items-center justify-center">
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full animate-solwy-glow-pulse"
					style={{
						background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)',
					}}
				/>
				<div className="relative w-full h-full">
					<EyeTrackingComponent className="w-full h-full opacity-90" />
				</div>
			</div>
			<div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
				<div className="mb-4 sm:mb-6 lg:mb-8">
					<img
						src={LOGO_SOLHUB_URL}
						alt="SolHub"
						className="h-24 sm:h-28 md:h-36 lg:h-44 xl:h-52 w-auto object-contain"
					/>
				</div>
				<h2 className="text-white/90 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold px-2 sm:px-4">
					Plataforma en la nube para gestionar tu centro de salud
				</h2>
			</div>
		</div>
	)
}
