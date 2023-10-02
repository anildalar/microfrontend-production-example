import otpReducer, {
  postOtp, setData, setReset, setError, initialState,
} from '.'

describe('- OTP Reducer', () => {
  test('- Should handle postOtp', () => {
    expect(otpReducer(initialState, postOtp({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setData', () => {
    expect(otpReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(otpReducer(initialState, setReset()))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(otpReducer(initialState, setError('SME_ERR_CSE425'))).toEqual({
      ...initialState, error: 'SME_ERR_CSE425', isLoading: false,
    })
  })

  test('- Should handle with default values', () => {
    expect(otpReducer(initialState, postOtp()))
      .toEqual({ ...initialState, isLoading: true })
    expect(otpReducer(initialState, setData())).toEqual({ ...initialState })
    expect(otpReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(otpReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
