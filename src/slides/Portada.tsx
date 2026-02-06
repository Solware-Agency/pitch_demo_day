import Particles from '@src/components/ui/Particles'
import { CodeXml } from 'lucide-react'

export function Portada() {
	return (
		<div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 w-full min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<Particles />
			<div className="flex flex-col items-center max-w-6xl mx-auto">
				<div className="mb-4 sm:mb-6 lg:mb-8">
					<h1 className="text-blue-100 text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans flex items-center justify-center gap-1 sm:gap-2">
						<CodeXml className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 stroke-2" />
						Solware
					</h1>
				</div>
				<p className="text-white/90 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold px-2 sm:px-4">
					Sistema Administrativo Web para Laboratorios y Clínicas
				</p>
				<div className="mt-4 sm:mt-6 lg:mt-8 mb-4 sm:mb-6 lg:mb-8 text-white/80 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl italic text-center px-2">
					Eugenio Andreone y Jesús Freites - Caracas, 2025
				</div>
			</div>
		</div>
	)
}
