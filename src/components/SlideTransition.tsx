'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface SlideTransitionProps {
	children: ReactNode
	slideIndex: number
	direction: 'forward' | 'backward'
	className?: string
}

export function SlideTransition({ children, slideIndex, direction, className }: SlideTransitionProps) {
	// Variantes de animación más fluidas con fade suave
	const slideVariants = {
		enter: (direction: 'forward' | 'backward') => ({
			x: direction === 'forward' ? '100%' : '-100%',
			opacity: 0,
			scale: 0.99, // Reducido para evitar overflow
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scale: 1,
		},
		exit: (direction: 'forward' | 'backward') => ({
			zIndex: 0,
			x: direction === 'forward' ? '-100%' : '100%',
			opacity: 0,
			scale: 1.01, // Reducido para evitar overflow
		}),
	}

	const transition = {
		x: {
			type: 'tween' as const,
			duration: 0.4,
			ease: [0.25, 0.46, 0.45, 0.94] as const,
		},
		opacity: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1] as const,
		},
		scale: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1] as const,
		},
	}

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			<motion.div
				key={slideIndex}
				custom={direction}
				variants={slideVariants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={transition}
				className={`absolute inset-0 slide-transition-container gpu-accelerated no-flash ${className || ''}`}
				style={{
					willChange: 'transform, opacity',
					overflowY: 'auto', // Permitir scroll vertical
					WebkitOverflowScrolling: 'touch', // Scroll suave en iOS
				}}
			>
				<div className="slide-transition-content w-full">{children}</div>
			</motion.div>
		</AnimatePresence>
	)
}

// Componente alternativo con efecto de deslizamiento más suave
export function SmoothSlideTransition({ children, slideIndex, direction, className }: SlideTransitionProps) {
	const smoothVariants = {
		enter: (direction: 'forward' | 'backward') => ({
			x: direction === 'forward' ? '100%' : '-100%',
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: 'forward' | 'backward') => ({
			x: direction === 'forward' ? '-100%' : '100%',
			opacity: 0,
		}),
	}

	const smoothTransition = {
		x: {
			type: 'tween' as const,
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOutQuart
		},
		opacity: {
			duration: 0.4,
			ease: 'easeInOut' as const,
		},
	}

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			<motion.div
				key={slideIndex}
				custom={direction}
				variants={smoothVariants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={smoothTransition}
				className={`absolute inset-0 slide-transition-container gpu-accelerated no-flash ${className || ''}`}
				style={{
					willChange: 'transform, opacity',
				}}
			>
				<div className="slide-transition-content w-full">{children}</div>
			</motion.div>
		</AnimatePresence>
	)
}

// Componente con efecto de deslizamiento vertical
export function VerticalSlideTransition({ children, slideIndex, direction, className }: SlideTransitionProps) {
	const verticalVariants = {
		enter: (direction: 'forward' | 'backward') => ({
			y: direction === 'forward' ? '100%' : '-100%',
			opacity: 0,
		}),
		center: {
			y: 0,
			opacity: 1,
		},
		exit: (direction: 'forward' | 'backward') => ({
			y: direction === 'forward' ? '-100%' : '100%',
			opacity: 0,
		}),
	}

	const verticalTransition = {
		y: {
			type: 'spring' as const,
			stiffness: 400,
			damping: 40,
			mass: 0.8,
		},
		opacity: {
			duration: 0.3,
			ease: 'easeInOut' as const,
		},
	}

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			<motion.div
				key={slideIndex}
				custom={direction}
				variants={verticalVariants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={verticalTransition}
				className={`absolute inset-0 slide-transition-container gpu-accelerated no-flash ${className || ''}`}
				style={{
					willChange: 'transform, opacity',
				}}
			>
				<div className="slide-transition-content w-full">{children}</div>
			</motion.div>
		</AnimatePresence>
	)
}

// Componente con efecto de fade puro (sin espacios en blanco)
export function FadeTransition({ children, slideIndex, direction, className }: SlideTransitionProps) {
	const fadeVariants = {
		enter: {
			opacity: 0,
			scale: 0.99, // Reducido para evitar overflow
		},
		center: {
			opacity: 1,
			scale: 1,
		},
		exit: {
			opacity: 0,
			scale: 1.01, // Reducido para evitar overflow
		},
	}

	const fadeTransition = {
		opacity: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1] as const,
		},
		scale: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1] as const,
		},
	}

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			<motion.div
				key={slideIndex}
				custom={direction}
				variants={fadeVariants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={fadeTransition}
				className={`relative slide-transition-container gpu-accelerated no-flash ${className || ''}`}
				style={{
					willChange: 'transform, opacity',
				}}
			>
				<div className="slide-transition-content w-full">{children}</div>
			</motion.div>
		</AnimatePresence>
	)
}
