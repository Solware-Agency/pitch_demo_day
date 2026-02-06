import { FileText, Search, Clock, Users } from 'lucide-react'
import { SlideTitle } from '@src/components/SlideTitle'
import { AnimatedText, AnimatedCard, AnimatedIcon } from '@src/components/AnimatedElements'

export function Actividades1() {
	return (
		<div className="bg-gradient-to-br from-indigo-900 to-indigo-950 w-full min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
			<SlideTitle title="La trampa de lo manual" gradientColor="from-green-400 to-blue-400" />

			{/* Pregunta introductoria */}
			<AnimatedText delay={0.2} className="text-center mb-6 sm:mb-8 md:mb-10">
				<AnimatedCard
					delay={0.4}
					className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-orange-400/30 shadow-xl max-w-5xl mx-auto"
				>
					<AnimatedText delay={0.6}>
						<h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
							¿De dónde vienen las pérdidas?
						</h3>
					</AnimatedText>
					<AnimatedText delay={0.8}>
						<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-200">
							De las actividades que realizan <span className="text-orange-400 font-semibold">todos los días</span>
						</p>
					</AnimatedText>
				</AnimatedCard>
			</AnimatedText>

			{/* Contenido principal - responsive grid */}
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
				{/* Procesos Manuales */}
				<AnimatedCard
					delay={1.0}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center"
				>
					<AnimatedIcon delay={1.2}>
						<FileText className="text-blue-400 mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
					</AnimatedIcon>
					<AnimatedText delay={1.4}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Procesos Manuales</h3>
					</AnimatedText>
				</AnimatedCard>

				{/* Búsqueda Ineficiente */}
				<AnimatedCard
					delay={1.2}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center"
				>
					<AnimatedIcon delay={1.4}>
						<Search className="text-red-400 mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
					</AnimatedIcon>
					<AnimatedText delay={1.6}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Búsqueda Ineficiente</h3>
					</AnimatedText>
				</AnimatedCard>

				{/* Tiempo Perdido */}
				<AnimatedCard
					delay={1.4}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center"
				>
					<AnimatedIcon delay={1.6}>
						<Clock className="text-yellow-400 mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
					</AnimatedIcon>
					<AnimatedText delay={1.8}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Tiempo Perdido</h3>
					</AnimatedText>
				</AnimatedCard>

				{/* Impacto en el Equipo */}
				<AnimatedCard
					delay={1.6}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center"
				>
					<AnimatedIcon delay={1.8}>
						<Users className="text-purple-400 mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
					</AnimatedIcon>
					<AnimatedText delay={2.0}>
						<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Impacto en el Equipo</h3>
					</AnimatedText>
				</AnimatedCard>
			</div>

			{/* Elementos decorativos */}
			<div className="absolute top-4 sm:top-10 right-4 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-400/20 rounded-full animate-ping"></div>
			<div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-400/20 rounded-full animate-pulse"></div>
			<div className="absolute top-1/3 left-2 sm:left-5 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-full animate-bounce"></div>
		</div>
	)
}
