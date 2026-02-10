'use client'

import type { MotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { SiWhatsapp, SiGmail, SiAdobeacrobatreader } from 'react-icons/si'
import { BsFileEarmarkText } from 'react-icons/bs'
import { FaFolder } from 'react-icons/fa'
import { RiFileExcel2Line } from 'react-icons/ri'
import { FloatingLinesBackground } from '@src/components/FloatingLines'
import { pitchCopy } from '@src/lib/pitchCopy'
import { slideBg } from '@src/lib/slideTheme'

/** Iconos reales: WhatsApp, Gmail, PDF, Papel, Excel, Carpeta */
const ICONS = [
	{ Icon: SiWhatsapp, label: 'WhatsApp' },
	{ Icon: SiGmail, label: 'Gmail' },
	{ Icon: SiAdobeacrobatreader, label: 'PDF' },
	{ Icon: BsFileEarmarkText, label: 'Papel' },
	{ Icon: RiFileExcel2Line, label: 'Excel' },
	{ Icon: FaFolder, label: 'Carpeta' },
]

const ORBIT_RADIUS_MIN = 200
const ORBIT_RADIUS_MAX = 320
const ORBIT_DURATION = 40

// Radio un poco distinto por icono para que no estén todos en el mismo anillo
const RADIUS_OFFSETS = [0, 18, -12, 25, -8, 15]

function OrbitingIcon({
	orbitAngle,
	index,
	Icon,
}: {
	orbitAngle: MotionValue<number>
	index: number
	Icon: (props: { className?: string }) => React.ReactElement
}) {
	const radius = ORBIT_RADIUS_MIN + (ORBIT_RADIUS_MAX - ORBIT_RADIUS_MIN) * (index / (ICONS.length - 1)) + (RADIUS_OFFSETS[index] ?? 0)
	const baseAngleDeg = index * 60
	const baseAngleRad = (baseAngleDeg * Math.PI) / 180
	const x = radius * Math.cos(baseAngleRad)
	const y = radius * Math.sin(baseAngleRad)
	const counterRotate = useTransform(orbitAngle, (v) => -(v + baseAngleDeg))
	return (
		<motion.div
			className="absolute left-0 top-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-xl"
			style={{
				translateX: x,
				translateY: y,
				rotate: counterRotate,
			}}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{
				opacity: 1,
				scale: 1,
			}}
			transition={{
				opacity: { duration: 0.35, delay: 0.9 + index * 0.2 },
				scale: { type: 'spring', stiffness: 320, damping: 22, delay: 0.9 + index * 0.2 },
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

	useEffect(() => {
		const controls = animate(orbitAngle, 360, {
			duration: ORBIT_DURATION,
			repeat: Infinity,
			ease: 'linear',
		})
		return () => controls.stop()
	}, [orbitAngle])

	return (
		<div className={`${slideBg.base} w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden min-h-dvh`}>
			<FloatingLinesBackground />
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

					{/* Wrapper que rota: las piezas orbitan alrededor del título */}
					<motion.div
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none"
						style={{ rotate: orbitAngle }}
					>
					{ICONS.map(({ Icon }, i) => (
						<OrbitingIcon key={i} orbitAngle={orbitAngle} index={i} Icon={Icon as (props: { className?: string }) => React.ReactElement} />
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
