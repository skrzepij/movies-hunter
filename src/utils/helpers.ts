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
 * Truncates text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length (must be positive)
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (maxLength <= 0) {
    throw new Error('maxLength must be a positive number')
  }
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/**
 * Debounce function for search input with proper generic typing
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds (must be positive)
 * @returns Debounced function
 */
export const debounce = <TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  delay: number
): ((...args: TArgs) => void) => {
  if (delay <= 0) {
    throw new Error('Delay must be a positive number')
  }
  
  let timeoutId: ReturnType<typeof setTimeout>
  
  return (...args: TArgs): void => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Gets the current year for copyright and other uses
 * @returns Current year as number
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear()
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
 * Type guard to check if a value is a valid movie ID
 * @param value - Value to check
 * @returns True if value is a valid movie ID
 */
export const isValidMovieId = (value: unknown): value is number => {
  return typeof value === 'number' && value > 0 && Number.isInteger(value)
}

/**
 * Type guard to check if a string is a valid ISO date
 * @param value - Value to check
 * @returns True if value is a valid ISO date string
 */
export const isValidDateString = (value: string): value is DateString => {
  if (!value) return false
  const date = new Date(value)
  return !isNaN(date.getTime()) && value.includes('-')
}

/**
 * Safe number parsing with validation
 * @param value - Value to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed number or default value
 */
export const safeParseNumber = (
  value: unknown, 
  defaultValue: number = 0
): number => {
  if (typeof value === 'number' && !isNaN(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = Number(value)
    if (!isNaN(parsed)) {
      return parsed
    }
  }
  return defaultValue
}

/**
 * Alias for buildImageUrl for easier use in components
 */
export const getFullImageUrl = buildImageUrl
