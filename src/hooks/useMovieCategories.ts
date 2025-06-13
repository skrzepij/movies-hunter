import { useState, useCallback } from 'react'

import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
} from '../services/tmdbApi'

import type { Movie } from '../types/movie'

export type MovieCategory = 'popular' | 'top_rated' | 'now_playing'

interface CategoryData {
  movies: Movie[]
  isLoading: boolean
  error: string | null
  totalPages: number
  refetch: () => void
}

interface UseMovieCategoriesReturn {
  selectedCategory: MovieCategory
  categoryData: CategoryData
  setSelectedCategory: (category: MovieCategory) => void
}

export const useMovieCategories = (page: number = 1): UseMovieCategoriesReturn => {
  const [selectedCategory, setSelectedCategory] = useState<MovieCategory>('popular')

  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    error: popularError,
    refetch: refetchPopular,
  } = useGetPopularMoviesQuery({ page })

  const {
    data: topRatedMovies,
    isLoading: isLoadingTopRated,
    error: topRatedError,
    refetch: refetchTopRated,
  } = useGetTopRatedMoviesQuery({ page })

  const {
    data: nowPlayingMovies,
    isLoading: isLoadingNowPlaying,
    error: nowPlayingError,
    refetch: refetchNowPlaying,
  } = useGetNowPlayingMoviesQuery({ page })

  const getErrorMessage = (error: unknown): string | null => {
    if (!error) return null
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const errorData = error.data as { status_message?: string } | undefined
      return errorData?.status_message ?? 'An error occurred'
    }
    return 'An error occurred'
  }

  const getCategoryData = useCallback((): CategoryData => {
    switch (selectedCategory) {
      case 'top_rated':
        return {
          movies: topRatedMovies?.results ?? [],
          isLoading: isLoadingTopRated,
          error: getErrorMessage(topRatedError),
          totalPages: topRatedMovies?.total_pages ?? 0,
          refetch: refetchTopRated,
        }
      case 'now_playing':
        return {
          movies: nowPlayingMovies?.results ?? [],
          isLoading: isLoadingNowPlaying,
          error: getErrorMessage(nowPlayingError),
          totalPages: nowPlayingMovies?.total_pages ?? 0,
          refetch: refetchNowPlaying,
        }
      case 'popular':
      default:
        return {
          movies: popularMovies?.results ?? [],
          isLoading: isLoadingPopular,
          error: getErrorMessage(popularError),
          totalPages: popularMovies?.total_pages ?? 0,
          refetch: refetchPopular,
        }
    }
  }, [
    selectedCategory,
    popularMovies,
    topRatedMovies,
    nowPlayingMovies,
    isLoadingPopular,
    isLoadingTopRated,
    isLoadingNowPlaying,
    popularError,
    topRatedError,
    nowPlayingError,
    refetchPopular,
    refetchTopRated,
    refetchNowPlaying,
  ])

  return {
    selectedCategory,
    categoryData: getCategoryData(),
    setSelectedCategory,
  }
}
