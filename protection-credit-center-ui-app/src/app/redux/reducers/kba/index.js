import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: {
    status: null,
  },
  isLoading: true,
  error: null,
}

export const kbaSlice = createSlice({
  name: 'kba',
  initialState,
  reducers: {
    getKbaData: (state) => ({
      ...initialState,
      ...state,
      isLoading: true,
    }),
    setData: (state, action) => ({
      ...initialState,
      ...state,
      data: action?.payload || initialState.data,
      isLoading: false,
    }),
    setLoading: (state, action) => ({
      ...initialState,
      ...state,
      isLoading: (typeof action?.payload === 'undefined') ? initialState.isLoading : action?.payload,
    }),
    setError: (state, action) => ({
      ...initialState,
      ...state,
      error: action?.payload || initialState.error,
      isLoading: false,
    }),
    setReset: (state) => ({
      ...state,
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  getKbaData, setLoading, setData, setReset, setError,
} = kbaSlice.actions

export default kbaSlice.reducer
