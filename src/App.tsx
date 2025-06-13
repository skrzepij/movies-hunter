import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import styles from './App.module.scss'
import { Header } from './components/Header/Header'
import { FavoritesPage } from './pages/favorites/FavoritesPage'
import { HomePage } from './pages/home/HomePage'
import { store } from './store/index'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.appContainer}>
          <Header />
          <main className={styles.mainContent}>
            <Routes>
              <Route 
                path="/" 
                element={<HomePage />} 
              />
              <Route
                path="/favorites"
                element={<FavoritesPage />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App
