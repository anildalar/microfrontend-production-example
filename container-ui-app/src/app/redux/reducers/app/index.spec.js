import appReducer, {
  setReset, initialState, setLocale,
} from '.'

describe('- AppConfig Reducer', () => {
  test('- Should handle setLocale', () => {
    expect(appReducer(initialState, setLocale('false'))).toEqual({
      ...initialState, locale: 'false',
    })
    expect(appReducer(initialState, setLocale(false))).toEqual({
      ...initialState,
    })
  })

  test('- Should handle setReset', () => {
    expect(appReducer(initialState, setReset({}))).toEqual({ ...initialState })
  })

  test('- Should handle with default values', () => {
    expect(appReducer(initialState, setLocale())).toEqual({ ...initialState })
    expect(appReducer(initialState, setReset())).toEqual({ ...initialState })
  })
})
