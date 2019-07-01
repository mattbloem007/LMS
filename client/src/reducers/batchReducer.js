import { EDIT_BATCH, SAVE_BATCH, UPDATE_BATCH, RECEIVE_BATCH, RELOAD, UPDATE_PROGRAMME } from '../actions/actionTypes';

const batchState = {
  batch_no: "",
  date: "",
  client_name: "",
  project: "",
  venue: "",
  day: "",
  month: "",
  year: "",
  aday: "",
  amonth: "",
  ayear: "",
  mday: "",
  mmonth: "",
  myear: "",
  endday: "",
  endmonth: "",
  endyear: "",
  enddate: "",
  credit: "",
  creditStatus: false,
  facilitator: [],
  moderator: [],
  assessor: [],
  programme_name: "",
  programmeType: "",
  us: "",
  qp: "",
  sp: "",
  sc: "",
  scus: "",
  qpms: [],
  spms: [],
  modules: {},
  learnerIDs: [],
  saved: false,
  success: false,
  batchs: [],
  type: ""
}

const batchReducer = (state = batchState, action) => {
  switch(action.type) {
    case UPDATE_PROGRAMME:
      let status = false;
      if (action.payload == "credit") {
        status = true;
      }
      return {...state, credit: action.payload, creditStatus: status}
      case UPDATE_BATCH:
        return {...state, ...action.payload}
      case RECEIVE_BATCH:
        return {...state, batchs: action.payload};
        case EDIT_BATCH:
         status = false;
        if (action.payload.credit == "credit") {
          status = true;
        }
          return {...state, ...action.payload, creditStatus: status }
      case RELOAD:
        return batchState
    default:
      return state;
  }
}
export default batchReducer;
