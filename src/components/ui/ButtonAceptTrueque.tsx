import { useTrueques } from '@/hooks/useTrueques'
import { TruequeRequest } from '@/types/types'

export const Button = (idProducts: TruequeRequest) => {
	const { createTruequePendiente } = useTrueques()
	const handleTrade = () => {
		createTruequePendiente(idProducts)
	}
	return (
		<button
			onClick={handleTrade}
			className='bg-green-700 hover:bg-green-600 rounded-lg p-2 w-1/2'
		>
			Truek-e
		</button>
	)
}
