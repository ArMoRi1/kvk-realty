// src/api/categories.js
import axiosInstance from './axiosInstance'

export const getCategories = () => axiosInstance.get('/categories/')