import axiosInstance from './axiosInstance'

export const getReviews = (params = {}) => axiosInstance.get('/reviews/', { params })
// params: { page, per_page, agent }