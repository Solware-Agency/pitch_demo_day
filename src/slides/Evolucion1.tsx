import { Brain, Eye, Lightbulb, Target } from 'lucide-react'
import { SlideTitle } from '@src/components/SlideTitle'
import { AnimatedText, AnimatedCard, AnimatedIcon } from '@src/components/AnimatedElements'

export function Evolucion1() {
	return (
		<div className="bg-gradient-to-br from-indigo-900 to-indigo-950 w-full min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
			<SlideTitle title="La evolución continúa" gradientColor="from-green-400 to-blue-400" />

			{/* Contenido principal - 2x2 grid con cuadros del mismo tamaño */}
			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
				{/* Visión */}
				<AnimatedCard
					delay={0.2}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[240px]"
				>
					<AnimatedIcon delay={0.4}>
						<Eye className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-purple-400 mb-3 sm:mb-4" />
					</AnimatedIcon>
					<AnimatedText delay={0.6}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Nuestra Visión</h3>
					</AnimatedText>
					<AnimatedText delay={0.8}>
						<div className="mt-4">
							<p className="text-purple-300 text-base sm:text-lg md:text-xl font-bold">Seguir innovando</p>
						</div>
					</AnimatedText>
				</AnimatedCard>

				{/* Inteligencia Artificial */}
				<AnimatedCard
					delay={0.4}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[240px]"
				>
					<AnimatedIcon delay={0.6}>
						<Brain className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-blue-400 mb-3 sm:mb-4" />
					</AnimatedIcon>
					<AnimatedText delay={0.8}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Inteligencia Artificial</h3>
					</AnimatedText>
					<AnimatedText delay={1.0}>
						<div className="mt-4">
							<p className="text-blue-300 text-base sm:text-lg md:text-xl">Ubicar y analizar casos</p>
						</div>
					</AnimatedText>
				</AnimatedCard>

				{/* Aprendizaje */}
				<AnimatedCard
					delay={0.6}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[240px]"
				>
					<AnimatedIcon delay={0.8}>
						<Lightbulb className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-green-400 mb-3 sm:mb-4" />
					</AnimatedIcon>
					<AnimatedText delay={1.0}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Aprendizaje Continuo</h3>
					</AnimatedText>
					<AnimatedText delay={1.2}>
						<div className="mt-4">
							<p className="text-green-300 text-base sm:text-lg md:text-xl">Aprender de cada paciente</p>
						</div>
					</AnimatedText>
				</AnimatedCard>

				{/* Evolución */}
				<AnimatedCard
					delay={0.8}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[240px]"
				>
					<AnimatedIcon delay={1.0}>
						<Target className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-orange-400 mb-3 sm:mb-4" />
					</AnimatedIcon>
					<AnimatedText delay={1.2}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Evolución Continúa</h3>
					</AnimatedText>
					<AnimatedText delay={1.4}>
						<div className="mt-4">
							<p className="text-orange-300 text-base sm:text-lg md:text-xl">Inteligencia en el horizonte</p>
						</div>
					</AnimatedText>
				</AnimatedCard>
			</div>

			{/* Elementos decorativos */}
			<div className="absolute top-4 sm:top-20 right-4 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-400/20 rounded-full animate-ping"></div>
			<div className="absolute bottom-4 sm:bottom-20 left-4 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-pink-400/20 rounded-full animate-pulse"></div>
			<div className="absolute top-1/3 right-2 sm:right-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-full animate-bounce"></div>
		</div>
	)
}
