import postKbaReducer, {
  postKbaCall, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Post KBA Reducer', () => {
  test('- Should handle postKba', () => {
    expect(postKbaReducer(initialState, postKbaCall({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(postKbaReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(postKbaReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(postKbaReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(postKbaReducer(initialState, setError('SME_ERR_GENERIC'))).toEqual({
      ...initialState, error: 'SME_ERR_GENERIC',
    })
  })

  test('- Should handle with default values', () => {
    expect(postKbaReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(postKbaReducer(initialState, setData())).toEqual({ ...initialState })
    expect(postKbaReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(postKbaReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
