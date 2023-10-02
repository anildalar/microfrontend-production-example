import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { hooks } from 'tenerity-ui-toolkit'

import { useTheme } from '@mui/material'
import Header from '../../Header'
import SideNavBar from '../../SideNavBar'
import Footer from '../../Footer'
import { AppLayoutContainer, AppLayoutWrapper, AppMainContainer } from '../../../../styles/styles'
import { defaultProps, propTypes } from './types'

const AppLayout = React.memo(({ isSideNavBarActivated }) => {
  const { isMobile, isTablet } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  hooks?.useContentStackHook({
    contentId: 'protection_web_app_footer_v1',
    componentId: 'footer',
  })
  hooks?.useContentStackHook({
    contentId: 'protection_web_app_navbar_v1',
    pageId: 'navbar',
  })
  hooks?.useContentStackHook({
    contentId: 'protection_web_app_messages_v1',
    pageId: 'app_messages',
  })

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const footerCmsData = {
    appLinks: [{}],
    socialLinks: [{}],
    termsAndPrivacy: [{}],
  }

  return (
    <AppLayoutContainer data-testid="app-layout-container">
      <Header isSideNavBarActivated={isSideNavBarActivated} toggleDrawer={toggleDrawer} />
      <AppLayoutWrapper data-testid="app-layout-wrapper">
        <SideNavBar
          {...((isMobile || isTablet) && {
            isOpen,
            toggleDrawer,
          })}
          isSideNavBarActivated={isSideNavBarActivated}
        />
        <AppMainContainer data-testid="app-main-container">
          <Outlet />
        </AppMainContainer>
      </AppLayoutWrapper>
      <Footer
        footerCmsData={footerCmsData}
      />
    </AppLayoutContainer>
  )
})
AppLayout.propTypes = propTypes
AppLayout.defaultProps = defaultProps
AppLayout.displayName = 'AppLayout'

export default AppLayout
