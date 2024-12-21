import { ProductData } from '@/types/types'
import { users } from '../mocks/users.json'
import Link from 'next/link'
import Image from 'next/image'

export default function ProfileData({
	idUsuario
}: {
	idUsuario: ProductData['idUser']
}) {
	const userData = users.find((user) => user.id === idUsuario)
	console.log(userData)
	return (
		<div className='h-full w-full space-y-4 '>
			<Link href={`/profile/${idUsuario}`}>
				<div className='flex justify-center'>
					<Image
						src='https://thispersondoesnotexist.com'
						alt={`Foto de perfil de ${userData?.name}`}
						width={300}
						height={300}
						className='rounded-lg shadow-lg'
					/>
				</div>
				<div className='p-4 '>
					<p className='text-black text-2xl'>{userData?.name}</p>
				</div>
				<div className='p-4 '>
					<p className='text-black'> {userData?.email}</p>
				</div>

				<div className='p-4 '>
					<p className='text-black'>{userData?.location}</p>
				</div>
			</Link>
		</div>
	)
}
