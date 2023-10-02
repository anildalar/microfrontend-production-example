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

import * as mockData from '../mock/mockData'

export const deepClone = (object) => JSON?.parse(JSON?.stringify(object))

const testingUtils = (store_) => (() => {

  const middleware = []
  const mockStore = configureStore(middleware)

  const createTestStore = (initialState) => {
    const initState = deepClone(initialState) || {}
    const storeState = (typeof store_ === 'function') ? store_().getState() : store_.getState()
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

  const setUpThemeProvider = (Component, props) => {
    const {
      isDesktop, isLaptop, isMobile, isTablet, ...restProps
    } = props
    return (
      <MUIThemeProvider theme={createTheme({
        isMobile: isMobile || false,
        isTablet: isTablet || false,
        isLaptop: isLaptop || false,
        isDesktop: isDesktop || false,
        artifacts: { appIcons: {} },
      })}
      >
        <Component {...restProps} />
      </MUIThemeProvider>
    )
  }

  const setUpProvider = (Component, props = {}, initialState = {}) => {
    const { noThemeProvider, noProps, ...restProps } = props
    return (
      <Provider store={createTestStore(initialState)}>
        {!noThemeProvider
          ? setUpThemeProvider(Component, restProps)
          : <Component {...(!noProps ? restProps : {})} />}
      </Provider>
    )
  }

  /* =================== React Test Library (RTL) Component =================== */

  const setUpRTL = (Component, props = {}) => {
    render(<Component {...props} />)
    return screen
  }

  const setUpRTLWithTheme = (Component, props = {}) => {
    setUpRTL(
      () => setUpThemeProvider(Component, props),
    )
    return screen
  }

  const setUpRTLWithRouter = (Component, props = {}) => {
    <MemoryRouter {...props?.routeProps}>
      {setUpRTL(Component, props)}
    </MemoryRouter>
    return screen
  }

  const setUpRTLIncludingRouter = (Component, props = {}) => {
    render(
      <MemoryRouter {...props?.routeProps}>
        <Component {...props} />
      </MemoryRouter>,
    )
    return screen
  }

  const setUpRTLWithProvider = (Component, props, initialState) => {
    render(
      setUpProvider(Component, props, initialState),
    )
    return screen
  }

  const setUpRTLWithProviderAndRouter = (Component, props, initialState) => {
    render(
      <MemoryRouter {...props?.routeProps}>
        {setUpProvider(Component, props, initialState)}
      </MemoryRouter>,
    )
    return screen
  }

  /* =================== React Test Renderer (RTR) Component =================== */

  const setUpRTR = (Component, props = {}) => (
    renderer.create(<Component {...props} />)
  )

  const setUpRTRWithTheme = (Component, props = {}) => setUpRTR(
    () => setUpThemeProvider(Component, props),
  )

  const setUpRTRWithRouter = (Component, props = {}) => (
    <MemoryRouter {...props?.routeProps}>
      {setUpRTR(Component, props)}
    </MemoryRouter>
  )

  const setUpRTRIncludingRouter = (Component, props = {}) => (
    renderer.create(
      <MemoryRouter {...props?.routeProps}>
        <Component {...props} />
      </MemoryRouter>,
    )
  )

  const setUpRTRWithProvider = (Component, props, initialState) => renderer.create(
    setUpProvider(Component, props, initialState),
  )

  const setUpRTRWithProviderAndRouter = (Component, props, initialState) => (
    renderer.create(
      <MemoryRouter {...props?.routeProps}>
        {setUpProvider(Component, props, initialState)}
      </MemoryRouter>,
    )
  )

  /* =================== Shallow Component =================== */

  const setUpShallow = (Component, props = {}) => shallow(<Component {...props} />)

  const setUpShallowWithTheme = (Component, props = {}) => setUpShallow(
    () => setUpThemeProvider(Component, props),
  )

  const setUpShallowWithRouter = (Component, props = {}) => (
    <MemoryRouter {...props?.routeProps}>
      {setUpShallow(Component, props)}
    </MemoryRouter>
  )

  const setUpShallowIncludingRouter = (Component, props = {}) => (
    shallow(
      <MemoryRouter {...props?.routeProps}>
        <Component {...props} />
      </MemoryRouter>,
    )
  )

  const setUpShallowWithProvider = (Component, props, initialState) => shallow(
    setUpProvider(Component, props, initialState),
  )

  const setUpShallowWithProviderAndRouter = (Component, props, initialState) => shallow(
    <MemoryRouter {...props?.routeProps}>
      {setUpProvider(Component, props, initialState)}
    </MemoryRouter>,
  )

  /* =================== Mount Component =================== */

  const setUpMount = (Component, props) => mount(<Component {...props} />)

  const setUpMountWithTheme = (Component, props = {}) => setUpMount(
    () => setUpThemeProvider(Component, props),
  )

  const setUpMountWithRouter = (Component, props) => (
    <MemoryRouter {...props?.routeProps}>
      {setUpMount(Component, props)}
    </MemoryRouter>
  )

  const setUpMountIncludingRouter = (Component, props = {}) => (
    mount(
      <MemoryRouter {...props?.routeProps}>
        <Component {...props} />
      </MemoryRouter>,
    )
  )

  const setUpMountWithProvider = (Component, props, initialState) => mount(
    setUpProvider(Component, props, initialState),
  )

  const setUpMountWithProviderAndRouter = (Component, props, initialState) => mount(
    <MemoryRouter {...props?.routeProps}>
      {setUpProvider(Component, props, initialState)}
    </MemoryRouter>,
  )

  /* =================== Test Utils Functions =================== */

  const defineWindow = (data = {}) => {
    delete window.location
    window.location = { ...data }
  }

  return {
    setUpRTL, setUpRTLWithTheme, setUpRTLWithProvider, setUpRTLWithRouter, setUpRTLWithProviderAndRouter, setUpRTLIncludingRouter,
    setUpRTR, setUpRTRWithTheme, setUpRTRWithProvider, setUpRTRWithRouter, setUpRTRWithProviderAndRouter, setUpRTRIncludingRouter,
    setUpMount, setUpMountWithTheme, setUpMountWithProvider, setUpMountWithRouter, setUpMountWithProviderAndRouter, setUpMountIncludingRouter,
    setUpShallow, setUpShallowWithTheme, setUpShallowWithProvider, setUpShallowWithRouter, setUpShallowWithProviderAndRouter, setUpShallowIncludingRouter,
    defineWindow,
  }

})()

export default testingUtils
