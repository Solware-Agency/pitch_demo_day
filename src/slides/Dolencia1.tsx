import { AlertTriangle, Clock, DollarSign, FileText } from 'lucide-react'
import { SlideTitle } from '@src/components/SlideTitle'
import { AnimatedText, AnimatedCard, AnimatedIcon } from '@src/components/AnimatedElements'

export function Dolencia1() {
	return (
		<div className="bg-gradient-to-br from-indigo-900 to-indigo-950 w-full min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
			<SlideTitle title="Costos ocultos" gradientColor="from-green-400 to-blue-400" />

			{/* Estadística principal - centrada y prominente */}
			<AnimatedText delay={0.2} className="text-center mb-6 sm:mb-8 md:mb-10">
				<AnimatedCard
					delay={0.4}
					className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-white/30 shadow-2xl max-w-5xl mx-auto"
				>
					<div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
						<AnimatedIcon delay={0.6}>
							<AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-400 mb-2 sm:mb-0 sm:mr-4" />
						</AnimatedIcon>
						<AnimatedText delay={0.8}>
							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center sm:text-left">
								La Realidad Cruda
							</h2>
						</AnimatedText>
					</div>
					<AnimatedText delay={1.0}>
						<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed text-center">
							<span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-red-400">8 de cada 10</span>
							<br />
							<span className="text-base sm:text-lg md:text-xl lg:text-2xl">laboratorios en Venezuela</span>
							<br />
							<span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-yellow-300">
								siguen sin una base de datos
							</span>
						</p>
					</AnimatedText>
				</AnimatedCard>
			</AnimatedText>

			{/* Problemas identificados - responsive grid */}
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
				<AnimatedCard
					delay={1.2}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
				>
					<div className="flex flex-col items-center text-center">
						<AnimatedIcon delay={1.4}>
							<FileText className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-yellow-400 mb-3 sm:mb-4" />
						</AnimatedIcon>
						<AnimatedText delay={1.6}>
							<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
								Procesos Manuales
							</h3>
						</AnimatedText>
						<AnimatedText delay={1.8}>
							<p className="text-white/90 text-base sm:text-lg md:text-xl">
								<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-yellow-400">95%</span>
								<br />
								<span className="text-sm sm:text-base md:text-lg"> Lentos, inseguros y costosos</span>
							</p>
						</AnimatedText>
						<div className="mt-3 sm:mt-4 w-full h-1 bg-yellow-400/50 rounded-full"></div>
					</div>
				</AnimatedCard>

				<AnimatedCard
					delay={1.4}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
				>
					<div className="flex flex-col items-center text-center">
						<AnimatedIcon delay={1.6}>
							<Clock className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-orange-400 mb-3 sm:mb-4" />
						</AnimatedIcon>
						<AnimatedText delay={1.8}>
							<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
								Pérdida de Tiempo
							</h3>
						</AnimatedText>
						<AnimatedText delay={2.0}>
							<p className="text-white/90 text-base sm:text-lg md:text-xl">
								<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-orange-400">
									1,800 - 2,600
								</span>
								<br />
								<span className="text-sm sm:text-base md:text-lg">horas de trabajo perdidas al año</span>
							</p>
						</AnimatedText>
						<div className="mt-3 sm:mt-4 w-full h-1 bg-orange-400/50 rounded-full"></div>
					</div>
				</AnimatedCard>

				<AnimatedCard
					delay={1.6}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1"
				>
					<div className="flex flex-col items-center text-center">
						<AnimatedIcon delay={1.8}>
							<DollarSign className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-400 mb-3 sm:mb-4" />
						</AnimatedIcon>
						<AnimatedText delay={2.0}>
							<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
								Pérdida Económica
							</h3>
						</AnimatedText>
						<AnimatedText delay={2.2}>
							<p className="text-white/90 text-base sm:text-lg md:text-xl">
								<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-red-400">
									$4,500 - $6,500
								</span>
								<br />
								<span className="text-sm sm:text-base md:text-lg">dólares tirados a la basura</span>
							</p>
						</AnimatedText>
						<div className="mt-3 sm:mt-4 w-full h-1 bg-red-400/50 rounded-full"></div>
					</div>
				</AnimatedCard>
			</div>

			{/* Elementos decorativos */}
			<div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-pink-400/20 rounded-full animate-ping"></div>
			<div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-400/20 rounded-full animate-pulse"></div>
			<div className="absolute top-1/2 left-2 sm:left-5 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-full animate-bounce"></div>
		</div>
	)
}
