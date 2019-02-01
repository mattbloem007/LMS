import { BATCH_NO, ACTIVE_TABLE, ADD_LEARNERS, RECEIVE_BATCH_LEARNERS, RECEIVE_BATCH_LEARNERIDS, CLEAR_BATCH_LEARNERS } from '../actions/actionTypes'

const tableState = {
  activeTable: "batch",
  batch: '',
  batchLearners: [],
  batchLearnerIDs: []
}

const tableReducer = (state = tableState, action) => {
  switch(action.type) {
    case ACTIVE_TABLE:
      return {...state, activeTable: action.payload };
    case ADD_LEARNERS:
      return {...state, activeTable: action.payload, batch: action.batch}
    case RECEIVE_BATCH_LEARNERS:
      // let found = false;
      // console.log(action.payload);
      // state.batchLearners.map(learners => {
      //   if (learners.national_id == action.payload[0].national_id) {
      //     found = true;
      //   }
      // })
      // if (found == false) {
        return {...state, batchLearners: action.payload }
      // }
      // else {
      //   return state
      // }
    case RECEIVE_BATCH_LEARNERIDS:
      let learnerIDs = [];
      console.log(action.payload)
      for (var x in action.payload) {
        learnerIDs.push(action.payload[x].learner_ID)
      }
      if (learnerIDs.length != 0) {
        return {...state, batchLearnerIDs: learnerIDs}
      }
      else {
        return {...state, batchLearnerIDs: learnerIDs, batchLearners: learnerIDs}
      }
    case CLEAR_BATCH_LEARNERS:
        return {...state, batchLearners: []}
    case BATCH_NO:
      return {...state, batch: action.payload}
    default:
      return state
  }
}

export default tableReducer;
