import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import getAlerts, { getAlertsAPI } from '.'
import * as alertsReducer from '../../reducers/alerts'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Get Alerts saga', () => {
  describe('- Get alerts saga', () => {
    const successResponse = {
      data: {},
    }

    const fetchDataGenerator = cloneableGenerator(getAlerts)({
      payload: {
        data: {},
      },
    })

    test('- Check for reducer call getAlerts', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getAlertsAPI, { }))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(alertsReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(alertsReducer.setError(errorResponse)))
    })
  })
})
