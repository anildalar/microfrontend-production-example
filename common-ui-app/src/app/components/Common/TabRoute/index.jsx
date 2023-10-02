import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Box, Divider, useTheme } from '@mui/material'

import DynamicSVG from '../DynamicSVG'
import {
  TabsStyled, TabStyled, TabContentContainer, TabWrapper,
} from '../../../styles/styles'
import { defaultProps, propTypes } from './types'

const getValidParamsRoute = (pathname, tabRouteConfig) => (
  tabRouteConfig?.tabRoutes?.find((o) => o?.href === pathname)
    ? pathname
    : tabRouteConfig?.defaultSelectedIndex
)

const renderTabIcon = (iconPath, theme) => (
  <Box sx={{ ...theme.customStyle?.tabs?.icons }}>
    <DynamicSVG
      path={iconPath}
      style={{
        ...theme?.customStyle?.tabs?.icons,
      }}
    />
  </Box>
)

const TabRoute = ({
  tabRouteConfig, centered, variant,
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const theme = useTheme()
  const [activeTabIndex, setActiveTabIndex] = useState(
    getValidParamsRoute(pathname, tabRouteConfig),
  )

  useEffect(() => {
    navigate(activeTabIndex)
  }, [navigate, activeTabIndex])

  const handleChange = (e, value) => {
    setActiveTabIndex(value)
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
    <>
      <TabWrapper data-testid="tabs-content">
        <TabsStyled
          {...tabsProps}
        >
          {tabRouteConfig?.tabRoutes?.map((item, index) => (
            <TabStyled
              wrapped
              icon={renderTabIcon(item?.icon, theme)}
              iconPosition="start"
              label={`${theme?.isMobile ? '' : item?.label} ${item?.commonLabel}`}
              value={item?.href}
              key={item?.href}
              data-testid={`${item?.id}-tab`}
              id={`tab-${item?.label}`}
              disabled={item?.disabled}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </TabsStyled>
      </TabWrapper>
      <Divider />
      <TabContentContainer data-testid="tabs-body-content">
        <Outlet />
      </TabContentContainer>
    </>
  )
}

TabRoute.propTypes = propTypes
TabRoute.defaultProps = defaultProps

export default TabRoute
