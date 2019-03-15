import { EDIT_BATCH, EDIT_CLIENT, RECEIVE_QP, RECEIVE_SC, RECEIVE_QPM, RECEIVE_US, RECEIVE_SP, RECEIVE_SPM, FETCH_CLIENTS, RECEIVE_CLIENTS, VALIDATE_CLIENT, SAVE_CLIENT, UPDATE_CLIENT, UPDATE_BATCH, RELOAD, SUCCESS, RESET_CLIENT } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'
import _ from 'lodash'

// export const receiveInfo = json => (console.log(json)
// { type: RECEIVE, payload: json }
// );



export const saveEditBatch = (info) => {
  return dispatch => {
    return fetch("/data/lms_batchEdit",{
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


export const Delete = (rows) => {
  return dispatch => {
    return fetch("/api/deleteClient", {
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

export const editClient = (client) => {
  return dispatch => {
        let addr = client.address.split(", ");
        let newInfo = {...client, type: "edit"};
        switch (addr.length) {
          case 2:
            newInfo = {...newInfo,
                        address: addr[0],
                        postCode: addr[1]
                      }
          break;
          case 3:
          newInfo = {...newInfo,
                      address: addr[0],
                      address2: addr[1],
                      postCode: addr[2]
                    }
          break;
          case 4:
          newInfo = {...newInfo,
                      address: addr[0],
                      address2: addr[1],
                      address3: addr[2],
                      postCode: addr[3]
                    }
          break;
        }
        console.log(newInfo)
        dispatch(edit(newInfo))
    return Promise.resolve()
  }
}

export const edit = (client) => ({type: EDIT_CLIENT, payload: client})

export const saveEditClient= (info) => {
  return dispatch => {
    return fetch("/data/lms_clientEdit",{
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

export const updateClient = (info) => {
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
    dispatch(validateInput(state.client))
    return Promise.resolve()
  }
}

export const updateBatchClient = (info, bool) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] != "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }
    if (newInfo.day != undefined) {
      const date = newInfo.day + " " + newInfo.month  +", " + newInfo.year
      newInfo = {...newInfo, date: date}
    }
    if (newInfo.aday != undefined) {
      const assessment_date =   newInfo.aday + " " + newInfo.amonth+", " + newInfo.ayear
      newInfo = {...newInfo, assessment_date: assessment_date}

    }
    if (newInfo.mday != undefined) {
      const moderator_date =  newInfo.mday + " " + newInfo.mmonth + ", " + newInfo.myear
      newInfo = {...newInfo, moderator_date: moderator_date}
    }
    if (newInfo.endday != undefined) {
      const end_date =   newInfo.endday+ " " + newInfo.endmonth+ ", " + newInfo.endyear
      newInfo = {...newInfo, enddate: end_date}
    }

    console.log(newInfo)
    dispatch(update(newInfo))
    const state = getState();
    let b = {...state.batch, save: bool}
    dispatch(validateInput1(b))
    return Promise.resolve()
  }
}
export const reload = (saved) => {
  return dispatch => {
    dispatch({type: RELOAD, payload: true})
    return Promise.resolve()
  }
}
export const success = (saved) => ({type: SUCCESS, payload: saved})
export const resetClient = () => ({ type: RESET_CLIENT })
export const validateComplete = errs => ({ type: VALIDATE_CLIENT, payload: errs})
export const update = info => ({ type: UPDATE_BATCH, payload: info })
export const save = info => ({type: SAVE_CLIENT, payload: info})
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)

    if (isEmpty(info.name)) {
      errs = {...errs, nameError: true}
    }
    else {
      errs = {...errs, nameError: false}
    }

    if (!isMobilePhone(info.telephone)) {
      errs = {...errs, telError: true}
    }
    else {
      errs = {...errs, telError: false}
    }

    if (isEmpty(info.address)) {
      errs = {...errs, addressError: true}
    }
    else {
      errs = {...errs, addressError: false}
    }


    if (isEmpty(info.postCode) || !isNumeric(info.postCode)) {
      errs = {...errs, postCodeError: true}
    }
    else {
      errs = {...errs, postCodeError: false}
    }

    if (isEmpty(info.contact)) {
      errs = {...errs, contactError: true}
    }
    else {
      errs = {...errs, contactError: false}
    }

    if (isEmpty(info.municipality)) {
      errs = {...errs, municipalityError: true}
    }
    else {
      errs = {...errs, municipalityError: false}
    }

    let errors = false;

    for (var x in errs) {
      if (errs[x]) {
        errors = true;
        break;
      }
    }

    let address = "";
    if (info.address2 != "") {
      address = info.address + ", " + info.address2 + ", " + info.postCode
    }
    else if(info.address3 != "") {
      address = info.address + ", " + info.address2 + ", " + info.address3 +", "+ info.postCode
    }
    else {
      address = info.address +", " + info.postCode
    }
    console.log(address)
    let newInfo = {
      name: info.name.charAt(0).toUpperCase() + info.name.slice(1).toLowerCase(),
      telephone: info.telephone.charAt(0).toUpperCase() + info.telephone.slice(1).toLowerCase(),
      address: address,
      contact: info.contact.charAt(0).toUpperCase() + info.contact.slice(1).toLowerCase(),
      municipality: info.municipality.charAt(0).toUpperCase() + info.municipality.slice(1).toLowerCase()
    }
    dispatch(validateComplete(errs));


    const state = getState();


    if (errors === false) {
      if (state.client.type == "add") {
      //  newInfo = {...newInfo, success: true}
        dispatch(uploadClient(newInfo))
        dispatch(resetClient())
        dispatch(success(true))
        // dispatch(changeActiveStep("client"));
      }
      else {
      //  newInfo = {...newInfo, success: true}
        dispatch(success(true))
        dispatch(saveEditClient(newInfo))
      }



    }
  }
}

export const validateInput1 = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if(isEmpty((info.batch_no).toString())) {
      errs = {...errs, batchError: true}
    }
    else {
      errs = {...errs, batchError: false}
    }

    if (isEmpty(info.project)) {
      errs = {...errs, projectError: true}
    }
    else {
      errs = {...errs, projectError: false}
    }

    if(isEmpty(info.day)) {
      errs = {...errs, dayError: true}
    }
    else {
      errs = {...errs, dayError: false}
    }

    if(isEmpty(info.month)) {
      errs = {...errs, monthError: true}
    }
    else {
      errs = {...errs, monthError: false}
    }

    if(isEmpty(info.year)) {
      errs = {...errs, yearError: true}
    }
    else {
      errs = {...errs, yearError: false}
    }

    if(isEmpty(info.client_name)) {
      errs = {...errs, clientError: true}
    }
    else {
      errs = {...errs, clientError: false}
    }
    if (isEmpty(info.programme_name)) {
      errs = {...errs, programme_nameError: true}
    }
    else {
      errs = {...errs, programme_nameError: false}
    }

    if (info.facilitator.length == 0) {
      errs = {...errs, facilitatorError: true}
    }
    else {
      errs = {...errs, facilitatorError: false}

    }
    if (info.credit == "credit") {
      if (isEmpty(info.programmeType)) {
        errs = {...errs, programmeTypeError: true}
      }
      else {
        errs = {...errs, programmeTypeError: false}

      }
    }
    let errors = false;

    for (var x in errs) {
      if (errs[x]) {
        errors = true;
        break;
      }
    }

    const state = getState()
    let facilitators = "";
    let moderators = "";
    let assessors = "";

    if (info.facilitator instanceof Array) {

      for (let i = 0; i < info.facilitator.length; i++) {
        if (i == info.facilitator.length - 1) {
          facilitators = facilitators + info.facilitator[i]
        }
        else {
          facilitators = facilitators + info.facilitator[i] + ", ";

        }
      }
    }
    else {
      facilitators = info.facilitator

    }
      if (info.assessor instanceof Array) {
        for (let i = 0; i < info.assessor.length; i++) {
          if (i == info.assessor.length - 1) {
            assessors = assessors + info.assessor[i]
          }
          else {
            assessors = assessors + info.assessor[i] + ", ";

          }
        }
      }
      else {
        assessors = info.assessor

      }
      if (info.moderator instanceof Array) {
        for (let i = 0; i < info.moderator.length; i++) {
          if (i == info.moderator.length - 1) {
            moderators = moderators + info.moderator[i]
          }
          else {
            moderators = moderators + info.moderator[i] + ", ";

          }
        }
      }
      else {
        moderators = info.moderator
      }



    let assessment_date = "";
    let moderator_date = "";
    let qmodules = "";
    let spmodules = "";
    if (info.assessment_date != undefined) {
      assessment_date = info.assessment_date
    }
    if (info.moderator_date != undefined) {
      moderator_date = info.moderator_date
    }

    for (let i = 0; i < info.qpms.length; i++) {
      if (i == info.qpms.length - 1) {
        qmodules = qmodules + info.qpms[i]
      }
      else {
        qmodules = qmodules + info.qpms[i] + ", ";

      }
    }

    for (let i = 0; i < info.spms.length; i++) {
      if (i == info.spms.length - 1) {
        spmodules = spmodules + info.spms[i]
      }
      else {
        spmodules = spmodules + info.spms[i] + ", ";

      }
    }

    let newInfo = {
      batch_no: info.batch_no,
      date:  info.date,
      enddate: info.enddate,
      client_name: info.client_name.charAt(0).toUpperCase() + info.client_name.slice(1).toLowerCase(),
      project: info.project.charAt(0).toUpperCase() + info.project.slice(1).toLowerCase(),
      venue: info.venue.charAt(0).toUpperCase() + info.venue.slice(1).toLowerCase(),
      programme_name: info.programme_name.charAt(0).toUpperCase() + info.programme_name.slice(1).toLowerCase(),
      credit: info.credit,
      facilitator: facilitators,
      assessor: assessors,
      moderator: moderators,
      assessment_date: assessment_date,
      moderator_date: moderator_date,
      programmeType: info.programmeType.charAt(0).toUpperCase() + info.programmeType.slice(1).toLowerCase(),
      us: info.us,
      qp: info.qp,
      sp: info.sp,
      sc: info.sc,
      qpms: qmodules,
      spms: spmodules

    }
    dispatch(validateComplete(errs));

    console.log(state.batch.type, errors)

    if (errors == false) {
      if (state.batch.type == "") {
        dispatch(uploadBatch(newInfo))
      }
      else if (state.batch.type == "edit-c"){
        dispatch(success(true))
        dispatch(saveEditBatch(newInfo))
      }
        if (info.save == true) {
            dispatch(success(true))
            //dispatch(reload(true))
        }
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

export const uploadClient = (info) => {
  return dispatch => {
    return fetch("/data/lms_client",{
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
  let sorted = _.orderBy(json.express, ['name'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].name, value: sorted[key].name})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_CLIENTS,
    payload: clientsArr
  }
}

export const fetchClients = () => {
  return dispatch => {
    return fetch('/api/client')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveInfo(json))
    });
  }
}

export const fetchAllClients = () => {
  return dispatch => {
    return fetch('/api/clients')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveClients(json))
    });
  }
}

export function receiveClients(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['surname'],['asc']);
  console.log(sorted)
  return {
    type: RECEIVE_CLIENTS,
    payload: sorted
  }
}

