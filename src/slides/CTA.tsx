// import { Card, CardHeader, CardTitle, CardContent } from '@src/components/ui/card'
import { Globe, Phone, Instagram, Linkedin } from 'lucide-react'
import Particles from '@src/components/ui/Particles'
import { AnimatedText, AnimatedCard, AnimatedIcon } from '@src/components/AnimatedElements'

export function CTA() {
	return (
		<div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
			<Particles />
			<div className="text-center text-white space-y-6 sm:space-y-8 md:space-y-10">
				<AnimatedText delay={0.2}>
					<h1 className="text-white font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
						¡Únete a Solware! 🚀
					</h1>
				</AnimatedText>

				<AnimatedText delay={0.4}>
					<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-5xl mx-auto">
						Transformemos la gestión administrativa de laboratorios en Venezuela
					</p>
				</AnimatedText>

				{/* Página Web */}
				<AnimatedText delay={0.6} className="mt-6 sm:mt-8">
					<AnimatedCard
						delay={0.8}
						className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20 max-w-sm sm:max-w-md mx-auto"
					>
						<AnimatedText delay={1.0}>
							<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 text-center">
								Solware Agency
							</h3>
						</AnimatedText>
						<div className="space-y-2 sm:space-y-3">
							<AnimatedText delay={1.2}>
								<div className="flex items-center justify-left gap-2">
									<AnimatedIcon delay={1.4}>
										<Globe className="size-4 sm:size-5" />
									</AnimatedIcon>
									<a
										href="https://www.solware.agency"
										target="_blank"
										rel="noopener noreferrer"
										className="text-white hover:text-green-300 transition-colors text-base md:text-lg"
									>
										solware.agency
									</a>
								</div>
							</AnimatedText>
							<AnimatedText delay={1.4}>
								<div className="flex items-center justify-left gap-2">
									<AnimatedIcon delay={1.6}>
										<Phone className="size-4 sm:size-5" />
									</AnimatedIcon>
									<a
										href="tel:+584129974533"
										target="_self"
										rel="noopener noreferrer"
										className="text-white hover:text-green-300 transition-colors text-base md:text-lg"
									>
										+58 412-997-4533
									</a>
								</div>
							</AnimatedText>
							<AnimatedText delay={1.6}>
								<div className="flex items-center justify-left gap-2">
									<AnimatedIcon delay={1.8}>
										<Instagram className="size-4 sm:size-5" />
									</AnimatedIcon>
									<a
										href="https://www.instagram.com/solware_"
										target="_self"
										rel="noopener noreferrer"
										className="text-white hover:text-green-300 transition-colors text-base md:text-lg"
									>
										@solware_
									</a>
								</div>
							</AnimatedText>
							<AnimatedText delay={1.8}>
								<div className="flex items-center justify-left gap-2">
									<AnimatedIcon delay={1.8}>
										<Linkedin className="size-4 sm:size-5" />
									</AnimatedIcon>
									<a
										href="https://www.linkedin.com/company/agencia-solware"
										target="_self"
										rel="noopener noreferrer"
										className="text-white hover:text-green-300 transition-colors text-base md:text-lg"
									>
										agencia-solware
									</a>
								</div>
							</AnimatedText>
						</div>
						<AnimatedText delay={1.8}>
							<div className="flex items-center justify-center space-x-3 mt-3 sm:mt-4">
								<a
									href="https://calendar.app.google/EYruMbWpJwJ82gHr6"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:bg-purple-600 transition-colors text-base md:text-lg bg-purple-500 p-2 sm:p-3 px-3 sm:px-4 md:px-6 rounded-md"
								>
									Agendar Cita
								</a>
							</div>
						</AnimatedText>
					</AnimatedCard>
				</AnimatedText>
			</div>
		</div>
	)
}
