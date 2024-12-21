'use client'
import { Profile } from '@/components/Profile'
import { useProfile } from '@/hooks/useUser'
import { useParams } from 'next/navigation'


export default function ProfilePage() {
	const { id } = useParams()
	const { profile, isLoading } = useProfile(Number(id))
	if (isLoading) {
		return <p>Loading...</p>
	}

	return (
		<div className='min-h-screen w-full bg-gray-100 p-8 flex flex-col items-center text-black'>
			<div className='max-w-2xl w-full bg-white rounded-lg shadow-md p-6 border border-gray-200'>
				{profile ? <Profile user={profile} /> : <p>User Not Found</p>}
			</div>
		</div>
	)
}
