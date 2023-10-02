import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: null,
  isLoading: false,
  error: null,
}

export const postKbaSlice = createSlice({
  name: 'postKba',
  initialState,
  reducers: {
    postKbaCall: (state) => ({
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
  postKbaCall, setLoading, setData, setReset, setError,
} = postKbaSlice.actions

export default postKbaSlice.reducer
