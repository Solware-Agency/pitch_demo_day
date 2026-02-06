'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

import { cn } from '@src/lib/utils'

interface SlideProps {
	children: ReactNode
	className?: string
	variante?: 'denso' | 'visual' | 'titulo'
	fondo?: string
}

export function Slide({ children, className, variante = 'denso', fondo }: SlideProps) {
	const variantes = {
		denso: 'p-4 sm:p-6 md:p-8 lg:p-10 text-left',
		visual: 'p-4 sm:p-6 md:p-8 text-center flex flex-col items-center justify-center',
		titulo: 'p-6 sm:p-8 md:p-10 lg:p-12 text-center flex flex-col items-center justify-center',
	}

	return (
		<div
			className={cn(
				'w-full min-h-screen flex flex-col box-border',
				variantes[variante],
				fondo && `bg-gradient-to-br ${fondo}`,
				className,
			)}
		>
			<div className="flex-1 w-full flex flex-col"> {children}</div>
		</div>
	)
}

interface TituloSlideProps {
	children: ReactNode
	subtitulo?: string
	className?: string
}

export function TituloSlide({ children, subtitulo, className }: TituloSlideProps) {
	return (
		<div className={cn('space-y-3 sm:space-y-4 md:space-y-6 flex flex-col justify-center', className)}>
			<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight">
				{' '}
				{children}
			</h1>
			{subtitulo && (
				<p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-5xl">
					{' '}
					{subtitulo}
				</p>
			)}
		</div>
	)
}

interface ContenidoSlideProps {
	titulo: string
	children: ReactNode
	className?: string
}

export function ContenidoSlide({ titulo, children, className }: ContenidoSlideProps) {
	return (
		<div className={cn('space-y-4 sm:space-y-6 md:space-y-8 flex flex-col w-full max-w-7xl mx-auto', className)}>
			<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary border-b-2 border-primary pb-2 sm:pb-3 flex-shrink-0">
				{titulo}
			</h2>
			<div className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">{children}</div>
		</div>
	)
}

interface ListaSlideProps {
	items: string[]
	className?: string
}

export function ListaSlide({ items, className }: ListaSlideProps) {
	return (
		<ul className={cn('space-y-3 sm:space-y-4 md:space-y-6', className)}>
			{items.map((item: string, index: number) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="flex items-start space-x-3 sm:space-x-4 md:space-x-6 text-sm sm:text-base md:text-lg lg:text-xl"
				>
					<span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
						{index + 1}
					</span>
					<span className="leading-relaxed">{item}</span>
				</motion.li>
			))}
		</ul>
	)
}