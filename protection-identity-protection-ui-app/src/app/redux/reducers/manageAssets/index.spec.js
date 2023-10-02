import manageAssetsReducer, {
  getManageAssets, setLoading, setData, setReset, setError, initialState,
} from '.'

const payloadWithCompany = {
  company: {
    assets: [
      {
        company: 'test',
      },
    ],
  },
}

describe('- Manage Assets Reducer', () => {
  test('- Should handle fetchData', () => {
    expect(manageAssetsReducer(initialState, getManageAssets({}))).toEqual({
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
      ...initialState, data: {}, isLoading: false, companyData: [],
    })
  })

  test('- Should handle setData with payload of company', () => {
    expect(manageAssetsReducer(initialState, setData(payloadWithCompany))).toEqual({
      ...initialState,
      data: payloadWithCompany,
      isLoading: false,
      companyData: [
        {
          label: 'test',
          value: 'test',
        },
      ],
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
    expect(manageAssetsReducer(initialState, setData()))
      .toEqual({ ...initialState, companyData: [] })
    expect(manageAssetsReducer(initialState, setReset())).toEqual({ ...initialState })
    expect(manageAssetsReducer(initialState, setError())).toEqual({ ...initialState })
  })
})
