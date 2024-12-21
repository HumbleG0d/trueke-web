import { FiltroTipo } from '@/types/types'

interface FilterButtonsProps {
	filtroActual: FiltroTipo
	onFiltroChange: (filtro: FiltroTipo) => void
}

export const FilterButtons = ({
	filtroActual,
	onFiltroChange
}: FilterButtonsProps) => {
	const filtros: FiltroTipo[] = [
		'todos',
		'activos',
		'completados',
		'rechazados'
	]

	return (
		<div className='flex gap-2'>
			{filtros.map((filtro) => (
				<button
					key={filtro}
					onClick={() => onFiltroChange(filtro)}
					className={`px-4 py-2 rounded ${
						filtroActual === filtro ? 'bg-green-600 text-white' : 'bg-gray-200'
					}`}
				>
					{filtro.charAt(0).toUpperCase() + filtro.slice(1)}
				</button>
			))}
		</div>
	)
}
