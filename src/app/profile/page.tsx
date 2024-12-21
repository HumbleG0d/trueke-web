'use client'
import { Profile } from '@/components/Profile'
import { useAuth } from '@/context/AuthContext'
import useRequireAuth from '@/hooks/useRequiereAuth'

export default function ProfilePage() {
	const isAuthenticated = useRequireAuth()
	const { user } = useAuth()

	if (!isAuthenticated) {
		return null // O un indicador de carga
	}
	if (!user) return <div>User not found</div>
	return (
		<div className='min-h-screen w-full bg-gray-100 p-8 flex flex-col items-center text-black'>
			<div className='max-w-2xl w-full bg-white rounded-lg shadow-md p-6 border border-gray-200'>
				<Profile user={user} />
			</div>
		</div>
	)
}
