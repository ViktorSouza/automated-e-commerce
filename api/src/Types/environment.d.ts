declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// DEBUG: string
			NODE_ENV: 'development' | 'production'
			API_URL: string
			PORT?: string
			MONGO_URL: string
			SECRET: string
			STRIPE_TOKEN: string
		}
	}
}

export {}
