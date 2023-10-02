/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import { testingUtils, mockData } from 'tenerity-ui-toolkit'

import store from '../../../../src/app/redux/store'
import '../../../../src/mocks/react-i18next-init'
import '../../../../src/mocks/react-mfe-app'

const middleware = []
const mockStore = configureStore(middleware)

export const deepClone = (object) => JSON?.parse(JSON?.stringify(object))

export const createTestStore = (initialState) => {
  const initState = deepClone(initialState) || {}
  const storeState = store().getState()
  const appConfigExist = Object.keys(initState)
    .includes(Object.keys(mockData?.appConfigMockData).pop())
  Object.keys(initState).forEach((initStateKey) => {
    storeState[initStateKey] = (deepClone({
      ...deepClone(storeState[initStateKey]),
      ...deepClone(initState[initStateKey]),
    }))
  })
  return (
    mockStore(deepClone({
      ...deepClone(storeState),
      ...deepClone(appConfigExist ? {} : mockData?.appConfigMockData),
    }))
  )
}

export const SetUpThemeProvider = (Component, props) => {
  const {
    isDesktop, isLaptop, isMobile, isTablet, ...restProps
  } = props
  return (
    <MUIThemeProvider theme={createTheme({
      // ...globalConstants(defaultClient)?.theme,
      // typography: {
      //   ...globalConstants(defaultClient)?.theme.typography,
      //   fontFamily: constants.appFonts(clientName).fontFamily,
      // },
      isMobile: isMobile || false,
      isTablet: isTablet || false,
      isLaptop: isLaptop || false,
      isDesktop: isDesktop || false,
      artifacts: {
        appIcons: {},
      },
    })}
    >
      <Component {...restProps} />
    </MUIThemeProvider>
  )
}

export const SetUpProvider = (Component, props = {}, initialState = {}) => {
  const { noThemeProvider, noProps, ...restProps } = props
  return (
    <Provider store={createTestStore(initialState)}>
      {!noThemeProvider
        ? SetUpThemeProvider(Component, restProps)
        : <Component {...(!noProps ? restProps : {})} />}
    </Provider>
  )
}

export const SetUpProviderWrapper = ({ initialState, Component, ...props }) => (
  <Provider store={createTestStore(initialState)}>
    <Component {...props} />
  </Provider>
)
/* =================== React Test Library (RTL) Component =================== */

export const setupRTL = (Component, props = {}) => {
  render(<Component {...props} />)
  return screen
}

export const setupRTLWithTheme = (Component, props = {}) => {
  setupRTL(
    () => SetUpThemeProvider(Component, props),
  )
  return screen
}

export const setupRTLWithRouter = (Component, props = {}) => {
  <MemoryRouter {...props?.routeProps}>
    {setupRTL(Component, props)}
  </MemoryRouter>
  return screen
}

export const setupRTLIncludingRouter = (Component, props = {}) => {
  render(
    <MemoryRouter {...props?.routeProps}>
      <Component {...props} />
    </MemoryRouter>,
  )
  return screen
}

export const setupRTLWithProvider = (Component, props, initialState) => {
  render(
    SetUpProvider(Component, props, initialState),
  )
  return screen
}

export const setUpRTLWithProviderAndRouter = (Component, props, initialState) => {
  render(
    <MemoryRouter {...props?.routeProps}>
      {SetUpProvider(Component, props, initialState)}
    </MemoryRouter>,
  )
  return screen
}

/* =================== React Test Renderer (RTR) Component =================== */

export const setupRTR = (Component, props = {}) => (
  renderer.create(<Component {...props} />)
)

export const setupRTRWithTheme = (Component, props = {}) => setupRTR(
  () => SetUpThemeProvider(Component, props),
)

export const setupRTRWithRouter = (Component, props = {}) => (
  <MemoryRouter {...props?.routeProps}>
    {setupRTR(Component, props)}
  </MemoryRouter>
)

export const setupRTRIncludingRouter = (Component, props = {}) => (
  renderer.create(
    <MemoryRouter {...props?.routeProps}>
      <Component {...props} />
    </MemoryRouter>,
  )
)

export const setupRTRWithProvider = (Component, props, initialState) => renderer.create(
  SetUpProvider(Component, props, initialState),
)

export const setUpRTRWithProviderAndRouter = (Component, props, initialState) => (
  renderer.create(
    <MemoryRouter {...props?.routeProps}>
      {SetUpProvider(Component, props, initialState)}
    </MemoryRouter>,
  )
)

/* =================== Shallow Component =================== */

export const setupShallow = (Component, props = {}) => shallow(<Component {...props} />)

export const setupShallowWithTheme = (Component, props = {}) => setupShallow(
  () => SetUpThemeProvider(Component, props),
)

export const setupShallowWithRouter = (Component, props = {}) => (
  <MemoryRouter {...props?.routeProps}>
    {setupShallow(Component, props)}
  </MemoryRouter>
)

export const setupShallowIncludingRouter = (Component, props = {}) => (
  shallow(
    <MemoryRouter {...props?.routeProps}>
      <Component {...props} />
    </MemoryRouter>,
  )
)

export const setUpShallowWithProvider = (Component, props, initialState) => shallow(
  SetUpProvider(Component, props, initialState),
)

export const setUpShallowWithProviderAndRouter = (Component, props, initialState) => shallow(
  <MemoryRouter {...props?.routeProps}>
    {SetUpProvider(Component, props, initialState)}
  </MemoryRouter>,
)

/* =================== Mount Component =================== */

export const setupMount = (Component, props) => mount(<Component {...props} />)

export const setupMountWithTheme = (Component, props = {}) => setupMount(
  () => SetUpThemeProvider(Component, props),
)

export const setupMountWithRouter = (Component, props) => (
  <MemoryRouter {...props?.routeProps}>
    {setupMount(Component, props)}
  </MemoryRouter>
)

export const setupMountIncludingRouter = (Component, props = {}) => (
  mount(
    <MemoryRouter {...props?.routeProps}>
      <Component {...props} />
    </MemoryRouter>,
  )
)

export const setUpMountWithProvider = (Component, props, initialState) => mount(
  SetUpProvider(Component, props, initialState),
)

export const setUpMountWithProviderAndRouter = (Component, props, initialState) => mount(
  <MemoryRouter {...props?.routeProps}>
    {SetUpProvider(Component, props, initialState)}
  </MemoryRouter>,
)

/* =================== Test Utils Functions =================== */

export const defineWindow = (data = {}) => {
  delete window.location
  window.location = { ...data }
}

export const testingUtilsObj = testingUtils(store)
