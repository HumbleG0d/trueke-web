'use client'
import Image from 'next/image'
import Link from 'next/link'
export const Header = () => {
	return (
		<div className='bg-[#064E3B] w-full'>
			<div className='flex flex-row  justify-between items-center px-8 py-2'>
				<Link href='/'>
					<div className='flex flex-row items-center'>
						<Image
							src='/icons/Icon.svg'
							alt='Logo Truek-e'
							width={80}
							height={80}
						/>
						<strong className='text-2xl text-white'>Truek-e</strong>
					</div>
				</Link>
				<div>
					<strong className='text-3xl text- italic text-white'>
						Dale una segunda vida a lo que ya no usas!
					</strong>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<Link href='/profile/'>
						<div>
							<Image
								className='object contain '
								src='/icons/Perfil.svg'
								alt='imagen de perfil'
								width={60}
								height={60}
							/>
						</div>
					</Link>
				</div>
			</div>
			<div className='flex flex-row justify-center items-center gap-2 p-2'>
				<div className='grid grid-cols-3  w-full text-center px-10  text-black items-center'>
					<a
						href={'/products'}
						className=' py-2 border-2 bg-white border-black rounded-l-lg'
					>
						Productos
					</a>
					<a
						href={'/products/create'}
						className=' py-2 border-2 bg-white border-black '
					>
						Publica oferta
					</a>
					<a href='/trueques' className=' py-2 border-2 bg-white border-black rounded-r-lg'>
						Truekes
					</a>
				</div>
			</div>
		</div>
	)
}
