import Link from 'next/link'

interface ButtonProps {
	id: number
}

export const ButtonCreate = ({ id }: ButtonProps) => {
	return (
		<Link
			href={`/trueques/create/${id}`}
			className='bg-green-700 hover:bg-green-600 rounded-lg p-2 w-1/2'
		>
			Truek-e
		</Link>
	)
}