export function receiveQualification(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['Number'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].SAQA_ID  + "-" + sorted[key].QUALIFICATION_MODULE_DETAILS, value: sorted[key].SAQA_ID + "-" + sorted[key].QUALIFICATION_MODULE_DETAILS})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_QP,
    payload: clientsArr
  }
}

export const fetchQualifications = () => {
  return dispatch => {
    return fetch('/api/qualifications')
    .then(res => res.json())
    .then(json => {
      dispatch(receiveQualification(json))
    })
  }
}

export function receiveQualificationModules(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['Number'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].SAQA_ID + "-" + sorted[key].QUALIFICATION_MODULE_DETAILS, value: sorted[key].SAQA_ID + "-" + sorted[key].QUALIFICATION_MODULE_DETAILS})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_QPM,
    payload: clientsArr
  }
}

export const fetchQualificationModules = (index) => {
  return dispatch => {
    return fetch('/api/qualificationsMod', {
      method: 'POST',
      body: JSON.stringify({ index: index }),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(json => {
      dispatch(receiveQualificationModules(json))
    })
  }
}

export const fetchUnitStd = () => {
  return dispatch => {
    return fetch('/api/unitstd')
    .then(res => res.json())
    .then(json => {
      dispatch(receiveUnitStd(json))
    })
  }
}

export function receiveUnitStd(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['SAQA_ID'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].SAQA_ID + "-" + sorted[key].UNIT_STANDARD, value: sorted[key].SAQA_ID + "-" + sorted[key].UNIT_STANDARD})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_US,
    payload: clientsArr
  }
}

export const fetchSkillProgramme = () => {
  return dispatch => {
    return fetch('/api/spp')
    .then(res => res.json())
    .then(json => {
      dispatch(receiveSkillProgrammeP(json))
    })
  }
}

export function receiveSkillProgrammeP(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['Number'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].MODULE_DETAILS, value: sorted[key].MODULE_DETAILS})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_SP,
    payload: clientsArr
  }
}

export function receiveSPModules(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['Number'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].SAQA_ID + "-" + sorted[key].MODULE_DETAILS, value: sorted[key].SAQA_ID + "-" + sorted[key].MODULE_DETAILS})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_SPM,
    payload: clientsArr
  }
}

export const fetchSPModules = (index) => {
  return dispatch => {
    return fetch('/api/spMod', {
      method: 'POST',
      body: JSON.stringify({ index: index }),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(json => {
      dispatch(receiveSPModules(json))
    })
  }
}

export const fetchShortCourse = () => {
  return dispatch => {
    return fetch('/api/sc')
    .then(res => res.json())
    .then(json => {
      dispatch(receiveShortCourse(json))
    })
  }
}

export function receiveShortCourse(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['Number'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].Programme, value: sorted[key].Programme})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_SC,
    payload: clientsArr
  }
}
