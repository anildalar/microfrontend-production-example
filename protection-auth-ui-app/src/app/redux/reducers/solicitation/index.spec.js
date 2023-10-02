import solicitationReducer, {
  getSolicitation, setData, setLoading, setReset, setError, initialState,
} from '.'

describe('- Communication Preference Reducer', () => {
  test('- Should handle getSolicitation', () => {
    expect(solicitationReducer(initialState, getSolicitation({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(solicitationReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(solicitationReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(solicitationReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(solicitationReducer(initialState, setError('SME_LOGIN_ERR_GENERIC'))).toEqual({
      ...initialState, error: 'SME_LOGIN_ERR_GENERIC',
    })
  })

  test('- Should handle with default values', () => {
    expect(solicitationReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(solicitationReducer(initialState, setData())).toEqual({ ...initialState })
    expect(solicitationReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(solicitationReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
