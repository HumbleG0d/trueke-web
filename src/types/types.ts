export type FilterProps = {
	index: number
	image: string
	title: string
	height: number
}

export type ProductData = {
	id: number
	idUser: number
	name: string
	image: string
	status: string
	description: string
	owner: string
	starsCount: number
	category: string
}

export type User = {
	id: number // ID único del usuario
	username: string // Nombre de usuario
	name: string // Nombre completo
	email: string // Correo electrónico
	bio: string // Breve descripción del usuario
	age: number // Edad del usuario
	location: string // Ubicación del usuario
	photo_url: string // URL de la foto de perfil
}

export type ProductProps = {
	product: ProductData
}

export type ProductRegister = {
	idUser: number
	name: string
	image: string
	status: string
	description?: string
	category: string
}

export type UserRegister = {
	name: string
	lastname: string
	age: number
	email: string
	password: string
	location: string
	bio?: string
}

export interface Trueque {
	id: number
	proposedProduct: ProductData
	requestedProduct: ProductData
	status: 'pending' | 'accepted' | 'rejected'
}

export type TruequeStatus = 'pending' | 'accepted' | 'rejected'

export type FiltroTipo = 'todos' | 'activos' | 'completados' | 'rechazados'

export interface TruequeCardProps extends TruequeActions {
	trueque: Trueque
	currentUserId?: number
}

export interface TruequeActions {
	onAccept: (id: number) => Promise<void> | void
	onReject: (id: number) => Promise<void> | void
}
