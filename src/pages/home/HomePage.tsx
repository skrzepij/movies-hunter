import React from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import styles from './HomePage.module.scss'
import { Button } from '../../components/Button/Button'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { Pagination } from '../../components/Pagination/Pagination'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useApiPagination } from '../../hooks/useApiPagination'
import { useFavoritesManager } from '../../hooks/useFavorites'
import { useMovieCategories } from '../../hooks/useMovieCategories'
import { useMovieSearch } from '../../hooks/useMovieSearch'

import type { Movie } from '../../types/movie'

interface HomePageProps {
  onMovieClick?: (movie: Movie) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onMovieClick }) => {
  const navigate = useNavigate()
  const location = useLocation()
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

  // Event handlers
  const handleCategoryChange = (category: typeof selectedCategory) => {
    setSelectedCategory(category)
    resetToFirstPage()
  }

  const handleMovieClick = (movie: Movie) => {
    if (onMovieClick) {
      onMovieClick(movie)
    } else {
      navigate(`/movie/${movie.id}`, {
        state: { backgroundLocation: location }
      })
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
          placeholder="Wpisz tytuł produkcji..."
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
    </PageLayout>
  )
}
