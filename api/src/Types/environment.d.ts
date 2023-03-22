declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// DEBUG: string
			NODE_ENV: 'development' | 'production'
			PORT?: string
			MONGO_URL: string
			SECRET:string
		}
	}
}

export {}
