import {
  Button, Stack, Typography, useTheme,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CardItemContainer } from '../../../styles/styles'
import DynamicSVG from '../DynamicSVG'
import { defaultProps, propTypes } from './types'

const Card = React.memo(({ cardData }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const render = () => (
    <CardItemContainer data-testid={`${cardData?.id}-card`}>
      <Stack direction="row" alignItems="center" sx={theme?.customStyle?.common?.card?.stack?.sx}>
        <DynamicSVG
          path={cardData?.icon}
          data-testid={`${cardData?.id}-card-title-icon`}
          style={{
            ...theme?.customStyle?.card?.icon,
          }}
        />
        <Typography data-testid={`${cardData?.id}-card-title`} variant="h2">
          {t(cardData?.heading)}
        </Typography>
      </Stack>
      <Typography
        data-testid={`${cardData?.id}-card-content`}
        variant="subtitle_regular_sm"
        sx={theme?.customStyle?.common?.card?.text?.sx}
      >
        {t(cardData?.body)}
      </Typography>
      <Button
        data-testid={`${cardData?.id}-card-action`}
        color="primary"
        variant="text"
        sx={theme?.customStyle?.common?.card?.button?.sx}
        onClick={cardData.onClick}
      >
        {`${t('action_items.see_more')} >`}
      </Button>
    </CardItemContainer>
  )

  return render()
})

Card.propTypes = propTypes
Card.defaultProps = defaultProps
Card.displayName = 'Card'

export default Card
