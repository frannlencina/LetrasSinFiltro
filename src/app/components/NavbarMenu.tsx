'use client'
import Link from "next/link"
import { useState } from "react";
import Cookies from 'js-cookie';
import { useLogged } from '../context/LoggedContext';
import Badge from './Badge';

interface UserData {
    username: boolean;
}

interface Logged {
    isLogged: boolean;
}

interface Props {
    userData: UserData;
    logged: Logged;
    toggleMenu: () => void;
}

export default function NabvarMenu({ userData, logged, toggleMenu }: Props) {
    
    const { changeLogged } = useLogged()

    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        toggleMenu();
        changeLogged(false)
        Cookies.remove("user_data");
        window.location.reload();

    }

    return (
        <div className="sm:hidden w-full h-screen fixed z-30 left-0 top-20 bg-white bg-opacity-100 flex justify-center items-center">
            {
                logged ?
                    <div>
                        {
                            showModal ?
                                <div className="bg-black bg-opacity-80 w-screen h-screen fixed z-50  top-0 left-0 flex justify-center items-center">
                                    <div className="min-w-[400px] min-h-[200px] bg-stone-100 rounded-lg p-6 flex justify-between flex-col">
                                        <span className="scale-115"><Badge text="Seguro que quieres cerrar sesion?" icon={true} type="" /></span>
                                        <p className="max-w-md mb-8 px-2 mt-4 font-medium opacity-70">Si cierras sesion tendras que volver iniciar sesion para utilizar las funcionalidades</p>
                                        <div className="flex gap-4 justify-center">
                                            <button onClick={() => { logout() }} className="bg-blue-500 text-white rounded-md px-2 py-1 text-md hover:scale-105 focus:ring-4 focus:ring-blue-200">Confirmar</button>
                                            <button onClick={() => { setShowModal(false) }} className="bg-stone-500 text-white rounded-md px-2 py-1 text-md hover:scale-105 focus:ring-4 focus:ring-stone-200">Cancelar</button>
                                        </div>
                                    </div>
                                </div> : ''
                        }

                        <div className="flex flex-col gap-4 items-center justify-center">
                            <div className="text-center">
                                <button onClick={() => { logout() }} className="cursor-pointer hover:bg-red-500 hover:text-white text-2xl text-red-500 w-[100%] transition-all py-1 px-2 rounded-lg flex items-center gap-2 active:ring-4 active:ring-red-300">Cerrar sesion</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link onClick={ () =>  toggleMenu() } className='text-2xl text-blue-600 hover:text-blue-400' href="/login">
                                Entrar
                            </Link>
                            <Link onClick={ () => toggleMenu() } className='text-2xl text-blue-600 hover:text-blue-400' href="/register">
                                Registrarse
                            </Link>

                        </div>
                    </div>
            }
        </div>
    )
}