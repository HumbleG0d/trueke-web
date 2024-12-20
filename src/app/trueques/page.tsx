'use client'
import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

interface Trueque {
  id: number
  productoPropuesto: {
    nombre: string
    imagen: string
  }
  productoSolicitado: {
    nombre: string
    imagen: string
  }
  estado: 'pendiente' | 'aceptado' | 'rechazado'
  fecha: string
}

export default function MisTrueques() {
  const { user } = useAuth()
  const [trueques, setTrueques] = useState<Trueque[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState<'todos' | 'activos' | 'completados'>('todos')

  useEffect(() => {
    const fetchTrueques = async () => {
      try {
        const response = await axios.get(`/api/trueques/user/${user?.id}`)
        setTrueques(response.data)
      } catch (error) {
        console.error('Error al cargar trueques:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchTrueques()
  }, [user])

  const truequesFiltrados = trueques.filter(trueque => {
    if (filtro === 'activos') return trueque.estado === 'pendiente'
    if (filtro === 'completados') return trueque.estado === 'aceptado'
    return true
  })

  if (loading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Trueques</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded ${filtro === 'todos' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFiltro('activos')}
            className={`px-4 py-2 rounded ${filtro === 'activos' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Activos
          </button>
          <button 
            onClick={() => setFiltro('completados')}
            className={`px-4 py-2 rounded ${filtro === 'completados' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Completados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {truequesFiltrados.map((trueque) => (
          <Link href={`/trueques/${trueque.id}`} key={trueque.id}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  trueque.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  trueque.estado === 'aceptado' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {trueque.estado.charAt(0).toUpperCase() + trueque.estado.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(trueque.fecha).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Image
                    src={trueque.productoPropuesto.imagen}
                    alt={trueque.productoPropuesto.nombre}
                    className="w-full h-24 object-cover rounded"
                  />
                  <p className="mt-2 text-sm font-medium truncate">
                    {trueque.productoPropuesto.nombre}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400">⇄</span>
                </div>
                <div className="flex-1">
                  <Image 
                    src={trueque.productoSolicitado.imagen}
                    alt={trueque.productoSolicitado.nombre}
                    className="w-full h-24 object-cover rounded"
                  />
                  <p className="mt-2 text-sm font-medium truncate">
                    {trueque.productoSolicitado.nombre}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}