import { FiltersData } from '@/constants/constants'
import { Filter } from './Filter'
import { FC } from 'react'

interface Filters {
	category?: string
	state?: string
	search?: string
}

interface FiltersProps {
	updateFilter: (
		filterName: keyof Filters,
		value: string | number | undefined
	) => void
	resetFilters: () => void
}

export const Filters: FC<FiltersProps> = ({ updateFilter, resetFilters }) => {
	return (
		<>
			<div className='h-1/4 text-black flex flex-row gap-8 justify-center items-center'>
				{FiltersData.map((filter) => (
					<Filter
						updateFilter={updateFilter}
						key={filter.index}
						{...filter}
					/>
				))}
				{/* <Image
					className='hover:scale-110'
					src='/icons/Next.svg'
					alt='next category'
					width={60}
					height={60}
				/> */}
				<button onClick={resetFilters} className=' hover:scale-110 flex flex-col items-center gap-2 w-[100px] rounded-lg  border-black shadow-lg p-4 hover:shadow-xl transition-shadow text-xl '>Reset</button>
			</div>
		</>
	)
}
