import type { FavoriteMovie } from '../types/movie'

const FAVORITES_KEY = 'movieHunter_favorites' as const

interface StorageError {
  operation: 'read' | 'write' | 'parse'
  message: string
  originalError?: unknown
}

type StorageResult<T> = {
  success: true
  data: T
} | {
  success: false
  error: StorageError
}

/**
 * Local storage utilities for managing favorite movies with type safety
 */
export const favoritesStorage = {
  /**
   * Get all favorite movies from localStorage
   * @returns Array of favorite movies or empty array on error
   */
  getFavorites(): FavoriteMovie[] {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY)
      if (!favorites) {
        return []
      }
      
      const parsed = JSON.parse(favorites)
      
      if (!Array.isArray(parsed)) {
        console.error('Invalid favorites data: expected array')
        return []
      }
      
      const validFavorites = parsed.filter((item): item is FavoriteMovie => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.id === 'number' &&
          typeof item.title === 'string' &&
          typeof item.addedAt === 'string'
        )
      })
      
      return validFavorites
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error)
      return []
    }
  },

  /**
   * Get favorites with detailed result information
   * @returns StorageResult with either data or error details
   */
  getFavoritesWithResult(): StorageResult<FavoriteMovie[]> {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY)
      if (!favorites) {
        return { success: true, data: [] }
      }
      
      const parsed = JSON.parse(favorites)
      
      if (!Array.isArray(parsed)) {
        return {
          success: false,
          error: {
            operation: 'parse',
            message: 'Invalid favorites data: expected array'
          }
        }
      }
      
      const validFavorites = parsed.filter((item): item is FavoriteMovie => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.id === 'number' &&
          typeof item.title === 'string' &&
          typeof item.addedAt === 'string'
        )
      })
      
      return { success: true, data: validFavorites }
    } catch (error) {
      return {
        success: false,
        error: {
          operation: 'read',
          message: 'Failed to read from localStorage',
          originalError: error
        }
      }
    }
  },

  /**
   * Save favorite movies to localStorage with validation
   * @param favorites - Array of favorite movies to save
   * @returns True if successful, false otherwise
   */
  setFavorites(favorites: FavoriteMovie[]): boolean {
    if (!Array.isArray(favorites)) {
      console.error('Invalid favorites data: expected array')
      return false
    }
    
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      return true
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
      return false
    }
  },

  /**
   * Add a movie to favorites with proper typing
   * @param movie - Movie data (without addedAt timestamp)
   * @returns True if added successfully, false if already exists or error
   */
  addFavorite(movie: Omit<FavoriteMovie, 'addedAt'>): boolean {
    if (!movie || typeof movie.id !== 'number' || !movie.title) {
      console.error('Invalid movie data for adding to favorites')
      return false
    }
    
    const favorites = this.getFavorites()
    const favoriteMovie: FavoriteMovie = {
      ...movie,
      addedAt: new Date().toISOString()
    }
    
    // Check if movie is already in favorites
    const exists = favorites.some(fav => fav.id === movie.id)
    if (!exists) {
      favorites.push(favoriteMovie)
      return this.setFavorites(favorites)
    }
    
    return false // Already exists
  },

  /**
   * Remove a movie from favorites by ID
   * @param movieId - ID of the movie to remove
   * @returns True if removed successfully, false if not found or error
   */
  removeFavorite(movieId: number): boolean {
    if (typeof movieId !== 'number' || movieId <= 0) {
      console.error('Invalid movie ID for removing from favorites')
      return false
    }
    
    const favorites = this.getFavorites()
    const initialLength = favorites.length
    const updatedFavorites = favorites.filter(fav => fav.id !== movieId)
    
    if (updatedFavorites.length === initialLength) {
      return false // Movie not found
    }
    
    return this.setFavorites(updatedFavorites)
  },

  /**
   * Check if a movie is in favorites
   * @param movieId - ID of the movie to check
   * @returns True if movie is in favorites
   */
  isFavorite(movieId: number): boolean {
    if (typeof movieId !== 'number' || movieId <= 0) {
      return false
    }
    
    const favorites = this.getFavorites()
    return favorites.some(fav => fav.id === movieId)
  },

  /**
   * Clear all favorites from localStorage
   * @returns True if cleared successfully
   */
  clearAllFavorites(): boolean {
    try {
      localStorage.removeItem(FAVORITES_KEY)
      return true
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error)
      return false
    }
  },

  /**
   * Get the count of favorite movies
   * @returns Number of favorite movies
   */
  getFavoritesCount(): number {
    return this.getFavorites().length
  }
}
