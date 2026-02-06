import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generar código corto para sesiones
export function generarCodigoSesion(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// Formatear tiempo para el temporizador
export function formatearTiempo(segundos: number): string {
  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
}