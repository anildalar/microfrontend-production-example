import React from 'react'
import { global } from 'tenerity-ui-toolkit'
import AuthGuardRoute from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTLIncludingRouter } = testingUtilsObj

describe('- AuthGuardRoute Component', () => {
  describe('- Renders Component', () => {
    let component

    test('- snapshot test Success Auth', () => {
      global?.appUtils?.setAuthData({
        member_id: 'test', membership_id: 'test', access_token: 'test', refresh_token: 'test',
      })
      component = setUpRTLIncludingRouter(AuthGuardRoute, { children: <span /> })
      expect(component).toBeDefined()
    })
  })
})
