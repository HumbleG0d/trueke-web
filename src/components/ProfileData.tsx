import { ProductData } from '@/types/types'
import { users } from '../mocks/users.json'

export default function ProfileData({
	idUsuario
}: {
	idUsuario: ProductData['idUser']
}) {
	const userData = users.find((user) => user.id === idUsuario)
	console.log(userData)
	return (
		<div className='h-full w-full space-y-4 '>
			<div className='p-4 '>
				<p className='text-black text-2xl'>{userData?.name}</p>
			</div>
			<div className='p-4 '>
				<p className='text-black'> {userData?.email}</p>
			</div>
			<div className='p-4 '>
				<p className='text-black'> {userData?.bio}</p>
			</div>
			<div className='p-4 '>
				<p className='text-black'> {userData?.age}</p>
			</div>
			<div className='p-4 '>
				<p className='text-black'>{userData?.location}</p>
			</div>
		</div>
	)
}
