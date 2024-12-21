import { Trueque } from '@/types/types'
import { TruequeCard } from './TruequeCard'

interface TruequeListProps {
	trueques: Trueque[]
	onAccept: (id: number) => void
	onReject: (id: number) => void
	currentUserId?: number
}

export const TruequeList = ({
	trueques,
	onAccept,
	onReject,
	currentUserId
}: TruequeListProps) => {
	return (
		<div className='grid gap-6'>
			{trueques.map((trueque) => (
				<TruequeCard
					key={trueque.id}
					trueque={trueque}
					onAccept={onAccept}
					onReject={onReject}
					currentUserId={currentUserId}
				/>
			))}
		</div>
	)
}
