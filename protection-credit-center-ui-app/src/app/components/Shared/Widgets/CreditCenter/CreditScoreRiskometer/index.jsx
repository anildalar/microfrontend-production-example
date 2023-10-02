/* eslint-disable import/no-unresolved */
import React from 'react'
import {
  Box, Grid, useTheme,
} from '@mui/material'

import { defaultProps, propTypes } from './types'
import RiskoMeterItem from '../RiskoMeter'

const CreditScoreRiskometer = ({
  creditScores, isSmallIcon, showStatus, showChangeDiff, variant, riskometerItemSx,
}) => {
  const theme = useTheme()
  return (
    <Grid item lg={8} xs={12} data-testid="credit-score-container">
      <Box sx={{ overflow: 'auto', pb: '1rem' }}>
        <Box sx={{
          ...theme?.customStyle?.creditCenter?.container,
        }}
        >
          <RiskoMeterItem
            sx={riskometerItemSx}
            variant={variant}
            showStatus={showStatus}
            showChangeDiff={showChangeDiff}
            isExist={creditScores?.experian}
            bureauIcon={theme?.artifacts?.[!isSmallIcon ? 'appIcons' : 'appIconsSmall']?.experian?.url}
            changeDiff={creditScores?.experian?.changeDifference}
            riskLevel={creditScores?.experian?.value}
            status={creditScores?.experian?.status?.toLowerCase()}
          />
          <RiskoMeterItem
            sx={riskometerItemSx}
            variant={variant}
            showStatus={showStatus}
            showChangeDiff={showChangeDiff}
            isExist={creditScores?.transunion}
            bureauIcon={theme?.artifacts?.[!isSmallIcon ? 'appIcons' : 'appIconsSmall']?.transunion?.url}
            changeDiff={creditScores?.transunion?.changeDifference}
            riskLevel={creditScores?.transunion?.value}
            status={creditScores?.transunion?.status?.toLowerCase()}
          />
          <RiskoMeterItem
            sx={riskometerItemSx}
            variant={variant}
            showStatus={showStatus}
            showChangeDiff={showChangeDiff}
            isExist={creditScores?.equifax}
            bureauIcon={theme?.artifacts?.[!isSmallIcon ? 'appIcons' : 'appIconsSmall']?.equifax?.url}
            changeDiff={creditScores?.equifax?.changeDifference}
            riskLevel={creditScores?.equifax?.value}
            status={creditScores?.equifax?.status?.toLowerCase()}
          />
        </Box>
      </Box>
    </Grid>
  )
}

CreditScoreRiskometer.propTypes = propTypes
CreditScoreRiskometer.defaultProps = defaultProps

export default CreditScoreRiskometer
