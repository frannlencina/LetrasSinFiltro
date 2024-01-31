'use client'
import * as Popover from '@radix-ui/react-popover';
import Link from "next/link"
import { stylesNavFooter } from '../utils/styles'
import { stylesToolsGen } from '../utils/styles'
import { useState } from "react";
import Image from 'next/image';

interface UserData {
    username: boolean;
    // Add other properties as needed
}

export default function NabvarMenu({ userData, logged }: { userData: UserData }) {

    const [showMenu, setShowMenu] = useState(true);
    const [isLoged, setIsLoged] = useState(undefined);

    return (
        <div className="sm:hidden w-full h-screen fixed z-30 left-0 top-20 bg-black bg-opacity-80 flex justify-center items-center">
            {
                logged ?
                    <div>
                        <div className="relative z-20 bg-white w-full h-full opacity-100 p-4 flex flex-col justify-center items-center text-3xl gap-12 ">
                            <div>
                                <Link className={stylesNavFooter.common} href="/">LetrasSinFiltro</Link>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex sm:gap-5">
                                <button className='text-blue-600 hover:text-white hover:bg-blue-600 rounded-md px-2 transition-all duration-300'>{userData.username}</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="relative z-20 bg-white w-full h-full opacity-100 p-8 flex flex-col justify-center items-center text-3xl gap-12 rounded-2xl ">
                            <div>
                                <Link className={stylesNavFooter.common} href="/">LetrasSinFiltro</Link>
                            </div>
                            {logged ? 
                                <div className="flex gap-2 items-center">
                                    <Popover.Root >
                                        <Popover.Trigger asChild>
                                            <button className="IconButton text-blue-600 hover:text-white hover:bg-blue-600 rounded-md px-2 transition-all duration-300" aria-label="Update dimensions">
                                            <Image width={50} height={50} src="/navbar-avatar.png" alt=''/> {userData.username}
                                            </button>
                                        </Popover.Trigger>
                                        <Popover.Portal >
                                            <Popover.Content className="flex flex-col mt-6 gap-2 items-start bg-white py-2 px-4 rounded-lg" sideOffset={5}>
                                                <div className="text-center w-full">
                                                    <Link className={stylesToolsGen.shareButtons} href={`/p/` + userData.username}>Perfil</Link>
                                                </div>
                                                <div className="text-center w-full">
                                                    <button onClick={() => { setShowMenu(true) }} className="cursor-pointer hover:bg-red-200 text-red-500 w-[100%] transition-all py-1 px-2 rounded-lg flex items-center gap-2 active:ring-4 active:ring-red-300">Cerrar sesion</button>
                                                </div>
                                                <Popover.Arrow className="opacity-30" />
                                            </Popover.Content>
                                        </Popover.Portal>
                                    </Popover.Root>
                                </div>
                            
                            :
                                <div className="flex gap-2 items-center">
                                    <Link className={stylesNavFooter.callToAction} href="/register">
                                        Registrarse
                                    </Link>
                                    <Link className={stylesNavFooter.callToAction} href="/login">
                                        Entrar
                                    </Link>
                                </div>
                            }
                        </div>

                    </div>
            }
        </div>
    )
}