import { Filters } from '@/components/Filters'
import { Products } from '@/components/Products'
import { products } from '@/mocks/products.json'

export default function ProductsPage() {
	return (
		<div className='min-h-screen w-full bg-[#F5F5F5]'>
			<Filters />
			<Products products={products} />
		</div>
	)
}
