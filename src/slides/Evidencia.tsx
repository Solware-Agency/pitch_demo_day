'use client'

import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { FloatingLinesBackground } from '@src/components/FloatingLines'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

/** Logos de los 3 laboratorios validados (Supabase storage) */
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
] as const

const METRICS = [
	{ left: '2:00', right: '0:30', sub: '−75%' },
	{ left: '12–15', right: '6–9 MIN', sub: '' },
	{ left: null, right: '195 HORAS / MES', sub: 'tiempo recuperado' },
] as const

const COUNT_DURATION = 1.2
const ROW_DELAY_BASE = 0.7
const ROW_DELAY_STAGGER = 0.5

export function Evidencia() {
	const [sec30, setSec30] = useState(0)
	const [pct75, setPct75] = useState(0)
	const [min6, setMin6] = useState(0)
	const [min9, setMin9] = useState(0)
	const [hours195, setHours195] = useState(0)

	useEffect(() => {
		const delay0 = ROW_DELAY_BASE
		const delay1 = ROW_DELAY_BASE + ROW_DELAY_STAGGER
		const delay2 = ROW_DELAY_BASE + ROW_DELAY_STAGGER * 2

		const c1 = animate(0, 30, {
			duration: COUNT_DURATION,
			delay: delay0,
			ease: 'easeOut',
			onUpdate: (v) => setSec30(Math.round(v)),
		})
		const c2 = animate(0, 75, {
			duration: COUNT_DURATION,
			delay: delay0,
			ease: 'easeOut',
			onUpdate: (v) => setPct75(Math.round(v)),
		})
		const c3a = animate(0, 6, {
			duration: COUNT_DURATION * 0.6,
			delay: delay1,
			ease: 'easeOut',
			onUpdate: (v) => setMin6(Math.round(v)),
		})
		const c3b = animate(0, 9, {
			duration: COUNT_DURATION,
			delay: delay1,
			ease: 'easeOut',
			onUpdate: (v) => setMin9(Math.round(v)),
		})
		const c4 = animate(0, 195, {
			duration: COUNT_DURATION,
			delay: delay2,
			ease: 'easeOut',
			onUpdate: (v) => setHours195(Math.round(v)),
		})
		return () => {
			c1.stop()
			c2.stop()
			c3a.stop()
			c3b.stop()
			c4.stop()
		}
	}, [])

	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<FloatingLinesBackground />
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			<div className="relative z-10 flex flex-col items-center w-full">
			<motion.h2
				className="text-white font-bold text-lg sm:text-xl md:text-2xl text-center mb-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.45, delay: 0 }}
			>
				{pitchCopy.evidencia.title}
			</motion.h2>

			<motion.div
				className="flex flex-wrap justify-center gap-8 sm:gap-10 mb-8"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.45, delay: 0.25 }}
			>
				{LAB_LOGOS.map((lab, i) => (
					<motion.div
						key={lab.name}
						className="flex items-center justify-center"
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
					>
						<div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-2.5 overflow-hidden">
							<img
								src={lab.src}
								alt={lab.alt}
								className="w-full h-full object-contain"
							/>
						</div>
					</motion.div>
				))}
			</motion.div>

			<div className="space-y-6 sm:space-y-8 max-w-2xl w-full">
				{METRICS.map((metric, i) => (
					<motion.div
						key={i}
						className="flex flex-col items-center"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.5,
							delay: 0.7 + i * 0.5,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
					>
						<div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
							{metric.left !== null && (
								<>
									<span className="text-white/60 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
										{metric.left}
									</span>
									<span className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">
										→
									</span>
								</>
							)}
							<span className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tabular-nums">
								{i === 0 && `0:${sec30.toString().padStart(2, '0')}`}
								{i === 1 && `${min6}–${min9} MIN`}
								{i === 2 && `${hours195} HORAS / MES`}
							</span>
						</div>
						{metric.sub && (
							<p className="text-white/70 text-sm sm:text-base mt-1 tabular-nums">
								{i === 0 ? `−${pct75}%` : metric.sub}
							</p>
						)}
					</motion.div>
				))}
			</div>
			</div>
		</div>
	)
}
