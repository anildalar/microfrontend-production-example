import React from 'react'

import '../../../../mocks/react-mfe-app'

import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import AppThemePalette from '.'

describe('- AppThemePalette', () => {
  let component
  const updateState = {}
  const props = { children: <></>, theme: {} }
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading AppThemePalette', () => {
      component = testingUtilsObj.setUpMountWithProvider(AppThemePalette, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
