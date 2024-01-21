'use client'
import { useEffect, useState } from "react";
import * as Popover from '@radix-ui/react-popover';
import Link from "next/link";
import { stylesNavFooter } from "../utils/styles";
import NavbarMenu from "./NavbarMenu";
import Cookies from "js-cookie";
import { stylesToolsGen } from "../utils/styles";
import { LoggedProvider } from '../context/LoggedContext'
import { useLogged } from "@/app/context/LoggedContext";
import Badge from "./Badge";

export default function Navbar() {

    const [showMenu, setShowMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoged, setIsLoged] = useState(undefined);

    const { changeLogged, logged } = useLogged()

    useEffect(() => {
        const user_data = Cookies.get('user_data');

        if (user_data) {
            changeLogged(true) // Cambio el context global de Loggeo
            setIsLoged(true); // Cambio variable local de Loggeo

            const userDataFromCookie = JSON.parse(user_data);
            setUserData(userDataFromCookie);

        } else {
            setIsLoged(false);
        }
    }, []);

    const logout = () => {
        changeLogged(false)
        setUserData(null)
        Cookies.remove("user_data");
        window.location.reload();

    }

    const [ showModal, setShowModal ] = useState(false)

    // Muestra la Navbar solo cuando isLoged es verdadero
    return isLoged === undefined ? null : (
        <LoggedProvider>
            {
                showModal ?
                    <div className="bg-black bg-opacity-80 w-screen h-screen fixed z-50  top-0 left-0 flex justify-center items-center">
                        <div className="min-w-[400px] min-h-[200px] bg-stone-100 rounded-lg p-6 flex justify-between flex-col">
                            <span className="scale-115"><Badge text="Seguro que quieres cerrar sesion?" icon={true} /></span>
                            <p className="max-w-md mb-8 px-2 mt-4 font-medium opacity-70">Si cierras sesion tendras que volver iniciar sesion para utilizar las funcionalidades</p>
                            <div className="flex gap-4 justify-center">
                                <button onClick={() => { logout() }} className="bg-blue-500 text-white rounded-md px-2 py-1 text-md hover:scale-105 focus:ring-4 focus:ring-blue-200">Confirmar</button>
                                <button onClick={() => { setShowModal(false) }} className="bg-stone-500 text-white rounded-md px-2 py-1 text-md hover:scale-105 focus:ring-4 focus:ring-stone-200">Cancelar</button>
                            </div>
                        </div>
                    </div> : ''
            }
            <div className="fixed z-20 top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto text-medium text-lg mt-6 font-semibold w-full py-4">
                <div className="p-4 rounded-lg min-h-[70px] max-w-5xl mx-auto text-lg bg-white backdrop-blur-md bg-opacity-30 shadow-[1px_2px_20px_0px_rgba(0,0,0,0.03)]">
                    <button onClick={() => setShowMenu(!showMenu)} className="sm:hidden text-3xl opacity-50 transition-all">
                        <i className="ri-menu-line"></i>
                    </button>
                    <div className="hidden sm:flex items-center justify-between">
                        <div>
                            <Link className={stylesNavFooter.common} href="/">
                                LetrasSinFiltro
                            </Link>
                        </div>
                        {isLoged && (
                            <div className="flex gap-2 items-center">
                                <Popover.Root >
                                    <Popover.Trigger asChild>
                                        <button className="IconButton text-blue-600 hover:text-white hover:bg-blue-600 rounded-md px-2 transition-all duration-300" aria-label="Update dimensions">
                                            {userData.username}
                                        </button>
                                    </Popover.Trigger>
                                    <Popover.Portal >
                                        <Popover.Content className="flex flex-col mt-6 gap-2 items-start bg-white py-2 px-4 rounded-lg" sideOffset={5}>
                                            <div className="text-center w-full">
                                                <Link className={stylesToolsGen.shareButtons} href={`/p/` + userData.username}>Perfil</Link>
                                            </div>
                                            <div className="text-center w-full">
                                                <button onClick={ () => { setShowModal(true) } } className="cursor-pointer hover:bg-red-200 text-red-500 w-[100%] transition-all py-1 px-2 rounded-lg flex items-center gap-2 active:ring-4 active:ring-red-300">Cerrar sesion</button>
                                            </div>
                                            <Popover.Arrow className="opacity-30" />
                                        </Popover.Content>
                                    </Popover.Portal>
                                </Popover.Root>
                            </div>
                        )}
                        {!isLoged && (
                            <div className="flex gap-2 items-center">
                                <Link className={stylesNavFooter.callToAction} href="/register">
                                    Registrarse
                                </Link>
                                <Link className={stylesNavFooter.callToAction} href="/login">
                                    Entrar
                                </Link>
                            </div>
                        )}
                    </div>
                    {showMenu && <NavbarMenu userData={userData} logged={logged} />}
                </div>
            </div>
        </LoggedProvider>
    );
}
