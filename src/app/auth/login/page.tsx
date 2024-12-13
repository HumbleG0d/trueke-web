// pages/login.tsx
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Resetear el error antes de la validación
		setError('')

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

		// Aquí puedes manejar la lógica de autenticación real
		console.log('Email:', email)
		console.log('Password:', password)

		// Limpiar el formulario después de la simulación de autenticación
		setEmail('')
		setPassword('')
	}

	return (
		<>
			<Head>
				<title>Iniciar Sesión</title>
				<meta
					name='description'
					content='Página de inicio de sesión'
				/>
			</Head>
			<div className='min-h-screen flex items-center justify-center bg-gray-100'>
				<div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
					<h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
						Iniciar Sesión
					</h2>
					{error && <div className='mb-4 text-red-500 text-sm'>{error}</div>}
					<form
						onSubmit={handleSubmit}
						className='space-y-4'
					>
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
						<button
							type='submit'
							className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
						>
							Entrar
						</button>
					</form>
					<p className='mt-4 text-center text-gray-600'>
						¿No tienes una cuenta?{' '}
						<Link
							className='text-blue-500 hover:underline'
							href='/auth/register'
						>
							Regístrate
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default Login
