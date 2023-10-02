/* eslint-disable import/no-unresolved */
import React from 'react'
import {
  Typography, useTheme, Box,
} from '@mui/material'
import { ScoreChart } from 'COMMON_UI/common/Components'
import { useTranslation } from 'react-i18next'
import { styles } from 'tenerity-ui-toolkit'

import { CreditCenterStatus } from '../../../../Shared/Widgets/CreditCenter'

const { PaperWrapper } = styles

const ScoreHistory = () => {
  const { artifacts, palette } = useTheme()
  const { t } = useTranslation()

  const dummyData = {
    series: [
      {
        name: 'Experian',
        data: [350, 732, 751, 715, 740, 716, 814, 725],
      },
      {
        name: 'TransUnion',
        data: [740, 420, 775, 813, 725, 830, 759, 737],
      },
      {
        name: 'Equifax',
        data: [730, 815, 340, 818, 723, 764, 785, 767],
      },
    ],
    xLabels: [
      'Apr 2023',
      'May 2023',
      'Jun 2023',
      'Jul 2023',
      'Aug 2023',
      'Sep 2023',
      'Oct 2023',
      'Nov 2023',
    ],
    dataMin: 350,
    dataMax: 850,
  }

  return (
    <PaperWrapper>
      <Box padding={3}>
        <Typography variant="h4" textAlign="left">
          {t('creditCenter.score_history_title')}
        </Typography>
        <Typography mt={2} mb={4} textAlign="left" variant="body2">
          {t('creditCenter.score_history_desc')}
        </Typography>

        <CreditCenterStatus
          Wrapper={({ children }) => (
            <Box sx={{ minHeight: '15rem' }}>
              {children}
            </Box>
          )}
          SuccessComponent={() => (
            <ScoreChart
              {...dummyData}
              symbolIcons={{
                active: {
                  experian: artifacts?.appIcons?.experian_pointer?.url,
                  transunion: artifacts?.appIcons?.transunion_pointer?.url,
                  equifax: artifacts?.appIcons?.equifax_pointer?.url,
                },
                disabled: {
                  experian: artifacts?.appIconsDisabled?.experian_pointer?.url,
                  transunion: artifacts?.appIconsDisabled?.transunion_pointer?.url,
                  equifax: artifacts?.appIconsDisabled?.equifax_pointer?.url,
                },
              }}
              iconType="url"
              onZoomIn={() => console.log('zoom in')}
              onZoomOut={() => console.log('zoom out')}
              showXLine={false}
              seriesColors={palette?.charts}
            />
          )}
        />
      </Box>
    </PaperWrapper>
  )
}

export default ScoreHistory
