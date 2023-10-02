import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@emotion/react'
import {
  Box, Button, Grid, Typography,
} from '@mui/material'
import DynamicSVG from '../DynamicSVG'
import { defaultProps, propTypes } from './types'

const ResolvedCard = memo(({
  icon, description, submitButtonLabel, onSubmit, onCancel, disabled,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Box
      sx={{
        border: `solid 1px ${theme?.palette?.divider}`,
        ...theme?.customStyle?.alertCenterCard?.containerStyle,
      }}
    >
      <Grid container spacing="1rem">
        <Grid item flex={0}>
          <DynamicSVG
            data-testid="resolvedCard-icon"
            sx={{ ...theme?.customStyle?.alertCenterCard?.resolvedIconStyle }}
            path={icon}
          />
        </Grid>
        <Grid
          item
          container
          flex={1}
          spacing="1rem"
        >
          <Grid
            item
            container
            spacing="1rem"
          >
            <Grid item>
              <Typography
                data-testid="resolvedCard-description"
                variant="subtitle2"
              >
                {t(description)}
              </Typography>
            </Grid>
            <Grid item container spacing="1rem">
              <Grid item>
                <Button
                  data-testid="alert-action-cancel"
                  aria-label={t('action_items.cancel_label')}
                  variant="outlined"
                  size="small"
                  onClick={onCancel}
                >
                  {t('action_items.cancel_label')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  data-testid="alert-action-resolved"
                  aria-label={t(submitButtonLabel)}
                  variant="contained"
                  type="submit"
                  size="small"
                  disabled={disabled}
                  onClick={onSubmit}
                >
                  {t(submitButtonLabel)}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
})
ResolvedCard.propTypes = propTypes
ResolvedCard.defaultProps = defaultProps
ResolvedCard.displayName = 'ResolvedCard'

export default ResolvedCard
