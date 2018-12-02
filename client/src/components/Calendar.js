import React, { Component } from 'react'
import Place from './Place'

class Calendar extends Component {
  state = {
    coursesM: [
      {
        id: 1,
        title: 'Operating Systems',
        code: 'CSCI 231',
        instructors: ['Mona Rizvi', 'Martin Lukac'],
        days: [1, 3, 5],
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
        days: [1, 3, 5],
        startTimeH: 12,
        startTimeM: 0,
        endTimeH: 13,
        endTimeM: 30,
        room: '7.422',
        capacity: 24,
        enrolled: 20
      }
    ]
  }
  addCourse = () => {
    
  }
  render() {
    return (
      // {/* <div className="container"> */}
        <div className="row ml-4 mr-4">
          <div className="col-sm-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Choose courses</h5>
                <button onClick={this.addCourse} className="btn btn-primary">Add Course</button>
              </div>
            </div>
          </div>
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
                  <Place  courses={this.state.coursesM}/>
                  <Place />
                  <Place />
                  <Place />
                  <Place />
                </div>
              </div>
            </div>
          </div>
        </div>
      // {/* </div> */}
    )
  }
}
export default Calendar