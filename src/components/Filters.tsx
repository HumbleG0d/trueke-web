import { FiltersData } from '@/constants/constants'
import { Filter } from './Filter'
import Image from 'next/image'
import { FC } from 'react'

export const Filters: FC = () => {
	return (
		<>
			<div className='h-1/4 text-black flex flex-row gap-8 justify-center items-center'>
				{FiltersData.map((filter) => (
					<Filter
						key={filter.index}
						{...filter}
					/>
				))}
				<Image
					className='hover:scale-110'
					src='/icons/Next.svg'
					alt='next category'
					width={60}
					height={60}
				/>
			</div>
		</>
	)
}
