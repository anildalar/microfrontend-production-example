import React from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary,
} from '@mui/material'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../../DynamicSVG'

const AccordionItem = React.memo(({
  expanded, onChange, data, accordionIcon, accordionIconStyle,
  accordionStyle, accordionSummaryStyle,
}) => (
  <Accordion
    data-testid={`accordion-${data?.id}`}
    expanded={expanded === data?.id}
    onChange={onChange}
    sx={accordionStyle}
  >
    <AccordionSummary
      expandIcon={(
        <DynamicSVG
          path={accordionIcon}
          data-testid={`accordion-${data?.id}-icon`}
          style={accordionIconStyle}
        />
        )}
      aria-controls={`accordion-${data?.id}-content`}
      id={`accordion-${data?.id}-content`}
      data-testid={`accordion-${data?.id}-content`}
      sx={accordionSummaryStyle}
    >
      {data?.title}
    </AccordionSummary>
    <AccordionDetails data-testid={`accordion-${data?.id}-summary`}>
      {data?.summary}
    </AccordionDetails>
  </Accordion>
))

AccordionItem.propTypes = propTypes
AccordionItem.defaultProps = defaultProps
AccordionItem.displayName = 'AccordionItem'

export default AccordionItem
