import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  List, ListSubheader, Typography,
} from '@mui/material'

import NavBarItem from '../NavBarItem'
import { defaultProps, propTypes } from './types'

const NavList = React.memo(({ navListItems }) => {
  const { t } = useTranslation()

  return (
    <>
      {navListItems.map((navListItem) => (
        <List
          key={navListItem?.heading}
          component="nav"
          data-testid={`nav-list-container-${navListItem?.heading}`}
          subheader={(
            <ListSubheader component="div">
              <Typography data-testid="nav-list-header" variant="caption">
                {t(`navbar.${navListItem?.heading}`)}
              </Typography>
            </ListSubheader>
          )}
        >
          {
            navListItem?.items?.map((item) => (
              <NavBarItem key={item?.key} item={item} />
            ))
          }
        </List>
      ))}
    </>
  )
})

NavList.propTypes = propTypes
NavList.defaultProps = defaultProps
NavList.displayName = 'NavList'

export default NavList
