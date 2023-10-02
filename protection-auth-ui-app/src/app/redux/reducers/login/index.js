import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: null,
  isLoading: false,
  error: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    postLogin: (state) => ({
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
  postLogin, setData, setLoading, setReset, setError,
} = loginSlice.actions

export default loginSlice.reducer
