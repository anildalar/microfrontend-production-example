import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  Box, Stack, Typography, useTheme,
} from '@mui/material'

import DynamicSVG from '../DynamicSVG'
import { defaultProps, propTypes } from './types'
import TypographyWrapper from '../TypographyWrapper'
import { FullSectionContainer } from '../../../styles/styles'

const PageHeader = React.memo(({
  pageName, iconSource, loading, headerTitle, headerSubtitle, headerSubtitleInfo, components = {},
  placeholders, fullHeight, sx,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const render = () => (
    <FullSectionContainer
      fullHeight={fullHeight}
      sx={{
        ...theme?.customStyle?.common?.headerBox,
        backgroundColor: loading ? theme?.colors?.loadingBox
          : theme?.colors?.headerBoxBackgroundColor,
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ mb: loading ? 0 : '16px' }}>
        <DynamicSVG
          loading={loading}
          small
          data-testid={`${pageName}-title-icon`}
          alt="card-icon"
          path={iconSource}
          style={{ ...theme?.customStyle?.headingsIcon }}
        />
        <TypographyWrapper sx={theme?.customStyle?.common?.pageHeader?.heading?.sx} sxt={theme?.customStyle?.common?.pageHeader?.heading?.sxt} loading={loading} data-testid={`${pageName}-title`} variant="h2">
          {t(headerTitle, placeholders)}
        </TypographyWrapper>
      </Stack>
      {!!headerSubtitle && (
        <TypographyWrapper sxt={theme?.customStyle?.common?.pageHeader?.subtitle?.sxt} loading={loading} component="span" data-testid={`${pageName}-info`} variant="subtitle_medium_lg">
          <Trans
            i18nKey={t(headerSubtitle, placeholders)}
            components={{ ...components, bold: <Typography variant="subtitle_bold_lg" /> }}
          >
            {null}
          </Trans>
        </TypographyWrapper>
      )}

      {!!headerSubtitleInfo && (
        <Box sx={{ mt: '1em' }}>
          <TypographyWrapper
            sxt={theme?.customStyle?.common?.pageHeader?.subtitle?.sxt}
            loading={loading}
            data-testid={`${pageName}-info-subtitle`}
            variant="subtitle_regular_sm"
          >
            <Trans
              i18nKey={t(headerSubtitleInfo, placeholders)}
              components={{ ...components, bold: <Typography variant="subtitle_bold_sm" /> }}
            >
              {null}
            </Trans>
          </TypographyWrapper>
        </Box>
      )}
    </FullSectionContainer>
  )

  return render()
})

PageHeader.propTypes = propTypes
PageHeader.defaultProps = defaultProps
PageHeader.displayName = 'PageHeader'

export default PageHeader
