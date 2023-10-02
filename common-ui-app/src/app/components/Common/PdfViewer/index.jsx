import React, { useEffect, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

import { PdfViewerContainer } from '../../../styles/styles'
import { defaultProps, propTypes } from './types'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
}

const PdfViewer = React.memo(({ title, src, isLargeScreen }) => {
  const pdfContainer = useRef(null)
  const [state, setState] = useState({
    numPages: null,
    width: 0,
  })
  const { numPages, width } = state

  /* istanbul ignore next */
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setState({
      numPages: nextNumPages,
      width: pdfContainer?.current?.getBoundingClientRect()?.width,
    })
  }

  const onResize = () => {
    setState((prevState) => ({
      ...prevState,
      width: pdfContainer?.current?.getBoundingClientRect()?.width,
    }))
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <PdfViewerContainer data-testid="pdf-viewer" ref={pdfContainer}>
      <Document
        data-testid={`iframe-${title}`}
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        loading=""
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={isLargeScreen ? width * 0.8 : width}
            loading=""
          />
        ))}
      </Document>
    </PdfViewerContainer>
  )
})

PdfViewer.propTypes = propTypes
PdfViewer.defaultProps = defaultProps
PdfViewer.displayName = 'PdfViewer'

export default PdfViewer
