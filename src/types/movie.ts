// Base API response types
export interface ApiResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  genre_ids: number[]
  original_language: string
  original_title: string
  video: boolean
}

export interface MovieDetails extends Movie {
  belongs_to_collection: Collection | null
  budget: number
  genres: Genre[]
  homepage: string
  imdb_id: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
}

export interface Genre {
  id: number
  name: string
}

export interface Collection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export type SearchMoviesResponse = ApiResponse<Movie>

export interface FavoriteMovie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  addedAt: string
}

export interface ApiError {
  status_code: number
  status_message: string
  success: false
}

export interface RTKQueryError {
  status: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR'
  error?: string
  data?: ApiError
}

// Utility types for better type safety and IDE support
export type Rating = number // 0-10 scale from TMDb
export type DateString = string // ISO date string format
export type MovieId = number

// Re-export image size types from config for convenience
export type { PosterSizeValue, BackdropSizeValue } from '../utils/config'
