'use client'

import React, { useState, useRef } from 'react'
import { DeckControls } from '@src/components/DeckControls'
import { FadeTransition } from '@src/components/SlideTransition'
import { useSlideAnimations } from '@src/hooks/useSlideAnimations'
import { useMobileScroll } from '@src/hooks/useMobileScroll'
import {
	Portada,
	Hook,
	Problema,
	Reveal,
	Evidencia,
	Demo,
	Cierre,
} from '@src/slides/index'

const slides = [
	{ id: 'portada', component: Portada },
	{ id: 'hook', component: Hook },
	{ id: 'problema', component: Problema },
	{ id: 'reveal', component: Reveal },
	{ id: 'evidencia', component: Evidencia },
	{ id: 'demo', component: Demo },
	{ id: 'cierre', component: Cierre },
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

	useMobileScroll()

	const cambiarSlide = (nuevoSlide: number) => {
		if (nuevoSlide >= 0 && nuevoSlide < totalSlides) {
			previousSlideRef.current = slideActual
			setSlideActual(nuevoSlide)
		}
	}

	const toggleInteractividad = () => {
		setMostrarInteractividad(!mostrarInteractividad)
	}

	const handleSlideClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement
		if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
			return
		}

		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
		const clickX = e.clientX - rect.left
		const slideWidth = rect.width

		if (clickX < slideWidth / 3) {
			if (slideActual > 0) cambiarSlide(slideActual - 1)
		} else if (clickX > (slideWidth * 2) / 3) {
			if (slideActual < totalSlides - 1) cambiarSlide(slideActual + 1)
		}
	}

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

		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
			if (deltaX > 0 && slideActual > 0) cambiarSlide(slideActual - 1)
			else if (deltaX < 0 && slideActual < totalSlides - 1) cambiarSlide(slideActual + 1)
		}
	}

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
				className="w-full h-dvh min-h-dvh relative cursor-pointer"
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
