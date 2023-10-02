import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: null,
  isLoading: false,
  error: null,
}

export const getTimelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    getTimeline: (state) => ({
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
  getTimeline, setLoading, setData, setReset, setError,
} = getTimelineSlice.actions

export default getTimelineSlice.reducer
