import { GET_ALL_COURSES } from "../actions/types";

const initialState = {
  courses: [],
  selectedCourses: {
    coursesM: [],
    coursesT: [],
    coursesW: [],
    coursesR: [],
    coursesF: []
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: action.courses
      }
    case 'ADD_TO_CALENDAR':
      let newState = {...state}
      action.data.days.forEach(d => {
        switch(d){
          case 'M':
            newState.selectedCourses.coursesM = [...state.selectedCourses.coursesM, action.data]
            break
          case 'T':
            newState.selectedCourses.coursesT = [...state.selectedCourses.coursesT, action.data]
            break
          case 'W':
            newState.selectedCourses.coursesW = [...state.selectedCourses.coursesW, action.data]
            break
          case 'R':
            newState.selectedCourses.coursesR = [...state.selectedCourses.coursesR, action.data]
            break
          case 'F':
            newState.selectedCourses.coursesF = [...state.selectedCourses.coursesF, action.data]
            break
        }
      })
      return newState
    default:
      return state
  }
}