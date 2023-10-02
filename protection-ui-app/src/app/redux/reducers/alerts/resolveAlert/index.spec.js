import resolveAlertReducer, {
  resolveAlertCall, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Resolve Alert Reducer', () => {
  test('- Should handle resolve alert', () => {
    expect(resolveAlertReducer(initialState, resolveAlertCall({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(resolveAlertReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(resolveAlertReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(resolveAlertReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(resolveAlertReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC_ALERT',
    })
  })

  test('- Should handle with default values', () => {
    expect(resolveAlertReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(resolveAlertReducer(initialState, setData())).toEqual({ ...initialState })
    expect(resolveAlertReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(resolveAlertReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
