'use client'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

interface Trade {
  id: number
  productoPropuesto: {
    id: number
    nombre: string
    descripcion: string
    imagen: string
    usuario: {
      id: number
      nombre: string
    }
  }
  productoSolicitado: {
    id: number
    nombre: string
    descripcion: string
    imagen: string
    usuario: {
      id: number
      nombre: string
    }
  }
  estado: 'pendiente' | 'aceptado' | 'rechazado'
}

export default function TruequePage() {
  const { user } = useAuth()
  const [trueques, setTrueques] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrueques = async () => {
      try {
        const response = await axios.get(`/api/trueques/${user?.id}`)
        setTrueques(response.data)
      } catch (error) {
        console.error('Error al cargar trueques:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchTrueques()
  }, [user])

  const handleAcceptTrade = async (tradeId: number) => {
    try {
      await axios.put(`/api/trueques/${tradeId}/accept`)
      // Actualizar lista de trueques
      setTrueques(prev => 
        prev.map(trade => 
          trade.id === tradeId 
            ? {...trade, estado: 'aceptado'} 
            : trade
        )
      )
    } catch (error) {
      console.error('Error al aceptar trueque:', error)
    }
  }

  const handleRejectTrade = async (tradeId: number) => {
    try {
      await axios.put(`/api/trueques/${tradeId}/reject`)
      setTrueques(prev => 
        prev.map(trade => 
          trade.id === tradeId 
            ? {...trade, estado: 'rechazado'} 
            : trade
        )
      )
    } catch (error) {
      console.error('Error al rechazar trueque:', error)
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mis Trueques</h1>
      <div className="grid gap-6">
        {trueques.map((trueque) => (
          <div key={trueque.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4">
              {/* Producto Propuesto */}
              <div className="border-r pr-4">
                <h2 className="text-xl font-semibold mb-2">Producto Propuesto</h2>
                <Image 
                  src={trueque.productoPropuesto.imagen} 
                  alt={trueque.productoPropuesto.nombre}
                  className="w-full h-48 object-cover rounded-md"
                />
                <p className="font-bold mt-2">{trueque.productoPropuesto.nombre}</p>
                <p className="text-gray-600">{trueque.productoPropuesto.descripcion}</p>
                <p className="text-sm mt-2">
                  Propuesto por: {trueque.productoPropuesto.usuario.nombre}
                </p>
              </div>

              {/* Producto Solicitado */}
              <div className="pl-4">
                <h2 className="text-xl font-semibold mb-2">Tu Producto</h2>
                <Image 
                  src={trueque.productoSolicitado.imagen} 
                  alt={trueque.productoSolicitado.nombre}
                  className="w-full h-48 object-cover rounded-md"
                />
                <p className="font-bold mt-2">{trueque.productoSolicitado.nombre}</p>
                <p className="text-gray-600">{trueque.productoSolicitado.descripcion}</p>
              </div>
            </div>

            {/* Botones de acción */}
            {trueque.estado === 'pendiente' && 
             trueque.productoSolicitado.usuario.id === user?.id && (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => handleRejectTrade(trueque.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleAcceptTrade(trueque.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Aceptar
                </button>
              </div>
            )}

            {/* Estado del trueque */}
            <div className={`mt-4 text-center p-2 rounded ${
              trueque.estado === 'aceptado' 
                ? 'bg-green-100 text-green-800'
                : trueque.estado === 'rechazado'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              Estado: {trueque.estado.charAt(0).toUpperCase() + trueque.estado.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}