import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Productos | Trueke',
	description: 'Sección de productos disponibles para intercambio'
}

interface ProductsLayoutProps {
	children: ReactNode
}
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})
export default function ProductsLayout({ children }: ProductsLayoutProps) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				{children}
			</body>
		</html>
	)
}
