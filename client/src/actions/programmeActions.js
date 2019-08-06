import { UPDATE_PROGRAMME, RECEIVE_FACILITATORS, UPDATE_BATCH, VALIDATE_PROGRAMME } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'
import _ from 'lodash'

export const updateProgrammeInfo = credit => ({ type: UPDATE_PROGRAMME, payload: credit });
export function updateBatchClient(info) {

   let newInfo = {};
   for(var key in info) {
     if (info[key] != "") {
       newInfo = {...newInfo, [key]: info[key]}
     }
   }
   console.log(newInfo)
  return {
    type: UPDATE_BATCH,
    payload: newInfo
  }
}

export const updateProgramme = (info, latestInfo = {}) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] != "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }

    switch(info.programmeType) {

      case "Qualification":
        latestInfo = {
          qpNo: newInfo.qpNo,
          qp: newInfo.qp,
          qpSAQA: newInfo.qpSAQA,
          qpNQF: newInfo.qpNQF
        }
      break;

      case "Unit Standard":
        latestInfo = {
          usSAQA: newInfo.usSAQA,
          us: newInfo.us,
          usNQF: newInfo.usNQF,
          usCredits: newInfo.usCredits
        }
      break;

      case "Skill Programme":
        latestInfo = {
          spNo: newInfo.spNo,
          sp: newInfo.sp,
          spSAQA: newInfo.spSAQA,
          spNQF: newInfo.spNQF,
          spCredits: newInfo.spCredits
        }
      break;

      case "Short Course":
        latestInfo = {
          scNo: newInfo.scNo,
          sc: newInfo.sc,
          scNQF: newInfo.scNQF
        }
      break;
    }
    console.log(latestInfo)
    dispatch(uploadProgramme(info, latestInfo))
    return new Promise.resolve()
  }
}

export const validateInput1 = (info, errs) => {
  return (dispatch, getState) => {

  }
}

export const uploadProgramme = (info, latestInfo) => {
  return dispatch => {
    switch(info.programmeType) {

      case "Qualification":
      return fetch("/data/lms_qualification",{
           method: 'POST',
           body: JSON.stringify(latestInfo),
           headers: {"Content-Type": "application/json"}
         })
         .then(function(response){
           return response.json()
         }).then(function(body){
           console.log(body);
       });
      break;

      case "Unit Standard":
      return fetch("/data/lms_us",{
           method: 'POST',
           body: JSON.stringify(latestInfo),
           headers: {"Content-Type": "application/json"}
         })
         .then(function(response){
           return response.json()
         }).then(function(body){
           console.log(body);
       });
      break;

      case "Skill Programme":
      return fetch("/data/lms_sp",{
           method: 'POST',
           body: JSON.stringify(latestInfo),
           headers: {"Content-Type": "application/json"}
         })
         .then(function(response){
           return response.json()
         }).then(function(body){
           console.log(body);
       });
      break;

      case "Short Course":
      return fetch("/data/lms_sc",{
           method: 'POST',
           body: JSON.stringify(latestInfo),
           headers: {"Content-Type": "application/json"}
         })
         .then(function(response){
           return response.json()
         }).then(function(body){
           console.log(body);
       });
      break;
    }

  }
}

export const validateComplete = errs => ({ type: VALIDATE_PROGRAMME, payload: errs})

export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    if (isEmpty(info.programme_name)) {
      errs = {...errs, programme_nameError: true, errors: true}
    }
    else {
      errs = {...errs, programme_nameError: false, errors: false}
    }

    if (isEmpty(info.facilitator)) {
      errs = {...errs, facilitatorError: true, errors: true}
    }
    else {
      errs = {...errs, facilitatorError: false, errors: false}

    }
    if (info.credit == "credit") {
      if (isEmpty(info.programmeType)) {
        errs = {...errs, programmeTypeError: true, errors: true}
      }
      else {
        errs = {...errs, programmeTypeError: false, errors: false}

      }
    }
    dispatch(validateComplete(errs));
    let state = getState();
    console.log(info)
    if (state.programme.errors == false) {
      dispatch(updateBatchClient(info))
      dispatch(changeActiveStep("programme"))
      state = getState();
      dispatch(uploadBatch(state.batch))
    }
  }
}

export const uploadBatch = (info) => {
  return dispatch => {
    return fetch("/data/lms_batch",{
         method: 'POST',
         body: JSON.stringify(info),
         headers: {"Content-Type": "application/json"}
       })
       .then(function(response){
         return response.json()
       }).then(function(body){
         console.log(body);
     });
  }
}

export function receiveInfo(json) {
  console.log(json.express)
  let clientsArr = [];
  let sorted = _.orderBy(json.express, ['name'],['asc']);
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].name, value: sorted[key].name})]
  }
  console.log(clientsArr)
//  clientsArr = [...clientsArr, ...clientObj]
//  console.log(clientsArr)
  return {
    type: RECEIVE_FACILITATORS,
    payload: clientsArr
  }
}

export const fetchFacilitator = () => {
  return dispatch => {
    return fetch('/api/facilitator')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveInfo(json))
    });
  }
}
