import { ProductRegister } from '@/types/types'
import { useState } from 'react'
import axios from 'axios'

export const useRegisterProducts = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const registerProduct = async (product: ProductRegister, file: File) => {
		setIsLoading(true)
		setError(null)

		try {
			const formData = new FormData()
			formData.append('userId', product.userId.toString())
			formData.append('nombre', product.nombre || '')
			formData.append('descripcion', product.descripcion || '')
			formData.append('estado', product.estado || '')
			formData.append('categoria', product.categoria || '')
			formData.append('image', product.image || '')
			if (file) {
				formData.append('image', file)
			}

			const response = await axios.post('/api/products', formData)
			setIsLoading(false)
			return response.data
		} catch (error) {
			setIsLoading(false)
			setError('Error al guardar el producto')
			console.error('Error al guardar el producto:', error)
			throw error
		}
	}

	return {
		registerProduct,
		isLoading,
		error
	}
}
