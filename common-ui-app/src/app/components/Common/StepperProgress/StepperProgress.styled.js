import { styled } from '@mui/system'
import Grid from '@mui/material/Grid'
import MobileStepper from '@mui/material/MobileStepper'

export const StepperProgressStepGrid = styled(Grid, {
  shouldForwardProp: (props) => props !== 'isActiveStep',
})(({ theme, isActiveStep }) => ({
  display: isActiveStep ? 'block' : 'none',
  paddingBottom: '15px',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}))

export const ProgressBarStyled = styled(MobileStepper)(({ theme }) => ({
  backgroundColor: theme?.customStyle?.stepper?.backgroundColor,
  padding: 0,
  '& .MuiMobileStepper-progress': {
    width: '100%',
    height: theme?.customStyle?.stepper?.height,
    backgroundColor: theme?.colors?.transparent,
  },
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme?.customStyle?.stepper?.progressBarColor,
  },
}))
