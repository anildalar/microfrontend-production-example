import React from 'react'

jest.clearAllMocks()

jest.mock('COMMON_UI/common/Components',
  () => (
    {
      Loadable: () => {
        const InnerProps = () => (<></>)
        return InnerProps
      },
      AuthGuardRoute: () => <></>,
      UnAuthGuardRoute: () => <></>,
      PublicRoute: () => <></>,
      Alerts: () => <></>,
      SuccesComponent: () => <></>,
      InputField: () => <></>,
      PasswordField: () => <></>,
      Checkbox: () => <></>,
      DatePickerField: () => <></>,
      AutoCompleteField: () => <></>,
      Select: () => <></>,
      DynamicSVG: () => <></>,
      Link: () => <></>,
      createTextMask: () => { },
      NickNameField: () => <></>,
      PhoneNumberField: () => <></>,
    }
  ),
  { virtual: true })

jest.mock('COMMON_UI/common-utils/hooks',
  () => (
    {
      // some mocking for my remote app routes
      Loadable: () => {
        const InnerProps = () => (<></>)
        return InnerProps
      },
      useErrorBoundary: () => [],
      UnAuthGuardRoute: () => <></>,
      PublicRoute: () => <></>,
    }
  ),
  { virtual: true })

jest.mock('COMMON_UI/common/Pages',
  () => (
    {
      // some mocking for my remote app routes
      Maintenance: () => <></>,
      FullPageError: () => <></>,
      GenericErrorPage: () => <></>,
    }
  ),
  { virtual: true })

// jest.mock('COMMON_UI/common-global-constant',
//   () => (
//     {
//       // some mocking for my remote app routes
//       globalConstants: () => ({}),
//
//     }
//   ),
//   { virtual: true })

const reactMockMFE = (mockPath, mockFunctions) => jest.mock(mockPath,
  () => (
    {
      // some mocking for my remote app routes
      ...mockFunctions,
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_UI/protection-ui-reducers',
  () => (
    {
      // some mocking for my remote app routes
      allReducers: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_UI/protection-ui-sagas',
  () => (
    {
      // some mocking for my remote app routes
      mainSagas: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_AUTH_UI/protection-auth-ui-reducers',
  () => (
    {
      // some mocking for my remote app routes
      allReducers: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_AUTH_UI/protection-auth-ui-sagas',
  () => (
    {
      // some mocking for my remote app routes
      authSagas: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_IDENTITY_PROTECTION_UI/protection-identity-protection-ui-reducers',
  () => (
    {
      // some mocking for my remote app routes
      allReducers: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_IDENTITY_PROTECTION_UI/protection-identity-protection-ui-sagas',
  () => (
    {
      // some mocking for my remote app routes
      identityProtectionSagas: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui-reducers',
  () => (
    {
      // some mocking for my remote app routes
      allReducers: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui-sagas',
  () => (
    {
      // some mocking for my remote app routes
      creditCenterSagas: {},
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_AUTH_UI/protection-auth-ui-routes',
  () => (
    {
      // some mocking for my remote app routes
      routes: () => [],
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_UI/protection-ui-routes',
  () => (
    {
      // some mocking for my remote app routes
      routes: () => [],
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_IDENTITY_PROTECTION_UI/protection-identity-protection-ui-routes',
  () => (
    {
      // some mocking for my remote app routes
      routes: () => [],
    }
  ),
  { virtual: true })

jest.mock('PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui-routes',
  () => (
    {
      // some mocking for my remote app routes
      routes: () => [],
    }
  ),
  { virtual: true })

export default reactMockMFE
