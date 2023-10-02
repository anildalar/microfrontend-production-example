import { call } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import toolkit from 'tenerity-ui-toolkit'

import postValidateCode, { validateCodeApi } from '.'

describe('- ValidateCode saga', () => {
  describe('- post validate code saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(postValidateCode)(testActionPayload)

    test('- Check for reducer call postValidateCode', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(validateCodeApi, {}))
    })

    test('- Check for API axios instance access code api call', () => {
      toolkit?.global?.api?.createAxiosInstance({})
      expect(validateCodeApi()).toBeInstanceOf(Promise)
    })
  })
})
