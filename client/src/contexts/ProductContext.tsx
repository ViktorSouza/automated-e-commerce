import { QueryStatus, useQuery } from '@tanstack/react-query'
import {
	createContext,
	ReactNode,
	useState,
	Dispatch,
	SetStateAction,
	useMemo,
} from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { IProduct } from 'shared/Types/IProduct'
import { api } from '../services/api'
import { getProducts } from '../services/product'
const ProductContext = createContext<{
	product: {
		products: IProduct[]
		totalPages: number
		currentPage: number
	}
	currentPage: number
	productStatus: QueryStatus
	setCurrentPage: Dispatch<SetStateAction<number>>
	searchParams: URLSearchParams
	setSearchParams: Dispatch<SetStateAction<URLSearchParamsInit>>
	// totalPages: number
	// setTotalPages: Dispatch<SetStateAction<number>>
}>({
	product: {
		totalPages: 0,
		currentPage: 0,
		products: [],
	},
	currentPage: 1,
	setCurrentPage(current) {
		return 1
	},
	searchParams: {} as URLSearchParams,
	setSearchParams(current) {
		return
	},

	productStatus: 'loading',
	// totalPages: 0,
	// setTotalPages: () => {},
})
const defaultProduct = {
	totalResults: 0,
	totalPages: 0,
	currentPage: 0,
	products: [],
}
const ProductProvider = ({ children }: { children: ReactNode }) => {
	let [searchParams, setSearchParams] = useSearchParams()

	const [currentPage, setCurrentPage] = useState(
		Number(searchParams.get('page_number')) || 1,
	)
	const { data: product, status: productStatus } = useQuery<{
		products: IProduct[]
		totalPages: number
		currentPage: number
		totalResults: number
	}>(['products', Object.fromEntries(searchParams)], {
		keepPreviousData: true,
		placeholderData: defaultProduct,
		queryFn: () => {
			return getProducts(searchParams)
		},
		onSuccess(data) {},
		onError: () => {
			return { totalPages: 0, currentPage: 0, products: [] }
		},
	})
	// let totalPages = useMemo(()=>[product?.totalPages])
	const value = useMemo(
		() => ({
			searchParams,
			setSearchParams,
			product: productStatus === 'success' ? product : defaultProduct,
			currentPage,
			setCurrentPage,
			productStatus,
			// totalPages,
			// setTotalPages,
		}),
		[
			searchParams,
			setSearchParams,
			product,
			currentPage,
			setCurrentPage,
			productStatus,
			// totalPages,
			// setTotalPages,
		],
	)

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	)
}

export { ProductContext, ProductProvider }
