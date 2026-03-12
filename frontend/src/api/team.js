import axiosInstance from './axiosInstance'

export const getTeam = () => axiosInstance.get('/team/')