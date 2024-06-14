import Favorites from "./Favorites";
import EmotionButtons from '../EmotionButtons'
import { useLogged } from "@/app/context/LoggedContext";
import Link from "next/link";
import Image from "next/image";
import { stylesNavFooter } from '../../utils/styles'
import { Suspense } from "react";

import dynamic from 'next/dynamic'
// const Generator = dynamic(() => import('./Generator'), { ssr: false })
import Generator from "./Generator";

export default function GenTab({ select }) {
    const { logged } = useLogged();

    return (
        <div className='max-w-6xl'>
            {select === 1 ? (
                <div className="flex flex-col justify-center items-center ">
                    <div className='pb-32'>
                        <Suspense fallback={<div>Cargando...</div>}>
                            <EmotionButtons />
                        </Suspense>
                    </div>
                    <div className="max-w-fit">
                        <Suspense fallback={<div>Cargando...</div>}>
                            <Generator />
                        </Suspense>
                    </div>
                </div>
            ) : (
                <div>
                    {logged ? (
                        <Favorites />
                    ) : (
                        <div className='flex justify-center items-center scale-110'>
                            <div className='flex flex-col min-w-96 max-w-lg justify-center items-center mx-auto px-6 py-4 rounded-2xl'>
                                <div className='flex flex-col sm:flex-row items-center justify-center'>
                                    <Image src='/memoji-triste2.png' width={80} height={80} alt='' />
                                    <h1 className='text-xl text-center sm:text-2xl text-blue-400 font-bold sm:text-start ml-4 pointer-events-none select-none'>Para utilizar esta función, tienes que estar logeado</h1>
                                </div>
                                <Link href='/login' className='text-white bg-blue-600 rounded-md mb-2 px-4 py-1 w-fit hover:scale-110 hover:skew-y-2 transition-all duration-200'>Login</Link>
                                <div className='flex flex-col gap-2 justify-center items-center mt-12'>
                                    <span className='opacity-70 text-sm text-center sm:text-start'>No tienes cuenta? <Link href='/register' className={stylesNavFooter.callToAction + ' cursor-pointer'}>Regístrate aquí</Link></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
