import API from './api'
export const getReviews = () => API.get('/reviews')
export const submitReview = (data) => API.post('/reviews', data)