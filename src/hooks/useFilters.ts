import { useState, useMemo } from 'react'
import { ProductCard } from '@/types/types'

interface Filters {
	category?: string
	search?: string
}

export function useFilters(products: ProductCard[]) {
	const [filters, setFilters] = useState<Filters>({
		category: undefined,
		search: undefined
	})

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesCategory =
				!filters.category || product.category === filters.category

			const matchesSearch =
				!filters.search ||
				product.nombre.toLowerCase().includes(filters.search.toLowerCase())

			return matchesCategory && matchesSearch
		})
	}, [products, filters])

	const updateFilter = (
		filterName: keyof Filters,
		value: string | number | undefined
	) => {
		setFilters((prev) => ({
			...prev,
			[filterName]: value
		}))
	}

	return {
		filters,
		filteredProducts,
		updateFilter
	}
}
