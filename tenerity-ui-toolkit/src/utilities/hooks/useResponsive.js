import { useMediaQuery } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const useResponsive = (themeConfig) => {
  const theme = createTheme(themeConfig)
  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'))
  const isTablet = useMediaQuery(theme?.breakpoints?.between('sm', 'md'))
  const isLaptop = useMediaQuery(theme?.breakpoints?.between('md', 'lg'))
  const isDesktop = useMediaQuery(theme?.breakpoints?.between('lg', 'xl'))
  // const isMobile = false
  // const isTablet = false
  // const isLaptop = false
  // const isDesktop = false

  return [isMobile, isTablet, isLaptop, isDesktop]
}

export default useResponsive
