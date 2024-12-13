import { ProductCard } from '@/types/types'
import { Product } from './Product'

interface DisplayProductsProps {
	products: ProductCard[]
}

export const Products = ({ products }: DisplayProductsProps) => {
	return (
		<>
			<div className=' text-[#064E3B] grid grid-cols-4 gap-4 justify-center items-center p-3'>
				{products.map((product: ProductCard) => {
					return (
						<Product
							key={product.id}
							{...product}
						/>
					)
				})}
			</div>
		</>
	)
}
