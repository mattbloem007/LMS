import React, { Component } from 'react';
import { Segment, Form, Icon, Message } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as clientActions from '../actions/clientActions';
import * as programmeActions from '../actions/programmeActions'
import * as flowActions from '../actions/flowActions';
import * as learnerActions from '../actions/learnerActions';
import * as tableActions from '../actions/tableActions'

import { days, months } from '../common';
import _ from 'lodash';

import qualifications from './qualifications'


const initState = {
    success: false,
    save: false,
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
    client_name: "",
    project: "",
    venue: "",
    programme_name: "",
    credit: "",
    creditStatus: false,
    facilitator: "",
    programmeType: "",
    qpms: [],
    spms: [],
    us: "",
    qp: "",
    sp: "",
    sc: "",
    show1: true,
    show2: true,
    show3: true,
    show4: true

}

class Client extends Component {

  constructor() {
      super();
      this.state = {
          success: false,
          save: false,
          batch_no: "",
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
          client_name: "",
          project: "",
          venue: "",
          programme_name: "",
          credit: "",
          creditStatus: false,
          facilitator: "",
          programmeType: "",
          qpms: [],
          spms: [],
          us: "",
          qp: "",
          sp: "",
          sc: "",
          show1: true,
          show2: true,
          show3: true,
          show4: true

      }
  }

  componentDidMount() {
    this.props.clientActions.fetchClients();
    this.props.learnerActions.fetchFacilitator();
    this.props.learnerActions.fetchAssessor();
    this.props.learnerActions.fetchModerator();

    // this.props.clientActions.fetchQualifications();
    // this.props.clientActions.fetchSkillProgramme();
    // this.props.clientActions.fetchShortCourse();
    // this.props.clientActions.fetchUnitStd();
  }

  componentWillReceiveProps(nextProps) {
      this.setState({creditStatus: nextProps.creditStatus})

  }

  handleRadio = value => {
    this.setState({credit: value})
    this.props.programmeActions.updateProgrammeInfo(value)
  }


  validateInput = (e) => {

    this.props.clientActions.updateBatchClient(this.state, true)
    .then(() => {
      console.log("SUCCESS?" + this.props.success)
      if (this.props.success) {
        this.setState({...initState, save: true})
      }
      if(this.props.type == "edit-c") {
        this.props.tableActions.changeActiveTable("batch")
      }
     this.props.clientActions.reload(true)
      .then(() => {
        this.props.clientActions.fetchClients();
        this.props.learnerActions.fetchFacilitator();
        this.props.learnerActions.fetchAssessor();
        this.props.learnerActions.fetchModerator();
     })
    })

  //  this.props.clientActions.validateInput1(this.state)
  }

