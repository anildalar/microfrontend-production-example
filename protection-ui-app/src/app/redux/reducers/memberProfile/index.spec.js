import memberProfileReducer, {
  getMemberProfile, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Alerts Reducer', () => {
  test('- Should handle fetchData', () => {
    expect(memberProfileReducer(initialState, getMemberProfile({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(memberProfileReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(memberProfileReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(memberProfileReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(memberProfileReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC_ALERT',
    })
  })

  test('- Should handle with default values', () => {
    expect(memberProfileReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(memberProfileReducer(initialState, setData()))
      .toEqual({ ...initialState })
    expect(memberProfileReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(memberProfileReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
