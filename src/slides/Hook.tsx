'use client'

import type { MotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { SiWhatsapp, SiGmail, SiAdobeacrobatreader, SiGoogledrive } from 'react-icons/si'
import { BsFileEarmarkText } from 'react-icons/bs'
import { FaFolder, FaImage } from 'react-icons/fa'
import { RiFileExcel2Line } from 'react-icons/ri'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

/** Iconos reales: WhatsApp, Gmail, PDF, Papel, Excel, Carpeta, Drive, Imagen */
const ICONS = [
	{ Icon: SiWhatsapp, label: 'WhatsApp' },
	{ Icon: SiGmail, label: 'Gmail' },
	{ Icon: SiAdobeacrobatreader, label: 'PDF' },
	{ Icon: BsFileEarmarkText, label: 'Papel' },
	{ Icon: RiFileExcel2Line, label: 'Excel' },
	{ Icon: FaFolder, label: 'Carpeta' },
	{ Icon: SiGoogledrive, label: 'Drive' },
	{ Icon: FaImage, label: 'Imagen' },
]

const ORBIT_RADIUS_MIN = 240
const ORBIT_RADIUS_MAX = 420
const ORBIT_DURATION = 40

// Segunda espiral: anillo más interno
const ORBIT_RADIUS_MIN_2 = 70
const ORBIT_RADIUS_MAX_2 = 240

// Dispersión: cada icono a un radio un poco distinto para que no estén en un anillo perfecto
const RADIUS_OFFSETS = [0, 34, -28, 42, -24, 32, 20, -26]
const RADIUS_OFFSETS_2 = [0, 28, -20, 34, -16, 24, 14, -18]

// Tiempo entre la aparición de un icono y el siguiente (que se note uno a uno)
const STAGGER_DURATION = 0.5
// La segunda espiral empieza a aparecer después de que termine la primera (6 iconos)
const STAGGER_DELAY_SPIRAL_2 = ICONS.length * STAGGER_DURATION

function OrbitingIcon({
	orbitAngle,
	index,
	Icon,
	angleOffset = 0,
	radiusMin = ORBIT_RADIUS_MIN,
	radiusMax = ORBIT_RADIUS_MAX,
	radiusOffsets = RADIUS_OFFSETS,
	appearDelayOffset = 0,
}: {
	orbitAngle: MotionValue<number>
	index: number
	Icon: (props: { className?: string }) => React.ReactElement
	angleOffset?: number
	radiusMin?: number
	radiusMax?: number
	radiusOffsets?: number[]
	/** Segundos a sumar al delay de aparición (p.ej. para la segunda espiral) */
	appearDelayOffset?: number
}) {
	const radius = radiusMin + (radiusMax - radiusMin) * (index / (ICONS.length - 1)) + (radiusOffsets[index] ?? 0)
	const angleStep = 360 / ICONS.length
	const baseAngleDeg = index * angleStep + angleOffset
	const baseAngleRad = (baseAngleDeg * Math.PI) / 180
	const x = radius * Math.cos(baseAngleRad)
	const y = radius * Math.sin(baseAngleRad)
	const counterRotate = useTransform(orbitAngle, (v) => -(v + baseAngleDeg))
	const delay = 0.4 + appearDelayOffset + index * STAGGER_DURATION
	return (
		<motion.div
			className="absolute left-0 top-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-xl"
			style={{
				translateX: x,
				translateY: y,
				rotate: counterRotate,
			}}
			initial={{ opacity: 0, scale: 0.3 }}
			animate={{
				opacity: 1,
				scale: 1,
			}}
			transition={{
				opacity: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] },
				scale: { type: 'spring', stiffness: 280, damping: 20, delay },
			}}
		>
			<motion.span
				className="absolute flex items-center justify-center w-full h-full"
				animate={{ y: [0, -14, 10, -8, 0] }}
				transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
			>
				<motion.span
					className="flex items-center justify-center"
					animate={{ rotate: 360 }}
					transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
				>
					<Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white shrink-0" />
				</motion.span>
			</motion.span>
		</motion.div>
	)
}

export function Hook() {
	const orbitAngle = useMotionValue(0)
	const orbitAngleReverse = useMotionValue(0)

	useEffect(() => {
		const c1 = animate(orbitAngle, 360, {
			duration: ORBIT_DURATION,
			repeat: Infinity,
			ease: 'linear',
		})
		return () => c1.stop()
	}, [orbitAngle])

	useEffect(() => {
		const c2 = animate(orbitAngleReverse, -360, {
			duration: ORBIT_DURATION,
			repeat: Infinity,
			ease: 'linear',
		})
		return () => c2.stop()
	}, [orbitAngleReverse])

	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<div className="absolute inset-0 bg-[#0a0a0f]/60 z-[1]" aria-hidden />
			{/* Contenedor del título + centro de la órbita */}
			<div className="relative z-10 flex flex-col items-center">
				{/* Contenedor título + órbita para que el centro de la órbita sea el título */}
				<div className="relative min-h-[4em] flex items-center justify-center">
					<motion.h1
						className="text-center text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl px-4 relative z-10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4, delay: 0 }}
					>
						{pitchCopy.hook.headline}
					</motion.h1>

					{/* Espiral 1: anillo exterior, gira en un sentido */}
					<motion.div
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none z-[1]"
						style={{ rotate: orbitAngle }}
					>
						{ICONS.map(({ Icon }, i) => (
							<OrbitingIcon key={`a-${i}`} orbitAngle={orbitAngle} index={i} Icon={Icon as (props: { className?: string }) => React.ReactElement} />
						))}
					</motion.div>
					{/* Espiral 2: mismo diseño, anillo más interno, gira al revés */}
					<motion.div
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none z-[2]"
						style={{ rotate: orbitAngleReverse }}
					>
						{ICONS.map(({ Icon }, i) => (
							<OrbitingIcon
								key={`b-${i}`}
								orbitAngle={orbitAngleReverse}
								index={i}
								Icon={Icon as (props: { className?: string }) => React.ReactElement}
								angleOffset={30}
								radiusMin={ORBIT_RADIUS_MIN_2}
								radiusMax={ORBIT_RADIUS_MAX_2}
								radiusOffsets={RADIUS_OFFSETS_2}
								appearDelayOffset={STAGGER_DELAY_SPIRAL_2}
							/>
						))}
					</motion.div>
				</div>
			</div>

			<motion.p
				className="text-white/70 text-sm sm:text-base md:text-lg mt-8 sm:mt-12 text-center z-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 2.2 }}
			>
				{pitchCopy.hook.subline}
			</motion.p>
		</div>
	)
}
