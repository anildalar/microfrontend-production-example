import creditScoreReducer, {
  postCreditScore, setData, setLoading, setReset, setError, initialState,
} from '.'

describe('- creditScore Reducer', () => {
  test('- Should handle postCreditScore', () => {
    expect(creditScoreReducer(initialState, postCreditScore({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(creditScoreReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(creditScoreReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(creditScoreReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(creditScoreReducer(initialState, setError('SME_creditScore_ERR_GENERIC'))).toEqual({
      ...initialState, error: 'SME_creditScore_ERR_GENERIC',
    })
  })

  test('- Should handle with default values', () => {
    expect(creditScoreReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(creditScoreReducer(initialState, setData())).toEqual({ ...initialState })
    expect(creditScoreReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(creditScoreReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
