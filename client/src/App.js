import React, { Component } from 'react';
import Navbar from './components/layout/Navbar'
import Calendar from './components/Calendar'
import { connect} from 'react-redux'


import './App.css';
import { GET_ALL_COURSES } from './actions/types';


class App extends Component {
  componentDidMount() {
    let coursesM = [
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
    this.props.getAllCourses(coursesM);
  }
  render() {
    console.log(this.props)
    return (

        <div className="App">
          <Navbar />
          <Calendar />
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourses: (courses) => dispatch({type: GET_ALL_COURSES, courses})
  }
}
export default connect(null, mapDispatchToProps)(App)
