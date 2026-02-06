'use client'

import Image from 'next/image'

interface QrProps {
	className?: string
}

export function Qr({ className = '' }: QrProps) {
	return (
		<div className={`mt-7 z-20 ${className}`}>
			<div className="rounded-lg">
				<Image src="/qr.jpg" alt="Qr" width={230} height={230} className="object-contain" priority />
			</div>
		</div>
	)
}
