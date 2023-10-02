import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { defaultProps, propTypes } from './types'

const AssetFormWrapper = (props) => {
  const { isLoading } = useSelector((state) => state?.postAsset)
  const { i18n, t } = useTranslation()
  const {
    title, dataTestId, fields,
    pristine, invalid, submitting, resetForm,
  } = props

  return (
    <>
      {
        i18n?.exists(`${title}`)
        && (
          <Typography
            align="left"
            color="text.primary"
            data-testid={`add-${dataTestId}-asset-heading`}
            variant="h5"
            sx={{ mb: '0.5rem' }}
          >
            {t(title)}
          </Typography>
        )
      }
      <Grid container justifyContent="left">
        <Grid item xs={12} md={7} lg={8} xl={9}>
          <Grid container spacing="1.5rem" justifyContent="left">
            {fields}
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={4} xl={3} sx={{ margin: { xs: '1.5rem 0 0 0', md: 'auto 0 0 0', xl: 'auto 0 0 0' } }}>
          <Grid container alignItems="center" spacing="1rem" sx={{ justifyContent: { sm: 'flex-end', md: 'center' } }}>
            <Grid item>
              <Button
                data-testid="asset-action-cancel"
                aria-label={t('action_items.cancel_label')}
                variant="outlined"
                size="medium"
                onClick={resetForm}
                sx={{ alignSelf: 'center' }}
              >
                {t('action_items.cancel_label')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                data-testid="asset-action-submit"
                aria-label={t('action_items.submit_label')}
                variant="contained"
                type="submit"
                size="medium"
                disabled={invalid || submitting || isLoading || pristine}
                sx={{ alignSelf: 'center' }}
              >
                {t('action_items.submit_label')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

AssetFormWrapper.propTypes = propTypes
AssetFormWrapper.defaultProps = defaultProps

export default AssetFormWrapper
