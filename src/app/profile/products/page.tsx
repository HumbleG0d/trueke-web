'use client'
import { Products } from '@/components/Products'
import { useAuth } from '@/context/AuthContext'
import { useProducts } from '@/hooks/useProducts'

export default function ProductsPage() {
	const { findByUserId, loading } = useProducts()
	const { user } = useAuth()
    if(!user) return <div>Usuario no encontrado</div>
	const userProducts = findByUserId(user.id)
	return (
		<div className='min-h-screen w-full bg-[#F5F5F5]'>
			{loading ? (
				<div className='flex items-center justify-center min-h-[400px]'>
					<div className='text-center'>
						<p className='text-gray-700 mb-4'>Cargando productos...</p>
						<div className='animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto'></div>
					</div>
				</div>
			) : (
				<Products products={userProducts} />
			)}
		</div>
	)
}
