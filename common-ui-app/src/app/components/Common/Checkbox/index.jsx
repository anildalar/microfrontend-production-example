import React from 'react'

import { defaultProps, propTypes } from './types'
import { FormControlLabelStyled, CheckboxStyled } from './Checkbox.styled'

const Checkbox = ({
  label,
  color,
  disabled,
  defaultChecked,
  size,
  renderLabel,
  input,
  ...custom
}) => (
  <FormControlLabelStyled
    control={(
      <CheckboxStyled
        disabled={disabled}
        checked={(input?.value || defaultChecked)}
        onChange={input?.onChange}
        color={color}
        size={size}
        inputProps={{ ...custom?.inputProps }}
      />
      )}
    label={label}
    {...custom}
  />

)
Checkbox.propTypes = propTypes
Checkbox.defaultProps = defaultProps

export default Checkbox
