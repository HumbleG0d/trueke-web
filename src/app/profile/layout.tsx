import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Perfil | Trueke',
	description: 'Perfiles de usuario'
}

interface ProductsLayoutProps {
	children: ReactNode
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />

			<main className='flex-1'>{children}</main>
		</div>
	)
}
