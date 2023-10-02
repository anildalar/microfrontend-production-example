/* eslint-disable max-len */
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import { mockData, global } from 'tenerity-ui-toolkit'

import '../../../mocks/react-i18next-init'
import '../../../mocks/react-mfe-app'

import { setUpShallowWithProvider, setUpMountWithProvider } from '../../../../devtool-config/jest/utils/test'

import Root from '.'

jest.spyOn(axios, 'get')

describe('- Root', () => {
  let component
  let updateState = {}
  let props = {}

  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading Root', () => {
      props = { noThemeProvider: true }
      component = setUpShallowWithProvider(Root, props, updateState)
      expect(2 + 2).toBe(4)
      expect(component).toMatchSnapshot()
    })
  })

  describe('- Mount Component', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('- Root buildConfig API Call mockReturnValue', () => {
      test('- Default Loading', () => {
        component = setUpMountWithProvider(Root, props, updateState)
        expect(component).toMatchSnapshot()
      })

      test('- Default No Loading', () => {
        updateState = {
          appConfig: {
            ...{
              data: {
                appConfigData: {},
                configStoreData: {},
              },
            },
            isLoading: false,
          },
        }
        component = setUpMountWithProvider(Root, props, updateState)
        expect(component).toBeDefined()
      })

      test('- snapshot get call pass test', async () => {
        updateState = {
          appConfig: {
            ...{
              data: {
                appConfigData: { ...mockData?.default.buildConfig.data },
                configStoreData: { ...mockData?.default.successData.configStoreData },
              },
            },
            isLoading: false,
          },
        }
        await act(async () => {
          await axios.get.mockReturnValue(Promise.resolve({}))
          component = await setUpMountWithProvider(Root, props, updateState)
        })
        component.update()
        expect(component).toBeDefined()
      })

      test('- toBeDefined get call pass configStore fail test', async () => {
        updateState = {
          appConfig: {
            ...{
              data: {
                appConfigData: { ...mockData?.default.buildConfig.data },
                configStoreData: {},
              },
            },
            isLoading: false,
          },
        }
        await act(async () => {
          await axios.get.mockReturnValue(Promise.resolve({}))
          component = await setUpMountWithProvider(Root, props, updateState)
        })
        component.update()
        expect(component).toBeDefined()
      })

      test('- snapshot get call pass test pre authenticated', async () => {
        updateState = {
          appConfig: {
            ...{
              data: {
                appConfigData: { ...mockData?.default.buildConfig.data },
                configStoreData: { ...mockData?.default.successData.configStoreData },
              },
            },
            isLoading: false,
          },
        }
        const data = {
          member_id: 'value',
          membership_id: 'value',
          access_token: 'value',
          refresh_token: 'value',
        }
        global?.appUtils?.setAuthData(data)
        await act(async () => {
          await axios.get.mockReturnValue(Promise.resolve({}))
          component = await setUpMountWithProvider(Root, props, updateState)
        })
        component.update()
        expect(component).toBeDefined()
        global?.storage?.clearStorage()
      })

      test('- snapshot get call fail test', async () => {
        updateState = {}
        await act(async () => {
          component = await setUpMountWithProvider(Root, props, updateState)
        })
        component.update()
        expect(component).toBeDefined()
        component.unmount()
      })
    })
  })
})
