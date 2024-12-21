'use client'
import React from 'react'
import { User } from '@/types/types'
import Image from 'next/image'

export function Profile({ user }: { user: User }) {
	return (
		<>
			<div className='flex justify-center items-center mb-6 pb-2 border-b border-gray-200 w-full'>
				<h1 className='text-2xl font-bold border-gray-200 text-green-600'>
					{user?.name}
				</h1>
			</div>
			<div className='space-y-4'>
				<div className='flex justify-center'>
					<Image
						src='https://thispersondoesnotexist.com'
						alt={`Foto de perfil de ${user.name}`}
						width={300}
						height={300}
						className='rounded-lg shadow-lg'
					/>
				</div>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black '>
						<strong className='text-green-600'>Username:</strong>{' '}
						{user?.username}
					</p>
				</div>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black'>
						<strong className='text-green-600'>Email:</strong> {user?.email}
					</p>
				</div>
				<div className='p-4 rounded-md border border-gray-200 hover:bg-gray-50'>
					<p className='text-black'>
						<strong className='text-green-600'>Ubicación:</strong>{' '}
						{user?.location}
					</p>
				</div>
			</div>	
		</>
	)
}
