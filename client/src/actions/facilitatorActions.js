import {  UPDATE_FAC, EDIT_FACILITATOR, VALIDATE_FACILITATOR, SAVE_FACILITATOR, RESET_FACILITATOR, RECEIVE_FACILITATORS, SUCCESS } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'
import _ from 'lodash'


export const validateComplete = errs => ({ type: VALIDATE_FACILITATOR, payload: errs})
export const success = (saved) => ({type: SUCCESS, payload: saved})
export const updateFac = () => ({type: UPDATE_FAC, payload: "add-c"})



export const Delete = (rows) => {
  return dispatch => {
    return fetch("/api/deleteFacilitator", {
         method: 'POST',
         body: JSON.stringify(rows),
         headers: {"Content-Type": "application/json"}
       })
       .then(function(response){
         return response.json()
       }).then(function(body){
         console.log(body);
     });

  }
  return Promise.resolve();
}

export const editFacilitator = (facilitator) => {
  return dispatch => {
    dispatch(edit({...facilitator, surname: facilitator.name.split(" ")[facilitator.name.split(" ").length - 1], type: "edit"}))
    return Promise.resolve()
  }
}

export const saveEditFacilitator = (info) => {
  return dispatch => {
    return fetch("/data/lms_facilitatorEdit",{
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

export const edit = (facilitator) => ({type: EDIT_FACILITATOR, payload: facilitator})

export const updateFacilitator = (info) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] != "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }

    console.log(newInfo)
    dispatch(save(newInfo))
    const state = getState();
    dispatch(validateInput(state.facilitator))
    return Promise.resolve()
  }
}
export const save = newInfo => ({ type: SAVE_FACILITATOR, payload: newInfo })
export const resetFacilitator = () => ({ type: RESET_FACILITATOR })
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if (isEmpty(info.name)) {
      errs = {...errs, nameError: true}
    }
    else {
      errs = {...errs, nameError: false}
    }

    if(isEmpty(info.surname)) {
      errs = {...errs, surnameError: true}
    }
    else {
      errs = {...errs, surnameError: false}
    }

    if (info.ID.length != 13 ||!isNumeric(info.ID)) {
      errs = {...errs, IDError: true}
    }
    else {
      errs = {...errs, IDError: false}
    }

    if (!isMobilePhone(info.Cell_no)) {
      errs = {...errs, cellnoError: true}
    }
    else {
      errs = {...errs, cellnoError: false}
    }

    let errors = false;

    for (var x in errs) {
      console.log(x, errs[x])
      if (errs[x]) {
        errors = true;
        break;
      }
    }
    let newInfo = {
      name: info.name.charAt(0).toUpperCase() + info.name.slice(1).toLowerCase() + " " + info.surname.charAt(0).toUpperCase() + info.surname.slice(1).toLowerCase(),
      ID: info.ID,
      Cell_no: info.Cell_no,
    }

    dispatch(validateComplete(errs));
    const state = getState();

    console.log(errors)
    if (errors == false) {

    //  newInfo = {...newInfo, success:true}
      if (state.facilitator.type == "add") {
        dispatch(uploadFacilitator(newInfo))
        dispatch(resetFacilitator())
        dispatch(success(true))

      //  dispatch(changeActiveStep("client"))
      }
      else {
        dispatch(saveEditFacilitator(newInfo))
      }

        }
      }
}

export const uploadFacilitator = (info) => {
  return dispatch => {
    return fetch("/data/lms_facilitator",{
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

export const fetchFacilitators = () => {
  return dispatch => {
    return fetch('/api/facilitators')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveFacilitators(json))
    });
  }
}

export function receiveFacilitators(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['surname'],['asc']);
  console.log(sorted)
  return {
    type: RECEIVE_FACILITATORS,
    payload: sorted
  }
}
