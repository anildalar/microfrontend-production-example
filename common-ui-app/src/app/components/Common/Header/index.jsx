import React from 'react'
import {
  AppBar, Grid, IconButton, useTheme,
} from '@mui/material'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../DynamicSVG'

const Header = React.memo(({ isSideNavBarActivated, toggleDrawer }) => {
  const {
    artifacts, customStyle, isMobile, isTablet,
  } = useTheme()
  const isMobileOrTablet = isMobile || isTablet

  return (
    <AppBar
      position="sticky"
      sx={customStyle?.header?.appBar}
      data-testid="app-header-bar"
    >
      <Grid container alignItems="center" justifyContent="flex-start">
        {
          isMobileOrTablet && isSideNavBarActivated && (
          <Grid item>
            <DynamicSVG
              path={artifacts?.appIcons?.menu_icon?.url}
              style={customStyle?.header?.menuIcon}
              data-testid="header-menu-logo"
              onClick={toggleDrawer}
            />
          </Grid>
          )
        }
        <Grid item>
          <IconButton
            data-testid="header"
            sx={customStyle?.header?.clientIcon}
          >
            <DynamicSVG
              path={artifacts?.appIcons?.logo?.url}
              data-testid="header-logo"
            />
          </IconButton>
        </Grid>
        {/* <Grid item>
            <Typography variant="h6">Right Item</Typography>
          </Grid> */}
      </Grid>
    </AppBar>

  )
})

Header.propTypes = propTypes
Header.defaultProps = defaultProps
Header.displayName = 'Header'

export default Header
