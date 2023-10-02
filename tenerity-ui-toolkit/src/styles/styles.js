import { styled } from '@mui/system'
import {
  Box, Tab, Tabs, Container, Paper, Slider, Grid
} from '@mui/material'


const flexDisplay = ({
  display: 'flex',
})

const flexColumn = ({
  ...flexDisplay,
  flexDirection: 'column',
})

const justifyCenter = ({
  justifyContent: 'center',
})

const alignCenter = ({
  alignItems: 'center',
})

const flexCenter = ({
  ...flexColumn,
  ...justifyCenter,
})

const textAlignCenter = ({
  textAlign: 'center',
})

const textAlignLeft = ({
  textAlign: 'left',
})

const alignText = (position) => ({
  textAlign: position || 'center',
})

export const AppLayoutContainer = styled('div')(({ theme }) => ({
  ...flexColumn,
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  margin: '0 auto',
  flexGrow: 1,
}))

export const MainSection = styled('main')(({ theme }) => ({
  ...flexColumn,
  flex: 1,
  minHeight: `calc((100vh - ${theme?.customStyle?.header?.height}) - ${theme?.customStyle?.footer?.height})`,
  ...justifyCenter,
}))

export const AppLayoutWrapper = styled('div')(() => ({
  ...flexDisplay,
  flexDirection: 'row',
}))

export const CenterContainer = styled('div')(() => ({
  ...textAlignCenter,
}))

export const CustomAlignContainer = styled(Box, {
  shouldForwardProp: (props) => props !== 'textAlign',
})(({ textAlign }) => ({
  ...alignText(textAlign),
}))

export const StyledHeaderWrapper = styled('div')(({ theme }) => ({
  ...textAlignCenter,
  ...flexDisplay,
  flexDirection: 'row',
  height: theme?.customStyle?.header?.heightSX,
  [theme.breakpoints.up('sm')]: {
    height: theme?.customStyle?.header?.height,
  },
}))

export const StyledHeaderContainer = styled(StyledHeaderWrapper)(() => ({
  ...flexCenter,
}))

export const StyledHeader = styled(StyledHeaderContainer)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme?.customStyle?.header?.backgroundColor,
  boxShadow: theme?.customStyle?.header?.boxShadow,
}))

export const PageContent = styled('section')(() => ({
  ...textAlignCenter,
  display: 'block',
}))

export const MainPageContent = styled('div', {
  shouldForwardProp: (props) => props !== 'minHeight' && props !== 'noPadding' && props !== 'noFooter' && props !== 'noMargin',
})(({
  theme, minHeight, noPadding, noFooter, noMargin,
}) => ({
  // mobile view
  ...textAlignLeft,
  display: 'block',
  padding: noPadding ? 0 : '36px 20px 20px',
  margin: noMargin ? 'auto' : '36px 0 0',
  minHeight: minHeight || `calc((100vh - ${theme?.customStyle?.header?.heightSX}) - ${noFooter ? 0 : theme?.customStyle?.footer?.height})`,
  [theme.breakpoints.up('md')]: {
    // desktop view
    minHeight: minHeight || `calc((100vh - ${theme?.customStyle?.header?.height}) - ${noFooter ? 0 : theme?.customStyle?.footer?.height})`,
    padding: noPadding ? 0 : '32px 47px',
  },
}))

export const SubMainPageContent = styled(MainPageContent)(({ theme, padding }) => ({
  // mobile view
  padding: padding || '0 20px 30px 20px',
  [theme.breakpoints.up('md')]: {
    // desktop view
    padding: padding || '0 20px 30px 20px',
  },
}))

export const PageLayout = styled('div')(({ theme }) => ({
  ...theme?.customStyle?.pageLayout,
}))

export const SmallPageContainer = styled(Container)(({ theme }) => ({
  ...theme?.customStyle?.smallPageContainer,
}))

export const SmallSectionContainer = styled(Paper)(({ theme }) => ({
  ...theme?.customStyle?.smallSecContainer,
}))

export const FullSectionContainer = styled('div', {
  shouldForwardProp: (props) => props !== 'fullHeight' && props !== 'isLoading',
})(({
  theme, fullHeight, isLoading, sxc,
}) => ({
  ...sxc,
  backgroundColor: isLoading ? theme?.colors?.loadingBox : sxc?.backgroundColor
    || theme?.customStyle?.sectionContainer?.backgroundColor,
  minHeight: fullHeight ? '100%' : '200px',
  boxShadow: theme?.customStyle?.card?.boxShadow,
}))

