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
 * RTK Query API slice for TMDb API interactions
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
    searchMovies: builder.query<SearchMoviesResponse, SearchMoviesParams>({
      query: ({ query, page = DEFAULT_PARAMS.page }) => ({
        url: API_ENDPOINTS.SEARCH_MOVIES,
        params: {
          query: query.trim(),
          page: Math.max(1, Math.min(page, 500)),
          language: DEFAULT_PARAMS.language,
        },
      }),
      providesTags: ['Movie'],
    }),

    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movieId) => ({
        url: `${API_ENDPOINTS.MOVIE_DETAILS}/${movieId}`,
        params: {
          language: DEFAULT_PARAMS.language,
        },
      }),
      providesTags: (_result, _error, movieId) => [
        { type: 'MovieDetails' as const, id: movieId }
      ],
    }),

    getPopularMovies: builder.query<ApiResponse<Movie>, { page?: number }>({
      query: ({ page = DEFAULT_PARAMS.page } = {}) => ({
        url: API_ENDPOINTS.POPULAR_MOVIES,
        params: {
          page: Math.max(1, Math.min(page, 500)),
          language: DEFAULT_PARAMS.language,
        },
      }),
      providesTags: ['Movie'],
    }),

    getTopRatedMovies: builder.query<ApiResponse<Movie>, { page?: number }>({
      query: ({ page = DEFAULT_PARAMS.page } = {}) => ({
        url: API_ENDPOINTS.TOP_RATED_MOVIES,
        params: {
          page: Math.max(1, Math.min(page, 500)),
          language: DEFAULT_PARAMS.language,
        },
      }),
      providesTags: ['Movie'],
    }),

    getNowPlayingMovies: builder.query<ApiResponse<Movie>, { page?: number }>({
      query: ({ page = DEFAULT_PARAMS.page } = {}) => ({
        url: API_ENDPOINTS.NOW_PLAYING_MOVIES,
        params: {
          page: Math.max(1, Math.min(page, 500)),
          language: DEFAULT_PARAMS.language,
        },
      }),
      providesTags: ['Movie'],
    }),
  }),
})

export const {
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = tmdbApi
