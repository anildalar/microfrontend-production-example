import React from 'react'
import { Grid, useTheme } from '@mui/material'
import { CustomAlignContainer } from '../../../styles/styles'
import { defaultProps, propTypes } from './types'

const ItemsGridView = ({
  itemLeft, itemRight, containerSX, itemSX, sml, smr, mdl, mdr, sxl, sxr, disableMobile,
}) => {
  const theme = useTheme()
  return (
    <Grid container sx={containerSX}>
      <Grid
        item
        xs={!disableMobile && theme?.isMobile ? 12 : 6}
        sm={sml || 6}
        md={mdl || 6}
        lg={6}
        sx={itemSX}
      >
        <CustomAlignContainer textAlign={!disableMobile && theme?.isMobile ? 'center' : 'left'} sx={sxl || {}}>
          {itemLeft}
        </CustomAlignContainer>
      </Grid>
      <Grid
        item
        xs={!disableMobile && theme?.isMobile ? 12 : 6}
        sm={smr || 6}
        md={mdr || 6}
        lg={6}
        sx={itemSX}
      >
        <CustomAlignContainer textAlign={!disableMobile && theme?.isMobile ? 'center' : 'right'} sx={sxr || {}}>
          {itemRight}
        </CustomAlignContainer>
      </Grid>
    </Grid>
  )
}

ItemsGridView.propTypes = propTypes
ItemsGridView.defaultProps = defaultProps

export default ItemsGridView
