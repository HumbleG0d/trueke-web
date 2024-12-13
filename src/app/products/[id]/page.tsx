import { ProductCard } from '@/types/types'
import { products } from '../../../mocks/products.json'
import ProfileData from '@/components/ProfileData'
import ProductDisplay from '@/components/ProductDisplay'
interface ProductProps {
	params: {
		id: string
	}
}

export default function Product({ params }: ProductProps) {
	const { id } = params
	const product = products.find(
		(product: ProductCard) => product.id === parseInt(id)
	)
	return (
		<div className='flex flex-col  h-full w-full bg-gray-100  p-6 border border-gray-200'>
			<div className='min-h-screen w-full  bg-white  p-8 flex flex-col items-center text-black rounded-lg  shadow-md justify-between gap-10'>
				<div className='flex flex-row gap-4 w-full h-full'>
					<ProductDisplay product={product as ProductCard} />

					<ProfileData idUsuario={product?.idUsuario ?? 0} />
				</div>
				<div className='flex flex-row w-full h-full gap-4'>
					<button className='bg-green-700 hover:bg-green-600 rounded-lg p-2 w-1/2'>
						Truek-e
					</button>
					<button className='bg-blue-800 hover:bg-blue-600 rounded-lg p-2 items-center w-1/2'>
						Enviar Mensaje
					</button>
				</div>
			</div>
		</div>
	)
}
