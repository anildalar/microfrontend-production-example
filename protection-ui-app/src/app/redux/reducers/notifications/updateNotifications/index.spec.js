import updateNotificationsReducer, {
  updateNotificationsCall, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Update Notifications Reducer', () => {
  test('- Should handle update notifications', () => {
    expect(updateNotificationsReducer(initialState, updateNotificationsCall({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(updateNotificationsReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(updateNotificationsReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(updateNotificationsReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(updateNotificationsReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC_ALERT',
    })
  })

  test('- Should handle with default values', () => {
    expect(updateNotificationsReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(updateNotificationsReducer(initialState, setData())).toEqual({ ...initialState })
    expect(updateNotificationsReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(updateNotificationsReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
