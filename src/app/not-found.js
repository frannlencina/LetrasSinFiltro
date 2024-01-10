import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col justify-center items-center sm:flex-row sm:scale-125'>
        <div className='mr-2'>
          <Image className='' src="/error404.png" height={150} width={150} />
        </div>
        <div className='flex flex-col items-center text-center sm:items-start px-4 scale-90 sm:scale-100 justify-center font-black'>
          <h1 className='text-[#004AAD] text-5xl'>Ooops!</h1>
          <h2 className='text-[#004AAD] text-5xl sm:ml-2 mt-1'>error 404</h2>
          <h4 className='text-[#106BEB] opacity-70 text-3xl'>pagina no encontrada</h4>
          <Link className='inline-flex items-center px-4 py-2 rounded-lg text-white bg-[#004AAD] mt-4 gap-2 hover:scale-105 text-sm' href="/"><i class="ri-arrow-left-line"></i> Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}