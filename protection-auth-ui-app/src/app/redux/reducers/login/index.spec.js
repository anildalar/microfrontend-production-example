import loginReducer, {
  postLogin, setData, setLoading, setReset, setError, initialState,
} from '.'

describe('- Login Reducer', () => {
  test('- Should handle postLogin', () => {
    expect(loginReducer(initialState, postLogin({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(loginReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(loginReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(loginReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(loginReducer(initialState, setError('SME_LOGIN_ERR_GENERIC'))).toEqual({
      ...initialState, error: 'SME_LOGIN_ERR_GENERIC',
    })
  })

  test('- Should handle with default values', () => {
    expect(loginReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(loginReducer(initialState, setData())).toEqual({ ...initialState })
    expect(loginReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(loginReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
