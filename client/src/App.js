import React, { Component } from 'react';
import Navbar from './components/layout/Navbar'
import Dashboard from './components/Dashboard'
import { connect} from 'react-redux'


import './App.css';
import { GET_ALL_COURSES } from './actions/types';


class App extends Component {
  componentDidMount() {
    let courses = [
      {
        id: 1,
        title: 'Operating Systems',
        code: 'CSCI 231',
        credits: 4,
        sections: [
          {
            type: '1l',
            days: ['M', 'W', 'F'],
            startTimeH: 13,
            startTimeM: 45,
            endTimeH: 15,
            endTimeM: 0,
            instructors: ['Mona Rizvi', 'Martin Lukac'],
            room: '7.422',
            capacity: 24,
            enrolled: 20
          },
          {
            type: '2l',
            days: ['T', 'R'],
            startTimeH: 10,
            startTimeM: 30,
            endTimeH: 11,
            endTimeM: 45,
            instructors: ['Mona Rizvi', 'Martin Lukac'],
            room: '7.422',
            capacity: 24,
            enrolled: 20
          }
        ]
      },
      {
        id: 2,
        title: 'Advanced rhetorics, history, antropology and sociology',
        code: 'RHAS 999',
        credits: 4,
        sections: [
          {
            type: '1S',
            days: ['M', 'W', 'F'],
            startTimeH: 12,
            startTimeM: 0,
            endTimeH: 13,
            endTimeM: 30,
            instructors: ['Mona Rizvi', 'Martin Lukac'],
            room: '7.422',
            capacity: 24,
            enrolled: 20
          },
          {
            type: '2S',
            days: ['T', 'R'],
            startTimeH: 14,
            startTimeM: 0,
            endTimeH: 14,
            endTimeM: 50,
            instructors: ['Mona Rizvi', 'Martin Lukac'],
            room: '7.422',
            capacity: 24,
            enrolled: 20
          }
        ]
      },
      {
        id: 3,
        title: 'Bitcoin mining',
        code: 'SGMG 407',
        credits: 4,
        sections: [
          {
            type: '1S',
            days: ['M', 'W', 'F'],
            startTimeH: 19,
            startTimeM: 0,
            endTimeH: 19,
            endTimeM: 50,
            instructors: ['Baha'],
            room: 'Block 24',
            capacity: 24,
            enrolled: 20
          },
          {
            type: '2S',
            days: ['T', 'R'],
            startTimeH: 19,
            startTimeM: 0,
            endTimeH: 19,
            endTimeM: 50,
            instructors: ['Baha'],
            room: '7.422',
            capacity: 24,
            enrolled: 20
          }
        ]
      }
    ]
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
    this.props.getAllCourses(courses);
  }
  render() {
    console.log(this.props)
    return (

        <div className="App">
          <Navbar />
          <Dashboard />
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
