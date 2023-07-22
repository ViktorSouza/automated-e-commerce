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
import { CartProvider } from './contexts/CartContext'
import { ProductProvider } from './contexts/ProductContext'
import ToggleTheme from './components/ToggleTheme'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60,
		},
	},
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CookiesProvider>
				<BrowserRouter>
					<UserProvider>
						<ProductProvider>
							<CartProvider>
								<div className='min-h-screen bg-white min-w-screen dark:text-zinc-200 dark:bg-zinc-950 text-zinc-800 '>
									<MainHeader />
									<App />
								</div>
							</CartProvider>
						</ProductProvider>
					</UserProvider>
				</BrowserRouter>
			</CookiesProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>,
)
