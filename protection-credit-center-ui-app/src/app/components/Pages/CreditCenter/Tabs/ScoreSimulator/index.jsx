/* eslint-disable import/no-unresolved */
import React from 'react'
import { styles } from 'tenerity-ui-toolkit'
import { Box, Typography } from '@mui/material'

import { CreditCenterStatus } from '../../../../Shared/Widgets/CreditCenter'

const { PaperWrapper } = styles

const ScoreSimulator = () => (
  <PaperWrapper>
    <Box sx={{ minHeight: '15rem', padding: 3 }}>
      <CreditCenterStatus
        Wrapper={({ children }) => (
          <>
            {children}
          </>
        )}
        SuccessComponent={() => (
          <Typography>
            Score Simulator
          </Typography>
        )}
      />
    </Box>
  </PaperWrapper>
)

export default ScoreSimulator
