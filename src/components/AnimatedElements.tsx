'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedTextProps {
	children: ReactNode
	delay?: number
	duration?: number
	className?: string
}

export function AnimatedText({ children, delay = 0, duration = 0.6, className }: AnimatedTextProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration,
				delay,
				ease: [0.4, 0, 0.2, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	)
}

interface AnimatedListProps {
	items: string[]
	delay?: number
	stagger?: number
	className?: string
}

export function AnimatedList({ items, delay = 0, stagger = 0.1, className }: AnimatedListProps) {
	return (
		<motion.ul
			className={className}
			initial="hidden"
			animate="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						delay,
						staggerChildren: stagger,
					},
				},
			}}
		>
			{items.map((item, index) => (
				<motion.li
					key={index}
					variants={{
						hidden: { opacity: 0, x: -20 },
						visible: {
							opacity: 1,
							x: 0,
							transition: {
								duration: 0.4,
								ease: [0.4, 0, 0.2, 1],
							},
						},
					}}
					className="flex items-start space-x-3 mb-3"
				>
					<motion.span
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{
							delay: delay + index * stagger + 0.2,
							type: 'spring',
							stiffness: 300,
							damping: 20,
						}}
						className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
					>
						{index + 1}
					</motion.span>
					<span className="leading-relaxed">{item}</span>
				</motion.li>
			))}
		</motion.ul>
	)
}

interface AnimatedCardProps {
	children: ReactNode
	delay?: number
	className?: string
}

export function AnimatedCard({ children, delay = 0, className }: AnimatedCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay,
				ease: [0.4, 0, 0.2, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	)
}

interface AnimatedProgressProps {
	value: number
	delay?: number
	duration?: number
	className?: string
}

export function AnimatedProgress({ value, delay = 0, duration = 1, className }: AnimatedProgressProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scaleX: 0 }}
			animate={{ opacity: 1, scaleX: 1 }}
			transition={{
				duration,
				delay,
				ease: [0.4, 0, 0.2, 1],
			}}
			className={className}
		>
			<motion.div
				initial={{ width: 0 }}
				animate={{ width: `${value}%` }}
				transition={{
					duration: duration * 0.8,
					delay: delay + 0.2,
					ease: [0.4, 0, 0.2, 1],
				}}
				className="h-full bg-primary rounded-full"
			/>
		</motion.div>
	)
}

interface AnimatedIconProps {
	children: ReactNode
	delay?: number
	className?: string
}

export function AnimatedIcon({ children, delay = 0, className }: AnimatedIconProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0, rotate: -180 }}
			animate={{ opacity: 1, scale: 1, rotate: 0 }}
			transition={{
				duration: 0.6,
				delay,
				type: 'spring',
				stiffness: 200,
				damping: 15,
			}}
			className={className}
		>
			{children}
		</motion.div>
	)
}
