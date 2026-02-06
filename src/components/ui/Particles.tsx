'use client'

import React, { useMemo } from 'react'

type Particle = {
	leftPct: number
	topPct: number
	w: number
	h: number
	delay: number // s
	duration: number // s
}

function makeRng(seedStr: string) {
	// string → número estable
	let seed = 0
	for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0
	let state = seed || 1
	return () => {
		// LCG clásico
		state = (1664525 * state + 1013904223) >>> 0
		return state / 0xffffffff
	}
}

function makeParticles(n: number, seed: string): Particle[] {
	const rnd = makeRng(seed)
	return Array.from({ length: n }).map(() => {
		const leftPct = rnd() * 100
		const topPct = rnd() * 100
		const w = 5 + rnd() * 10 // 5–15 px
		const h = 5 + rnd() * 15 // 5–20 px
		const delay = rnd() * 5 // 0–5 s
		const duration = 10 + rnd() * 10 // 10–20 s
		return { leftPct, topPct, w, h, delay, duration }
	})
}

function Particles({ seed = 'solware-default', count = 40 }: { seed?: string; count?: number }) {
	const particles = useMemo(() => makeParticles(count, seed), [count, seed])

	return (
		<div className="particles absolute inset-0 pointer-events-none overflow-hidden">
			{particles.map((p, i) => (
				<div
					key={i}
					className="particle absolute rounded-full bg-white/20 dark:bg-blue-400/30 animate-float"
					style={{
						left: `${p.leftPct}%`,
						top: `${p.topPct}%`,
						width: `${p.w}px`,
						height: `${p.h}px`,
						animationDelay: `${p.delay}s`,
						animationDuration: `${p.duration}s`,
					}}
				/>
			))}
		</div>
	)
}

export default React.memo(Particles)
