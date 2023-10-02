import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isLoading: false,
  error: null,
  data: null,
}

export const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    postOtp: () => ({
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
  postOtp, setData, setLoading, setReset, setError,
} = otpSlice.actions

export default otpSlice.reducer
