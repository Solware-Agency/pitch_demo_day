'use client'

import { useEffect, useRef } from 'react'
import { motion, animate } from 'framer-motion'
import { cn } from '@src/lib/utils'

type SlidingNumberProps = {
	from?: number
	to: number
	duration?: number
	delay?: number
	/** Si true, el count empieza cuando el número ya es visible (delay + duración de entrada) */
	countStartsAfterVisible?: boolean
	prefix?: string
	className?: string
	locale?: string
}

const ENTRANCE_DURATION = 0.4

export function SlidingNumber({
	from = 0,
	to,
	duration = 1,
	delay = 0,
	countStartsAfterVisible = false,
	prefix = '',
	className,
	locale = 'de-DE',
}: SlidingNumberProps) {
	const spanRef = useRef<HTMLSpanElement>(null)
	const countDelay = countStartsAfterVisible ? delay + ENTRANCE_DURATION : delay

	useEffect(() => {
		const el = spanRef.current
		if (!el) return

		const format = (v: number) =>
			`${prefix}${Math.round(v).toLocaleString(locale)}`

		el.textContent = format(from)

		const controls = animate(from, to, {
			duration,
			delay: countDelay,
			ease: 'easeOut',
			onUpdate: (v) => {
				if (el) el.textContent = format(v)
			},
		})
		return () => controls.stop()
	}, [from, to, duration, countDelay, prefix, locale])

	return (
		<motion.span
			ref={spanRef}
			className={cn('tabular-nums', className)}
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.35,
				delay,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
		/>
	)
}
