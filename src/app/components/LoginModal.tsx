import ReactDOM from 'react-dom';
import Image from 'next/image';
import { stylesNavFooter } from '@/app/utils/styles' 
import Link from 'next/link';
export default function LoginModal({ onClose }) {
    return ReactDOM.createPortal(
        <div className='fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-black bg-opacity-80 z-40'>
            
            <div className='flex flex-col min-w-96 max-w-lg justify-center items-center mx-auto px-6 py-4 bg-white rounded-2xl'>
            <div className='w-full flex justify-end'><button onClick={onClose} className='text-black text-xl font-bold text-red-700'><i className="ri-close-line"></i></button></div>
                <div className='flex flex-col sm:flex-row items-center justify-center '>
                    <Image src='/memoji-triste2.png' width={80} height={80} alt='' />
                    <h1 className='text-xl text-center  sm:text-2xl text-blue-400 font-bold sm:text-start ml-4 pointer-events-none select-none'>Para utilizar dichas funciones, tienes que estar logeado</h1></div>
                    <Link href='/login' className='text-white bg-blue-600 rounded-md mb-2 px-4 py-1 w-fit hover:scale-110 hover:skew-y-2 transition-all duration-200'>Login</Link>
                <hr className=' bg-black opacity-90 w-full mb-6 mt-2' />
                <div className='flex flex-col gap-2 justify-center items-center'>
                    
                    <span className='opacity-70 text-sm text-center sm:text-start'>No tienes cuenta? <Link href='/register' className={stylesNavFooter.callToAction + 'cursor-pointer'}>Registrate aqui</Link></span>
                </div>
            </div>
        </div>,
        document.body
    );
}