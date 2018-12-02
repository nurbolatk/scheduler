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
    default:
      return state
  }
}