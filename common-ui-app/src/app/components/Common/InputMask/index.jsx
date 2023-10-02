import React from 'react'
import MaskedInput from 'react-text-mask'

import { defaultProps, propTypes } from './types'

// eslint-disable-next-line no-unused-vars
const InputMask = React.forwardRef((props, ref) => {
  const onChange = (e) => {
    if (props.onChange) props.onChange(e.target.value.replace(/\D/g, ''))
  }

  return (
    <MaskedInput {...props} onChange={onChange} onBlur={() => { }} keepCharPositions />
  )
})

InputMask.propTypes = propTypes
InputMask.defaultProps = defaultProps
InputMask.displayName = 'InputMask'

export default InputMask
