import { TMDB_CONFIG, IMAGE_SIZES } from './config'

import type { PosterSize, BackdropSize, DateString, Rating } from '../types/movie'

/**
 * Builds the complete image URL for TMDb images
 * @param path - Image path from TMDb API (can be null)
 * @param size - Image size specification
 * @returns Complete image URL or placeholder
 */
export const buildImageUrl = (
  path: string | null,
  size: PosterSize | BackdropSize = IMAGE_SIZES.POSTER.MEDIUM
): string => {
  if (!path) {
    return '/placeholder-movie.svg'
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

/**
 * Formats date string to readable format
 * @param dateString - ISO date string from API
 * @returns Formatted date string or 'Unknown' for invalid dates
 */
export const formatDate = (dateString: DateString | string): string => {
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
 * @param minutes - Runtime in minutes (must be positive)
 * @returns Formatted runtime string
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
 * @param voteAverage - Rating from 0-10 scale
 * @returns Formatted rating string
 */
export const formatVoteAverage = (voteAverage: Rating): string => {
  if (voteAverage < 0 || voteAverage > 10) {
    console.warn(`Invalid vote average: ${voteAverage}. Expected range: 0-10`)
  }
  return Math.max(0, Math.min(10, voteAverage)).toFixed(1)
}

/**
 * Formats currency values in USD
 * @param amount - Amount to format (must be positive)
 * @returns Formatted currency string
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
 * Alias for buildImageUrl for easier use in components
 */
export const getFullImageUrl = buildImageUrl
