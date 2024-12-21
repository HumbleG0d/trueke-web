'use client'
import { User } from '@/types/types'
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode
} from 'react'

interface AuthContextType {
	isAuthenticated: boolean
	isLoading: boolean
	user: User | null
	login: (userData: User) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const checkAuth = () => {
			try {
				const storedUser = localStorage.getItem('user')
				if (storedUser) {
					const userData = JSON.parse(storedUser)
					setUser(userData)
					setIsAuthenticated(true)
				}
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e) {
				setIsAuthenticated(false)
				setUser(null)
			} finally {
				setIsLoading(false)
			}
		}
		checkAuth()
	}, [])

	const login = (userData: User) => {
		localStorage.setItem('user', JSON.stringify(userData))
		setUser(userData)
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem('user')
		setUser(null)
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, user, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
