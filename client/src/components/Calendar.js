import React, { Component } from 'react'
import Place from './Place'
import { connect } from 'react-redux'

class Calendar extends Component {
  render() {
    let coursesM = [
      {
        id: 1,
        title: 'Operating Systems',
        code: 'CSCI 231',
        instructors: ['Mona Rizvi', 'Martin Lukac'],
        days: ['M', 'W', 'F'],
        startTimeH: 13,
        startTimeM: 45,
        endTimeH: 15,
        endTimeM: 0,
        room: '7.422',
        capacity: 24,
        enrolled: 20
      },
      {
        id: 2,
        title: 'Advanced rhetorics, history, antropology and sociology',
        code: 'RHAS 999',
        instructors: ['Mona Rizvi', 'Martin Lukac'],
        days: ['M', 'W', 'F'],
        startTimeH: 12,
        startTimeM: 0,
        endTimeH: 13,
        endTimeM: 30,
        room: '7.422',
        capacity: 24,
        enrolled: 20
      }
    ]
    return (
        <div className="col-sm-9">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="ml-3 mr-2 bg-test1">Time</div>
                <div className="col bg-test1">Mon</div>
                <div className="col bg-test1">Wed</div>
                <div className="col bg-test1">Tue</div>
                <div className="col bg-test1">Thu</div>
                <div className="col bg-test1">Fri</div>
              </div>
              <div className="row mt-2">
                <Place time={true}/>
                <Place courses={this.props.coursesM}/>
                <Place courses={this.props.coursesT}/>
                <Place courses={this.props.coursesW}/>
                <Place courses={this.props.coursesR}/>
                <Place courses={this.props.coursesF}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    courses: state.course.courses,
    coursesM: state.course.selectedCourses.coursesM,
    coursesT: state.course.selectedCourses.coursesT,
    coursesW: state.course.selectedCourses.coursesW,
    coursesR: state.course.selectedCourses.coursesR,
    coursesF: state.course.selectedCourses.coursesF
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourses: (courses) => dispatch({type: 'GET_ALL_COURSES', courses})
  }
}


export default connect(mapStateToProps, null)(Calendar)