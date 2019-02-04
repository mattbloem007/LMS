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
    programmeType: "",
    qpms: [],
    spms: [],
    usSAQA: "",
    us: "",
    usNQF: "",
    usCredits: "",
    qpNo: "",
    qp: "",
    qpSAQA: "",
    qpNQF: "",
    spNo: "",
    sp: "",
    spSAQA: "",
    spNQF: "",
    spCredits: "",
    scNo: "",
    sc: "",
    scNQF: "",
    show1: true,
    show2: true,
    show3: true,
    show4: true

}

class AddProgrammes extends Component {

  constructor() {
      super();
      this.state = initState;
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

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

  validateInput = () => {
    this.props.programmeActions.updateProgramme(this.state)
    .then(() => {
      this.setState(initState)
    })
  }


  render() {
    return(
      <Form success={this.state.save}>
                <Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.programmeType} label="Programme Type" placeholder="Select Programme Type" fluid search selection onChange={(e,{value}) => {this.handleProgramme(value)}} options={this.props.programmeOptions} error={this.props.programmeTypeError}/>
                  </Form.Field>
                  <Form.Field>
                    <Form.Input disabled={this.state.show1} placeholder="Type the Number of the Qualification Programme Name"  onChange={(e,{value})=>{this.setState({qpNo: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show1} placeholder="Type Qualification Programme Name"  onChange={(e,{value})=>{this.setState({qp: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show1} placeholder="Type Qualification Programme SAQA_ID"  onChange={(e,{value})=>{this.setState({qpSAQA: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show1} placeholder="Type Qualification Programme NQF_LEV"  onChange={(e,{value})=>{this.setState({qpNQF: value})}}></Form.Input>
                  </Form.Field>
                  <Form.Field>
                    <Form.Input disabled={this.state.show2} placeholder="Type Unit Standard SAQA_ID" onChange={(e,{value})=>{this.setState({usSAQA: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show2} placeholder="Type Unit Standard" onChange={(e,{value})=>{this.setState({us: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show2} placeholder="Type Unit Standard NQF Level" onChange={(e,{value})=>{this.setState({usNQF: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show2} placeholder="Type Unit Standard Credits" onChange={(e,{value})=>{this.setState({usCredits: value})}}></Form.Input>
                  </Form.Field>
                  <Form.Field>
                    <Form.Input disabled={this.state.show3} placeholder="Type Skill Programmes Number" onChange={(e,{value})=>{this.setState({spNo: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show3} placeholder="Type Skill Programmes" onChange={(e,{value})=>{this.setState({sp: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show3} placeholder="Type Skill Programmes NQF Level" onChange={(e,{value})=>{this.setState({spNQF: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show3} placeholder="Type Skill Programmes Credits" onChange={(e,{value})=>{this.setState({spCredits: value})}}></Form.Input>
                  </Form.Field>

                  <Form.Field>
                    <Form.Input disabled={this.state.show4} placeholder="Type Short Course Number" onChange={(e,{value})=>{this.setState({scNo: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show4} placeholder="Type Short Course" onChange={(e,{value})=>{this.setState({sc: value})}}></Form.Input>
                    <Form.Input disabled={this.state.show4} placeholder="Type Short Course NQF Level" onChange={(e,{value})=>{this.setState({scNQF: value})}}></Form.Input>
                  </Form.Field>
                  <Message success header='Form Completed' content="Saved Programme Successfully" />
                </Form.Field>
                <Form.Button primary onClick={this.validateInput}><Icon name="save" /> Save</Form.Button>

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
  errors: state.client.errors,
  programmeOptions: state.programme.programmeOptions,
  credit: state.programme.credit,
  facilitators: state.programme.facilitators,
  assessors: state.programme.assessors,
  moderators: state.programme.moderators,
  programme_nameError: state.client.programme_nameError,
  programmeTypeError: state.client.programmeTypeError,
  programme_name: state.batch.programme_name,
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
export default connect(mapStateToProps, mapDispatchToProps)(AddProgrammes);
