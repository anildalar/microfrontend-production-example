import forgotPasswordReducer, {
  postForgotPassword, setData, setReset, setError, initialState,
} from '.'

describe('- Forgot Password Reducer', () => {
  test('- Should handle postForgotPassword', () => {
    expect(forgotPasswordReducer(initialState, postForgotPassword({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setData', () => {
    expect(forgotPasswordReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(forgotPasswordReducer(initialState, setReset()))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(forgotPasswordReducer(initialState, setError('SME_ERR_CSE425'))).toEqual({
      ...initialState, error: 'SME_ERR_CSE425', isLoading: false,
    })
  })

  test('- Should handle with default values', () => {
    expect(forgotPasswordReducer(initialState, postForgotPassword()))
      .toEqual({ ...initialState, isLoading: true })
    expect(forgotPasswordReducer(initialState, setData())).toEqual({ ...initialState })
    expect(forgotPasswordReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(forgotPasswordReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
