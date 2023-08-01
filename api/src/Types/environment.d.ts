declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// DEBUG: string
			NODE_ENV: 'development' | 'production'
			MONGO_URL: string
			SECRET: string
			STRIPE_TOKEN: string
			API_URL: string
			CLIENT_URL: string
			API_ENDPOINT_SECRET: string
		}
	}
}

export {}
