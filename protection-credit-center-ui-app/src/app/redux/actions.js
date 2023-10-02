import * as kbaReducer from './reducers/kba'
import * as postKbaReducer from './reducers/kba/postKba'
import * as remainingTrialReducer from './reducers/remainingTrial'
import * as creditScoreReducer from './reducers/creditScore'

const sagaActions = {
  GET_KBA: `${kbaReducer.getKbaData.type}`,
  POST_KBA: `${postKbaReducer.postKbaCall.type}`,
  GET_REMAINING_TRIAL: `${remainingTrialReducer.getRemainingTrial.type}`,
  GET_CREDIT_SCORE: `${creditScoreReducer.getCreditScore.type}`,
}

export default sagaActions
