import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { HomePage } from './HomePage';
import { favoritesSlice } from '../../store/favoritesSlice';

import type { Movie } from '../../types/movie';

vi.mock('../../styles/components', () => ({
  Container: 'div',
  FlexContainer: 'div',
  Heading: 'h2',
  Text: 'p',
  Button: 'button',
  Card: 'div',
}));

vi.mock('../../components/SearchBar', () => ({
  SearchBar: () => <div data-testid="search-bar">Search Bar</div>
}));

vi.mock('../../components/MovieGrid', () => ({
  MovieGrid: ({ movies, onMovieClick }: { movies: Movie[], onMovieClick: (movie: Movie) => void }) => (
    <div data-testid="movie-grid">
      {movies.map((movie: Movie) => (
        <div 
          key={movie.id}
          onClick={() => onMovieClick(movie)}
          data-testid={`movie-item-${movie.id}`}
        >
          {movie.title}
        </div>
      ))}
    </div>
  )
}));

vi.mock('../../components/Modal', () => ({
  Modal: ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => isOpen ? (
    <div data-testid="modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  ) : null
}));

vi.mock('../../components/MovieDetails', () => ({
  MovieDetails: ({ movie }: { movie: Movie | null }) => (
    <div data-testid="movie-details">
      {movie?.title || 'No movie selected'}
    </div>
  )
}));

vi.mock('../../components/Pagination', () => ({
  Pagination: ({ currentPage, totalPages }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => (
    <div data-testid="pagination">
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  )
}));

const mockMovies = {
  popular: [
    {
      id: 1,
      title: 'Popular Movie 1',
      poster_path: '/poster1.jpg',
      vote_average: 8.5,
      release_date: '2023-01-01',
      overview: 'A popular movie',
      genre_ids: [1, 2],
      adult: false,
      original_language: 'en',
      original_title: 'Popular Movie 1',
      popularity: 100,
      video: false,
      backdrop_path: null,
      vote_count: 1000
    },
    {
      id: 2,
      title: 'Popular Movie 2',
      poster_path: '/poster2.jpg',
      vote_average: 7.5,
      release_date: '2023-02-01',
      overview: 'Another popular movie',
      genre_ids: [1, 2],
      adult: false,
      original_language: 'en',
      original_title: 'Popular Movie 2',
      popularity: 90,
      video: false,
      backdrop_path: null,
      vote_count: 900
    }
  ],
  topRated: [
    {
      id: 3,
      title: 'Top Rated Movie',
      poster_path: '/poster3.jpg',
      vote_average: 9.5,
      release_date: '2023-03-01',
      overview: 'A top rated movie',
      genre_ids: [3, 4],
      adult: false,
      original_language: 'en',
      original_title: 'Top Rated Movie',
      popularity: 80,
      video: false,
      backdrop_path: null,
      vote_count: 800
    }
  ],
  nowPlaying: [
    {
      id: 4,
      title: 'Now Playing Movie',
      poster_path: '/poster4.jpg',
      vote_average: 6.5,
      release_date: '2023-04-01',
      overview: 'A now playing movie',
      genre_ids: [5, 6],
      adult: false,
      original_language: 'en',
      original_title: 'Now Playing Movie',
      popularity: 70,
      video: false,
      backdrop_path: null,
      vote_count: 700
    }
  ]
};

vi.mock('../../services/tmdbApi', () => ({
  tmdbApi: {
    reducer: (state = {}) => state,
    middleware: vi.fn(),
    reducerPath: 'tmdbApi',
    endpoints: {},
  },
  useGetPopularMoviesQuery: vi.fn(() => ({
    data: {
      results: mockMovies.popular,
      total_pages: 10,
      total_results: 200
    },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  })),
  useGetTopRatedMoviesQuery: vi.fn(() => ({
    data: {
      results: mockMovies.topRated,
      total_pages: 5,
      total_results: 100
    },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  })),
  useGetNowPlayingMoviesQuery: vi.fn(() => ({
    data: {
      results: mockMovies.nowPlaying,
      total_pages: 3,
      total_results: 50
    },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  })),
  useGetMovieDetailsQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
}));

vi.mock('../../hooks/useMovieSearch', () => ({
  useMovieSearch: vi.fn(() => ({
    searchQuery: '',
    debouncedQuery: '',
    setSearchQuery: vi.fn(),
    searchResults: {
      data: null,
      isLoading: false,
      error: null
    },
    isSearching: false,
    currentPage: 1,
    handlePageChange: vi.fn(),
  }))
}));

vi.mock('../../hooks/useFavorites', () => ({
  useFavoritesManager: vi.fn(() => ({
    isFavorite: vi.fn(() => false),
    toggleMovieFavorite: vi.fn(),
    favorites: []
  }))
}));

vi.mock('../../hooks/useApiPagination', () => ({
  useApiPagination: vi.fn(() => ({
    currentPage: 1,
    handlePageChange: vi.fn(),
    resetToFirstPage: vi.fn()
  }))
}));

vi.mock('../../hooks/useMovieModal', () => ({
  useMovieModal: vi.fn(() => ({
    selectedMovieId: null,
    movieDetails: null,
    isModalOpen: false,
    openMovieDetails: vi.fn(),
    closeMovieDetails: vi.fn(),
  }))
}));

vi.mock('../../hooks/useMovieCategories', () => {
  const mockMovies = {
    popular: [
      {
        id: 1,
        title: 'Popular Movie 1',
        poster_path: '/poster1.jpg',
        vote_average: 8.5,
        release_date: '2023-01-01',
        overview: 'A popular movie',
        genre_ids: [1, 2],
        adult: false,
        original_language: 'en',
        original_title: 'Popular Movie 1',
        popularity: 100,
        video: false,
        backdrop_path: null,
        vote_count: 1000
      }
    ]
  };
  
  return {
    useMovieCategories: vi.fn(() => ({
      selectedCategory: 'popular',
      categoryData: {
        movies: mockMovies.popular,
        isLoading: false,
        error: null,
        totalPages: 10,
      },
      setSelectedCategory: vi.fn(),
    }))
  };
});

const createTestStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesSlice.reducer,
      tmdbApi: (state = {}) => state, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(),
  });
};

describe('HomePage Component', () => {
  const mockOnMovieClick = vi.fn();
  
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    );
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithRouter(<HomePage onMovieClick={mockOnMovieClick} />);
    
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('displays movie grid with popular movies by default', () => {
    renderWithRouter(<HomePage onMovieClick={mockOnMovieClick} />);
    
    expect(screen.getByTestId('movie-grid')).toBeInTheDocument();
    
    expect(screen.getByText('Popular Movie 1')).toBeInTheDocument();
  });

  it('calls onMovieClick when a movie is clicked', () => {
    renderWithRouter(<HomePage onMovieClick={mockOnMovieClick} />);
    
    const movieElement = screen.getByText('Popular Movie 1');
    fireEvent.click(movieElement);
    
    expect(mockOnMovieClick).toHaveBeenCalledTimes(1);
  });

  it('displays pagination component', () => {
    renderWithRouter(<HomePage onMovieClick={mockOnMovieClick} />);
    
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
