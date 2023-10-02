/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Field } from 'redux-form'
import { Skeleton } from '@mui/material'
import { defaultProps, propTypes } from './types'
import TypographyWrapper from '../TypographyWrapper'

const FieldWrapper = ({
  loading, sxt, sxtl, ...restProps
}) => (
  loading
    ? (
      <>
        <Skeleton animation="wave" sx={sxt} />
        {restProps?.renderLabel && (
        <TypographyWrapper loading sxt={sxtl}>
          { restProps?.renderLabel() }
        </TypographyWrapper>
        )}
      </>
    )
    : <Field {...restProps} />
)

FieldWrapper.propTypes = propTypes
FieldWrapper.defaultProps = defaultProps

export default FieldWrapper
