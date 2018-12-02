import { GET_ALL_COURSES } from './types'

export const getCourses = (courses) => {
  return {
    type: GET_ALL_COURSES,
    payload: courses
  }
}