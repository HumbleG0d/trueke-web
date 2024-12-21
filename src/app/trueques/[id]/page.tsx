'use client'
import { useAuth } from '@/context/AuthContext'
import { useTrueques } from '@/hooks/useTrueques'
import { TruequeList } from '@/components/TruequeList'

export default function TruequePage() {
	const { user } = useAuth()
	const { trueques, loading, handleAcceptTrade, handleRejectTrade } =
		useTrueques()

	if (loading) return <p>Cargando trueques...</p>
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Mis Trueques</h1>
			<TruequeList
				trueques={trueques}
				onAccept={handleAcceptTrade}
				onReject={handleRejectTrade}
				currentUserId={user?.id}
			/>
		</div>
	)
}
