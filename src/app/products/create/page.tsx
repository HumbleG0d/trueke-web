'use client'
import { ProductRegister } from '@/types/types'
import { useState } from 'react'
import { ButtonToHome } from '@/components/ui/ButtonToHome'
import Image from 'next/image'
import { useRegisterProducts } from '@/hooks/useRegisterProducts'
import { useAuth } from '@/context/AuthContext'

export default function RegisterProduct() {
	const { registerProduct } = useRegisterProducts()
	const [file, setFile] = useState<File | null>(null)
	const { user } = useAuth()
	const [product, setProduct] = useState<ProductRegister>({
		userId: user?.id ?? 0, // Provide default value when user id is undefined
		nombre: '',
		image: '',
		descripcion: '',
		estado: '',
		categoria: ''
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const validationErrors: { [key: string]: string } = {}
		if (!product.nombre) validationErrors.nombre = 'El nombre es requerido.'
		if (!product.descripcion)
			validationErrors.descripcion = 'La descripción es requerida.'

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}
		if (!file) {
			validationErrors.image = 'La imagen es requerida.'
			setErrors(validationErrors)
			return
		}

		registerProduct(product, file)
		// try {
		// 	const formData = new FormData()
		// 	formData.append('nombre', product.nombre || '')
		// 	formData.append('descripcion', product.descripcion || '')
		// 	formData.append('estado', product.estado || '')
		// 	formData.append('categoria', product.categoria || '')
		// 	if (fileName) {
		// 		formData.append('image', fileName)
		// 	}

		// 	const response = await axios.post('/api/products', formData)
		// 	console.log(response.data)
		// } catch (error) {
		// 	console.error('Error al guardar el producto:', error)
		// }
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFile(e.target.files[0])
			setProduct({ ...product, image: e.target.files[0].name })
		}
	}
	return (
		<>
			<div className='flex flex-col  bg-white p-4 rounded-sm '>
				<div className='flex w-full h-max flex-col flex-1 '>
					<form
						onSubmit={handleSubmit}
						className='space-y-4  bg-gray-200 rounded-xl p-4 grid grid-cols-2 grid-rows-3 gap-4'
					>
						<div className='col-span-1'>
							<label className='block text-black mb-2'>
								Nombre del Producto
							</label>
							<input
								type='text'
								value={product.nombre}
								onChange={(e) =>
									setProduct({ ...product, nombre: e.target.value })
								}
								className='w-full px-3 py-2 border rounded'
								placeholder='Ingrese el nombre'
							/>
							{errors.nombre && (
								<p className='text-red-500 text-sm'>{errors.nombre}</p>
							)}
						</div>

						<div className='row-span-3 col-span-1 items-center justify-center flex flex-col '>
							<label className='block text-black '>Imagen</label>
							<div className='flex flex-col h-full  rounded-md '>
								<input
									type='file'
									onChange={handleFileChange}
									className=' w-full py-2 border rounded '
									accept='image/*'
								/>
								{product.image && (
									<div className='flex-1 w-full'>
										<Image
											src={URL.createObjectURL(
												(
													document.querySelector(
														'input[type="file"]'
													) as HTMLInputElement
												)?.files?.[0] || new Blob()
											)}
											width={250}
											height={250}
											alt='Preview'
											className=' rounded mx-auto'
										/>
									</div>
								)}
							</div>
						</div>

						<div className='col-span-1'>
							<label className='block text-black mb-2'>Estado</label>
							<select
								value={product.estado}
								onChange={(e) =>
									setProduct({ ...product, estado: e.target.value })
								}
								className='w-full px-3 py-2 border rounded'
							>
								<option value=''>Seleccione el estado</option>
								<option value='nuevo'>Nuevo</option>
								<option value='seminuevo'>Seminuevo</option>
								<option value='usado'>Usado</option>
							</select>
							{errors.estado && (
								<p className='text-red-500 text-sm'>{errors.estado}</p>
							)}
						</div>
						<div className='col-span-1'>
							<label className='block text-black mb-2'>Categoria</label>
							<select
								value={product.categoria}
								onChange={(e) =>
									setProduct({ ...product, categoria: e.target.value })
								}
								className='w-full px-3 py-2 border rounded'
							>
								<option value=''>Seleccione la categoria</option>
								<option value='Electrodomesticos'>Electrodomesticos</option>
								<option value='Tecnologia'>Tecnologia</option>
								<option value='Juguetes'>Juguetes</option>
								<option value='Muebles'>Muebles</option>
								<option value='Ropa'>Ropa</option>
							</select>
							{errors.estado && (
								<p className='text-red-500 text-sm'>{errors.estado}</p>
							)}
						</div>
						<div>
							<label className='block text-black mb-2'>Descripción</label>
							<textarea
								value={product.descripcion}
								onChange={(e) => {
									e.target.style.height = 'auto'
									e.target.style.height = e.target.scrollHeight + 'px'
									setProduct({ ...product, descripcion: e.target.value })
								}}
								className='w-full px-3 py-2 border rounded resize-none min-h-[100px] overflow-hidden'
								placeholder='Ingrese la descripción'
							/>
							{errors.descripcion && (
								<p className='text-red-500 text-sm'>{errors.descripcion}</p>
							)}
						</div>
						<div className='flex flex-row gap-4 col-span-2'>
							<ButtonToHome text='Cancelar' />
							<button
								type='submit'
								disabled={!user}
								className={`w-full py-2 rounded ${
									!user
										? 'bg-gray-300 cursor-not-allowed text-gray-500'
										: 'bg-white text-green-600 hover:bg-gray-200'
								}`}
							>
								{!user ? 'Inicia sesión para registrar' : 'Registrar Producto'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
