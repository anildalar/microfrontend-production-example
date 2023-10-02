import kba, {
  getKbaData, setLoading, setData,
  setReset, setError, initialState,
} from '.'

describe('- KBA Reducer', () => {
  test('- Should handle getKbaData', () => {
    expect(kba(initialState, getKbaData({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(kba(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(kba(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(kba(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(kba(initialState, setError('SME_ERR_GENERIC'))).toEqual({
      ...initialState,
      isLoading: false,
      error: 'SME_ERR_GENERIC',
      data: {
        ...initialState.data,
        status: null,
      },
    })
  })

  test('- Should handle setError with invalid link', () => {
    expect(kba(initialState, setError('SME_RESET_PWD_ERR_CSE426'))).toEqual({
      ...initialState,
      isLoading: false,
      error: 'SME_RESET_PWD_ERR_CSE426',
      data: {
        ...initialState.data,
        status: 'error',
      },
    })
  })

  test('- Should handle with default values', () => {
    expect(kba(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(kba(initialState, setData())).toEqual({
      ...initialState,
      isLoading: false,
    })
    expect(kba(initialState, setReset())).toEqual({ ...initialState })
    expect(kba(initialState, setError())).toEqual({
      ...initialState,
      isLoading: false,
    })
  })
})
