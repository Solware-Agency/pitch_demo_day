'use client'

import { useState } from 'react'
import { Button } from '@src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { SlideTransition, SmoothSlideTransition, VerticalSlideTransition, FadeTransition } from './SlideTransition'

export type TransitionType = 'default' | 'smooth' | 'vertical' | 'fade'

interface TransitionSelectorProps {
	children: React.ReactNode
	slideIndex: number
	direction: 'forward' | 'backward'
	className?: string
	onTransitionChange?: (type: TransitionType) => void
}

export function TransitionSelector({
	children,
	slideIndex,
	direction,
	className,
	onTransitionChange,
}: TransitionSelectorProps) {
	const [transitionType, setTransitionType] = useState<TransitionType>('default')

	const handleTransitionChange = (type: TransitionType) => {
		setTransitionType(type)
		onTransitionChange?.(type)
	}

	const renderTransition = () => {
		const commonProps = {
			slideIndex,
			direction,
			className,
		}

		switch (transitionType) {
			case 'smooth':
				return <SmoothSlideTransition {...commonProps}>{children}</SmoothSlideTransition>
			case 'vertical':
				return <VerticalSlideTransition {...commonProps}>{children}</VerticalSlideTransition>
			case 'fade':
				return <FadeTransition {...commonProps}>{children}</FadeTransition>
			default:
				return <SlideTransition {...commonProps}>{children}</SlideTransition>
		}
	}

	return (
		<>
			{renderTransition()}

			{/* Selector de transición (solo visible en desarrollo) */}
			{process.env.NODE_ENV === 'development' && (
				<div className="fixed top-4 right-4 z-50">
					<Card className="w-64">
						<CardHeader className="pb-3">
							<CardTitle className="text-sm">Transiciones</CardTitle>
							<CardDescription className="text-xs">Selecciona el tipo de transición</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="flex flex-wrap gap-1">
								<Button
									variant={transitionType === 'default' ? 'default' : 'outline'}
									size="sm"
									onClick={() => handleTransitionChange('default')}
									className="text-xs"
								>
									<Badge variant="secondary" className="mr-1 text-xs">
										S
									</Badge>
									Default
								</Button>
								<Button
									variant={transitionType === 'smooth' ? 'default' : 'outline'}
									size="sm"
									onClick={() => handleTransitionChange('smooth')}
									className="text-xs"
								>
									<Badge variant="secondary" className="mr-1 text-xs">
										S
									</Badge>
									Smooth
								</Button>
								<Button
									variant={transitionType === 'vertical' ? 'default' : 'outline'}
									size="sm"
									onClick={() => handleTransitionChange('vertical')}
									className="text-xs"
								>
									<Badge variant="secondary" className="mr-1 text-xs">
										V
									</Badge>
									Vertical
								</Button>
								<Button
									variant={transitionType === 'fade' ? 'default' : 'outline'}
									size="sm"
									onClick={() => handleTransitionChange('fade')}
									className="text-xs"
								>
									<Badge variant="secondary" className="mr-1 text-xs">
										F
									</Badge>
									Fade
								</Button>
							</div>
							<div className="text-xs text-muted-foreground">
								<p>
									<strong>Default:</strong> Deslizamiento horizontal con spring
								</p>
								<p>
									<strong>Smooth:</strong> Deslizamiento suave con easing
								</p>
								<p>
									<strong>Vertical:</strong> Deslizamiento vertical
								</p>
								<p>
									<strong>Fade:</strong> Fade puro sin espacios en blanco
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	)
}
