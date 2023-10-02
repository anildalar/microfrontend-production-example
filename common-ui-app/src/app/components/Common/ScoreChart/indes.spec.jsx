/* eslint-disable max-len */
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import ScoreChart from '.'
import { formatTooltip } from './utils'

const { setUpRTLWithTheme } = testingUtilsObj

require('../../../mocks/react-i18next-init').default()

global.structuredClone = (val) => JSON.parse(JSON.stringify(val))

jest.mock('use-resize-observer', () => {
  const originalModule = jest.requireActual('use-resize-observer')
  return {
    default: () => ({ width: 450, ref: null }),
    __esModule: true,
    ...originalModule,
    useResizeObserver: () => ({ width: 450, ref: null }),
  }
})

const dummyData = {
  series: [
    {
      name: 'Experian',
      data: [350, 732, 751, 715, 740, 716, 814, 725],
    },
    {
      name: 'TransUnion',
      data: [740, 420, 775, 813, 725, 830, 759, 737],
    },
    {
      name: 'Equifax',
      data: [730, 815, 340, 818, 723, 764, 785, 767],
    },
  ],
  xLabels: [
    'Apr 2023',
    'May 2023',
    'Jun 2023',
    'Jul 2023',
    'Aug 2023',
    'Sep 2023',
    'Oct 2023',
    'Nov 2023',
  ],
  symbolIcons: {
    experian: 'https://images.contentstack.io/v3/assets/blt8911793295b7dfeb/blta444da4b168da2d8/64ff16bd0433c0788f253328/riskometer2.svg',
    transunion: 'https://images.contentstack.io/v3/assets/blt8911793295b7dfeb/blta444da4b168da2d8/64ff16bd0433c0788f253328/riskometer2.svg',
    equifax: 'https://images.contentstack.io/v3/assets/blt8911793295b7dfeb/blta444da4b168da2d8/64ff16bd0433c0788f253328/riskometer2.svg',
  },
  iconType: 'image',
}

describe('- ScoreChart Component', () => {
  describe('- Renders Component', () => {
    test('- snapshot test', () => {
      const component = setUpRTLWithTheme(ScoreChart, dummyData)
      expect(component).toMatchSnapshot()
    })
    test('- checkbox selection', async () => {
      const { getByTestId } = setUpRTLWithTheme(ScoreChart, dummyData)
      const experianChkLabel = getByTestId('graph_series_checkbox_label_equifax')
      await userEvent.click(experianChkLabel)
      const experianChk = getByTestId('graph_series_checkbox_equifax')
      await waitFor(() => expect(experianChk?.checked).toBe(false))
    })
    test('- validation of tooltip formatter method', async () => {
      expect(formatTooltip(
        [
          { axisValueLabel: 'Hello', seriesName: 'Hello', value: 700 },
          { axisValueLabel: 'Test', seriesName: 'Test', value: 700 },
          { axisValueLabel: 'Demo', seriesName: 'Demo', value: 700 },
        ],
        ['hello', 'test', 'demo'],
      )).toBe('<div><p style="margin:0;margin-bottom :1px; text-align:left">Hello</p><div><p style="margin:0;margin-bottom:1px;text-align:left"><strong style="margin:0;margin-right:24px;">Hello</strong>700</p> <p style="margin:0;margin-bottom:1px;text-align:left"><strong style="margin:0;margin-right:3px;">Test</strong> 700 </p><p style="margin:0;margin-bottom :1px;text-align:left"><strong style="margin:0; margin-right:23px;">Demo</strong>700</p></div></div>')
      expect(1).toBe(1)
    })
  })
})
