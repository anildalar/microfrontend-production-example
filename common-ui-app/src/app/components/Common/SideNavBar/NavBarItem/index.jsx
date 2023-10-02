import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Collapse,
  List,
  ListItemButton, ListItemIcon, ListItemText, useTheme,
} from '@mui/material'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../../DynamicSVG'

const NavBarItem = React.memo(({ item }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const theme = useTheme()
  const [isSubMenuOpen, setSubMenuOpen] = React.useState(false)

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen)
  }

  const onClick = (itemData) => {
    if (itemData?.subItems) {
      toggleSubMenu()
    } else if (!window.location.pathname.includes(item?.url)) {
      navigate(item?.url)
    }
  }

  const renderListItem = (itemData) => (
    <ListItemButton
      key={`nav-list-item-${itemData?.key}`}
      data-testid={`nav-list-item-${itemData?.key}`}
      onClick={() => onClick(itemData)}
      selected={pathname?.includes(itemData.url)}
    >
      <ListItemIcon sx={{ ...theme?.customStyle?.sideNavBar?.icon }}>
        <DynamicSVG
          path={theme?.artifacts?.sideMenuIcons?.[itemData?.key]?.url}
          data-testid="nav-list-item-icon"
          style={{
            ...theme?.customStyle?.sideNavBar?.svg,
          }}
        />
      </ListItemIcon>
      <ListItemText
        data-testid="nav-list-item-text"
        primaryTypographyProps={{ variant: 'subtitle1' }}
        primary={t(`navbar.${itemData?.key}`)}
      />
      {itemData?.subItems && (
        <ListItemIcon data-testid="nav-list-item-action">
          <DynamicSVG
            path={theme?.artifacts?.appIcons?.down_arrow?.url}
            style={{
              ...theme?.customStyle?.sideNavBar?.icon,
            }}
          />
        </ListItemIcon>
      )}
    </ListItemButton>
  )

  return (
    <>
      {renderListItem(item)}
      {item?.subItems && (
        <Collapse
          key={`nav-list-sub-item-${item?.key}`}
          in={isSubMenuOpen}
          timeout="auto"
          unmountOnExit
        >
          <List
            component="nav"
            data-testid={`nav-list-sub-container-${item?.key}`}
          >
            {item?.subItems?.map((subItem) => renderListItem(subItem))}
          </List>
        </Collapse>
      )}
    </>
  )
})

NavBarItem.propTypes = propTypes
NavBarItem.defaultProps = defaultProps
NavBarItem.displayName = 'NavBarItem'

export default NavBarItem
