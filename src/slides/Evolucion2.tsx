import { BarChart3, TrendingUp, DollarSign, FileText, Calculator, PieChart } from 'lucide-react'
import { SlideTitle } from '@src/components/SlideTitle'
import { AnimatedText, AnimatedCard, AnimatedIcon } from '@src/components/AnimatedElements'

export function Evolucion2() {
	return (
		<div className="bg-gradient-to-br from-indigo-900 to-indigo-950 w-full min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
			<SlideTitle title="La evolución continúa" gradientColor="from-green-400 to-blue-400" />

			{/* Contenido principal - 2x3 grid con cuadros del mismo tamaño */}
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
				{/* Business Intelligence */}
				<AnimatedCard
					delay={0.2}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={0.4}>
						<BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={0.6}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Business Intelligence</h3>
					</AnimatedText>
					<AnimatedText delay={0.8}>
						<p className="text-blue-300 text-xs sm:text-sm md:text-base mt-2">Análisis predictivo de ingresos</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Análisis Predictivo */}
				<AnimatedCard
					delay={0.4}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={0.6}>
						<TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={0.8}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Análisis Predictivo</h3>
					</AnimatedText>
					<AnimatedText delay={1.0}>
						<p className="text-green-300 text-xs sm:text-sm md:text-base mt-2">Tipos de exámenes y desempeño</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Decisiones Basadas en Datos */}
				<AnimatedCard
					delay={0.6}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={0.8}>
						<PieChart className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={1.0}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Decisiones Inteligentes</h3>
					</AnimatedText>
					<AnimatedText delay={1.2}>
						<p className="text-purple-300 text-xs sm:text-sm md:text-base mt-2">Basadas en datos reales</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Facturación */}
				<AnimatedCard
					delay={1.8}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={2.0}>
						<DollarSign className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={2.2}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Facturación</h3>
					</AnimatedText>
					<AnimatedText delay={2.4}>
						<p className="text-orange-300 text-xs sm:text-sm md:text-base mt-2">Control de ingresos y egresos</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Finanzas */}
				<AnimatedCard
					delay={2.0}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={2.2}>
						<Calculator className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={2.4}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Finanzas</h3>
					</AnimatedText>
					<AnimatedText delay={2.6}>
						<p className="text-yellow-300 text-xs sm:text-sm md:text-base mt-2">Reportes financieros en tiempo real</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Reportes */}
				<AnimatedCard
					delay={2.2}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={2.4}>
						<FileText className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={2.6}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Reportes</h3>
					</AnimatedText>
					<AnimatedText delay={2.8}>
						<p className="text-red-300 text-xs sm:text-sm md:text-base mt-2">Análisis por sede o médico</p>
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
