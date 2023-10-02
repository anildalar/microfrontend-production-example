import getTimelineReducer, {
  getTimeline, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Timeline Reducer', () => {
  test('- Should handle getTimeline', () => {
    expect(getTimelineReducer(initialState, getTimeline({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(getTimelineReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(getTimelineReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(getTimelineReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(getTimelineReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC_ALERT',
    })
  })

  test('- Should handle with default values', () => {
    expect(getTimelineReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(getTimelineReducer(initialState, setData()))
      .toEqual({ ...initialState })
    expect(getTimelineReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(getTimelineReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
