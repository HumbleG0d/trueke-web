import Link from 'next/link'

export const ButtonToHome = ({ text }: { text: string }) => {
	return (
		<Link
			href='/'
			className='w-full bg-red-600 text-white py-2 rounded hover:bg-red-800 text-center block'
		>
			{text}
		</Link>
	)
}
