import axiosInstance from './axiosInstance'

export const getProperties = () => axiosInstance.get('/properties/')