// pages/register.tsx
'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/

const Register: React.FC = () => {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState<string>('')

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Resetear los mensajes antes de la validación
		setError('')
		setSuccess('')

		// Validar el nombre
		if (name.trim().length < 2) {
			setError('El nombre debe tener al menos 2 caracteres.')
			return
		}

		// Validar el correo electrónico
		if (!emailRegex.test(email)) {
			setError('Por favor, introduce un correo electrónico válido.')
			return
		}

		// Validar la contraseña
		if (!passwordRegex.test(password)) {
			setError(
				'La contraseña debe contener al menos una letra mayúscula y un número.'
			)
			return
		}

		// Validar que las contraseñas coincidan
		if (password !== confirmPassword) {
			setError('Las contraseñas no coinciden.')
			return
		}

		// Aquí puedes manejar la lógica de registro real
		console.log('Nombre:', name)
		console.log('Email:', email)
		console.log('Password:', password)

		// Simulación de registro exitoso
		setSuccess('Registro exitoso. Puedes iniciar sesión ahora.')

		// Limpiar el formulario después de la simulación de registro
		setName('')
		setEmail('')
		setPassword('')
		setConfirmPassword('')
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
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={name}
								onChange={handleNameChange}
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
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={email}
								onChange={handleEmailChange}
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
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={password}
								onChange={handlePasswordChange}
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
								className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
								required
								placeholder='********'
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
