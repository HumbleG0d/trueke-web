import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Login | Trueke',
	description: 'Login de usuario'
}

interface ProductsLayoutProps {
	children: ReactNode
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
	return (
		<div>
			<Header />

			<main>{children}</main>
		</div>
	)
}
