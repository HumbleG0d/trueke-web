'use client'
import { useAuth } from '@/context/AuthContext'
import { useTrueques } from '@/hooks/useTrueques'
import { TruequeCard } from '@/components/TruequeCard'
import { useParams } from 'next/navigation'

export default function TruequePage() {
	const { id } = useParams()

	const { user } = useAuth()
	const { trueques, loading, handleAcceptTrade, handleRejectTrade } =
		useTrueques()

	const truequeId = trueques.find((trueque) => trueque.id === Number(id))

	if (loading) return <p>Cargando trueques...</p>
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Trueque</h1>
			<TruequeCard
				trueque={truequeId!}
				onAccept={handleAcceptTrade}
				onReject={handleRejectTrade}
				currentUserId={user?.id}
			/>
		</div>
	)
}
