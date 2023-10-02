import { Grid, Typography } from '@mui/material'
import React from 'react'
import DynamicSVG from '../DynamicSVG'
import { defaultProps, propTypes } from './types'

const AppButton = ({
  imgPath, text1, text2, ...rest
}) => {
  const { height, width } = rest
  return (
    <>
      <Grid
        container
        alignItems="center"
        sx={{
          px: '3px',
          backgroundColor: 'background.paper',
          color: '#000000',
          height: `${height}px`,
          width: `${width}px`,
          borderRadius: '10px',
          fontSize: '10px',
        }}
      >
        <Grid item display="flex" xs={3}>
          <DynamicSVG height="20" width="20" path={imgPath} />
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '1em' }}>{text1}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '1.4em' }}>
                {text2}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

AppButton.propTypes = propTypes
AppButton.defaultProps = defaultProps

export default AppButton
