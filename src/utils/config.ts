// Validate required environment variables
function validateEnvVariables() {
  const requiredVars = ['VITE_TMDB_API_KEY', 'VITE_TMDB_ACCESS_TOKEN']
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName])
  
  if (missingVars.length) {
    throw new Error(
      `Missing required env variables: ${missingVars.join(', ')}\n` +
      'Check .env.example for required variables'
    )
  }
}

validateEnvVariables()

// TMDb API configuration with strict typing
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  ACCESS_TOKEN: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
  MAX_PAGES: 500,
  RESULTS_PER_PAGE: 20,
} as const

// Image size configurations with precise literal types
export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342', 
    LARGE: 'w500',
    XLARGE: 'w780',
    ORIGINAL: 'original'
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280', 
    ORIGINAL: 'original'
  }
} as const

export type PosterSizeKey = keyof typeof IMAGE_SIZES.POSTER
export type BackdropSizeKey = keyof typeof IMAGE_SIZES.BACKDROP
export type PosterSizeValue = typeof IMAGE_SIZES.POSTER[PosterSizeKey]
export type BackdropSizeValue = typeof IMAGE_SIZES.BACKDROP[BackdropSizeKey]

export const API_ENDPOINTS = {
  SEARCH_MOVIES: '/search/movie',
  MOVIE_DETAILS: '/movie',
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  NOW_PLAYING_MOVIES: '/movie/now_playing',
  UPCOMING_MOVIES: '/movie/upcoming'
} as const

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS]

// Default parameters with strict typing
export const DEFAULT_PARAMS = {
  language: 'pl-PL',
  page: 1,
  region: 'PL'
} as const

// Movie category types
export const MOVIE_CATEGORIES = {
  POPULAR: 'popular',
  TOP_RATED: 'top_rated', 
  NOW_PLAYING: 'now_playing',
  UPCOMING: 'upcoming'
} as const

export type MovieCategory = typeof MOVIE_CATEGORIES[keyof typeof MOVIE_CATEGORIES]

// Pagination constants
export const PAGINATION = {
  ITEMS_PER_PAGE: 20,
  MAX_PAGES: 500,
  DEFAULT_PAGE: 1
} as const
