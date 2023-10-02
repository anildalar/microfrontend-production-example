import resetPasswordApproval, {
  getResetPasswordApproval, setData, setLoading, setReset, setError, initialState,
} from '.'

describe('- Reset password approval Reducer', () => {
  test('- Should handle getResetPasswordApproval', () => {
    expect(resetPasswordApproval(initialState, getResetPasswordApproval({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(resetPasswordApproval(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(resetPasswordApproval(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(resetPasswordApproval(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(resetPasswordApproval(initialState, setError('SME_LOGIN_ERR_GENERIC'))).toEqual({
      ...initialState, error: 'SME_LOGIN_ERR_GENERIC',
    })
  })

  test('- Should handle with default values', () => {
    expect(resetPasswordApproval(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(resetPasswordApproval(initialState, setData())).toEqual({ ...initialState })
    expect(resetPasswordApproval(initialState, setReset())).toEqual({ ...initialState })
    expect(resetPasswordApproval(initialState, setError())).toEqual({ ...initialState })
  })
})