export const BgPageContent = styled(PageContent)(({ image }) => ({
  ...textAlignCenter,
  display: 'block',
  position: 'relative',
  background: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  minHeight: '100vh',
  ...flexCenter,
}))

export const StyledFooterContainer = styled('footer')(({ theme }) => ({
  height: theme?.customStyle?.footer?.height,
}))

export const StyledFooter = styled(StyledFooterContainer)(({ theme }) => ({
  backgroundColor: theme?.palette?.primary?.dark,
  color: theme?.palette?.background?.paper,
}))

export const ArrowRightIconStyled = styled('div')`
  transform-origin: center;
  transform: rotate(180deg);
  svg {
    display: flex
  }
`

export const ArrowDownIconStyled = styled('div')`
  transform-origin: center;
  transform: rotate(0);
  svg {
    display: flex
  }
`

export const NavItemsWrapper = styled('div')(({ theme }) => ({
  ...theme?.customStyle?.scrollbarStyle,
  height: `calc((100vh - ${theme?.customStyle?.header?.heightSX}) - ${theme?.customStyle?.footer?.height})`,
  overflow: 'auto',
  overflowX: 'hidden',
  overflowY: 'auto',
  margin: 0,
  [theme.breakpoints.up('sm')]: {
    height: `calc((100vh - ${theme?.customStyle?.header?.height}) - ${theme?.customStyle?.footer?.height})`,
  },
}))

export const NavItem = styled('div')(() => ({
  ...flexDisplay,
  flexDirection: 'column',
  justifyContent: 'left',
}))

export const NavFooterItemContainer = styled(NavItem)(({ theme }) => ({
  height: theme?.customStyle?.footer?.height,
}))
export const NavLogoWrapper = styled('div')(() => ({
  ...flexDisplay,
  ...justifyCenter,
  flexDirection: 'column',
  width: '100%',
  padding: '10px 5px 10px 22px',
}))
export const CrossIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '20%',
  // padding: "30px 20px 35px 0",
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

export const TabStyled = styled(Tab)(({ theme }) => ({
  ...theme?.customStyle?.tabs?.tabStyle,
}))

export const TabsStyled = styled(Tabs)(() => ({
  padding: '0 1.25rem',
}))

export const LogoutContainerStyled = styled(CenterContainer)(({ theme }) => ({
  ...flexCenter,
  margin: 'auto',
  width: '300px',
  alignItems: 'center',

  '.logoutButton': {
    minWidth: theme?.customStyle?.logout?.button?.widthSM,
    [theme.breakpoints.up('md')]: {
      minWidth: theme?.customStyle?.logout?.button?.width,
    },
  },
}))

export const FormWrapper = styled(Box)(({ theme, style }) => ({
  maxHeight: `calc(100vh - ${theme?.customStyle?.header?.heightSX || '0px'} - 27px - 57px - 80px)`,
  overflow: 'auto',
  overflowX: 'hidden',
  overflowY: 'auto',
  ...theme?.customStyle?.scrollbarStyle,
  ...style,
}))

export const OverlayWrapper = styled(Box)(({ theme }) => ({
  ...theme?.customStyle?.overlay?.style,
}))

export const OverlayWrapperCenter = styled(OverlayWrapper)(({ theme }) => ({
  ...theme?.customStyle?.centerOverlayWrapper?.style,
}))

export const GridContentBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}))

export const GridContentItemContainer = styled(FullSectionContainer)(({ theme }) => ({
  borderRadius: theme?.customStyle?.loginContent?.contentBorderRadius,
  padding: '15px 30px',
  margin: 0,

  [theme.breakpoints.up('sm')]: {
    padding: '30px',
    margin: '20px 0px',
  },

  [theme.breakpoints.up('lg')]: {
    padding: '30px',
    margin: '0px 0px 0px 10px',
  },

  '&:first-of-type': {
    margin: '20px 0',

    [theme.breakpoints.up('sm')]: {
      margin: '0px 0px 0px 0',
    },

    [theme.breakpoints.up('lg')]: {
      margin: '0px 0px 0px 0',
    },
  },

  '&:last-child': {
    margin: '20px 0',

    [theme.breakpoints.up('sm')]: {
      margin: '0px 0 0px 0px',
    },

    [theme.breakpoints.up('lg')]: {
      margin: '20px 10px 0px 0px',
    },

    [theme.breakpoints.up('xl')]: {
      margin: '0px 0 0px 10px',
    },
  },
}))

