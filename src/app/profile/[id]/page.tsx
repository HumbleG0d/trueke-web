'use client'
import { User } from '@/types/types'
import { users } from '../../../mocks/users.json'
import { Profile } from '@/components/Profile'
import useRequireAuth from '@/hooks/useRequiereAuth'
interface ProfilePageProps {
	params: {
		id: string
	}
}

export default function ProfilePage({ params }: ProfilePageProps) {
	const isAuthenticated = useRequireAuth()

	if (!isAuthenticated) {
		return null // O un indicador de carga
	}
	const { id } = params
	const user = users.find((user: User) => user.id === parseInt(id))
	if (!user) return <div>User not found</div>
	return (
		<div className='min-h-screen w-full bg-gray-100 p-8 flex flex-col items-center text-black'>
			<div className='max-w-2xl w-full bg-white rounded-lg shadow-md p-6 border border-gray-200'>
				<Profile user={user} />
			</div>
		</div>
	)
}
