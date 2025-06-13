import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import styles from './App.module.scss'
import { Header } from './components/Header/Header'
import { FavoritesPage } from './pages/favorites/FavoritesPage'
import { HomePage } from './pages/home/HomePage'
import { MovieDetailsPage } from './pages/movie/MovieDetailsPage'
import { store } from './store/index'

function AppRoutes() {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route 
          path="/" 
          element={<HomePage />} 
        />
        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetailsPage />}
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/movie/:id"
            element={<MovieDetailsPage />}
          />
        </Routes>
      )}
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.appContainer}>
          <Header />
          <main className={styles.mainContent}>
            <AppRoutes />
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App
