'use client'
import { FeatureCard } from '@/components/FeatureCard'
import { Header } from '@/components/Header'
export default function Home() {
	return (
		<>
			<Header />
			<div className='h-screen w-full bg-[#f5f5f5]'>
				<div className='flex flex-col items-center justify-center px-4 py-16'>
					<h1 className='text-4xl font-bold text-gray-800 mb-6'>
						Bienvenido a Trueke
					</h1>
					<p className='text-xl text-gray-600 text-center mb-8 max-w-2xl'>
						La plataforma donde puedes intercambiar objetos de forma segura y
						sencilla. Dale una segunda vida a tus pertenencias y encuentra
						tesoros únicos.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl'>
						<FeatureCard
							href='/products/create'
							title='Publica tus artículos'
							description='Sube fotos y describe los objetos que quieres intercambiar.'
						/>

						<FeatureCard
							href='/products'
							title='Encuentra lo que buscas'
							description='Explora una amplia variedad de artículos disponibles para
								intercambio.'
						/>

						<FeatureCard
							href='/trueques'
							title='Haz el intercambio'
							description='Contacta con otros usuarios y realiza trueques de forma segura.'
						/>
					</div>
				</div>
			</div>
		</>
	)
}
