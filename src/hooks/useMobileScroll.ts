'use client'

import { useEffect } from 'react'

export function useMobileScroll() {
	useEffect(() => {
		// Prevenir zoom en doble tap en móviles
		let lastTouchEnd = 0
		const preventZoom = (e: TouchEvent) => {
			const now = Date.now()
			if (now - lastTouchEnd <= 300) {
				e.preventDefault()
			}
			lastTouchEnd = now
		}

		// Agregar event listener para prevenir zoom
		document.addEventListener('touchend', preventZoom, { passive: false })

		// Configurar viewport para móviles
		const setViewport = () => {
			const viewport = document.querySelector('meta[name="viewport"]')
			if (viewport) {
				viewport.setAttribute(
					'content',
					'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
				)
			}
		}

		setViewport()

		// Cleanup
		return () => {
			document.removeEventListener('touchend', preventZoom)
		}
	}, [])
}
