import {
  Stack, Typography, useTheme,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DynamicSVG from '../DynamicSVG'
import { AccountCardItemContainer } from '../../../styles/styles'
import { defaultProps, propTypes } from './types'

const AccountCard = React.memo(({ cardData }) => {
  const { t } = useTranslation()
  const { customStyle } = useTheme()

  const render = () => (
    <AccountCardItemContainer data-testid={`${cardData?.type}-card`}>
      <DynamicSVG
        path={cardData?.icon}
        data-testid={`${cardData?.type}-card-account-icon`}
        style={customStyle?.accountCard?.icon}
      />
      <Stack direction="column" alignItems="center">
        <Typography
          data-testid={`${cardData?.type}-card-header`}
          variant="body1"
          sx={customStyle?.accountCard?.header}
        >
          {t(cardData?.heading)}
        </Typography>
        <Typography
          data-testid={`${cardData?.type}-card-details`}
          variant="body2"
          sx={customStyle?.accountCard?.details}
        >
          {t(cardData?.body)}
        </Typography>
      </Stack>
    </AccountCardItemContainer>
  )

  return render()
})

AccountCard.propTypes = propTypes
AccountCard.defaultProps = defaultProps
AccountCard.displayName = 'AccountCard'

export default AccountCard
