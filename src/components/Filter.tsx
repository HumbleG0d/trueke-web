import Image from 'next/image'

interface Filters {
	category?: string
	state?: string
	search?: string
}

interface FilterProps {
	image: string

	title: string

	height: number

	updateFilter: (
		filterName: keyof Filters,
		value: string | number | undefined
	) => void
}

export const Filter = ({ updateFilter, image, title, height }: FilterProps) => {
	return (
		<div className=' hover:scale-110 flex flex-col items-center gap-2 w-[100px] rounded-lg  border-black shadow-lg p-4 hover:shadow-xl transition-shadow '>
			<button onClick={() => updateFilter('category', title)}>
				<Image
					className='object-contain'
					src={image}
					alt={title}
					width={height}
					height={height}
				/>
			</button>
		</div>
	)
}
