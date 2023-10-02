import React from 'react'
import PrevArrow from './PrevArrow'
import NextArrow from './NextArrow'

const settings = {
  infinite: false,
  centerPadding: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

export default settings
