import { Products } from '@/components/Products'
import { products } from '@/mocks/products.json'

export default function ProductsPage() {
	return (
		<div className='min-h-screen w-full bg-[#F5F5F5]'>
			<Products products={products} />
		</div>
	)
}
