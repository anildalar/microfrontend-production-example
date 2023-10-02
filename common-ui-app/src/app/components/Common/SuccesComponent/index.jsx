import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, useTheme, Typography } from '@mui/material'
import { styles } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../DynamicSVG'
import Link from '../Link'

const { PageLayout, SmallPageContainer, SmallSectionContainer } = styles

const SuccessComponent = ({
  pageId, dataTestid, to, isAction,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <PageLayout>
      <SmallPageContainer>
        <SmallSectionContainer data-testid="success-small-section-container">
          <DynamicSVG
            path={theme?.artifacts?.appIcons?.success_icon?.url}
            data-testid={`${dataTestid}-success-icon`}
            style={{
              marginBottom: '3rem',
            }}
          />
          <Typography variant="h2" sx={{ mb: '3rem' }} data-testid={`${dataTestid}-success-heading`}>
            {t(`${pageId}.${dataTestid}_heading`)}
          </Typography>
          <Typography variant="h5" sx={{ mb: '3rem' }} component="p" data-testid={`${dataTestid}-success-message`}>
            {t(`${pageId}.${dataTestid}_message`)}
          </Typography>
          {isAction && (
            <Link to={to}>
              <Button
                variant="contained"
                endIcon={(
                  <DynamicSVG
                    path={theme?.artifacts?.appIcons?.arrow_right_icon?.url}
                    style={{ fill: 'white' }}
                  />
                )}
                size="large"
                data-testid={`${dataTestid}-success-button`}
              >
                <Typography variant="buttonL">
                  {t(`action_items.${dataTestid}_label`)}
                </Typography>
              </Button>
            </Link>
          )}
        </SmallSectionContainer>
      </SmallPageContainer>
    </PageLayout>

  )
}
SuccessComponent.propTypes = propTypes
SuccessComponent.defaultProps = defaultProps
export default SuccessComponent