export const CardsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}))

export const CardItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme?.customStyle?.card?.backgroundColor,
  boxShadow: theme?.customStyle?.card?.boxShadow,
  padding: '30px 20px 12px',
  margin: '10px',
}))

export const MyPlanCardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}))

export const PdfViewerContainer = styled(Box)(({ theme }) => ({
  ...theme?.customStyle?.pdfViewerContainer,
}))

export const ContactDetailsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '20px',

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}))

export const SkeletonCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const Image = styled('img')(({ theme, height }) => ({
  maxWidth: '100%',
  height: 'auto',
  maxHeight: height || `calc((100vh - ${theme?.customStyle?.header?.heightSX || '0px'}) - ${theme?.customStyle?.footer?.height || '0px'})`,
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    maxHeight: height || `calc((100vh - ${theme?.customStyle?.header?.height || '0px'}) - ${theme?.customStyle?.footer?.height || '0px'})`,
  },
}))

export const Layout = styled('div')(({ theme, height }) => ({
  minHeight: height || `calc((100vh - ${theme?.customStyle?.header?.heightSX || '0px'}) - ${theme?.customStyle?.footer?.height || '0px'})`,
  background: theme?.colors?.lightBase,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    minHeight: height || `calc((100vh - ${theme?.customStyle?.header?.height || '0px'}) - ${theme?.customStyle?.footer?.height || '0px'})`,
  },
}))

export const LargeSectionContainer = styled(Paper)(() => ({}))

export const AppMainContainer = styled('main')(({ theme }) => ({
  alignItems: 'center',
  backgroundImage: `url(${theme?.artifacts?.appIcons?.background_image?.url})`,
  backgroundRepeat: 'no-repeat',
  backgroundPositionX: 'right',
  backgroundPositionY: 'bottom',
  backgroundColor: theme.palette.background.default,
  flex: 1,
  minHeight: '100vh',
}))

export const BaseContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  overflow-x: hidden;
`

export const TabContentContainer = styled('div')(() => ({
  minHeight: '200px',
  textAlign: 'center',
}))

export const TabWrapper = styled(Paper)(({ theme }) => ({
  ...theme?.customStyle?.tabPaper,
}))

export const PaperWrapper = styled(Paper)(({ theme }) => ({
  ...theme?.customStyle?.tabContentPaper,
}))

export const MediumPageContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    maxWidth: 'inherit',
  },
}))

export const CreditSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-valueLabel:before': {
    backgroundImage: 'linear-gradient(-45deg, #021d8b 50%, rgba(255, 255, 255, 0) 50%)',
  },
  '& .MuiSlider-valueLabel': {
    ...theme?.typography?.caption,
    color: theme?.palette?.colors?.primary?.main,
  },
  '& .MuiSlider-markLabel': {
    ...theme?.typography?.body1,
  },
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: 'transparent',
  },
  '& .MuiSlider-rail': {
    opacity: '1.0',
    backgroundImage: 'linear-gradient(to right, #1fa825 0%, #28dc30 16%, #47df4d 33%, #ffd964 49%, #ff9800 63%, #ff6b00 79%, #f10 94%)',
  },
  '& .MuiSlider-mark': {

    height: '0.625rem',
    width: '0.0625rem',
    transform: 'rotate(-180deg)',
    backgroundColor: '#bdbdbd',
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: '#bdbdbd',
    },
  },
  '& .MuiSlider-valueLabelOpen': {
    backgroundColor: theme?.palette?.background?.default,
    borderRadius: '0.25rem',
    border: 'solid 1px #021d8b',
  },
}))

export const TextAlignLeft = styled(Box)(() => ({
  ...textAlignLeft,
}))
export const FlexBox = styled(Box)(() => ({
  ...flexDisplay,
}))
export const FlexBoxColumn = styled(Box)(() => ({
  ...flexColumn,
  minHeight: '100%',
}))
export const FlexBoxCenter = styled(FlexBox)(() => ({
  ...alignCenter,
}))
export const FlexBoxCenterSpaceBetween = styled(FlexBoxCenter)(() => ({
  justifyContent: 'space-between'
}))
export const UL = styled('ul')(() => ({
  margin: 0, padding: '1rem'
}))