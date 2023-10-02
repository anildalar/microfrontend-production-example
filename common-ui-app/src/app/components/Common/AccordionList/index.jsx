import React, { useState } from 'react'

import AccordionItem from './AccordionItem'
import { defaultProps, propTypes } from './types'

const AccordionList = React.memo(({
  listData, accordionIcon, accordionIconStyle, accordionStyle,
  accordionSummaryStyle,
}) => {
  const [expanded, setExpanded] = useState('')

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '')
  }

  return listData.map((data) => (
    <AccordionItem
      key={data?.id}
      expanded={expanded}
      onChange={handleChange(data?.id)}
      data={data}
      accordionIcon={accordionIcon}
      accordionIconStyle={accordionIconStyle}
      accordionStyle={accordionStyle}
      accordionSummaryStyle={accordionSummaryStyle}
    />
  ))
})

AccordionList.propTypes = propTypes
AccordionList.defaultProps = defaultProps
AccordionList.displayName = 'AccordionList'

export default AccordionList
