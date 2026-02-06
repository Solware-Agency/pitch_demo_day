'use client'

import { useState, useEffect } from 'react'
import { Button } from '@src/components/ui/button'
import { Progress } from '@src/components/ui/progress'
import { ChevronLeft, ChevronRight, Home, Maximize, Minimize } from 'lucide-react'
import { cn } from '@src/lib/utils'

interface DeckControlsProps {
	slideActual: number
	totalSlides: number
	onCambiarSlide: (slide: number) => void
	onToggleInteractividad: () => void
	participantes?: number
}

const secciones = [
	{ nombre: 'Portada', slide: 0 },
	{ nombre: 'Problema', slide: 2 },
	{ nombre: 'Solución', slide: 4 },
	{ nombre: 'Mercado', slide: 7 },
	{ nombre: 'Negocio', slide: 9 },
	{ nombre: 'Equipo', slide: 12 },
]

export function DeckControls({ slideActual, totalSlides, onCambiarSlide }: DeckControlsProps) {
	const [pantallaCompleta, setPantallaCompleta] = useState(false)
	const [mostrarMiniMapa, setMostrarMiniMapa] = useState(false)

	const progreso = ((slideActual + 1) / totalSlides) * 100

	// Navegación por teclado
	useEffect(() => {
		const manejarTecla = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowLeft':
					if (slideActual > 0) onCambiarSlide(slideActual - 1)
					break
				case 'ArrowRight':
				case ' ': // Tecla espacio
					e.preventDefault()
					if (slideActual < totalSlides - 1) onCambiarSlide(slideActual + 1)
					break
				case 'Home':
					onCambiarSlide(0)
					break
				case 'End':
					onCambiarSlide(totalSlides - 1)
					break
				case 'f':
				case 'F11':
					e.preventDefault()
					togglePantallaCompleta()
					break
			}
		}

		window.addEventListener('keydown', manejarTecla)
		return () => window.removeEventListener('keydown', manejarTecla)
	}, [slideActual, totalSlides, onCambiarSlide])

	const togglePantallaCompleta = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen()
			setPantallaCompleta(true)
		} else {
			document.exitFullscreen()
			setPantallaCompleta(false)
		}
	}

	return (
		<>
			{/* Contenedor con hover para mostrar barra superior */}
			<Progress value={progreso} className="h-1 rounded-none" />
			<div className="relative z-40 group">
				{/* Barra de progreso superior - aparece con hover */}
				<div className="relative z-[9999999999999999] bg-background backdrop-blur-sm border-b">
					<div className="flex items-center justify-between px-4 py-2">
						<div className="flex items-center space-x-4">
							<span className="hidden lg:block text-sm font-medium">
								{slideActual + 1} / {totalSlides}
							</span>
							<div className="flex lg:hidden items-center space-x-2 bg-card p-2">
								<Button variant="ghost" size="sm" onClick={() => onCambiarSlide(0)} disabled={slideActual === 0}>
									<Home className="w-4 h-4" />
								</Button>

								<Button
									variant="ghost"
									size="sm"
									onClick={() => onCambiarSlide(slideActual - 1)}
									disabled={slideActual === 0}
								>
									<ChevronLeft className="w-4 h-4" />
								</Button>

								<span className="px-4 py-2 text-sm font-medium min-w-[80px] text-center">
									{slideActual + 1} / {totalSlides}
								</span>

								<Button
									variant="ghost"
									size="sm"
									onClick={() => onCambiarSlide(slideActual + 1)}
									disabled={slideActual === totalSlides - 1}
								>
									<ChevronRight className="w-4 h-4" />
								</Button>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							{/* <Button
								variant="ghost"
								size="sm"
								onClick={onToggleInteractividad}
								className="flex items-center space-x-2"
							>
								<Users className="w-4 h-4" />
								<span>{participantes}</span>
							</Button> */}

							<Button variant="ghost" size="sm" onClick={togglePantallaCompleta}>
								{pantallaCompleta ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Mini-mapa de secciones */}
			{mostrarMiniMapa && (
				<div className="fixed top-16 left-4 z-50 bg-card border rounded-lg shadow-lg p-4 w-64">
					<h3 className="font-semibold mb-3">Secciones</h3>
					<div className="space-y-2">
						{secciones.map((seccion) => (
							<button
								key={seccion.slide}
								onClick={() => {
									onCambiarSlide(seccion.slide)
									setMostrarMiniMapa(false)
								}}
								className={cn(
									'w-full text-left px-3 py-2 rounded text-sm transition-colors',
									slideActual >= seccion.slide &&
										slideActual < (secciones[secciones.indexOf(seccion) + 1]?.slide || totalSlides)
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-muted',
								)}
							>
								{seccion.nombre}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Contenedor con hover para mostrar controles */}
			<div className="fixed bottom-0 left-0 right-0 h-20 z-40 group w-full max-w-xs mx-auto">
				{/* Controles de navegación inferiores - aparecen con hover CSS puro */}
				<div className="hidden lg:flex fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
					<div className="flex items-center space-x-2 bg-card border rounded-lg shadow-lg p-2">
						<Button variant="ghost" size="sm" onClick={() => onCambiarSlide(0)} disabled={slideActual === 0}>
							<Home className="w-4 h-4" />
						</Button>

						<Button
							variant="ghost"
							size="sm"
							onClick={() => onCambiarSlide(slideActual - 1)}
							disabled={slideActual === 0}
						>
							<ChevronLeft className="w-4 h-4" />
						</Button>

						<span className="px-4 py-2 text-sm font-medium min-w-[80px] text-center">
							{slideActual + 1} / {totalSlides}
						</span>

						<Button
							variant="ghost"
							size="sm"
							onClick={() => onCambiarSlide(slideActual + 1)}
							disabled={slideActual === totalSlides - 1}
						>
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
