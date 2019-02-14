import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button, Segment, Checkbox, Confirm, Form, Header, Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'
import * as flowActions from '../actions/flowActions'
import * as learnerActions from '../actions/learnerActions';
import { disability, genderOptions, status, countryOptions, education, languageOptions, yesNoOption } from '../common'
import _ from 'lodash'

let info = {
  national_id: null,
  firstname: null,
  surname: null,
  equity: null,
  nationality: null,
  education: null,
  language: null,
  last_school: null,
  batch_no: null,
  programme_names: null,
  employed: null,
  ass_status: null,
  disability: null,
  gender: null,
  year_attended: null

}

class AllLearnerTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["National ID", "First Name", "Surname", "Equity", "Gender", "Year"],
                    allowed: ['national_id', 'firstname', 'surname', 'equity', 'gender', "year_attended"],
                    filterBy: {},
                    learners: this.props.learners,
                    checkedRows: [],
                    deleted: false,
                    open: false,
                    openFilter: false,
                    info: info
                 }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  openFilter = () => this.setState({ openFilter: true })
  closeFilter = () => this.setState({ openFilter: false })

  back = () => {
    this.props.tableActions.changeActiveTable("batch")
    this.props.tableActions.clearBatchLearners()
  }

  downloadExcel = () => {
    this.props.tableActions.downloadExcel(this.props.learners)
  }

  componentWillReceiveProps(props) {
    this.setState({learners: props.learners})
  }

  // downloadPDF = () => {
  //   this.props.tableActions.downloadPDF(this.props.batch, this.props.batchs, this.props.batchLearners)
  // }

  componentDidMount() {
      this.props.learnerActions.fetchAllLearners();
  }

  delete = () => {
    console.log(this.state.checkedRows)
    this.props.learnerActions.Delete(this.state.checkedRows)
    .then(() => {
      this.close()
      this.forceUpdate()
      this.props.learnerActions.fetchAllLearners();
    })
  }

  edit = (learners) => {
    console.log(learners)
    this.props.learnerActions.fetchLearnerInfo(learners.national_id, "t")
    .then(() => {
      this.props.flowActions.changeActiveStep("rLearner");
    })
  }

  checkRow = (ID, value) => {
    let checked = [];
    if (value) {
      checked.push(ID);
      this.setState({checkedRows: [...this.state.checkedRows, ...checked]})
    }
    else {
      this.setState({checkedRows:  _.without(this.state.checkedRows, ID) })
    }
  }

  filterTable = () => {
    let info = [];
    let filterArr = _.pickBy(this.state.info, _.identity);
    for (var x in filterArr) {
      filterArr[x] = filterArr[x].toLowerCase();
    }
    this.props.learners.map(learner => {
      info.push(_.mapValues(learner, _.method('toLowerCase')))
    })
    console.log(filterArr)
    this.setState({filterBy: filterArr, openFilter: false}, function () {
      this.sortFilter(info)

    })



  }

  sortFilter = (info) => {
    let arr = []
    let count = 0

  for (var key in this.state.filterBy) {
    _.map(info, (learner) => {
      if (learner[key] != undefined) {
        switch(key) {
          case "gender":
            if (Object.keys(this.state.filterBy).length == 1 || count == 0) {
              if(learner[key] === this.state.info[key].toLowerCase()) {
                arr.push(learner)
              }
            }
             else {
               arr = _.filter(arr, (learner) => {
                   if(learner[key] != undefined) {
                     return learner[key] === this.state.info[key].toLowerCase()
                   }
                 })
             }
          break;
          case "year_attended":
          if (Object.keys(this.state.filterBy).length == 1) {
            if(learner[key] === this.state.info[key].toLowerCase()) {
              arr.push(learner)
            }
          }
           else {
             arr = _.filter(arr, (learner) => {
                 if(learner[key] != undefined) {
                   return learner[key] === this.state.info[key].toLowerCase()
                 }
               })
           }
          break;
          default:
            if (learner[key].includes(this.state.info[key].toLowerCase())) {
              arr.push(learner)
            }

          }
        }
      })
      count++
    }
    console.log(arr)
    this.setState({learners:arr})
  }

  reset = () => {
    this.setState({filterBy: {}, info: info, learners: this.props.learners})
  }

  render() {
    return(
      <Segment style={{overflow: 'auto', maxHeight: 500 }}>
        <Button onClick={this.reset}>Reset Filters</Button>
        <Modal
          onOpen={this.openFilter}
        trigger={<Button>Filter</Button>}>
      <Modal.Header>Filter</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Filter</Header>
            <Form>
              <Form.Field>
                <Form.Input label="National ID" placeholder="Enter National ID" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, national_id: data.value}}))}} />
                <Form.Input label="First Name" placeholder="Enter First Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, firstname: data.value}}))}} />
                <Form.Input label="Surname" placeholder="Enter Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} />
                <Form.Input label="Equity" placeholder="Enter Equity" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, equity: data.value}}))}} />
                <Form.Select label="Nationality" placeholder='Select Nationality' onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, nationality: data.value}}))}} fluid search selection options={countryOptions} />
                <Form.Input label="Last School (EMIS Number)" placeholder="Enter Last School Attended" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, last_school: data.value}}))}} />
                <Form.Select label="First Language" placeholder="Select Language" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, language: data.value}}))}} fluid search selection options={languageOptions} />
                <Form.Select label="Highest Education" placeholder="Select Highest Education" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, education: data.value}}))}}  fluid search selection options={education} />
                <Form.Select label="Gender" placeholder="Select Gender" fluid search selection options={genderOptions} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, gender: data.value}}))}} />
                <Form.Input label="Programme" placeholder="Enter Programme Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, programme_names: data.value}}))}} />
              <Form.Input label="Batch Number" placeholder="Enter Batch Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, batch_no: data.value}}))}} />
                <Form.Input label="Year" placeholder="Enter Year" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year_attended: data.value}}))}} />
                <Form.Select label="Assessment Status" placeholder="Select Status" fluid search selection options={status} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ass_status: data.value}}))}} />
                <Form.Select label="Disability" placeholder="Disability" options={disability} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, disability: data.value}}))}} />
                <Form.Select label="Employed" placeholder="Select" onChange={this.handleEmployer} fluid search selection options={yesNoOption} />
              </Form.Field>

            </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={this.filterTable} icon labelPosition='left' primary size='small'>
          <Icon name='filter' /> Filter
        </Button>
      </Modal.Actions>
    </Modal>

    <Table celled selectable sortable stackable compact definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell />
          {
            this.state.headings.map((head) => <Table.HeaderCell key={head}>{head}</Table.HeaderCell>)
          }
        </Table.Row>
      </Table.Header>
        <Table.Body>
          {
            (this.state.learners).map((x, i) => {
                return(
                  <Table.Row key={x.national_id}>
                    <Table.Cell collapsing>
                      <Checkbox onChange={(e, {checked}) => {this.checkRow(x.national_id, checked)}}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => this.edit(this.state.learners[i])} icon labelPosition='left' primary size='small'>
                        <Icon name='edit' /> Edit
                      </Button>
                    </Table.Cell>
                    {
                      Object.keys(_.pick(this.state.learners[i], this.state.allowed)).map((y) =><Table.Cell key={y}>{((this.state.learners[i])[y]).charAt(0).toUpperCase() + ((this.state.learners[i])[y]).slice(1)}</Table.Cell>)
                    }
                  </Table.Row>
                  )
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
      <Table.Row>
      <Table.HeaderCell colSpan='5'>
            <Button onClick={this.downloadExcel} floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='download' /> Export To Excel
            </Button>
            <div>
              <Button onClick={this.open} floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='delete' /> Delete
              </Button>
              <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.delete} />
            </div>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
  </Segment>
    )
  }

}
const mapStateToProps = state => ({
  batch: state.table.batch,
  batchs: state.batch.batchs,
  batchLearners: state.table.batchLearners,
  learners: state.learner.learners

})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AllLearnerTable);
