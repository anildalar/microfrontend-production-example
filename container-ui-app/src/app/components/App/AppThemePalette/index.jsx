import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import * as locales from '@mui/material/locale'
import { Helmet } from 'react-helmet'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

const AppThemePalette = ({ children, theme }) => {
  const [isMobile, isTablet, isLaptop, isDesktop] = hooks?.useResponsive(theme)
  const themeObj = createTheme({
    ...theme,
    typography: { ...theme?.typography, fontFamily: theme?.fonts?.fontFamily },
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isMobileOrTablet: isMobile || isTablet,
  }, locales.enUS)

  return (
    <>
      <Helmet>
        {
          theme?.fonts?.fontLinks?.map((fontLink) => <link rel="stylesheet" key={fontLink?.title} href={fontLink?.href} />)
        }
        <link rel="icon" href={theme?.artifacts?.appIcons?.favicon?.url} />
      </Helmet>
      <MUIThemeProvider theme={themeObj}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </>
  )
}

AppThemePalette.propTypes = propTypes
AppThemePalette.defaultProps = defaultProps

export default AppThemePalette
