import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: { appConfigData: null, configStoreData: null, themeConfigData: null },
  isLoading: true,
  error: null,
}

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    fetchData: (state) => ({
      ...state,
      isLoading: true,
    }),
    setData: (state, action) => ({
      ...initialState,
      ...state,
      data: action?.payload || initialState.data,
      isLoading: action?.payload ? false || initialState.isLoading : initialState.isLoading,
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
  fetchData, setLoading, setData, setReset, setError,
} = appConfigSlice.actions

export default appConfigSlice.reducer
