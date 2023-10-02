import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Box } from '@mui/material'
import settings from './settings'
import { defaultProps, propTypes } from './types'

const Carousel = ({ accountCards, settings: customSettings, style }) => (
  <Box
    sx={style}
  >
    <Slider {...settings} {...customSettings}>
      {accountCards.map((card) => card)}
    </Slider>
  </Box>
)
Carousel.propTypes = propTypes
Carousel.defaultProps = defaultProps

export default Carousel
