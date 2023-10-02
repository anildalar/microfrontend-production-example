/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import {
  Box, Button, Divider, Fab, Grid, Typography, useTheme,
  Link as MUILink,
} from '@mui/material'
import { useSelector } from 'react-redux'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { hooks, styles } from 'tenerity-ui-toolkit'
import dayjs from 'dayjs'
import { AccordionList, DynamicSVG, Link } from 'COMMON_UI/common/Components'

import { CreditScoreRiskometer, CreditCenterStatus } from '../../../../Shared/Widgets/CreditCenter'

const ShowMoreListView = ({
  items, noOfItems, sx, heading, variant, elementKey,
  displayNoListItem,
}) => {
  const { t } = useTranslation()
  const [isShowMore, setShowMore] = React.useState(false)
  const { FlexBoxColumn, UL } = styles
  const itemsList = Array.isArray(items)
    ? ((items?.length > noOfItems && isShowMore) ? items : items?.slice(0, noOfItems))
    : []
  const render = () => (
    <FlexBoxColumn sx={{ ...sx, ...(displayNoListItem ? { justifyContent: 'center', alignItems: 'center' } : {}) }}>
      {displayNoListItem || (
        <>
          <Typography variant="h4">
            {t(heading)}
          </Typography>
          <Typography variant={variant} component="div">
            <UL>
              {itemsList
                ?.map((item) => (
                  <li key={item?.[`${elementKey}`]}>
                    {item?.[`${elementKey}`]}
                  </li>
                ))}
            </UL>
          </Typography>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          {items?.length > noOfItems
            && (
              <MUILink
                component="button"
                variant="body2"
                underline="none"
                sx={{
                  mt: 'auto',
                  textAlign: 'left',
                }}
                onClick={() => {
                  setShowMore(!isShowMore)
                }}
              >
                {!isShowMore ? t('action_items.show_more') : t('action_items.show_less')}
              </MUILink>
            )}
        </>
      )}

    </FlexBoxColumn>
  )
  return render()
}

