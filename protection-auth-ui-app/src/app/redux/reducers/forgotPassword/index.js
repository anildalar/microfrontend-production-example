import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isLoading: false,
  error: null,
  data: null,
}

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    postForgotPassword: () => ({
      ...initialState,
      isLoading: true,
    }),
    setData: (state, action) => ({
      ...initialState,
      ...state,
      data: action?.payload || initialState.data,
      isLoading: false,
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
  postForgotPassword, setData, setLoading, setReset, setError,
} = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer
