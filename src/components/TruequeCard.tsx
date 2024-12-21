import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TruequeCardProps } from '@/types/types'

export const TruequeCard = memo(
	({ trueque, onAccept, onReject, currentUserId }: TruequeCardProps) => {
		const handleAccept = (e: React.MouseEvent) => {
			e.preventDefault()
			onAccept(trueque.id)
		}

		const handleReject = (e: React.MouseEvent) => {
			e.preventDefault()
			onReject(trueque.id)
		}

		return (
			<Link href={`/trueques/${trueque.id}`}>
				<div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer'>
					<div className='flex justify-between items-center mb-4'>
						<span
							className={`px-2 py-1 rounded text-sm ${
								trueque.status === 'pending'
									? 'bg-yellow-100 text-yellow-800'
									: trueque.status === 'accepted'
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800'
							}`}
						>
							{trueque.status.charAt(0).toUpperCase() + trueque.status.slice(1)}
						</span>

						{trueque.status === 'pending' &&
							trueque.requestedProduct.idUser === currentUserId && (
								<div className='flex gap-2'>
									<button
										onClick={handleReject}
										className='px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600'
									>
										Rechazar
									</button>
									<button
										onClick={handleAccept}
										className='px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600'
									>
										Aceptar
									</button>
								</div>
							)}
					</div>

					<div className='flex space-x-4'>
						<div className='flex-1'>
							<Image
								src={trueque.requestedProduct.image}
								alt={trueque.requestedProduct.name}
								width={200}
								height={150}
								className='w-full h-24 object-cover rounded'
							/>
							<p className='mt-2 text-sm font-medium truncate'>
								{trueque.requestedProduct.name}
							</p>
							<p className='text-xs text-gray-500 truncate'>
								Propuesto por: {trueque.requestedProduct.owner}
							</p>
						</div>

						<div className='flex items-center'>
							<span className='text-gray-400'>⇄</span>
						</div>

						<div className='flex-1'>
							<Image
								src={trueque.requestedProduct.image}
								alt={trueque.requestedProduct.name}
								width={200}
								height={150}
								className='w-full h-24 object-cover rounded'
							/>
							<p className='mt-2 text-sm font-medium truncate'>
								{trueque.requestedProduct.name}
							</p>
						</div>
					</div>
				</div>
			</Link>
		)
	}
)

TruequeCard.displayName = 'TruequeCard'
