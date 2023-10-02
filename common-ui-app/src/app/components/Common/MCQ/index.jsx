import React, { memo } from 'react'
import {
  FormControl, FormControlLabel,
  FormLabel, Radio, RadioGroup, useTheme,
} from '@mui/material'
import { defaultProps, propTypes } from './types'

const MCQ = memo(({
  question,
  options,
  componentProps,
  input,
  ...custom
}) => {
  const theme = useTheme()
  return (
    <FormControl fullWidth {...custom}>
      <FormLabel
        data-testid={`${custom?.['data-testid']}-mui-radio-label`}
        {...custom}
      >
        {question}
      </FormLabel>
      <RadioGroup {...input} sx={{ ...theme?.customStyle?.radioGroup }}>
        {
          options?.map((o, i) => (
            <FormControlLabel
              {...custom}
              componentsProps={componentProps}
              key={o?.label}
              control={<Radio />}
              label={o?.label}
              data-testid={`${custom?.['data-testid']}-mui-radio-option-${i}`}
              value={o?.value}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  )
})

MCQ.displayName = 'MCQ'
MCQ.propTypes = propTypes
MCQ.defaultProps = defaultProps

export default MCQ
