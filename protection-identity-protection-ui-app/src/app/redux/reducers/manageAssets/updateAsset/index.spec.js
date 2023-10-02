import manageAssetsReducer, {
  updateAssetCall, setLoading, setData, setReset, setError, initialState,
} from '.'

describe('- Manage Assets Reducer', () => {
  test('- Should handle updateAsset', () => {
    expect(manageAssetsReducer(initialState, updateAssetCall({}))).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  test('- Should handle setLoading', () => {
    expect(manageAssetsReducer(initialState, setLoading(true))).toEqual({
      ...initialState, isLoading: !initialState.isLoading,
    })
  })

  test('- Should handle setData', () => {
    expect(manageAssetsReducer(initialState, setData({}))).toEqual({
      ...initialState, data: {}, isLoading: false,
    })
  })

  test('- Should handle setReset', () => {
    expect(manageAssetsReducer(initialState, setReset({})))
      .toEqual({ ...initialState })
  })

  test('- Should handle setError', () => {
    expect(manageAssetsReducer(initialState, setError('PROTECTION_ERR_GENERIC_ALERT'))).toEqual({
      ...initialState, error: 'PROTECTION_ERR_GENERIC_ALERT',
    })
  })

  test('- Should handle with default values', () => {
    expect(manageAssetsReducer(initialState, setLoading()))
      .toEqual({ ...initialState })
    expect(manageAssetsReducer(initialState, setData())).toEqual({ ...initialState })
    expect(manageAssetsReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(manageAssetsReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
