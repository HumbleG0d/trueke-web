'use client'
import ProfileData from '@/components/ProfileData'
import ProductDisplay from '@/components/ProductDisplay'
import { ButtonCreate } from '@/components/ui/ButtonCreate'
import { useProducts } from '@/hooks/useProducts'
import { useParams } from 'next/navigation'

export default function Product() {
	const { id } = useParams()
	const { findProduct } = useProducts()
	const productData = findProduct(Number(id))
	if (!productData) return <div>Cargando...</div>
	return (
		<div className='flex flex-col  h-full w-full bg-gray-100  p-6 border border-gray-200'>
			<div className='min-h-screen w-full  bg-white  p-8 flex flex-col items-center text-black rounded-lg  shadow-md justify-between gap-10'>
				<div className='flex flex-row gap-4 w-full h-full'>
					<ProductDisplay {...productData!} />

					<ProfileData idUsuario={productData.idUser} />
				</div>
				<div className='flex flex-row w-full h-full gap-4'>
					<ButtonCreate id={Number(id)} />
					<a
						href={'/products'}
						className='bg-blue-800 hover:bg-blue-600 rounded-lg p-2 items-center text-center w-1/2'
					>
						Atras
					</a>
				</div>
			</div>
		</div>
	)
}
