import type { Movie, FavoriteMovie } from '../types/movie'

const FAVORITES_KEY = 'movies-hunter-favorites'

export const favoritesService = {
  getFavorites(): FavoriteMovie[] {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY)
      return favorites ? JSON.parse(favorites) : []
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error)
      return []
    }
  },

  setFavorites(favorites: FavoriteMovie[]): boolean {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      return true
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
      return false
    }
  },

  addFavorite(movie: Movie): boolean {
    const favorites = this.getFavorites()
    const favoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      addedAt: new Date().toISOString(),
    }
    
    const exists = favorites.some(fav => fav.id === movie.id)
    if (!exists) {
      favorites.push(favoriteMovie)
      return this.setFavorites(favorites)
    }
    
    return false
  },

  removeFavorite(movieId: number): boolean {
    if (movieId <= 0) return false
    
    const favorites = this.getFavorites()
    const updatedFavorites = favorites.filter(fav => fav.id !== movieId)
    
    if (updatedFavorites.length === favorites.length) {
      return false // Movie not found
    }
    
    return this.setFavorites(updatedFavorites)
  },

  isFavorite(movieId: number): boolean {
    if (movieId <= 0) return false
    
    const favorites = this.getFavorites()
    return favorites.some(fav => fav.id === movieId)
  },

  clearAllFavorites(): boolean {
    try {
      localStorage.removeItem(FAVORITES_KEY)
      return true
    } catch (error) {
      console.error('Error clearing favorites:', error)
      return false
    }
  }
}