const CreditReports = () => {
  const { t } = useTranslation()
  const {
    PaperWrapper, LargeSectionContainer, FlexBoxCenterSpaceBetween, TextAlignLeft,
  } = styles
  const { getThemeConfigData } = hooks?.useConfigStoreHook()
  const { artifacts } = getThemeConfigData()
  const theme = useTheme()

  const creditScore = useSelector((state) => state?.creditScore)
  const { data } = creditScore
  const creditScores = data?.creditScore?.reduce((acc, val) => ({
    ...acc,
    [val?.bureau.toLowerCase()]: val,
  }), {})
  const activeCreditBureaus = data?.creditScore?.filter((i) => i?.status === 'active')

  const render = () => (
    <Box>
      <CreditCenterStatus
        Wrapper={({ children }) => (
          <PaperWrapper sx={{ minHeight: '15rem' }}>
            {children}
          </PaperWrapper>
        )}
        SuccessComponent={() => (
          <>
            <PaperWrapper>
              <Box sx={{ p: { xs: '2rem 1rem 1rem 1rem', lg: '2rem 2.3rem' } }}>

                {
                  theme?.isMobileOrTablet
                    ? (
                      <TextAlignLeft>
                        {theme?.isMobile && (
                          <Typography variant="h3" color="secondary.main" sx={{ pb: 2, textTransform: 'uppercase' }}>
                            {t('creditCenter.creditReport_title')}
                          </Typography>
                        )}
                        <Typography variant="h4" sx={{ pb: '1.5rem' }}>
                          {`${t('creditCenter.3_bureau_credit_report').replace('#date#', dayjs(data?.lastUpdateDate).format('MM/DD/YY')).replaceAll('#count#', activeCreditBureaus?.length)}`}
                        </Typography>

                        {data?.nextUpdateDate
                          && (
                            <Box sx={{ pb: '1.5rem' }}>
                              <Typography variant="h6">
                                {t('creditCenter.next_report_available_now')}
                              </Typography>
                              <Typography variant="body2">
                                {t('creditCenter.refresh_your_report')}
                              </Typography>
                            </Box>
                          )}

                        <FlexBoxCenterSpaceBetween>
                          {data?.nextUpdateDate
                            && (
                              <Button
                                data-testid="refresh-credit-score-report"
                                aria-label={t('creditCenter.refresh_report')}
                                variant="contained"
                                size="medium"
                                onClick={() => null}
                              >
                                {t('creditCenter.refresh_report')}
                              </Button>
                            )}
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <Link
                            data-testid="classic-report-view-link"
                            variant="body1"
                            onClick={() => null}
                            name="classic-report-view-link"
                            underline="none"
                          // noRenderBox
                          >
                            {t('creditCenter.classic_report_view')}
                          </Link>
                        </FlexBoxCenterSpaceBetween>

                      </TextAlignLeft>
                    )
                    : (
                      <Grid container>
                        <Grid item md={8} sx={{ textAlign: 'left' }}>
                          <Typography variant="h4">
                            {`${t('creditCenter.3_bureau_credit_report').replace('#date#', dayjs(data?.lastUpdateDate).format('MM/DD/YY')).replaceAll('#count#', activeCreditBureaus?.length)}`}
                          </Typography>

                          {data?.nextUpdateDate
                            && (
                              <Grid
                                container
                                alignItems="center"
                                // justifyContent="space-between"
                                sx={{ mt: '2rem' }}
                              >
                                <Grid item sx={{ textAlign: 'left', mr: '2rem' }}>
                                  <Typography variant="h6">
                                    {t('creditCenter.next_report_available_now')}
                                  </Typography>
                                  <Typography variant="body2">
                                    {t('creditCenter.refresh_your_report')}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Button
                                    data-testid="refresh-credit-score-report"
                                    aria-label={t('creditCenter.refresh_report')}
                                    variant="contained"
                                    size="medium"
                                    onClick={() => null}
                                  >
                                    {t('creditCenter.refresh_report')}
                                  </Button>
                                </Grid>
                              </Grid>
                            )}

                        </Grid>
                        <Grid item md={4} sx={{ textAlign: 'right' }}>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <Link
                            data-testid="classic-report-view-link"
                            variant="body1"
                            to={null}
                            onClick={() => null}
                            name="classic-report-view-link"
                            sx={{ mb: '2rem' }}
                            underline="none"
                          // noRenderBox
                          >
                            {t('creditCenter.classic_report_view')}
                          </Link>
                          <Fab color="primary" aria-label="print">
                            <DynamicSVG
                              path={artifacts?.appIcons?.print_icon?.url}
                            />
                          </Fab>
                        </Grid>
                      </Grid>
                    )
                }

              </Box>
            </PaperWrapper>

            <LargeSectionContainer sx={{ m: '1.5rem 0', p: '2rem', overflow: 'auto' }}>
              <Box sx={{ minWidth: '69.688rem' }}>
                <Box sx={{ m: '0 2.25rem', pb: '1rem' }}>
                  <CreditScoreRiskometer
                    isSmallIcon
                    creditScores={creditScores}
                    variant="h4"
                    riskometerItemSx={theme?.customStyle?.creditCenter?.credReportsRiskometerItem}
                  />
                </Box>
                {creditScores && (!theme?.isMobileOrTablet) && <Divider />}
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="stretch"
                  sx={{ mt: '2rem' }}
                >
                  <Grid item>
                    <ShowMoreListView
                      items={creditScores?.experian?.factors}
                      heading="creditCenter.score_factors"
                      variant="body2"
                      noOfItems={4}
                      sx={{ width: '18.75rem', textAlign: 'left' }}
                      elementKey="description"
                      displayNoListItem={!creditScores?.experian
                        ? <>-</>
                        : (creditScores?.experian?.status === 'inactive' && creditScores?.experian?.value === 0) && (
                          <Typography variant="h4">
                            {t('creditCenter.experian_score_na')}
                          </Typography>
                        )}
                    />
                  </Grid>
                  <Grid item>
                    <ShowMoreListView
                      items={creditScores?.transunion?.factors}
                      heading="creditCenter.score_factors"
                      variant="body2"
                      noOfItems={4}
                      sx={{ width: '18.75rem', textAlign: 'left' }}
                      elementKey="description"
                      displayNoListItem={!creditScores?.transunion
                        ? <>-</>
                        : (creditScores?.transunion?.status === 'inactive' && creditScores?.transunion?.value === 0) && (
                          <Typography variant="h4">
                            {t('creditCenter.transunion_score_na')}
                          </Typography>
                        )}
                    />
                  </Grid>
                  <Grid item>
                    <ShowMoreListView
                      items={creditScores?.equifax?.factors}
                      heading="creditCenter.score_factors"
                      variant="body2"
                      noOfItems={4}
                      sx={{ width: '18.75rem', textAlign: 'left' }}
                      elementKey="description"
                      displayNoListItem={!creditScores?.equifax
                        ? <>-</>
                        : (creditScores?.equifax?.status === 'inactive' && creditScores?.equifax?.value === 0) && (
                          <Typography variant="h4">
                            {t('creditCenter.equifax_score_na')}
                          </Typography>
                        )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </LargeSectionContainer>

            <AccordionList
              accordionIconStyle={
                {
                  ...theme?.customStyle?.creditCenter?.creditReports?.accordionArrowIcon,
                  ...theme?.isMobileOrTablet
                    ? theme?.customStyle?.creditCenter?.creditReports?.accordionArrowMobileIcon
                    : theme?.customStyle?.creditCenter?.creditReports?.accordionArrowDesktopIcon,
                }
              }
              accordionStyle={
                {
                  ...theme?.customStyle?.creditCenter?.creditReports?.accordionStyle,
                  ...theme?.isMobileOrTablet
                    ? theme?.customStyle?.creditCenter?.creditReports?.accordionMobileStyle
                    : theme?.customStyle?.creditCenter?.creditReports?.accordionDesktopStyle,
                }
              }
              accordionSummaryStyle={
                theme?.customStyle?.creditCenter?.creditReports?.accordionSummaryStyle
              }
              accordionIcon={artifacts?.appIcons?.down_arrow?.url}
              listData={[{
                id: '1',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.summary')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.summary')}
                  </Typography>
                ),
              },
              {
                id: '2',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.personal_information')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.personal_information')}
                  </Typography>
                ),
              },
              {
                id: '3',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.consumer_statement')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.consumer_statement')}
                  </Typography>
                ),
              },
              {
                id: '4',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.credit_inquiries')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.credit_inquiries')}
                  </Typography>
                ),
              },
              {
                id: '5',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.revolving_credit_accounts')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.revolving_credit_accounts')}
                  </Typography>
                ),
              },
              {
                id: '6',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.real_estate_credit_accounts')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.real_estate_credit_accounts')}
                  </Typography>
                ),
              },
              {
                id: '7',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.installment_credit_accounts')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.installment_credit_accounts')}
                  </Typography>
                ),
              },
              {
                id: '8',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.open_accounts')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.open_accounts')}
                  </Typography>
                ),
              },
              {
                id: '9',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.collection_accounts')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.collection_accounts')}
                  </Typography>
                ),
              },
              {
                id: '10',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.other_accounts')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.other_accounts')}
                  </Typography>
                ),
              },
              {
                id: '11',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.derogatory_information')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.derogatory_information')}
                  </Typography>
                ),
              },
              {
                id: '12',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.public_records')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.public_records')}
                  </Typography>
                ),
              },
              {
                id: '13',
                title: (
                  <Typography variant="h2">
                    {t('creditCenter.creditor_contact_information')}
                  </Typography>
                ),
                summary: (
                  <Typography variant="h2">
                    {t('creditCenter.creditor_contact_information')}
                  </Typography>
                ),
              }]}
            />

          </>
        )}
      />
    </Box>
  )

  return render()
}

export default CreditReports
