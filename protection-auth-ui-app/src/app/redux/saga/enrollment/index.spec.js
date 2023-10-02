import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import toolkit from 'tenerity-ui-toolkit'

import postEnrollment, { enrollmentApi } from '.'
import * as enrollment from '../../reducers/enrollment'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Enrollment saga', () => {
  describe('- post Enrollment Password saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(postEnrollment)(testActionPayload)
    const successResponse = {
      data: {},
    }

    test('- Check for reducer call postEnrollment', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(enrollmentApi, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(enrollment.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(enrollment.setError(errorResponse)))
    })

    test('- Check for API axios instance enrollmentApi call', () => {
      toolkit?.global?.api?.createAxiosInstance({})
      expect(enrollmentApi()).toBeInstanceOf(Promise)
    })
  })
})
