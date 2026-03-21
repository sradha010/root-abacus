import API from './api'
export const getContact = () => API.get('/contact')
export const submitEnquiry = (data) => API.post('/enquiry', data)