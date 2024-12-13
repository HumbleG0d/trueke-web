'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { RegistraProducto } from './RegistrarProducto'
export const Header = () => {
	const [showModal, setShowModal] = useState(false)

	return (
		<div className='bg-[#064E3B]'>
			<div className='flex flex-row  justify-between items-center px-8 py-2'>
				<Link href='/'>
					<div className='flex flex-row items-center'>
						<Image
							src='/icons/Icon.svg'
							alt='Logo Truek-e'
							width={100}
							height={100}
						/>
						<strong className='text-2xl'>Truek-e</strong>
					</div>
				</Link>
				<div>
					<strong className='text-3xl text- italic'>
						Dale una segunda vida a lo que ya no usas!
					</strong>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<button
						className='bg-white rounded-lg p-2 border-1 border-black '
						onClick={() => setShowModal(true)}
					>
						<span className='text-xl text-black'>Publica tu oferta</span>
					</button>

					<Link href='/perfil/1'>
						<div>
							<Image
								className='object contain'
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
				<form className='p-2'>
					<ul className='grid grid-cols-4  w-full text-center px-10  text-black'>
						<li className=' py-2 border-2 bg-white border-black rounded-l-lg'>
							<input
								type='text'
								name='categoria'
								placeholder='Explora Productos'
								className='w-full bg-transparent outline-none text-center'
							/>
						</li>
						<li className=' py-2 border-2 bg-white border-black '>
							<input
								type='text'
								name='ofrecido'
								placeholder='Que ofreces'
								className='w-full bg-transparent outline-none text-center'
							/>
						</li>
						<li className=' py-2 border-2 bg-white border-black '>
							<input
								type='text'
								name='buscado'
								placeholder='Qué Buscas'
								className='w-full bg-transparent outline-none text-center'
							/>
						</li>
						<li className=' py-2 border-2 bg-white border-black rounded-r-lg'>
							<input
								type='text'
								name='ubicacion'
								placeholder='Ubicación'
								className='w-full bg-transparent outline-none text-center'
							/>
						</li>
					</ul>
				</form>
				<Image
					className='hover:scale-110 transition-transform duration-200 cursor-pointer'
					src='/icons/Search.svg'
					alt='Buscar'
					width={55}
					height={55}
				/>
			</div>
			{showModal && <RegistraProducto setShowModal={setShowModal} />}
		</div>
	)
}
