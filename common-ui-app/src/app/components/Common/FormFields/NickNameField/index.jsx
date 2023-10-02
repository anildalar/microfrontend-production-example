import React from 'react'
import { Field } from 'redux-form'
import { hooks } from 'tenerity-ui-toolkit'

import InputField from '../../InputField'
import { defaultProps, propTypes } from './types'

// export const nickNameNormalizer = (value, prevVal, allValues) => {
//   const regExpNickName = new RegExp(allValues.REGEX.NICKNAME)
//   return value && !regExpNickName.test(value) ? prevVal : value
// }

const NickNameField = ({ name, label, dataTestId }) => {
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData
  return (
    <Field
      name={name}
      label={label}
      component={InputField}
      // normalize={nickNameNormalizer}
      maxLength={validation?.nickname?.maxLength}
      data-testid={dataTestId}
    />
  )
}

NickNameField.propTypes = propTypes
NickNameField.defaultProps = defaultProps
export default NickNameField
