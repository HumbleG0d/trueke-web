'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRegisterUser } from '@/hooks/useRegisterUser'
import { NewUser } from '@/types/types'

const Register: React.FC = () => {
	const [formData, setFormData] = useState<NewUser>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		location: ''
	})
	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState<string>('')
	const { validateForm, registerUser } = useRegisterUser()

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setSuccess('')

		validateForm(formData)

		console.log('Datos del formulario:', formData)
		registerUser(formData)
		setSuccess('Registro exitoso. Puedes iniciar sesión ahora.')
		setFormData({
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			location: ''
		})
	}

	return (
		<>
			<Head>
				<title>Registrarse</title>
				<meta
					name='description'
					content='Página de registro de usuarios'
				/>
			</Head>
			<div className='min-h-screen flex items-center justify-center bg-gray-100'>
				<div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
					<h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
						Crear Cuenta
					</h2>
					{error && <div className='mb-4 text-red-500 text-sm'>{error}</div>}
					{success && (
						<div className='mb-4 text-green-500 text-sm'>{success}</div>
					)}
					<form
						onSubmit={handleSubmit}
						className='space-y-4'
					>
						{/* Campos existentes */}
						<div>
							<label
								htmlFor='name'
								className='block text-gray-700'
							>
								Nombre
							</label>
							<input
								type='text'
								id='name'
								name='name'
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={formData.username}
								onChange={handleChange}
								required
								placeholder='Tu nombre'
							/>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-gray-700'
							>
								Correo Electrónico
							</label>
							<input
								type='email'
								id='email'
								name='email'
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={formData.email}
								onChange={handleChange}
								required
								placeholder='ejemplo@correo.com'
							/>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block text-gray-700'
							>
								Contraseña
							</label>
							<input
								type='password'
								id='password'
								name='password'
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={formData.password}
								onChange={handleChange}
								required
								placeholder='********'
							/>
						</div>
						<div>
							<label
								htmlFor='confirmPassword'
								className='block text-gray-700'
							>
								Confirmar Contraseña
							</label>
							<input
								type='password'
								id='confirmPassword'
								name='confirmPassword'
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								placeholder='********'
							/>
						</div>
						{/* Nuevos campos */}
						<div>
							<label
								htmlFor='location'
								className='block text-gray-700'
							>
								Ubicación
							</label>
							<input
								type='text'
								id='location'
								name='location'
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={formData.location}
								onChange={handleChange}
								required
								placeholder='Tu ubicación'
							/>
						</div>

						<button
							type='submit'
							className='w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200'
						>
							Registrarse
						</button>
					</form>
					<p className='mt-4 text-center text-gray-600'>
						¿Ya tienes una cuenta?{' '}
						<Link
							className='text-blue-500 hover:underline'
							href='/auth/login'
						>
							Inicia Sesión
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default Register
