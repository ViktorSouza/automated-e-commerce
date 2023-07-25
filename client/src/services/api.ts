import axios from 'axios'

const BASE_URL = new URL('/api/v1', import.meta.env.VITE_API_URL)

export const api = axios.create({
	baseURL: BASE_URL.toString(),
	withCredentials: true,
})
