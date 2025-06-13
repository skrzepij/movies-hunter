import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { TMDB_CONFIG, API_ENDPOINTS, DEFAULT_PARAMS } from '../utils/config'

import type { 
  Movie, 
  MovieDetails, 
  SearchMoviesResponse,
  ApiResponse
} from '../types/movie'

interface SearchMoviesParams {
  query: string
  page?: number
}

/**
 * RTK Query API slice for TMDb API interactions with enhanced type safety
 * TMDb API has a maximum of 500 pages for all endpoints
 */
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${TMDB_CONFIG.ACCESS_TOKEN}`)
      headers.set('accept', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Movie', 'MovieDetails'] as const,
  endpoints: (builder) => ({
    // Search movies by query with enhanced validation
    searchMovies: builder.query<SearchMoviesResponse, SearchMoviesParams>({
      query: ({ query, page = DEFAULT_PARAMS.page }) => {
        // Validate input parameters
        if (!query || typeof query !== 'string' || !query.trim()) {
          throw new Error('Query must be a non-empty string')
        }
        
        if (typeof page !== 'number' || page < 1) {
          throw new Error('Page must be a positive number')
        }
        
        // Validate page number - TMDb API has max 500 pages
        const validPage = Math.max(1, Math.min(page, 500))
        
        return {
          url: API_ENDPOINTS.SEARCH_MOVIES,
          params: {
            query: query.trim(),
            page: validPage,
            language: DEFAULT_PARAMS.language,
          },
        }
      },
      providesTags: ['Movie'],
    }),

    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movieId) => {
        // Validate movie ID
        if (!movieId || typeof movieId !== 'number' || movieId <= 0) {
          throw new Error('Movie ID must be a positive number')
        }
        
        return {
          url: `${API_ENDPOINTS.MOVIE_DETAILS}/${movieId}`,
          params: {
            language: DEFAULT_PARAMS.language,
          },
        }
      },
      providesTags: (_result, _error, movieId) => [
        { type: 'MovieDetails' as const, id: movieId }
      ],
    }),

    getPopularMovies: builder.query<ApiResponse<Movie>, { page?: number }>({
      query: ({ page = DEFAULT_PARAMS.page } = {}) => {
        // Validate page number - TMDb API has max 500 pages
        const validPage = Math.max(1, Math.min(page, 500))
        return {
          url: API_ENDPOINTS.POPULAR_MOVIES,
          params: {
            page: validPage,
            language: DEFAULT_PARAMS.language,
          },
        }
      },
      providesTags: ['Movie'],
    }),

    getTopRatedMovies: builder.query<ApiResponse<Movie>, { page?: number }>({
      query: ({ page = DEFAULT_PARAMS.page } = {}) => {
        // Validate page number - TMDb API has max 500 pages
        const validPage = Math.max(1, Math.min(page, 500))
        return {
          url: API_ENDPOINTS.TOP_RATED_MOVIES,
          params: {
            page: validPage,
            language: DEFAULT_PARAMS.language,
          },
        }
      },
      providesTags: ['Movie'],
    }),

    // Get now playing movies
    getNowPlayingMovies: builder.query<ApiResponse<Movie>, { page?: number }>({
      query: ({ page = DEFAULT_PARAMS.page } = {}) => {
        // Validate page number - TMDb API has max 500 pages
        const validPage = Math.max(1, Math.min(page, 500))
        return {
          url: API_ENDPOINTS.NOW_PLAYING_MOVIES,
          params: {
            page: validPage,
            language: DEFAULT_PARAMS.language,
          },
        }
      },
      providesTags: ['Movie'],
    }),
  }),
})

// Export hooks for usage in components
export const {
  useSearchMoviesQuery,
  useLazySearchMoviesQuery,
  useGetMovieDetailsQuery,
  useLazyGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = tmdbApi
