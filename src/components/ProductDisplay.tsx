import { ProductData } from '@/types/types'
import Image from 'next/image'

export default function ProductDisplay({
	imageUrl,
	name,
	id,
	status
}: ProductData) {
	return (
		<div className='w-full h-full flex flex-col justify-normal space-y-6'>
			<div className='relative w-[220px] h-[270px] p-4'>
				<Image
					className='rounded-lg object-cover'
					src={imageUrl}
					alt={`${name} con id : ${id} `}
					fill
					sizes='(max-width: 420px) 100vw'
				/>
			</div>
			<div className='flex flex-col justify-center text-left gap-4'>
				<strong>{name}</strong>
				<span>Estado: {status}</span>
				<span>Usuario : {status}</span>
			</div>
		</div>
	)
}
