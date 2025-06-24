import { TMDB_CONFIG, IMAGE_SIZES } from './config'

import type { PosterSizeValue, BackdropSizeValue } from './config'

export const buildImageUrl = (
  path: string | null, 
  size: PosterSizeValue | BackdropSizeValue = IMAGE_SIZES.POSTER.MEDIUM
): string => {
  if (!path) {
    return '/placeholder-movie.svg'
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Nieznana'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Nieznana'
    }
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Nieznana'
  }
}

export const formatRuntime = (minutes: number | null | undefined): string => {
  if (!minutes || minutes <= 0) return 'Nieznany'
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours === 0) {
    return `${remainingMinutes} min`
  }
  
  if (remainingMinutes === 0) {
    return `${hours} godz`
  }
  
  return `${hours} godz ${remainingMinutes} min`
}

export const formatVoteAverage = (voteAverage: number): string => {
  if (voteAverage < 0 || voteAverage > 10) {
    console.warn(`Invalid vote average: ${voteAverage}. Expected range: 0-10`)
  }
  return Math.max(0, Math.min(10, voteAverage)).toFixed(1)
}

export const formatCurrency = (amount: number | null | undefined): string => {
  if (!amount || amount <= 0) return 'Nieznany'
  
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Legacy alias for buildImageUrl - for backward compatibility
export const getFullImageUrl = (
  path: string | null, 
  size: PosterSizeValue | BackdropSizeValue = 'w500'
): string => {
  if (!path) {
    return '/placeholder-movie.svg'
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}
