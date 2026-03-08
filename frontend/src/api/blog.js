import axiosInstance from './axiosInstance'

export const getBlogPosts = () => axiosInstance.get('/blog/')
export const getBlogPost = (id) => axiosInstance.get(`/blog/${id}/`)