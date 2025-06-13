import React from 'react'

import styles from './HomePage.module.scss'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { MovieDetails } from '../../components/MovieDetails/MovieDetails'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { Pagination } from '../../components/Pagination/Pagination'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useApiPagination } from '../../hooks/useApiPagination'
import { useFavoritesManager } from '../../hooks/useFavorites'
import { useMovieCategories } from '../../hooks/useMovieCategories'
import { useMovieModal } from '../../hooks/useMovieModal'
import { useMovieSearch } from '../../hooks/useMovieSearch'

import type { Movie } from '../../types/movie'

interface HomePageProps {
  onMovieClick?: (movie: Movie) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onMovieClick }) => {
  const { currentPage, handlePageChange, resetToFirstPage } = useApiPagination()
  
  const { 
    searchQuery, 
    debouncedQuery,
    setSearchQuery, 
    searchResults, 
    isSearching,
    currentPage: searchPage,
    handlePageChange: handleSearchPageChange,
  } = useMovieSearch()
  
  const { isFavorite, toggleMovieFavorite } = useFavoritesManager()
  const { selectedCategory, categoryData, setSelectedCategory } = useMovieCategories(currentPage)
  
  const {
    selectedMovieId,
    movieDetails,
    isModalOpen,
    openMovieDetails,
    closeMovieDetails,
  } = useMovieModal()

  // Event handlers
  const handleCategoryChange = (category: typeof selectedCategory) => {
    setSelectedCategory(category)
    resetToFirstPage()
  }

  const handleMovieClick = (movie: Movie) => {
    if (onMovieClick) {
      onMovieClick(movie)
    } else {
      openMovieDetails(movie.id)
    }
  }

  const handleToggleFavoriteForModal = () => {
    if (movieDetails) {
      const movie: Movie = {
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
        vote_average: movieDetails.vote_average,
        overview: movieDetails.overview,
        backdrop_path: movieDetails.backdrop_path,
        genre_ids: movieDetails.genres?.map(g => g.id) || [],
        adult: movieDetails.adult,
        original_language: movieDetails.original_language,
        original_title: movieDetails.original_title,
        popularity: movieDetails.popularity,
        video: movieDetails.video,
        vote_count: movieDetails.vote_count,
      }
      toggleMovieFavorite(movie)
    }
  }

  const isSearchMode = searchQuery.trim().length > 0
  const isWaitingForDebounce = searchQuery.trim() !== debouncedQuery.trim()
  const currentMovies = isSearchMode ? searchResults.data?.results || [] : categoryData.movies
  const currentIsLoading = isSearchMode ? (isWaitingForDebounce || isSearching) : categoryData.isLoading
  const currentError = isSearchMode ? 
    (searchResults.error ? 'Nie udało się wyszukać filmów' : null) : 
    categoryData.error
  const currentTotalPages = isSearchMode ? 
    searchResults.data?.total_pages || 0 : 
    categoryData.totalPages
  const currentPageNumber = isSearchMode ? searchPage : currentPage
  const handleCurrentPageChange = isSearchMode ? handleSearchPageChange : handlePageChange

  const handleRetry = () => {
    if (isSearchMode) {
      searchResults.refetch?.()
    } else {
      categoryData.refetch()
    }
  }

  return (
    <PageLayout>

      <div className={styles.searchSection}>
        <div className={styles.searchTitle}>
          🎬 Odkryj niesamowite filmy
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Wyszukaj tytuł produkcji..."
        />
      </div>

      {!isSearchMode && (
        <div className={styles.categoryTabs}>
          {[
            { key: 'popular', label: 'Popularne' },
            { key: 'top_rated', label: 'Najlepiej Oceniane' },
            { key: 'now_playing', label: 'Obecnie w Kinach' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'primary' : 'secondary'}
              onClick={() => handleCategoryChange(key as typeof selectedCategory)}
              disabled={currentIsLoading}
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {/* Results Section */}
      <div className={styles.resultsSection}>
        {isSearchMode && searchQuery.trim() && (
          <h2 className={styles.sectionTitle}>
            Wyniki wyszukiwania dla "{searchQuery}"
          </h2>
        )}
        
        {!isSearchMode && (
          <h2 className={styles.sectionTitle}>
            {selectedCategory === 'popular' && 'Popularne Filmy'}
            {selectedCategory === 'top_rated' && 'Najlepiej Oceniane Filmy'}
            {selectedCategory === 'now_playing' && 'Obecnie w Kinach'}
          </h2>
        )}

        <MovieGrid
          movies={currentMovies}
          isLoading={currentIsLoading}
          error={currentError}
          isFavorite={isFavorite}
          onToggleFavorite={toggleMovieFavorite}
          onMovieClick={handleMovieClick}
          onRetry={handleRetry}
          emptyMessage={
            isSearchMode 
              ? 'Nie znaleziono filmów dla twojego wyszukiwania.' 
              : 'Brak dostępnych filmów.'
          }
        />

        {currentTotalPages > 1 && !currentIsLoading && !currentError && (
          <div className={styles.paginationSection}>
            <Pagination
              currentPage={currentPageNumber}
              totalPages={currentTotalPages}
              onPageChange={handleCurrentPageChange}
            />
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeMovieDetails}>
        {movieDetails ? (
          <MovieDetails
            movie={movieDetails}
            isFavorite={selectedMovieId ? isFavorite(selectedMovieId) : false}
            onToggleFavorite={handleToggleFavoriteForModal}
            onClose={closeMovieDetails}
          />
        ) : (
          <div>Ładowanie szczegółów filmu...</div>
        )}
      </Modal>
    </PageLayout>
  )
}
