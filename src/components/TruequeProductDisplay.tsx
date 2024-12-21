import Image from "next/image"

interface ProductDisplayProps {
    producto: {
      imagen: string
      nombre: string
      descripcion: string
      usuario?: {
        nombre: string
      }
    }
    isSender?: boolean
  }
  
  export const ProductDisplay = ({ producto, isSender }: ProductDisplayProps) => {
    return (
      <div className='border-r pr-4'>
        <h2 className='text-xl font-semibold mb-2'>
          {isSender ? 'Producto Propuesto' : 'Tu Producto'}
        </h2>
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={400}
          height={300}
          className='w-full h-48 object-cover rounded-md'
        />
        <p className='font-bold mt-2'>{producto.nombre}</p>
        <p className='text-gray-600'>{producto.descripcion}</p>
        {isSender && producto.usuario && (
          <p className='text-sm mt-2'>
            Propuesto por: {producto.usuario.nombre}
          </p>
        )}
      </div>
    )
  }