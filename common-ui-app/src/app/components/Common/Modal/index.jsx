import React from 'react'
import {
  Box, Drawer, Dialog, IconButton, Grid, useTheme,
} from '@mui/material'

import { defaultProps, propTypes } from './types'
import { Images } from '../Images'
import DynamicSVG from '../DynamicSVG'

const renderModalBody = (children, handleClose, theme, isMobile) => (
  <>
    <Grid container sx={{ margin: '20px 20px 0 0', width: 'auto' }} direction="row" justifyContent="flex-end">
      <IconButton data-testid="sme-modal-close-action" aria-label="close" onClick={handleClose} sx={{ padding: '0' }}>
        <DynamicSVG
          path={Images.CrossDarkIcon}
          data-testid="icon-cross-dark"
          wrapper="span"
        />
      </IconButton>
    </Grid>

    <Box
      data-testid="modal-content-wrapper"
      sx={{
        padding: isMobile ? '0px 20px 0 20px' : '0px 20px 20px 20px',
        maxHeight: isMobile ? `calc(100vh - ${theme?.customStyle?.header?.heightSX} - 47px)`
          : '100%',
        overflowY: 'auto',
      }}
    >
      {children}
    </Box>
  </>
)

const SmeModal = ({
  open, handleClose, children, ariaLabelBy, ariaDescribedby,
  paperProps, drawerPaperProps, ...rest
}) => {
  const theme = useTheme()
  return (
    theme?.isMobile
      ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          PaperProps={paperProps || {}}
        >
          {renderModalBody(children, handleClose, theme, theme?.isMobile)}
        </Drawer>
      )
      : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby={ariaLabelBy}
          aria-describedby={ariaDescribedby}
          PaperProps={drawerPaperProps || {}}
          {...rest}
        >
          {renderModalBody(children, handleClose, theme, theme?.isMobile)}
        </Dialog>

      )
  )
}

SmeModal.propTypes = propTypes
SmeModal.defaultProps = defaultProps

export default SmeModal
