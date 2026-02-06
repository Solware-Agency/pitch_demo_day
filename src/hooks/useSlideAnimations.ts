'use client'

import { useCallback } from 'react'

export type AnimationType =
	| 'slide'
	| 'fade'
	| 'scale'
	| 'flip'
	| 'cube'
	| 'zoom'
	| 'slideUp'
	| 'slideDown'
	| 'rotate'
	| 'bounce'

export interface AnimationVariants {
	initial: Record<string, unknown>
	animate: Record<string, unknown>
	exit: Record<string, unknown>
	transition: Record<string, unknown>
}

export const animationVariants: Record<AnimationType, AnimationVariants> = {
	slide: {
		initial: { x: '100%', opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: '-100%', opacity: 0 },
		transition: {
			x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
			opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
		},
	},

	fade: {
		initial: { opacity: 0, scale: 0.98 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 1.02 },
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
		},
	},

	scale: {
		initial: { scale: 0.9, opacity: 0, y: 20 },
		animate: { scale: 1, opacity: 1, y: 0 },
		exit: { scale: 1.1, opacity: 0, y: -20 },
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
			scale: { type: 'spring', stiffness: 400, damping: 25 },
		},
	},

	flip: {
		initial: { rotateY: 90, opacity: 0, scale: 0.95 },
		animate: { rotateY: 0, opacity: 1, scale: 1 },
		exit: { rotateY: -90, opacity: 0, scale: 1.05 },
		transition: {
			duration: 0.6,
			ease: [0.4, 0, 0.2, 1],
			rotateY: { type: 'spring', stiffness: 200, damping: 20 },
		},
	},

	cube: {
		initial: { rotateX: 90, opacity: 0, scale: 0.9 },
		animate: { rotateX: 0, opacity: 1, scale: 1 },
		exit: { rotateX: -90, opacity: 0, scale: 1.1 },
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
			rotateX: { type: 'spring', stiffness: 300, damping: 30 },
		},
	},

	zoom: {
		initial: { scale: 0.8, opacity: 0, y: 30 },
		animate: { scale: 1, opacity: 1, y: 0 },
		exit: { scale: 1.2, opacity: 0, y: -30 },
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
			scale: { type: 'spring', stiffness: 400, damping: 25 },
		},
	},

	slideUp: {
		initial: { y: '100%', opacity: 0, scale: 0.95 },
		animate: { y: 0, opacity: 1, scale: 1 },
		exit: { y: '-100%', opacity: 0, scale: 1.05 },
		transition: {
			y: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
			opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
		},
	},

	slideDown: {
		initial: { y: '-100%', opacity: 0, scale: 0.95 },
		animate: { y: 0, opacity: 1, scale: 1 },
		exit: { y: '100%', opacity: 0, scale: 1.05 },
		transition: {
			y: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
			opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
		},
	},

	rotate: {
		initial: { rotate: 180, scale: 0.9, opacity: 0 },
		animate: { rotate: 0, scale: 1, opacity: 1 },
		exit: { rotate: -180, scale: 0.9, opacity: 0 },
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
			rotate: { type: 'spring', stiffness: 200, damping: 20 },
		},
	},

	bounce: {
		initial: { y: -50, opacity: 0, scale: 0.9 },
		animate: { y: 0, opacity: 1, scale: 1 },
		exit: { y: 50, opacity: 0, scale: 0.9 },
		transition: {
			duration: 0.6,
			ease: [0.68, -0.55, 0.265, 1.55],
			y: { type: 'spring', stiffness: 400, damping: 20 },
		},
	},
}

export function useSlideAnimations() {
	const getAnimationForSlide = useCallback((slideIndex: number): AnimationType => {
		// Diferentes animaciones según el tipo de slide o posición
		const animations: AnimationType[] = [
			'fade', // Portada
			'slide', // Dolencia 1
			'scale', // Dolencia 2
			'slideUp', // Actividades 1
			'slideDown', // Actividades 2
			'flip', // SolHub 1
			'cube', // SolHub 2
			'zoom', // SolHub 3
			'rotate', // Evolución 1
			'bounce', // Evolución 2
			'scale', // Evolución 3
			'fade', // CTA
		]

		return animations[slideIndex % animations.length] || 'slide'
	}, [])

	const getVariantsForDirection = useCallback((animationType: AnimationType, direction: 'forward' | 'backward') => {
		const baseVariants = animationVariants[animationType]

		if (direction === 'backward') {
			// Invertir la dirección para animaciones hacia atrás
			return {
				...baseVariants,
				initial: { ...baseVariants.exit },
				exit: { ...baseVariants.initial },
			}
		}

		return baseVariants
	}, [])

	// Función para obtener la dirección de la transición
	const getTransitionDirection = useCallback((currentSlide: number, nextSlide: number): 'forward' | 'backward' => {
		return nextSlide > currentSlide ? 'forward' : 'backward'
	}, [])

	// Función para obtener transiciones más suaves
	const getSmoothTransition = useCallback((type: 'horizontal' | 'vertical' | 'fade' | 'scale') => {
		const transitions = {
			horizontal: {
				enter: (direction: 'forward' | 'backward') => ({
					x: direction === 'forward' ? '100%' : '-100%',
					opacity: 0,
				}),
				center: { x: 0, opacity: 1 },
				exit: (direction: 'forward' | 'backward') => ({
					x: direction === 'forward' ? '-100%' : '100%',
					opacity: 0,
				}),
				transition: {
					x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
					opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
				},
			},
			vertical: {
				enter: (direction: 'forward' | 'backward') => ({
					y: direction === 'forward' ? '100%' : '-100%',
					opacity: 0,
				}),
				center: { y: 0, opacity: 1 },
				exit: (direction: 'forward' | 'backward') => ({
					y: direction === 'forward' ? '-100%' : '100%',
					opacity: 0,
				}),
				transition: {
					y: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
					opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
				},
			},
			fade: {
				enter: { opacity: 0, scale: 0.98 },
				center: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 1.02 },
				transition: {
					duration: 0.5,
					ease: [0.25, 0.46, 0.45, 0.94],
				},
			},
			scale: {
				enter: { scale: 0.9, opacity: 0, y: 20 },
				center: { scale: 1, opacity: 1, y: 0 },
				exit: { scale: 1.1, opacity: 0, y: -20 },
				transition: {
					duration: 0.4,
					ease: [0.4, 0, 0.2, 1],
					scale: { type: 'spring', stiffness: 400, damping: 25 },
				},
			},
		}

		return transitions[type]
	}, [])

	return {
		getAnimationForSlide,
		getVariantsForDirection,
		getTransitionDirection,
		getSmoothTransition,
		animationVariants,
	}
}
