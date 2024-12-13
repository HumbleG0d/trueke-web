'use client'
import { User } from '@/types/types'
import { useState } from 'react'

export function Profile({ user }: { user: User | undefined }) {
	const [isEditing, setIsEditing] = useState(false)
	const [userData] = useState(user)

	const handleSave = () => {
		// Aquí iría la lógica para guardar en backend
		setIsEditing(false)
	}

	return (
		<>
			<div className='flex justify-between items-center mb-6 pb-2 border-b border-gray-200'>
				<h1 className='text-2xl font-bold mb-6 pb-2 border-b border-gray-200'>
					Perfil de {userData?.name}
				</h1>
				<button
					onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
					className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
				>
					{isEditing ? 'Guardar' : 'Editar'}
				</button>
			</div>
			<div className='space-y-4'>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black'>
						<strong className='text-gray-700'>Username:</strong>{' '}
						{userData?.username}
					</p>
				</div>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black'>
						<strong className='text-gray-700'>Email:</strong> {userData?.email}
					</p>
				</div>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black'>
						<strong className='text-gray-700'>Bio:</strong> {userData?.bio}
					</p>
				</div>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black'>
						<strong className='text-gray-700'>Edad:</strong> {userData?.age}
					</p>
				</div>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black'>
						<strong className='text-gray-700'>Ubicación:</strong>{' '}
						{userData?.location}
					</p>
				</div>
			</div>
		</>
	)
}
