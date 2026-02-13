'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { ChevronLeft, ChevronRight, Home, Maximize, Minimize, Play, Pause, Timer } from 'lucide-react'

interface DeckControlsProps {
	slideActual: number
	totalSlides: number
	onCambiarSlide: (slide: number) => void
	onToggleInteractividad?: () => void
	participantes?: number
	/** Cuando true, el botón Next no se deshabilita en el último slide (ej. Cierre con fases) */
	canAdvanceOnLastSlide?: boolean
}

function formatTime(seconds: number): string {
	const m = Math.floor(seconds / 60)
	const s = seconds % 60
	return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function DeckControls({
	slideActual,
	totalSlides,
	onCambiarSlide,
	canAdvanceOnLastSlide = false,
}: DeckControlsProps) {
	const [pantallaCompleta, setPantallaCompleta] = useState(false)
	const [menuAbierto, setMenuAbierto] = useState(false)
	const [timerRunning, setTimerRunning] = useState(false)
	const [timerSeconds, setTimerSeconds] = useState(0)
	const [timerTarget, setTimerTarget] = useState<number | null>(null)
	const [timerInput, setTimerInput] = useState('')
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const menuRef = useRef<HTMLDivElement>(null)

	const togglePantallaCompleta = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen()
			setPantallaCompleta(true)
		} else {
			document.exitFullscreen()
			setPantallaCompleta(false)
		}
	}

	const parseTimerInput = (raw: string): number => {
		const digits = raw.replace(/\D/g, '')
		if (digits.length === 0) return 0
		const sec = parseInt(digits.slice(-2) || '0', 10) % 60
		const min = parseInt(digits.slice(0, -2) || '0', 10)
		return min * 60 + sec
	}

	const handleTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value.replace(/\D/g, '').slice(0, 5)
		if (v.length === 0) {
			setTimerInput('')
			return
		}
		const sec = parseInt(v.slice(-2) || '0', 10) % 60
		const min = parseInt(v.slice(0, -2) || '0', 10)
		setTimerInput(`${min}:${sec.toString().padStart(2, '0')}`)
	}

	const startTimer = () => {
		const total = parseTimerInput(timerInput)
		if (total > 0) {
			setTimerTarget(total)
			setTimerSeconds(0)
		} else {
			setTimerTarget(null)
		}
		setTimerRunning(true)
	}

	const stopTimer = () => {
		setTimerRunning(false)
		if (timerRef.current) {
			clearInterval(timerRef.current)
			timerRef.current = null
		}
	}

	const resetTimer = () => {
		stopTimer()
		setTimerSeconds(0)
		setTimerTarget(null)
		setTimerInput('')
	}

	useEffect(() => {
		if (!timerRunning) return
		timerRef.current = setInterval(() => {
			setTimerSeconds((prev) => {
				const next = prev + 1
				if (timerTarget !== null && next >= timerTarget) {
					setTimerRunning(false)
					if (timerRef.current) {
						clearInterval(timerRef.current)
						timerRef.current = null
					}
					return timerTarget
				}
				return next
			})
		}, 1000)
		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
		}
	}, [timerRunning, timerTarget])

	// Sincronizar estado fullscreen con el navegador
	useEffect(() => {
		const onFullscreenChange = () => {
			setPantallaCompleta(!!document.fullscreenElement)
		}
		document.addEventListener('fullscreenchange', onFullscreenChange)
		return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
	}, [])

	// Navegación por teclado
	useEffect(() => {
		const manejarTecla = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowLeft':
					if (slideActual > 0) onCambiarSlide(slideActual - 1)
					break
				case 'ArrowRight':
				case ' ':
					e.preventDefault()
					if (slideActual < totalSlides - 1 || canAdvanceOnLastSlide) onCambiarSlide(slideActual + 1)
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
	}, [slideActual, totalSlides, onCambiarSlide, canAdvanceOnLastSlide])

	// Cerrar menú al hacer click fuera
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuAbierto(false)
			}
		}
		if (menuAbierto) {
			document.addEventListener('click', handleClickOutside)
		}
		return () => document.removeEventListener('click', handleClickOutside)
	}, [menuAbierto])

	return (
		<>
			{/* Zona de activación - abajo izquierda, invisible, hover/click para mostrar menú */}
			<div
				ref={menuRef}
				className="fixed bottom-4 left-4 z-[100] group flex flex-col items-start min-h-[220px] min-w-[200px] lg:scale-110 tv:scale-150 tv-4k:scale-175 tv:origin-bottom-left tv-4k:origin-bottom-left"
			>
				{/* Área invisible para hover/click - esquina inferior izquierda */}
				<button
					type="button"
					className="absolute bottom-0 left-0 w-14 h-14 cursor-pointer rounded-lg"
					onClick={() => setMenuAbierto((o) => !o)}
					aria-label="Abrir menú de controles"
				/>

				{/* Mini menú - aparece en el mismo lugar que la zona de activación */}
				<div
					className={`
						absolute bottom-0 left-0
						bg-card/95 border border-border rounded-xl shadow-xl backdrop-blur-md
						p-3 min-w-[180px] space-y-3
						transition-opacity duration-200
						${menuAbierto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
						group-hover:opacity-100 group-hover:pointer-events-auto
					`}
				>
					{/* Fullscreen - solo icono */}
					<div className="flex items-center justify-end">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8"
							onClick={togglePantallaCompleta}
							aria-label="Pantalla completa"
						>
							{pantallaCompleta ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
						</Button>
					</div>

					{/* Paginación */}
					<div className="flex items-center justify-between gap-2 pt-2 border-t">
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => onCambiarSlide(0)}
								disabled={slideActual === 0}
							>
								<Home className="w-4 h-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => onCambiarSlide(slideActual - 1)}
								disabled={slideActual === 0}
							>
								<ChevronLeft className="w-4 h-4" />
							</Button>
							<span className="px-2 py-1 text-sm font-medium min-w-[48px] text-center tabular-nums">
								{slideActual + 1} / {totalSlides}
							</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => onCambiarSlide(slideActual + 1)}
								disabled={slideActual === totalSlides - 1 && !canAdvanceOnLastSlide}
							>
								<ChevronRight className="w-4 h-4" />
							</Button>
						</div>
					</div>

					{/* Timer - input único MM:SS */}
					<div className="pt-2 border-t space-y-2">
						<div className="flex items-center gap-2">
							<Timer className="w-4 h-4 text-muted-foreground" />
							<Input
								placeholder="0:00"
								className="w-20 h-8 text-center text-sm font-mono tabular-nums"
								value={timerInput}
								onChange={handleTimerInputChange}
								onFocus={(e) => e.target.select()}
								disabled={timerRunning}
							/>
						</div>
						<div className="flex gap-1">
							<Button
								variant="outline"
								size="sm"
								className="flex-1 h-8"
								onClick={timerRunning ? stopTimer : startTimer}
							>
								{timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="h-8"
								onClick={resetTimer}
							>
								Reset
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Timer visible en pantalla cuando corre */}
			{(timerRunning || timerSeconds > 0) && (
				<div className="fixed bottom-4 left-4 z-[90] font-mono text-lg lg:text-xl tv:text-2xl tv-4k:text-3xl text-white/90 bg-black/40 backdrop-blur-sm px-3 py-2 lg:px-4 lg:py-3 rounded-lg tabular-nums lg:scale-110 tv:scale-150 tv-4k:scale-175 tv:origin-bottom-left tv-4k:origin-bottom-left">
					{timerTarget !== null ? (
						<span>
							{formatTime(timerSeconds)} / {formatTime(timerTarget)}
						</span>
					) : (
						<span>{formatTime(timerSeconds)}</span>
					)}
				</div>
			)}
		</>
	)
}
