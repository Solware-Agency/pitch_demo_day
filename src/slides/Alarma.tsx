'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { SiWhatsapp, SiGmail, SiGoogledrive } from 'react-icons/si'
import { slideBg } from '@src/lib/slideTheme'

const ICON_MAP = {
	WhatsApp: SiWhatsapp,
	Gmail: SiGmail,
	Drive: SiGoogledrive,
} as const

const NOTIFICACIONES = [
	{ label: 'WhatsApp', initialCount: 3 },
	{ label: 'Gmail', initialCount: 4 },
	{ label: 'Drive', initialCount: 2 },
] as const

const STAGGER = 0.8
const NUM_INCREMENT_INTERVAL = 2200

/** Número que sube de 0 a initial, luego sigue incrementando */
function IncrementingNumber({
	delay,
	initialCount,
	className,
}: {
	delay: number
	initialCount: number
	className?: string
}) {
	const [value, setValue] = useState(0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		let cancelled = false
		let controls: { stop: () => void } | null = null
		const startTimer = setTimeout(() => {
			// Primera animación: 0 → initialCount
			controls = animate(0, initialCount, {
				duration: 1.2,
				ease: 'easeOut',
				onUpdate: (v) => !cancelled && setValue(Math.round(v)),
				onComplete: () => {
					if (cancelled) return
					// Luego sigue subiendo cada NUM_INCREMENT_INTERVAL ms
					intervalRef.current = setInterval(() => {
						setValue((prev) => prev + 1)
					}, NUM_INCREMENT_INTERVAL)
				},
			})
		}, delay * 1000)
		return () => {
			cancelled = true
			clearTimeout(startTimer)
			controls?.stop()
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [delay, initialCount])

	return (
		<motion.span
			className={className}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay }}
		>
			{value}
		</motion.span>
	)
}

export function Alarma() {
	const audioPlayed = useRef(false)

	useEffect(() => {
		if (audioPlayed.current) return
		audioPlayed.current = true
		const playAlarm = async () => {
			try {
				const audio = new Audio('/alarm.mp3')
				audio.volume = 0.7
				await audio.play()
			} catch {
				// Fallback: alarma tipo iPhone con Web Audio API (beep-beep pulsante)
				try {
					const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
					const ctx = new AudioCtx()
					const playBeep = (t: number) => {
						const osc1 = ctx.createOscillator()
						const osc2 = ctx.createOscillator()
						const gain = ctx.createGain()
						osc1.connect(gain)
						osc2.connect(gain)
						gain.connect(ctx.destination)
						osc1.frequency.value = 880
						osc2.frequency.value = 1320 // armónico para sonido más rico
						osc1.type = 'sine'
						osc2.type = 'sine'
						gain.gain.setValueAtTime(0, t)
						gain.gain.linearRampToValueAtTime(0.2, t + 0.02)
						gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22)
						osc1.start(t)
						osc2.start(t)
						osc1.stop(t + 0.22)
						osc2.stop(t + 0.22)
					}
					// Patrón: beep-beep pausa beep-beep (como alarma típica)
					const t0 = ctx.currentTime
					playBeep(t0)
					playBeep(t0 + 0.12)
					setTimeout(() => {
						playBeep(ctx.currentTime)
						playBeep(ctx.currentTime + 0.12)
					}, 450)
				} catch {
					/* nada */
				}
			}
		}
		playAlarm()
	}, [])

	return (
		<div className={`${slideBg.base} w-full min-h-dvh flex flex-col items-center justify-center px-4 py-4 sm:py-6 relative overflow-hidden`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			{/* Marco del teléfono */}
			<motion.div
				className="relative z-10 w-[min(320px,90vw)] tv:scale-125 tv-4k:scale-150 origin-center"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
			>
				<div className="rounded-[3rem] p-3 sm:p-4 bg-black shadow-2xl border border-neutral-800 shadow-black/50">
					{/* Notch estilo iPhone */}
					<div className="h-7 w-28 mx-auto rounded-b-2xl bg-black mb-[-0.5rem] relative z-10 border-b border-neutral-800" />
					{/* Pantalla del teléfono - wallpaper con formas sutiles */}
					<div
						className="rounded-[2rem] overflow-hidden aspect-[9/19.5] min-h-[420px] flex flex-col relative"
						style={{ background: '#0a0c12' }}
					>
						{/* Formas decorativas tipo wallpaper abstracto */}
						<div className="absolute inset-0 pointer-events-none">
							<div
								className="absolute w-48 h-48 rounded-full opacity-30"
								style={{
									top: '5%',
									left: '-10%',
									background: 'radial-gradient(circle, rgba(100,120,200,0.4) 0%, transparent 70%)',
								}}
							/>
							<div
								className="absolute w-32 h-32 rounded-full opacity-25"
								style={{
									top: '35%',
									right: '-5%',
									background: 'radial-gradient(circle, rgba(80,140,200,0.35) 0%, transparent 70%)',
								}}
							/>
							<div
								className="absolute w-40 h-40 rounded-full opacity-20"
								style={{
									bottom: '20%',
									left: '20%',
									background: 'radial-gradient(circle, rgba(120,80,180,0.3) 0%, transparent 70%)',
								}}
							/>
							<div
								className="absolute w-24 h-24 rounded-full opacity-20"
								style={{
									top: '55%',
									right: '15%',
									background: 'radial-gradient(circle, rgba(60,100,160,0.35) 0%, transparent 70%)',
								}}
							/>
							{/* Líneas sutiles */}
							<div
								className="absolute w-full h-px opacity-10"
								style={{
									top: '28%',
									left: 0,
									background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
								}}
							/>
							<div
								className="absolute w-px h-24 opacity-10"
								style={{
									top: '45%',
									right: '12%',
									background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)',
								}}
							/>
						</div>

						{/* Hora - posición tipo iPhone (arriba, centrado) */}
						<div className="relative z-10 pt-14 pb-4 flex flex-col items-center">
							<motion.p
								className="text-white text-6xl sm:text-7xl font-extralight tracking-tight tabular-nums"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.3 }}
							>
								6:00
							</motion.p>
						</div>

						{/* Notificaciones - una a una, abajo como en un móvil */}
						<div className="relative z-10 flex-1 flex flex-col justify-end gap-2 pb-8 px-4 pt-4">
							{NOTIFICACIONES.map(({ label, initialCount }, i) => {
								const Icon = ICON_MAP[label]
								const delay = 1.2 + i * STAGGER
								return (
									<motion.div
										key={label}
										className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3 backdrop-blur-md border border-white/10"
										initial={{ opacity: 0, x: -24 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.5,
											delay,
											ease: [0.25, 0.46, 0.45, 0.94],
										}}
									>
										<Icon className="w-6 h-6 text-white shrink-0" />
										<span className="text-white/95 text-sm font-medium flex-1">{label}</span>
										<IncrementingNumber
											delay={delay}
											initialCount={initialCount}
											className="text-white font-semibold text-sm tabular-nums"
										/>
									</motion.div>
								)
							})}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
