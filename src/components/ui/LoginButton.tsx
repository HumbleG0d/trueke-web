import Link from 'next/link'

export const LoginButton = () => {
	return (
		<Link
			href={'/auth/login'}
			className='w-full h-full py-2 rounded bg-blue-800 hover:bg-blue-600 text-white'
		>
			<p className=' rounded-lg p-2 items-center text-center '>
				Iniciar Sesión
			</p>
		</Link>
	)
}
