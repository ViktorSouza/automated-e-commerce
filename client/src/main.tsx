import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import MainHeader from './components/MainHeader'
import { CookiesProvider } from 'react-cookie'

//Contexts
import { UserProvider } from './contexts/UserContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CookiesProvider>
				<BrowserRouter>
					<UserProvider>
						<div className='bg-slate-950 min-h-screen min-w-screen'>
							<MainHeader />
							<App />
						</div>
					</UserProvider>
				</BrowserRouter>
				<ReactQueryDevtools />
			</CookiesProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
