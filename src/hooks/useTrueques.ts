import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { Trueque } from '@/types/types'

export const useTrueques = () => {
	const { user } = useAuth()
	const [trueques, setTrueques] = useState<Trueque[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const fetchTrueques = useCallback(async () => {
		if (!user) return

		try {
			setLoading(true)
			const response = await axios.get(`/api/trueques/${user.id}`)
			setTrueques(response.data)
		} catch (err) {
			const error =
				err instanceof Error ? err : new Error('Error al cargar trueques')
			setError(error)
		} finally {
			setLoading(false)
		}
	}, [user])

	const handleAcceptTrade = async (tradeId: number) => {
		try {
			await axios.put(`/api/trueques/${tradeId}/accept`)
			setTrueques((prev) =>
				prev.map((trade) =>
					trade.id === tradeId ? { ...trade, status: 'accepted' } : trade
				)
			)
		} catch (err) {
			const error =
				err instanceof Error ? err : new Error('Error al aceptar trueque')
			throw error
		}
	}

	const handleRejectTrade = async (tradeId: number) => {
		try {
			await axios.put(`/api/trueques/${tradeId}/reject`)
			setTrueques((prev) =>
				prev.map((trade) =>
					trade.id === tradeId ? { ...trade, status: 'rejected' } : trade
				)
			)
		} catch (err) {
			const error =
				err instanceof Error ? err : new Error('Error al rechazar trueque')
			throw error
		}
	}

	useEffect(() => {
		fetchTrueques()
	}, [fetchTrueques])

	return {
		trueques,
		loading,
		error,
		handleAcceptTrade,
		handleRejectTrade,
		refreshTrueques: fetchTrueques
	}
}
