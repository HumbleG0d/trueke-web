import Link from 'next/link'

interface FeatureCardProps {
	title: string
	description: string
	href: string
}

export function FeatureCard({ title, description, href }: FeatureCardProps) {
	return (
		<Link href={href}>
			<div className='bg-white p-6 h-full rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 transition-all cursor-pointer'>
				<h3 className='text-lg font-semibold mb-3 text-gray-800'>{title}</h3>
				<p className='text-gray-600'>{description}</p>
			</div>
		</Link>
	)
}
