import React from 'react'
import { Drawer, useTheme } from '@mui/material'

import { hooks } from 'tenerity-ui-toolkit'
import NavList from './NavList'
import navconfig from './navconfig'
import { defaultProps, propTypes } from './types'

const SideNavBar = ({
  isSideNavBarActivated, toggleDrawer, isOpen,
}) => {
  const benefits = hooks?.useConfigStoreHook()?.getBenefits()

  const theme = useTheme()
  const render = () => (
    <Drawer
      data-testid="navbar-drawer"
      variant={theme?.isMobileOrTablet ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={toggleDrawer}
      ModalProps={theme?.isMobileOrTablet ? {
        keepMounted: true,
      } : {}}
      PaperProps={theme?.isMobileOrTablet ? {
      } : {
        sx: {
          ...theme?.customStyle?.sideNavBar?.drawerStyle,
          zIndex: theme.zIndex.appBar - 1,
        },
      }}
    >
      <NavList
        navListItems={navconfig(benefits)}
      />
    </Drawer>
  )

  return isSideNavBarActivated
    ? render()
    : null
}

SideNavBar.propTypes = propTypes
SideNavBar.defaultProps = defaultProps

export default SideNavBar
