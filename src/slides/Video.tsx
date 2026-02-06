// import { SlideTitle } from '@src/components/SlideTitle'
import { useRef, useEffect, useState } from 'react'

export function VideoPanel() {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isVideoReady, setIsVideoReady] = useState(false)
	const playPromiseRef = useRef<Promise<void> | null>(null)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		// Función para manejar cuando el video está listo
		const handleCanPlay = () => {
			setIsVideoReady(true)
		}

		// Función para manejar cuando el video puede empezar a reproducirse
		const handleCanPlayThrough = () => {
			if (isVideoReady && video.paused) {
				// Cancelar cualquier promesa de reproducción anterior
				if (playPromiseRef.current) {
					playPromiseRef.current.catch(() => {}) // Ignorar errores de promesas canceladas
				}

				// Iniciar reproducción de forma segura
				playPromiseRef.current = video.play()
				playPromiseRef.current.catch((error) => {
					// Solo mostrar errores que no sean de interrupción
					if (error.name !== 'AbortError') {
						console.error('Error al reproducir video:', error)
					}
				})
			}
		}

		// Agregar event listeners
		video.addEventListener('canplay', handleCanPlay)
		video.addEventListener('canplaythrough', handleCanPlayThrough)

		// Cleanup: pausar el video cuando el componente se desmonta
		return () => {
			// Cancelar cualquier promesa de reproducción pendiente
			if (playPromiseRef.current) {
				playPromiseRef.current.catch(() => {}) // Ignorar errores de promesas canceladas
			}

			if (video) {
				video.pause()
				video.currentTime = 0 // Resetear al inicio
			}

			// Remover event listeners
			video.removeEventListener('canplay', handleCanPlay)
			video.removeEventListener('canplaythrough', handleCanPlayThrough)
		}
	}, [isVideoReady])

	return (
		<div className="bg-gradient-to-br from-indigo-900 to-indigo-950 w-screen h-screen flex flex-col justify-center p-6 relative">
			{/* <SlideTitle title="La fórmula SolHub" gradientColor="from-green-400 to-blue-400" /> */}

			{/* Video de demostración */}
			<div className="flex items-center justify-center z-50">
				<div className="relative w-full max-w-7xl">
					<video
						ref={videoRef}
						className="w-full h-auto rounded-lg shadow-2xl border-2 border-white/20"
						loop
						muted
						playsInline
						preload="metadata"
					>
						<source src="/video.mp4" type="video/mp4" />
						Tu navegador no soporta el elemento de video.
					</video>

					{/* Indicador de carga */}
					{!isVideoReady && (
						<div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
							<div className="flex flex-col items-center space-y-4">
								<div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
								<p className="text-white text-lg font-medium">Cargando video...</p>
							</div>
						</div>
					)}

					<div className="absolute bottom-2 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
						<h3 className="text-white text-md lg:text-lg font-semibold mb-2">Demostración en vivo de SolHub</h3>
					</div>
				</div>
			</div>

			{/* Elementos decorativos */}
			<div className="absolute top-20 right-20 w-16 h-16 bg-green-400/20 rounded-full animate-ping"></div>
			<div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse"></div>
			<div className="absolute top-1/3 right-10 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
		</div>
	)
}
