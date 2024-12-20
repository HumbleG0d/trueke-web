'use client'
import { useState, useEffect } from 'react'
import { useProducts } from './useProducts'

interface Filters {
	category?: string
	state?: string
	search?: string
}

export function useFilters() {
	const { products } = useProducts()
	const [filteredProducts, setFilteredProducts] = useState(products)

	const [filters, setFilters] = useState<Filters>({
		category: undefined,
		state: undefined,
		search: undefined
	})

	const updateFilter = (
		filterName: keyof Filters,
		value: string | number | undefined
	) => {
		console.log(filterName, value)
		setFilters((prev) => ({
			...prev,
			[filterName]: value
		}))
	}

	const resetFilters = () => {
		setFilters({
			category: undefined,
			state: undefined,
			search: undefined
		})
	}

	useEffect(() => {
		const filtered = products.filter((product) => {
			const matchesCategory =
				!filters.category || product.category === filters.category

			const matchesState = !filters.state || product.estado === filters.state

			const matchesSearch =
				!filters.search ||
				product.nombre.toLowerCase().includes(filters.search.toLowerCase())

			return matchesCategory && matchesSearch && matchesState
		})
		setFilteredProducts(filtered)
	}, [products, filters])

	return {
		updateFilter,
		filteredProducts,
		resetFilters
	}
}
