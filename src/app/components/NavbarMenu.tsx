'use client'
import Link from "next/link"
import { stylesNavFooter } from '../utils/styles'

export default function NabvarMenu() {
    return (
        <div className="sm:hidden w-full h-screen fixed z-30 left-0 top-20 bg-black bg-opacity-80 flex justify-center items-center">
            <div className="relative z-20 bg-white w-full h-full opacity-100 p-4 flex flex-col justify-center items-center text-3xl gap-12 ">
                <div>
                    <Link className={stylesNavFooter.common} href="#">LetrasSinFiltro</Link>
                </div>
                <div className=" flex flex-col gap-2 sm:flex sm:gap-5">
                    <Link className={stylesNavFooter.common} href="#">Plantillas</Link>
                    <Link className={stylesNavFooter.common} href="#">Acerca de</Link>
                    <Link className={stylesNavFooter.common} href="#">Generador</Link>
                </div>
                <div className="relative group flex items-center">
                    <Link className={stylesNavFooter.callToAction} href="#">Empezar </Link>
                    <div className="font-bold text-lg text-blue-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                        <i className="ri-arrow-right-line"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}