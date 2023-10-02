import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Typography, useTheme, Grid, Divider,
} from '@mui/material'
import Link from '../Link'
import DynamicSVG from '../DynamicSVG'
import { defaultProps, propTypes } from './types'
import { StyledFooter } from '../../../styles/styles'

const CopyRight = (content) => (
  <Grid item sx={({ customStyle }) => customStyle?.footer?.copyRight}>
    <Typography textAlign="left" variant="body1" color="inherit">
      {content}
    </Typography>
  </Grid>
)

const FooterDivider = () => (
  <Grid item alignSelf="center">
    <Divider sx={({ customStyle }) => customStyle?.footer?.divider} />
  </Grid>
)

const Footer = React.memo(() => {
  const {
    customStyle, artifacts, isMobile, isTablet,
  } = useTheme()
  const { t } = useTranslation()
  const isMobileOrTablet = isMobile || isTablet

  return (
    <StyledFooter data-testid="footer">
      <Grid
        container
        sx={customStyle.footer?.gridContainer1}
        justifyContent="space-evenly"
      >
        <Grid
          item
          container
          xs={12}
          md={4}
          sx={customStyle?.footer?.gridContainer2}
        >
          <Grid item>
            <Link
              variant="body1"
              data-testid="privacy-link"
              to={t('footer.links.link_0.href')}
              sx={customStyle?.footer?.link}
            >
              {t('footer.links.link_0.text')}
            </Link>
          </Grid>
          {
            isMobileOrTablet && FooterDivider()
          }
          <Grid item>
            <Link
              variant="body1"
              data-testid="terms-link"
              to={t('footer.links.link_1.href')}
              sx={customStyle?.footer?.link}
            >
              {t('footer.links.link_1.text')}
            </Link>
          </Grid>
          {
            isMobileOrTablet && FooterDivider()
          }
          <Grid item>
            <Link
              variant="body1"
              data-testid="contact-us"
              to={t('footer.links.link_2.href')}
              sx={customStyle?.footer?.link}
            >
              {t('footer.links.link_2.text')}
            </Link>
          </Grid>
          {
            !isMobileOrTablet && CopyRight(t('footer.copyright'))
          }
        </Grid>
        <Grid item>
          <Grid container direction="column" sx={customStyle?.footer?.gridContainer3}>
            <Grid item>
              <Typography textAlign="left" variant="h4" color="inherit">
                {t('footer.follow_us')}
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item>
                <Link to={t('footer.links.link_3.href')} data-testid="social-youtube-link">
                  <DynamicSVG path={artifacts?.appIcons?.youtube_icon?.url} />
                </Link>
              </Grid>
              <Grid item>
                <Link to={t('footer.links.link_4.href')} data-testid="social-facebook-link">
                  <DynamicSVG path={artifacts?.appIcons?.facebook_icon?.url} />
                </Link>
              </Grid>
              <Grid item>
                <Link to={t('footer.links.link_5.href')} data-testid="social-instagram-link">
                  <DynamicSVG path={artifacts?.appIcons?.instagram_icon?.url} />
                </Link>
              </Grid>
              <Grid item>
                <Link to={t('footer.links.link_6.href')} data-testid="social-social-link">
                  <DynamicSVG path={artifacts?.appIcons?.social_icon?.url} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" sx={customStyle?.footer?.gridContainer3}>
            <Grid item>
              <Typography textAlign="left" variant="h4" color="inherit">
                {t('footer.download_the_app')}
              </Typography>
            </Grid>
            <Grid item container direction="row" spacing={2}>
              <Grid item>
                <Link
                  to={t('footer.links.link_7.href')}
                  sx={{ ...customStyle?.footer?.link, textDecoration: 'none' }}
                  data-testid="app-ios-link"
                >
                  <DynamicSVG path={artifacts?.appIcons?.apple_store_icon?.url} />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to={t('footer.links.link_8.href')}
                  sx={{ ...customStyle?.footer?.link, textDecoration: 'none' }}
                  data-testid="app-android-link"
                >
                  <DynamicSVG path={artifacts?.appIcons?.googleplay_icon?.url} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {
          isMobileOrTablet && CopyRight(t('footer.copyright'))
        }
      </Grid>
    </StyledFooter>
  )
})

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps
Footer.displayName = 'Footer'

export default Footer
