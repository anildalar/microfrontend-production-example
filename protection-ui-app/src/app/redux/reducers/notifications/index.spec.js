import notificationsReducer, {
  getNotifications, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Notifications Reducer', () => {
  test('- Should handle get notifications', () => {
    expect(notificationsReducer(initialState, getNotifications({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(notificationsReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(notificationsReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(notificationsReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(notificationsReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC_ALERT',
    })
  })

  test('- Should handle with default values', () => {
    expect(notificationsReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(notificationsReducer(initialState, setData()))
      .toEqual({ ...initialState })
    expect(notificationsReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(notificationsReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
