import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import getRemainingTrial, { getRemainingTrialAPI } from '.'
import * as memberProfileReducer from '../../reducers/creditCenter'

describe('- Get Remaining Trial saga', () => {
  describe('- Get Remaining Trial saga', () => {
    const successResponse = {
      data: {},
    }

    const fetchDataGenerator = cloneableGenerator(getRemainingTrial)({
      payload: {
        data: {
          clientId: '',
        },
      },
    })

    test('- Check for reducer call getAlerts', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getRemainingTrialAPI, { clientId: '' }))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(memberProfileReducer.setData(successResponse.data)))
    })
  })
})
