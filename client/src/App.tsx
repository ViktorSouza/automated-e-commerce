// import { Route, Routes } from 'react-router-dom'
import Login from './app/login/page'
import CreateAccount from './app/sign-up/page'
import MyAccount from './app/account/layout'

import MainPage from './app/page'
import ProductDetails from './app/products/[id]/page'
import toast from 'react-hot-toast'
import MainFooter from './components/MainFooter'
import Admin from './pages/Admin'
import { Toaster } from 'react-hot-toast'
function App() {
	return (
		<div className='max-w-[1920px] w-full xl:w-[1280px] px-5 xl:mx-auto flex flex-col'>
			<Toaster />
			<Routes>
				<Route
					element={<MainPage />}
					path='/'></Route>
				<Route
					element={<Login />}
					path='/login'
				/>
				<Route
					element={<CreateAccount />}
					path='/create-account'
				/>
				<Route
					element={<MyAccount />}
					path='/my-account/*'
				/>
				<Route
					element={<Admin />}
					path='/admin'
				/>
				<Route
					element={<ProductDetails />}
					path='/products/:id'
				/>
			</Routes>
			<MainFooter />
		</div>
	)
}

export default App
