import { useState, useEffect } from 'react'
import { users } from '@/mocks/users.json'
import { User } from '@/types/types'

interface UseProfileResult {
	profile: User | null
	isLoading: boolean
	error: string | null
}

export function useProfile(userId: number): UseProfileResult {
	const [profile, setProfile] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const user = users.find((user: User) => user.id === userId)

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const response = await fetch(`/api/users/${userId}`)
				if (!response.ok) {
					throw new Error('Error al obtener el perfil')
				}

				const data = await response.json()
				setProfile(data)
			} catch (err) {
				setProfile(user || null)
				setError(err instanceof Error ? err.message : 'Error desconocido')
			} finally {
				setIsLoading(false)
			}
		}

		if (userId) {
			fetchProfile()
		}
	}, [userId, user])

	return { profile, isLoading, error }
}
