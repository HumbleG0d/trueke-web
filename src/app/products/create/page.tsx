'use client'
import { ProductRegister } from '@/types/types'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterProduct() {

	const [fileName, setFileName] = useState<string>('')

	const [product, setProduct] = useState<ProductRegister>({
		nombre: '',
		image: '',
		estado: '',
		descripcion: ''
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		//Logica para Guardar
		console.log(product)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFileName(e.target.files[0].name)
		}
	}
	return (
		<div className='flex flex-col  h-full w-full bg-gray-100  p-2 border border-gray-200 items-center'>
			<div className='p-6 w-full max-w-2xl rounded-lg shadow-xl bg-[#20a649]'>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 w-full'
				>
					<div>
						<label className='block text-white mb-1'>Imagen</label>
						<div className='relative'>
							<input
								type='file'
								className='hidden'
								onChange={handleFileChange}
								id='fileInput'
								name='image'
								accept='image/*'
								required
							/>
							<label
								htmlFor='fileInput'
								className='cursor-pointer flex items-center gap-2 w-full px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded transition-colors border border-gray-300'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
									/>
								</svg>
								{fileName || 'Seleccionar imagen'}
							</label>
						</div>
					</div>
					<div>
						<label
							htmlFor='nombre'
							className='block text-white mb-1'
						>
							Título
						</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							className='w-full border rounded p-2 text-black'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='estado'
							className='block text-white mb-1'
						>
							Estado
						</label>
						<select
							id='estado'
							name='estado'
							className='w-full border rounded p-2 bg-white text-black'
							required
						>
							<option value=''>Selecciona un estado</option>
							<option value='nuevo'>Nuevo</option>
							<option value='seminuevo'>Semi-nuevo</option>
							<option value='usado'>Usado</option>
						</select>
					</div>
					<div>
						<label
							htmlFor='descripcion'
							className='block text-white mb-1'
						>
							Descripción
						</label>
						<textarea
							id='descripcion'
							name='descripcion'
							className='w-full px-4 py-2 rounded border border-gray-300 text-black'
							rows={4}
							required
						/>
					</div>

					<div className='flex justify-end gap-2'>
						<Link
							href={`/products`}
							type='button'
							className='px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded'
						>
							Cancelar
						</Link>
						<button
							type='submit'
							className='w-full py-2 px-4 bg-white text-green-600 rounded hover:bg-gray-100 transition-colors'
						>
							Publicar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
