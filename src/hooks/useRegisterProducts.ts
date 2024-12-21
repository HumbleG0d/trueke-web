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
			formData.append('userId', product.idUser.toString())
			formData.append('name', product.name || '')
			formData.append('description', product.description || '')
			formData.append('status', product.status || '')
			formData.append('categories', product.category || '')
			if (file) {
				formData.append('image', file)
			}

			const response = await axios.post(
				'http://localhost:8081/api/add/product',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
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
