import alertsReducer, {
  getAlerts, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Alerts Reducer', () => {
  test('- Should handle fetchData', () => {
    expect(alertsReducer(initialState, getAlerts({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(alertsReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(alertsReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(alertsReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(alertsReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC_ALERT',
    })
  })

  test('- Should handle with default values', () => {
    expect(alertsReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(alertsReducer(initialState, setData()))
      .toEqual({ ...initialState })
    expect(alertsReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(alertsReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
