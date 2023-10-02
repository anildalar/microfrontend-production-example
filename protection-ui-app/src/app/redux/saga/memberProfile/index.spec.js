import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import getMemberProfile, { getMemberProfileAPI } from '.'
import * as memberProfileReducer from '../../reducers/memberProfile'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Get Member Profile saga', () => {
  describe('- Get profile saga', () => {
    const successResponse = {
      data: {},
    }

    const fetchDataGenerator = cloneableGenerator(getMemberProfile)({
      payload: {
        data: {},
      },
    })

    test('- Check for reducer call getAlerts', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getMemberProfileAPI, { }))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(memberProfileReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(memberProfileReducer.setError(errorResponse)))
    })
  })
})
