import { ProductData } from '@/types/types'
import { ButtonCreate } from './ui/ButtonCreate'
import Link from 'next/link'
import Image from 'next/image'

export const Product = ({ id, name, imageUrl, status, owner }: ProductData) => {
	return (
		<div className='flex flex-col text-[#064E3B] rounded-lg  border-black shadow-lg p-4 hover:shadow-xl hover:scale-105 hover:bg-gray-200 transition-shadow bg-gray-100 items-center'>
			<Link href={`/products/${id}`}>
				<div className='relative w-[220px] h-[270px]'>
					<Image
						className='rounded-lg object-cover'
						src={imageUrl}
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
			</Link>
			<ButtonCreate id={id} />
		</div>
	)
}
