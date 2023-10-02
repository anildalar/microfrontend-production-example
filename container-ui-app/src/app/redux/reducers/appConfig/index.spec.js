import appConfigReducer, {
  fetchData, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- AppConfig Reducer', () => {
  test('- Should handle fetchData', () => {
    expect(appConfigReducer(initialState, fetchData({}))).toEqual({ ...initialState })
  })

  test('- Should handle setLoading', () => {
    expect(appConfigReducer(initialState, setLoading(false))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(appConfigReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: initialState.isLoading,
    })
  })

  test('- Should handle setReset', () => {
    expect(appConfigReducer(initialState, setReset({}))).toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(appConfigReducer(initialState, setError({}))).toEqual({
      ...initialState, error: {}, isLoading: false,
    })
  })

  test('- Should handle with default values', () => {
    expect(appConfigReducer(initialState, fetchData({}))).toEqual({ ...initialState })
    expect(appConfigReducer(initialState, setLoading())).toEqual({ ...initialState })
    expect(appConfigReducer(initialState, setData())).toEqual({ ...initialState })
    expect(appConfigReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(appConfigReducer(initialState, setError())).toEqual({
      ...initialState,
      isLoading: false,
    })
  })
})
