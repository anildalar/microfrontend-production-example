import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { global } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'
import { TabsStyled, TabStyled } from '../../../styles/styles'

export const TabPannel = ({ item, activeTabIndex, ...restProps }) => (
  item.value === activeTabIndex && (
    <Box
      role="tabpanel"
      aria-labelledby={`tab-${item.label}`}
      hidden={item.value !== activeTabIndex}
      {...restProps}
    >
      {item.value === activeTabIndex && item.component}
    </Box>
  )
)

TabPannel.propTypes = propTypes
TabPannel.defaultProps = defaultProps

const TabsView = ({
  items, centered, variant, setActiveTab,
}) => {
  const theme = useTheme()
  const { defaultSelectedIndex, list } = items
  const [activeTabIndex, setActiveTabIndex] = useState(
    global?.utils?.getInteger(defaultSelectedIndex || list[0].value),
  )
  const handleChange = (e, value) => {
    setActiveTabIndex(value)
    setActiveTab(value)
  }

  const tabsProps = {
    value: activeTabIndex,
    onChange: handleChange,
    'data-testid': 'tabs',
    variant,
    centered,
    allowScrollButtonsMobile: true,
    scrollButtons: 'auto',
  }

  return (
    <TabsStyled
      {...tabsProps}
    >
      {list.map((item, index) => (
        <TabStyled
          wrapped
          icon={item.icon}
          iconPosition="start"
          label={`${theme?.isMobile ? '' : item.label} ${item.commonLabel}`}
          value={item.value || index}
          key={item.value || index}
          data-testid={`${item.id}-tab`}
          id={`tab-${item.label}`}
          disabled={item?.disabled}
          aria-controls={`tabpanel-${index}`}
        />
      ))}
    </TabsStyled>
  )
}

TabsView.propTypes = propTypes
TabsView.defaultProps = defaultProps

export default TabsView
