/* eslint-disable import/no-unresolved */
import React from 'react'
import * as auth from 'PROTECTION_AUTH_UI/protection-auth-ui-reducers'
import authSagas from 'PROTECTION_AUTH_UI/protection-auth-ui-sagas'
import * as main from 'PROTECTION_UI/protection-ui-reducers'
import mainSagas from 'PROTECTION_UI/protection-ui-sagas'

import * as identityProtectionReducers from 'PROTECTION_IDENTITY_PROTECTION_UI/protection-identity-protection-ui-reducers'
import identityProtectionSagas from 'PROTECTION_IDENTITY_PROTECTION_UI/protection-identity-protection-ui-sagas'

import * as creditCenterReducers from 'PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui-reducers'
import creditCenterSagas from 'PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui-sagas'

import RootWrapper from '../RootWrapper'
import AppRoutes from '../AppRoutes'

const Main = () => {
  const render = () => (
    <RootWrapper
      reducers={{
        ...auth?.allReducers,
        ...main?.allReducers,
        ...identityProtectionReducers?.allReducers,
        ...creditCenterReducers?.allReducers,
      }}
      sagas={[authSagas, mainSagas, identityProtectionSagas, creditCenterSagas]}
    >
      <AppRoutes />
    </RootWrapper>
  )

  return render()
}

export default Main
