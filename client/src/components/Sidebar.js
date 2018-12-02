import React, { Component } from 'react'
import {connect} from 'react-redux'

class Sidebar extends Component {
  state = {
    selectedCourse: null,
    selectedSection: null
  }
  handleChange = (e) => {
    this.props.handleChange(e)
  }
  handleSelectedClick = (e) => {
    let courseid = e.target.getAttribute('courseid')
    let sectiontype = e.target.getAttribute('sectiontype')
    console.log(e.target.parentNode.children)
    for(let i = 1; i<e.target.parentNode.children.length; i++){
      if(e.target.parentNode.children[i] == e.target){
        e.target.classList.toggle('active')
        if(e.target.classList.contains('active')){
          let selectedSection = this.state.selectedCourse.sections.find(section => {
            return section.type == sectiontype
          })
          this.setState({
            selectedSection
          })
        } else {
          this.setState({
            selectedSection: null
          })
        }
      } else {
        e.target.parentNode.children[i].classList.remove('active')
      }
    }
  }
  handleClick = (e) => {
    let course = this.props.foundCourses.find(course => {
      return course.title === e.target.textContent
    })
    if(course) {
      this.setState({
        selectedCourse: course
      })
    }
  }
  createFoundCourseList = () => {
    let list = []
    // Outer loop to create parent
    for (let i = 0; i < this.props.foundCourses.length; i++) {
      //Create the parent and add the children
      if(i === 3) break
      list.push(<button type="button" onClick={this.handleClick} className="condensed list-group-item list-group-item-action" key={this.props.foundCourses[i].id}>{this.props.foundCourses[i].title}</button>)
    }
    return list
  }
  createSelectedSectionsList = () => {
    let outerList = []
    // Outer loop to create parent
    let course = this.state.selectedCourse
    if(course){
      let list = [<li className="list-group-item list-group-item-secondary">{course.title}</li>]
      course.sections.forEach(section => {
        let days = ''
        section.days.forEach(day => {
          days += day + ' '
        })
        days = days.trim()
        let endMin = section.endTimeM
        let startMin = section.startTimeM
        if(section.endTimeM === 0) endMin = '00'
        if(section.startTimeM === 0) startMin = '00'
        let time =  section.startTimeH+':'+startMin+' - '+section.endTimeH+':'+endMin
        list.push(<button type="button" onClick={this.handleSelectedClick} className="condensed list-group-item list-group-item-action" courseid={course.id} sectiontype={section.type} key={section.type}>{`${days} - ${time}`}</button>)
      })
      outerList.push(<div className="list-group mb-4">
      {list}</div>)
    }
    return outerList
  }
  addCourse = (e) => {
    if(this.state.selectedSection) {
      let dummy ={
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
      let data = {
        id: this.state.selectedCourse.id,
        title: this.state.selectedCourse.title,
        code: this.state.selectedCourse.code,
        instructors: this.state.selectedSection.instructors,
        days: this.state.selectedSection.days,
        startTimeH: this.state.selectedSection.startTimeH,
        startTimeM: this.state.selectedSection.startTimeM,
        endTimeH: this.state.selectedSection.endTimeH,
        endTimeM: this.state.selectedSection.endTimeM,
        room: this.state.selectedSection.room,
        capacity: this.state.selectedSection.capacity,
        enrolled: this.state.selectedSection.enrolled,
      }
      console.log('selected', data)
      this.props.addCourseToCalendar(data)
      this.setState({
        selectedCourse: null,
        selectedSection: null
      })
    } else {
      alert('Select course!')
    }
  }
  render() {
    
    return (
      <div className="col-sm-3">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Choose courses</h5>

            <div className="form-group">
              <label htmlFor="search_course">Search course</label>
              <input type="text" className="form-control" id="search_course" placeholder="Course title or code..." onChange={this.handleChange} />
            </div>
            
            <div className="list-group mb-4">
              {this.createFoundCourseList()}
            </div>
              {this.createSelectedSectionsList()}

            <button onClick={this.addCourse} className="btn btn-primary">Add Course</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCourseToCalendar: (data) => dispatch({type: 'ADD_TO_CALENDAR', data})
  }
}

export default connect(null, mapDispatchToProps)(Sidebar)