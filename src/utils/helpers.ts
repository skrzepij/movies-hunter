import { TMDB_CONFIG, IMAGE_SIZES } from './config'

import type { Rating, DateString, PosterSizeValue, BackdropSizeValue } from '../types/movie'

/**
 * Builds the complete image URL for TMDb images
 */
export const buildImageUrl = (
  path: string | null, 
  size: PosterSizeValue | BackdropSizeValue = IMAGE_SIZES.POSTER.MEDIUM
): string => {
  if (!path) {
    return '/placeholder-movie.svg'
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

/**
 * Formats date string to readable format
 */
export const formatDate = (dateString: DateString): string => {
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

/**
 * Formats movie runtime to hours and minutes
 */
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

/**
 * Formats vote average to one decimal place
 */
export const formatVoteAverage = (voteAverage: Rating): string => {
  if (voteAverage < 0 || voteAverage > 10) {
    console.warn(`Invalid vote average: ${voteAverage}. Expected range: 0-10`)
  }
  return Math.max(0, Math.min(10, voteAverage)).toFixed(1)
}

/**
 * Formats currency values in USD
 */
export const formatCurrency = (amount: number | null | undefined): string => {
  if (!amount || amount <= 0) return 'Nieznany'
  
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Builds full image URL for backdrop or poster
 */
export const getFullImageUrl = (
  path: string | null, 
  size: PosterSizeValue | BackdropSizeValue = 'w500'
): string => {
  if (!path) {
    return '/placeholder-movie.svg'
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}
