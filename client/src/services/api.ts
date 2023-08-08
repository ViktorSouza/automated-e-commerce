import axios from 'axios'

import { serialize } from 'cookie'
const BASE_URL = new URL('/api/v1', process.env.NEXT_PUBLIC_API_URL)
axios.defaults.withCredentials = true

const api = axios.create({
	baseURL: BASE_URL.toString(),
	withCredentials: true,
})

export { api }
