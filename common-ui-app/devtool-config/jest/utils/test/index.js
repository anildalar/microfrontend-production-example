import { testingUtils } from 'tenerity-ui-toolkit'

export const defineMatchMedia = () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}
defineMatchMedia()
// eslint-disable-next-line import/prefer-default-export
export const testingUtilsObj = testingUtils({ getState: () => ({}) })
