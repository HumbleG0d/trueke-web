import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { User } from '@/types/types'

interface LoginCredentials {
	email: string
	password: string
}

export const useLogin = () => {
	const { login } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleLogin = async (credentials: LoginCredentials) => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await axios.post<User>(
				'http://localhost:8081/api/login/user',
				credentials
			)
			login(response.data)
			return response.data
		} catch (err) {
			setError('Error al iniciar sesión. Verifica tus credenciales.')
			throw err
		} finally {
			setIsLoading(false)
		}
	}

	return {
		handleLogin,
		isLoading,
		error
	}
}

// Uso en componente:
/*
const LoginForm = () => {
  const { handleLogin, isLoading, error } = useLogin()
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const credentials = {
      email: emailValue,
      password: passwordValue
    }
    
    try {
      await handleLogin(credentials)
    } catch (error) {
      console.error(error)
    }
  }
}
*/