  addFacilitator = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("addFac");
  }
  addModerator = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("addMod");
  }
  addAssessor = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("addAss");
  }

  addClient = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("rclient");
  }

  handleProgramme = (value) => {
    this.setState({programmeType: value})
    console.log("changed: ", value)
    switch(value) {
      case "Qualification":
      this.props.clientActions.fetchQualifications();
        this.setState({show1: false, show2: true, show3: true, show4: true})
        console.log(this.state.show1)
      break;
      case "Unit Standard":
        this.props.clientActions.fetchUnitStd();
        this.setState({show1: true, show2: false, show3: true, show4: true})
        console.log(this.state.show2)
      break;
      case "Skill Programme":
      this.props.clientActions.fetchSkillProgramme();
        this.setState({show1: true, show2: true, show3: false, show4: true})
        console.log(this.state.show3)
      break;
      case "Short Course":
      this.props.clientActions.fetchShortCourse();
        this.setState({show1: true, show2: true, show3: true, show4: false})
        console.log(this.state.show4)
      break;
    }
  }

  handleQProgramme = value => {
    this.setState({qp: value})
    console.log(value, this.props.qp);
    let index = _.findIndex(this.props.qp, {value: value})
    console.log(index)
    this.props.clientActions.fetchQualificationModules(index + 1);
  }

  handleSProgramme = value => {
    this.setState({sp: value})
    console.log(value);
    let index = _.findIndex(this.props.sp, {value: value})
    console.log(index)
    this.props.clientActions.fetchSPModules(index + 1);
  }

  render() {
    return(
      <Form success={this.state.save}>
        <Form.Input defaultValue={this.props.batch_no} label="Batch Number" placeholder="Enter Batch Number" onChange={(e,{value})=>{this.setState({batch_no: value})}} error={this.props.batchError}/>
        <Form.Input defaultValue={this.props.project} label="Project Name" placeholder="Enter Project Name" onChange={(e,{value})=>{this.setState({project: value})}} error={this.props.projectError}/>
        <Form.Field>
          <label>Training Start Date</label>
        </Form.Field>
        <Form.Group>
            <Form.Select placeholder="DD" defaultValue={this.props.day} onChange={(e,{value})=>{this.setState({day: value})}} fluid search selection options={days} error={this.props.dayError}/>
            <Form.Select placeholder="MM" defaultValue={this.props.month} onChange={(e,{value})=>{this.setState({month: value})}} fluid search selection options={months} error={this.props.monthError}/>
            <Form.Input name="year" defaultValue={this.props.year} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({year: value})}} error={this.props.yearError}/>
        </Form.Group>
        <Form.Field>
          <label>Training End Date</label>
        </Form.Field>
        <Form.Group>
            <Form.Select placeholder="DD" defaultValue={this.props.endday} onChange={(e,{value})=>{this.setState({endday: value})}} fluid search selection options={days} />
            <Form.Select placeholder="MM" defaultValue={this.props.endmonth} onChange={(e,{value})=>{this.setState({endmonth: value})}} fluid search selection options={months} />
            <Form.Input name="year" defaultValue={this.props.endyear} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({endyear: value})}} />
        </Form.Group>
        <Form.Input defaultValue={this.props.venue} label="Training Venue" placeholder="Enter the venue" onChange={(e,{value})=>{this.setState({venue: value})}} />
            <Form.Select label="Choose Client" defaultValue={this.props.client_name} placeholder='Select Client Name' fluid search selection options={this.props.clients} onChange={(e,{value})=>{this.setState({client_name: value})}} error={this.props.clientError}/>
              <Form.Field>
                <label>Date Assessed</label>
              </Form.Field>
              <Form.Group>
                  <Form.Select placeholder="DD" defaultValue={this.props.aday} onChange={(e,{value})=>{this.setState({aday: value})}} fluid search selection options={days} error={this.props.adayError}/>
                  <Form.Select placeholder="MM" defaultValue={this.props.amonth} onChange={(e,{value})=>{this.setState({amonth: value})}} fluid search selection options={months} error={this.props.amonthError}/>
                  <Form.Input name="year" defaultValue={this.props.ayear} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({ayear: value})}} error={this.props.ayearError}/>
              </Form.Group>
              <Form.Field>
                <label>Date Moderated</label>
              </Form.Field>
              <Form.Group>
                  <Form.Select placeholder="DD" defaultValue={this.props.mday} onChange={(e,{value})=>{this.setState({mday: value})}} fluid search selection options={days} error={this.props.mdayError}/>
                  <Form.Select placeholder="MM" defaultValue={this.props.mmonth} onChange={(e,{value})=>{this.setState({mmonth: value})}} fluid search selection options={months} error={this.props.mmonthError}/>
                  <Form.Input name="year" defaultValue={this.props.myear} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({myear: value})}} error={this.props.myearError}/>
              </Form.Group>
              <Form.Group>
                <Form.Input defaultValue={this.props.programme_name} label="Programme name" placeholder="Programme name" onChange={(e,{value})=>{this.setState({programme_name: value})}} error={this.props.programme_nameError}/>
              </Form.Group>
              <Form.Group inline>
                <Form.Radio label="Credit" value='credit' checked={this.props.credit === 'credit'} onChange={(e,{value})=> {this.handleRadio(value)}}/>
                <Form.Radio label="Non-Credit" value='non-credit' checked={this.props.credit === 'non-credit'} onChange={(e,{value})=>{this.handleRadio(value)}}/>
              </Form.Group>
              {
                this.state.creditStatus ?
                <Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.programmeType} label="Programme Type" placeholder="Select Programme Type" fluid search selection onChange={(e,{value}) => {this.handleProgramme(value)}} options={this.props.programmeOptions} error={this.props.programmeTypeError}/>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select disabled={this.state.show1} placeholder="Select Qualification Programme Name"  fluid search selection options={this.props.qp} onChange={(e, {value}) => {this.handleQProgramme(value)}}></Form.Select>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select disabled={this.state.show1} placeholder="Select Qualification Module"  fluid multiple search selection closeOnChange options={this.props.qpm} onChange={(e,{value})=>{this.setState({qpms: value})}}></Form.Select>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select disabled={this.state.show2} placeholder="Select Unit Standard"  fluid search selection options={this.props.us} onChange={(e,{value})=>{this.setState({us: value})}}></Form.Select>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select disabled={this.state.show3} placeholder="Select Skill Programmes"  fluid search selection options={this.props.sp} onChange={(e, {value}) => {this.handleSProgramme(value)}}></Form.Select>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select disabled={this.state.show3} placeholder="Select Skill Programme Modules"  fluid multiple search selection closeOnChange options={this.props.spm} onChange={(e,{value})=>{this.setState({spms: value})}}></Form.Select>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select disabled={this.state.show4} placeholder="Select Short Course"  fluid search selection options={this.props.sc} onChange={(e,{value})=>{this.setState({sc: value})}}></Form.Select>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.facilitator} label="Facilitator" placeholder="Select Facilitator Name" fluid multiple search selection closeOnChange onChange={(e,{value})=>{this.setState({facilitator: value})}} options={this.props.facilitators} error={this.props.facilitatorError}/>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.assessor} label="Assessor" placeholder="Select Assessor Name"  fluid multiple search selection closeOnChange onChange={(e,{value})=>{this.setState({assessor: value})}} options={this.props.assessors} error={this.props.assessorError}/>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.moderator} label="Moderator" placeholder="Select Moderator Name"  fluid multiple search selection closeOnChange onChange={(e,{value})=>{this.setState({moderator: value})}} options={this.props.moderators} error={this.props.moderatorError}/>
                  </Form.Field>
                  <Message success header='Form Completed' content="Saved Batch Successfully" />
                </Form.Field>
                :
                <Form.Field>
                  <Form.Select defaultValue={this.props.facilitator} label="Facilitator" placeholder="Select Facilitator Name" fluid multiple search selection closeOnChange onChange={(e,{value})=>{this.setState({facilitator: value})}} options={this.props.facilitators} error={this.props.facilitatorError}/>
                  <Message success header='Form Completed' content="Saved Batch Successfully" />
                </Form.Field>

              }
                  {
                    this.state.creditStatus ?
                    <Form.Group widths='equal'>
                      <Form.Button primary onClick={this.validateInput}><Icon name="save" /> Save</Form.Button>
                      <Form.Button primary onClick={this.addClient}><Icon name="add" /> Add New Client</Form.Button>
                      <Form.Button primary onClick={this.addFacilitator}><Icon name="add" /> Add new Facilitator</Form.Button>
                      <Form.Button primary onClick={this.addAssessor}><Icon name="add" /> Add new Assessor</Form.Button>
                      <Form.Button primary onClick={this.addModerator}><Icon name="add" /> Add new Moderator</Form.Button>
                    </Form.Group>
                    :
                    <Form.Group widths='equal'>
                        <Form.Button primary onClick={this.validateInput}><Icon name="save" /> Save</Form.Button>
                        <Form.Button primary onClick={this.addClient}><Icon name="add" />Add New Client</Form.Button>
                        <Form.Button primary onClick={this.addFacilitator}><Icon name="add" />Add new Facilitator</Form.Button>
                    </Form.Group>
                  }


      </Form>
  )
  }
}
const mapStateToProps = state => ({
  clients: state.client.clients,
  qp: state.client.qp,
  qpm: state.client.qpm,
  us: state.client.us,
  sp: state.client.sp,
  spm: state.client.spm,
  sc: state.client.sc,
  projectError: state.client.projectError,
  dayError: state.client.dayError,
  yearError: state.client.yearError,
  monthError: state.client.monthError,
  clientError: state.client.clientError,
  batchError: state.client.batchError,
  batch_no: state.batch.batch_no,
  day: state.batch.day,
  month: state.batch.month,
  year: state.batch.year,
  aday: state.batch.aday,
  amonth: state.batch.amonth,
  ayear: state.batch.ayear,
  mday: state.batch.mday,
  mmonth: state.batch.mmonth,
  myear: state.batch.myear,
  endday: state.batch.endday,
  endmonth: state.batch.endmonth,
  endyear: state.batch.endyear,
  enddate: state.batch.enddate,
  date: state.batch.date,
  client_name: state.batch.client_name,
  project: state.batch.project,
  venue: state.batch.venue,
  errors: state.client.errors,
  programmeOptions: state.programme.programmeOptions,
  credit: state.programme.credit,
  facilitators: state.programme.facilitators,
  assessors: state.programme.assessors,
  moderators: state.programme.moderators,
  programme_nameError: state.client.programme_nameError,
  facilitatorError: state.client.facilitatorError,
  assessorError: state.client.assessorError,
  moderatorError: state.client.moderatorError,
  programmeTypeError: state.client.programmeTypeError,
  programme_name: state.batch.programme_name,
  facilitator: state.batch.facilitator,
  assessor: state.batch.assessor,
  moderator: state.batch.moderator,
  creditStatus: state.programme.creditStatus,
  programmeType: state.batch.programmeType,
  success: state.client.success,
  saved: state.client.saved,
  type: state.batch.type
})
const mapDispatchToProps = dispatch => ({
  clientActions: bindActionCreators(clientActions, dispatch),
  programmeActions: bindActionCreators(programmeActions, dispatch),
  learnerActions: bindActionCreators(learnerActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Client);
