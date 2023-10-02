import { act } from 'react-dom/test-utils'

import PdfViewer from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import { pdfPath } from '../../../../../devtool-config/constants/const.config'

jest.mock('react-pdf/dist/esm/entry.webpack5', () => require('../../../mocks/react-pdf').default)

const { setUpRTR } = testingUtilsObj

describe('- PdfViewer Component', () => {
  let component
  const props = {
    title: 'test',
    src: `/${pdfPath}/terms.pdf`,
  }

  describe('- Mounting', () => {
    test('- snapshot test', async () => {
      await act(async () => {
        component = setUpRTR(PdfViewer, { ...props })
      })
      expect(component).toMatchSnapshot()
      await act(async () => {
        window.dispatchEvent(new Event('resize'))
      })
      component.unmount()
    })

    test('- snapshot Desktop View', async () => {
      await act(async () => {
        component = setUpRTR(PdfViewer, { ...props, isLargeScreen: true })
      })
      expect(component).toMatchSnapshot()
    })
  })
})
