import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  locale: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale: (state, action) => ({
      ...initialState,
      ...state,
      locale: typeof action?.payload === 'string' ? action?.payload : initialState?.locale,
    }),
    setReset: (state) => ({
      ...state,
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  setLocale, setReset,
} = appSlice.actions

export default appSlice.reducer
