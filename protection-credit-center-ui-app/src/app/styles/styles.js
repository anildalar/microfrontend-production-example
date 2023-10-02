import { styled } from '@mui/system'
import { Paper, Container, Box } from '@mui/material'

// eslint-disable-next-line import/prefer-default-export
export const LargeSectionContainer = styled(Container)(() => ({
  padding: '3.9375rem 0rem 4.5625rem 0rem',
  textAlign: 'start',
}))

export const LargeSectionFormContainer = styled(Paper)(() => ({
  padding: '2.5rem 3.75rem 2.5rem 4.5625rem',
  borderRadius: '1rem',
  boxShadow: '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',
}))

export const ScoreBenefitStatusWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('xl')]: {
    display: 'block',
  },
}))
