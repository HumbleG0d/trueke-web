import Image from 'next/image'

interface StarsProps {
	starsCount: number
}

export const Stars = ({starsCount}:StarsProps) => {
	return (
		<>
			<div className='flex flex-row'>
				{[...Array(5)].map((_, index) => (
					<Image
						key={index}
						src={
							index < starsCount
								? '/icons/Star-fill.svg'
								: '/icons/Star-blank.svg'
						}
						alt={`estrella ${index + 1}`}
						width={22}
						height={22}
					/>
				))}
			</div>
			<span>{starsCount} estrellas</span>
		</>
	)
}
