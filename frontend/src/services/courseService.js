import API from './api'
export const getCourses = (type) => API.get(`/courses${type ? `?type=${type}` : ''}`)
export const getCourse = (id) => API.get(`/courses/${id}`)