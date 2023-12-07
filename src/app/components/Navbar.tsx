'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { stylesNavFooter } from "../utils/styles";
import NavbarMenu from "./NavbarMenu";
import Cookies from "js-cookie";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoged, setIsLoged] = useState(undefined);

    useEffect(() => {
        const user_data = Cookies.get('user_data');

        if (user_data) {
            setIsLoged(true);
            const userDataFromCookie = JSON.parse(user_data);
            setUserData(userDataFromCookie);
        } else {
            setIsLoged(false);
        }
    }, []);

    // Muestra la Navbar solo cuando isLoged es verdadero
    return isLoged === undefined ? null : (
        <div className="fixed z-40 top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto text-medium text-lg mt-6 font-semibold w-full py-4">
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
                            <p>{userData.username}</p>
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
                {showMenu && <NavbarMenu />}
            </div>
        </div>
    );
}
