// hooks/useRequireAuth.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const useRequireAuth = () => {
	const { isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/auth/login')
		}
	}, [isAuthenticated, router])

	return isAuthenticated
}

export default useRequireAuth
