import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { NewUser } from '@/types/types'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/

export const useRegisterUser = () => {
	const { login } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const registerUser = async (userData: NewUser) => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await axios.post('http://localhost:8081/api/register/user', userData)
			login(response.data)
			return response.data
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || 'Error al registrar usuario')
			} else {
				setError('Error al registrar usuario')
			}
			throw err
		} finally {
			setIsLoading(false)
		}
	}

	const validateForm = (userData: NewUser) => {
		const errors: Record<string, string> = {}

		if (!userData.username) errors.name = 'El nombre es requerido'
		if (!userData.email) errors.email = 'El email es requerido'
		else if (!emailRegex.test(userData.email)) errors.email = 'Email inválido'

		if (!userData.password) errors.password = 'La contraseña es requerida'
		else if (!passwordRegex.test(userData.password))
			errors.password =
				'La contraseña debe contener al menos una mayúscula y un número'

		if (!userData.confirmPassword)
			errors.confirmPassword = 'Debe confirmar la contraseña'
		if (!userData.location) errors.location = 'La ubicación es requerida'

		if (userData.password !== userData.confirmPassword) {
			errors.confirmPassword = 'Las contraseñas no coinciden'
		}

		return errors
	}

	return {
		registerUser,
		validateForm,
		isLoading,
		error
	}
}
