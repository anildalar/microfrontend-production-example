import enrollmentReducer, {
  postEnrollment, setData, setLoading, setReset, setError, initialState,
} from '.'

describe('- Forgot Password Reducer', () => {
  test('- Should handle postEnrollment', () => {
    expect(enrollmentReducer(initialState, postEnrollment({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setData', () => {
    expect(enrollmentReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })
  test('- Should handle setLoading', () => {
    expect(enrollmentReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: true,
    })
  })

  test('- Should handle setReset', () => {
    expect(enrollmentReducer(initialState, setReset()))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(enrollmentReducer(initialState, setError('PROTECTION_ERR_GENERIC'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC', isLoading: false,
    })
  })

  test('- Should handle with default values', () => {
    expect(enrollmentReducer(initialState, postEnrollment()))
      .toEqual({ ...initialState, isLoading: true })
    expect(enrollmentReducer(initialState, setData())).toEqual({ ...initialState })
    expect(enrollmentReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(enrollmentReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
