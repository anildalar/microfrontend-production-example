import {
  Container, Grid, Paper, styled,
} from '@mui/material'

export const PageLayout = styled('div')(({ theme }) => ({
  ...theme?.customStyle?.pageLayout,
}))

export const SmallPageContainer = styled(Container)(() => ({
  textAlign: 'center',
  maxWidth: '500px !important',
}))

// export const MediumPageContainer = styled(Container)(() => ({
//   textAlign: 'center',
//   // maxWidth: '500px !important',
// }))

export const MediumPageContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    maxWidth: 'inherit',
  },
}))

export const TabWrapper = styled(Paper)(() => ({
  padding: '0.625rem 1.25rem',
  borderRadius: '1rem',
  boxShadow: '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
}))

export const TabContentContainer = styled('div')(() => ({
  minHeight: '200px',
}))

export const SmallSectionContainer = styled(Paper)(({ theme }) => ({
  ...theme?.customStyle?.smallSecContainer,
}))

export const LargeSectionContainer = styled(Paper)(() => ({}))

export const CreditScoreRiskometerWrapper = styled(Grid)(({ theme }) => ({
  flexDirection: 'column-reverse',
  display: 'flex',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  },
}))
