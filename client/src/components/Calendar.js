import React, { Component } from 'react'
import Place from './Place'
import { connect } from 'react-redux'
import { getCourses } from '../actions/courseActions'

class Calendar extends Component {
  state = {
    foundCourses: []
  }

  addCourse = () => {
    
  }
  handleChange = (e) => {
    
    let {courses} = this.props
    let foundCourses = courses.filter(course => {
      return course.title.toLowerCase().includes(e.target.value.toLowerCase()) || course.code.toLowerCase().includes(e.target.value.toLowerCase())
    })
    this.setState({
      foundCourses
    })
  }
  createList = () => {
    
    let list = []
    // Outer loop to create parent
    for (let i = 0; i < this.state.foundCourses; i++) {
      //Create the parent and add the children
      if(i === 3) break
      console.log(list)
      list.push(<button type="button" className="list-group-item list-group-item-action">{this.state.foundCourses[i]}</button>)
    }
    return list
  }
  render() {
    return (
      <div className="row ml-4 mr-4">
        <div className="col-sm-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Choose courses</h5>

              <div className="form-group">
                <label htmlFor="search_course">Search course</label>
                <input type="text" className="form-control" id="search_course" placeholder="Course title or code..." onChange={this.handleChange} />
              </div>
              
              <div className="list-group mb-4">
                {this.createList()}
              </div>

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
                <Place courses={this.props.courses}/>
                <Place />
                <Place />
                <Place />
                <Place />
              </div>
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


export default connect(mapStateToProps, null)(Calendar)