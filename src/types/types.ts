export type FilterProps = {
	index: number
	image: string
	title: string
	height: number
}

export type ProductCard = {
	id: number
	idUsuario: number
	nombre: string
	image: string
	estado: string
	propietario: string
	numero_de_estrellas: number
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
}

export type ProductProps = {
	product: ProductCard
}

export type ProductRegister = {
	nombre: string
	image: string
	estado: string
	descripcion?: string
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
