import React, { memo } from 'react'
import { defaultProps, propTypes } from './types'

const RichText = memo(({ data }) => (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: data }} />
))

RichText.propTypes = propTypes
RichText.defaultProps = defaultProps
RichText.displayName = 'RichText'
export default RichText
