import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { Trueque, TruequeRequest } from '@/types/types'

interface createdTrueque {
	message: string
	trade_id: number
	status_code: string
}
export const useTrueques = () => {
	const { user } = useAuth()
	const [trueques, setTrueques] = useState<Trueque[]>([])
	const [createdTrueque, setCreatedTrueque] = useState<createdTrueque | null>(
		null
	)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const createTruequePendiente = async (truequeData: TruequeRequest) => {
		setLoading(true)
		setError(null)

		try {
			const response = await axios.post(
				'http://localhost:8081/api/trades/request',
				truequeData,
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			setLoading(false)
			setCreatedTrueque(response.data)
		} catch (error) {
			setLoading(false)
			setError(new Error('Error al crear el trueque pendiente'))
			console.error('Error al crear el trueque:', error)
			throw error
		}
	}

	const fetchTrueques = useCallback(async () => {
		if (!user) return

		try {
			setLoading(true)
			const response = await axios.get(
				`http://localhost:8081/api/trades/pending`
			)
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
					trade.id === tradeId ? { ...trade, status: 'ACEPTADO' } : trade
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
					trade.id === tradeId ? { ...trade, status: 'RECHAZADO' } : trade
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
		createdTrueque,
		loading,
		error,
		createTruequePendiente,
		handleAcceptTrade,
		handleRejectTrade,
		refreshTrueques: fetchTrueques
	}
}
