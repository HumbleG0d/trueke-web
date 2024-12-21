'use client'
import { useState } from 'react'
import { useTrueques } from '@/hooks/useTrueques'
import { TruequeCard } from '@/components/TruequeCard'
import { FilterButtons } from '@/components/FilterButtons'
import { FiltroTipo } from '@/types/types'
// import useRequireAuth from '@/hooks/useRequiereAuth'

export default function MisTrueques() {
	// const isAuthenticated = useRequireAuth()

	const { trueques } = useTrueques()
	const [filtro, setFiltro] = useState<FiltroTipo>('todos')
	// if (!isAuthenticated) {
	// 	return null // O un indicador de carga
	// }
	const truequesFiltrados = trueques.filter((trueque) => {
		if (filtro === 'activos') return trueque.status === 'PENDIENTE'
		if (filtro === 'completados') return trueque.status === 'ACEPTADO'
		if (filtro === 'rechazados') return trueque.status === 'RECHAZADO'
		return true
	})

	// if (loading) return <div>Cargando...</div>

	return (
		<div className='container mx-auto p-4'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>Mis Trueques</h1>
				<FilterButtons
					filtroActual={filtro}
					onFiltroChange={setFiltro}
				/>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{truequesFiltrados.map((trueque) => (
					<TruequeCard
						key={trueque.id}
						trueque={trueque}
						onAccept={() => {
							/* Implement accept logic */
						}}
						onReject={() => {
							/* Implement reject logic */
						}}
					/>
				))}
			</div>
		</div>
	)
}
