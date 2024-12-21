import Link from 'next/link'

export const ButtonToHome = ({ text }: { text: string }) => {
	return (
		<Link
			href='/'
			className='w-full h-full bg-red-600 text-white py-2 rounded hover:bg-red-800 block items-center text-center'
		>
			<p className='rounded-lg p-2 items-center text-center'>{text}</p>
		</Link>
	)
}
