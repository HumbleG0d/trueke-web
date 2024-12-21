import { ProductData } from '@/types/types'
import { Button } from './ui/Button'
import Link from 'next/link'
import Image from 'next/image'

export const Product = ({
	id,
	name,
	image,
	status,
	owner,
	starsCount
}: ProductData) => {
	return (
		<div className='flex flex-col text-[#064E3B] rounded-lg  border-black shadow-lg p-4 hover:shadow-xl hover:scale-105 hover:bg-gray-200 transition-shadow bg-gray-100 items-center'>
			<Link href={`/products/${id}`}>
				<div className='relative w-[220px] h-[270px]'>
					<Image
						className='rounded-lg object-cover'
						src={image}
						alt={name}
						fill
						sizes='(max-width: 320px) 100vw'
					/>
				</div>
				<div className='flex flex-col justify-center text-left'>
					<strong>{name}</strong>
					<span>Estado: {status}</span>
					<span>Usuario : {owner}</span>
				</div>
				<div className='flex flex-row'>
					{[...Array(5)].map((_, index) => (
						<Image
							key={index}
							src={
								index < starsCount
									? '/icons/Star-fill.svg'
									: '/icons/Star-blank.svg'
							}
							alt={`estrella ${index + 1}`}
							width={22}
							height={22}
						/>
					))}
				</div>
				<span>{starsCount} estrellas</span>
			</Link>
			<Button />
		</div>
	)
}
