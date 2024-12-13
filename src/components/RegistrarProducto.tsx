import { Dispatch, SetStateAction, useState } from 'react'

export const RegistraProducto = ({
	setShowModal
}: {
	setShowModal: Dispatch<SetStateAction<boolean>>
}) => {
	const [fileName, setFileName] = useState<string>('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		//Logica para Guardar
		setShowModal(false)
	}
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFileName(e.target.files[0].name)
		}
	}
	return (
		<div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20'>
			<div className='p-6 rounded-lg shadow-xl w-96 bg-[#178436]'>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div>
						<label className='block text-gray-700 mb-1'>Imagen</label>
						<div className='relative'>
							<input
								type='file'
								className='hidden'
								onChange={handleFileChange}
								id='fileInput'
								accept='image/*'
								required
							/>
							<label
								htmlFor='fileInput'
								className='cursor-pointer flex items-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors border border-gray-300'
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
						<label className='block text-gray-700 mb-1'>Título</label>
						<input
							type='text'
							className='w-full border rounded p-2'
							required
						/>
					</div>
					<div>
						<label className='block text-gray-700 mb-1'>Estado</label>
						<select
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
						<label className='block text-gray-700 mb-1'>Descripción</label>
						<textarea
							className='w-full border rounded p-2'
							rows={3}
							required
						/>
					</div>

					<div className='flex justify-end gap-2'>
						<button
							type='button'
							onClick={() => setShowModal(false)}
							className='px-4 py-2 bg-red-500 rounded text-black'
						>
							Cancelar
						</button>
						<button
							type='submit'
							className='px-4 py-2 bg-[#064E3B] text-white rounded'
						>
							Publicar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
