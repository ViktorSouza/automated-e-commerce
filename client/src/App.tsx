import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import MyAccount from './pages/MyAccount'

import MainPage from './pages/MainPage'
import ProductDetails from './pages/ProductDetails'
function App() {
	return (
		<div className='max-w-[1920px] w-[1280px] mx-auto flex flex-col'>
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
					element={<ProductDetails />}
					path='/product/:id'
				/>
			</Routes>
			{/* <Sign /> */}
		</div>
	)
}

export default App
