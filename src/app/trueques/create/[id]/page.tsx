'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTrueques } from '@/hooks/useTrueques'
import { useProducts } from '@/hooks/useProducts'
import { ProductData } from '@/types/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function CreateTruequePage() {
	const { id } = useParams()
	const router = useRouter()
	const { user } = useAuth()
	const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
	const [requestedProduct, setRequestedProduct] = useState<ProductData | null>(
		null
	)
	const [myProducts, setMyProducts] = useState<ProductData[]>([])
	const { createTruequePendiente, createdTrueque } = useTrueques()
	const { products } = useProducts()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadData = async () => {
			try {
				const product = products.find((product) => product.id === Number(id))
				const userProducts = products.filter(
					(product) => product.idUser === user?.id
				)
				setRequestedProduct(product || null)
				setMyProducts(userProducts)
			} catch (error) {
				console.error('Error cargando datos:', error)
			} finally {
				setIsLoading(false)
			}
		}
		loadData()
	}, [id, products, user])

	const handleCreateTrueque = async () => {
		if (!selectedProduct) return

		try {
			await createTruequePendiente({
				productOfferedId: selectedProduct,
				productRequestedId: Number(id)
			})
			router.push(`/trueques/${createdTrueque?.trade_id}`) // Redirige a la lista de trueques
		} catch (error) {
			console.error('Error creando trueque:', error)
		}
	}

	if (isLoading) {
		return <div className='text-center p-4'>Cargando...</div>
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Crear Nuevo Trueque</h1>

			{/* Producto Solicitado */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Producto que deseas:</h2>
				{requestedProduct && (
					<div className='border p-4 rounded'>
						<Image
							src={requestedProduct.imageUrl || '/placeholder.jpg'}
							alt={requestedProduct.name}
							width={200}
							height={200}
							className='rounded'
						/>
						<h3 className='font-bold mt-2'>{requestedProduct.name}</h3>
						<p>{requestedProduct.description}</p>
					</div>
				)}
			</div>

			{/* Selección de Producto para Ofrecer */}
			<div>
				<h2 className='text-xl font-semibold mb-4'>
					Selecciona un producto para ofrecer:
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{myProducts.map((product) => (
						<div
							key={product.id}
							className={`border p-4 rounded cursor-pointer ${
								selectedProduct === product.id ? 'border-blue-500' : ''
							}`}
							onClick={() => setSelectedProduct(product.id)}
						>
							<Image
								src={product.imageUrl || '/placeholder.jpg'}
								alt={product.name}
								width={200}
								height={200}
								className='rounded'
							/>
							<h3 className='font-bold mt-2'>{product.name}</h3>
							<p>{product.description}</p>
						</div>
					))}
				</div>
			</div>

			<button
				onClick={handleCreateTrueque}
				disabled={!selectedProduct}
				className={`mt-6 px-6 py-2 rounded ${
					selectedProduct
						? 'bg-blue-500 hover:bg-blue-600 text-white'
						: 'bg-gray-300 text-gray-500 cursor-not-allowed'
				}`}
			>
				Crear Trueque
			</button>
		</div>
	)
}
