import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { Trans } from 'react-i18next'

import { StepperProgressStepGrid, ProgressBarStyled } from './StepperProgress.styled'
import { defaultProps, propTypes } from './types'

const StepperProgress = ({ stepLabels, activeStep }) => (
  <>
    <Grid
      data-testid="stepper-progress-container"
      container
      direction="column"
      sx={{
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        sx={{
          justifyContent: 'space-around',
        }}
      >
        {
          stepLabels.map((stepper, index) => (
            <StepperProgressStepGrid
              key={`${stepper.key}-item`}
              data-testid={`stepper-progress-step-${stepper.key}`}
              item
              isActiveStep={activeStep === (index + 1)}
            >
              <Typography variant="subtitle_medium_sm">
                <Trans i18nKey={stepper.key}>
                  {null}
                </Trans>
              </Typography>
            </StepperProgressStepGrid>
          ))
        }
      </Grid>
      <Grid item>
        <ProgressBarStyled
          data-testid="stepper-progress"
          variant="progress"
          position="static"
          steps={stepLabels.length + 1}
          activeStep={activeStep}
        />
      </Grid>
    </Grid>
    {
      stepLabels[activeStep - 1]?.Component
    }
  </>
)

StepperProgress.propTypes = propTypes
StepperProgress.defaultProps = defaultProps

export default StepperProgress
