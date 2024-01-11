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

    // Muestra la Navbar solo cuando isLoged es verdadero
    return isLoged === undefined ? null : (
        <LoggedProvider>
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
                                        <button className="IconButton text-blue-600" aria-label="Update dimensions">
                                            {userData.username}
                                        </button>
                                    </Popover.Trigger>
                                    <Popover.Portal >
                                        <Popover.Content className="flex divide-y flex-col mt-6 gap-2 items-start bg-white py-2 px-4 rounded-lg" sideOffset={5}>
                                            <div className="text-center w-full">
                                                <Link className={stylesToolsGen.shareButtons} href={`/Profile/`+userData.username}>Perfil</Link>
                                            </div>
                                            <Popover.Arrow className="opacity-30" />
                                        </Popover.Content>
                                    </Popover.Portal>
                                </Popover.Root>
                            </div>
                        )}
                        {!isLoged && (
                            <div className="flex gap-2 items-center">
                                <Link className={stylesNavFooter.callToAction} href="/Register">
                                    Registrarse
                                </Link>
                                <Link className={stylesNavFooter.callToAction} href="/Login">
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
