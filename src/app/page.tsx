'use client'

import React, { useState, useRef } from 'react'
import { DeckControls } from '@src/components/DeckControls'
import { FadeTransition } from '@src/components/SlideTransition'
import { useSlideAnimations } from '@src/hooks/useSlideAnimations'
import { useMobileScroll } from '@src/hooks/useMobileScroll'
import {
	Portada,
	// Resumen,
	// Problema,
	Dolencia1,
	Dolencia2,
	Actividades1,
	VideoPanel,
	Evolucion1,
	Evolucion2,
	Evolucion3,
	// ResumenProblema,
	// Solucion,
	// Mercado,
	// Negocio,
	// Traccion,
	// Roadmap,
	// Riesgos,
	// Equipo,
	CTA,
} from '@src/slides/index'

const slides = [
	// Slide 1: Portada
	{
		id: 'portada',
		component: Portada,
	},

	// Slide 2: Dolencia 1
	{
		id: 'dolencia1',
		component: Dolencia1,
	},

	// Slide 3: Dolencia 2
	{
		id: 'dolencia2',
		component: Dolencia2,
	},

	// Slide 4: Actividades 1
	{
		id: 'actividades1',
		component: Actividades1,
	},

	// Slide 5: Actividades 2
	{
		id: 'videopanel',
		component: VideoPanel,
	},

	// Slide 9: Evolucion 1
	{
		id: 'evolucion1',
		component: Evolucion1,
	},

	// Slide 10: Evolucion 2
	{
		id: 'evolucion2',
		component: Evolucion2,
	},

	// Slide 11: Evolucion 3
	{
		id: 'evolucion3',
		component: Evolucion3,
	},

	// // Slide 2: Resumen Ejecutivo
	// {
	// 	id: 'resumen',
	// 	component: ResumenProblema,
	// },

	// // Slide 4: Solución
	// {
	// 	id: 'solucion',
	// 	component: Solucion,
	// },

	// // Slide 6: Mercado
	// {
	// 	id: 'mercado',
	// 	component: Mercado,
	// },

	// // Slide 8: Negocio
	// {
	// 	id: 'negocio',
	// 	component: Negocio,
	// },

	// // Slide 9: Tracción
	// {
	// 	id: 'traccion',
	// 	component: Traccion,
	// },

	// // Slide 10: Roadmap
	// {
	// 	id: 'roadmap',
	// 	component: Roadmap,
	// },

	// // Slide 11: Riesgos
	// {
	// 	id: 'riesgos',
	// 	component: Riesgos,
	// },

	// // Slide 12: Equipo
	// {
	// 	id: 'equipo',
	// 	component: Equipo,
	// },

	// Slide 13: CTA
	{
		id: 'cta',
		component: CTA,
	},
]

export default function SlidesPage() {
	const [slideActual, setSlideActual] = useState(0)
	const [mostrarInteractividad, setMostrarInteractividad] = useState(false)
	const previousSlideRef = useRef(0)
	const touchStartX = useRef(0)
	const touchStartY = useRef(0)
	const touchEndX = useRef(0)
	const touchEndY = useRef(0)

	const totalSlides = slides.length
	const { getTransitionDirection } = useSlideAnimations()

	// Configurar scroll para móviles
	useMobileScroll()

	const cambiarSlide = (nuevoSlide: number) => {
		if (nuevoSlide >= 0 && nuevoSlide < totalSlides) {
			// Actualizar slide inmediatamente para transición fluida
			previousSlideRef.current = slideActual
			setSlideActual(nuevoSlide)
		}
	}

	const toggleInteractividad = () => {
		setMostrarInteractividad(!mostrarInteractividad)
	}

	// Manejar click en la slide para navegar
	const handleSlideClick = (e: React.MouseEvent) => {
		// Solo navegar si no se está haciendo click en un botón o elemento interactivo
		const target = e.target as HTMLElement
		if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
			return
		}

		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
		const clickX = e.clientX - rect.left
		const slideWidth = rect.width

		// Dividir la slide en tres partes: izquierda (anterior), centro (no hacer nada), derecha (siguiente)
		if (clickX < slideWidth / 3) {
			// Click en el tercio izquierdo - slide anterior
			if (slideActual > 0) {
				cambiarSlide(slideActual - 1)
			}
		} else if (clickX > (slideWidth * 2) / 3) {
			// Click en el tercio derecho - slide siguiente
			if (slideActual < totalSlides - 1) {
				cambiarSlide(slideActual + 1)
			}
		}
		// Click en el tercio central - no hacer nada
	}

	// Manejar eventos de touch para swipe
	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.targetTouches[0].clientX
		touchStartY.current = e.targetTouches[0].clientY
	}

	const handleTouchEnd = (e: React.TouchEvent) => {
		touchEndX.current = e.changedTouches[0].clientX
		touchEndY.current = e.changedTouches[0].clientY
		handleSwipe()
	}

	const handleSwipe = () => {
		const deltaX = touchEndX.current - touchStartX.current
		const deltaY = touchEndY.current - touchStartY.current

		// Verificar que sea un swipe horizontal (no vertical)
		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
			if (deltaX > 0) {
				// Swipe hacia la derecha - slide anterior
				if (slideActual > 0) {
					cambiarSlide(slideActual - 1)
				}
			} else {
				// Swipe hacia la izquierda - slide siguiente
				if (slideActual < totalSlides - 1) {
					cambiarSlide(slideActual + 1)
				}
			}
		}
	}

	// Obtener la dirección de la transición
	const direction = getTransitionDirection(previousSlideRef.current, slideActual)

	return (
		<div className="w-full overflow-x-hidden">
			<DeckControls
				slideActual={slideActual}
				totalSlides={totalSlides}
				onCambiarSlide={cambiarSlide}
				onToggleInteractividad={toggleInteractividad}
				participantes={0}
			/>

			<div
				className="w-full relative cursor-pointer"
				onClick={handleSlideClick}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<FadeTransition slideIndex={slideActual} direction={direction} className="w-full">
					{React.createElement(slides[slideActual].component)}
				</FadeTransition>
			</div>
		</div>
	)
}
