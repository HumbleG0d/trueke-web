import { FilterProps } from '@/types/types'
import Image from 'next/image'

export const Filter = ({ image, title, height }: FilterProps) => {
	return (
		<div className=' hover:scale-110 flex flex-col items-center gap-2 w-[100px] rounded-lg  border-black shadow-lg p-4 hover:shadow-xl transition-shadow '>
			<Image
				className='object-contain'
				src={image}
				alt={title}
				width={height}
				height={height}
			></Image>
		</div>
	)
}
