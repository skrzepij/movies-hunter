import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  query: string
  currentPage: number
  selectedCategory: 'popular' | 'top_rated' | 'now_playing'
}

const initialState: SearchState = {
  query: '',
  currentPage: 1,
  selectedCategory: 'popular',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
      state.currentPage = 1 // Reset page when query changes
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<SearchState['selectedCategory']>) => {
      state.selectedCategory = action.payload
      state.currentPage = 1 // Reset page when category changes
    },
    clearSearch: (state) => {
      state.query = ''
      state.currentPage = 1
    },
  },
})

export const { setSearchQuery, setCurrentPage, setSelectedCategory, clearSearch } = searchSlice.actions
