import resetPasswordReducer, {
  postResetPassword, setLoading, setData,
  setReset, setError, initialState,
} from '.'

describe('- ResetPassword Reducer', () => {
  test('- Should handle postResetPassword', () => {
    expect(resetPasswordReducer(initialState, postResetPassword({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(resetPasswordReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: true,
    })
  })

  test('- Should handle setData', () => {
    expect(resetPasswordReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(resetPasswordReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(resetPasswordReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState,
      isLoading: false,
      error: 'PROTECTION_ERR_GENERIC_ALERT',
      data: {
        ...initialState.data,
        status: null,
      },
    })
  })

  test('- Should handle with default values', () => {
    expect(resetPasswordReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(resetPasswordReducer(initialState, setData())).toEqual({
      ...initialState,
      isLoading: false,
    })
    expect(resetPasswordReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(resetPasswordReducer(initialState, setError())).toEqual({
      ...initialState,
      isLoading: false,
    })
  })
})
