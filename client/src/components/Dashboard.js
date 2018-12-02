import React, { Component } from 'react'
import Calendar from './Calendar'
import Sidebar from './Sidebar'
import { connect } from 'react-redux'

class Dashboard extends Component {
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
      foundCourses: foundCourses
    })
  }
  render() {
    
    return (
      <div className="row ml-4 mr-4">
        <Sidebar foundCourses={this.state.foundCourses} handleChange={this.handleChange}/>
        <Calendar />
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

export default connect(mapStateToProps)(Dashboard)