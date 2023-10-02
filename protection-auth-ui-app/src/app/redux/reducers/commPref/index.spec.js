import commPrefReducer, {
  getCommPref, setData, setLoading, setReset, setError, initialState,
} from '.'

describe('- Communication Preference Reducer', () => {
  test('- Should handle getCommPref', () => {
    expect(commPrefReducer(initialState, getCommPref({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(commPrefReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(commPrefReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(commPrefReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(commPrefReducer(initialState, setError('SME_LOGIN_ERR_GENERIC'))).toEqual({
      ...initialState, error: 'SME_LOGIN_ERR_GENERIC',
    })
  })

  test('- Should handle with default values', () => {
    expect(commPrefReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(commPrefReducer(initialState, setData())).toEqual({ ...initialState })
    expect(commPrefReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(commPrefReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
