import { useDispatch, useSelector } from 'react-redux'

import type { RootState, AppDispatch } from '../store/index'
import type { TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFavorites = () => useAppSelector((state) => state.favorites.favorites)
export const useSearchQuery = () => useAppSelector((state) => state.search.query)
export const useSearchPage = () => useAppSelector((state) => state.search.currentPage)
export const useSelectedCategory = () => useAppSelector((state) => state.search.selectedCategory)
