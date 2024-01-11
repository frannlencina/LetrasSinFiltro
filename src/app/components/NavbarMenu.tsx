'use client'
import Link from "next/link"
import { stylesNavFooter } from '../utils/styles'

interface UserData {
    username: boolean;
    // Add other properties as needed
}

export default function NabvarMenu({ userData, logged }: { userData: UserData }) {

    return (
        <div className="sm:hidden w-full h-screen fixed z-30 left-0 top-20 bg-black bg-opacity-80 flex justify-center items-center">
            {
                logged ?
                    <div>
                        <div className="relative z-20 bg-white w-full h-full opacity-100 p-4 flex flex-col justify-center items-center text-3xl gap-12 ">
                            <div>
                                <Link className={stylesNavFooter.common} href="#">LetrasSinFiltro</Link>
                            </div>
                            <div className=" flex flex-col gap-2 sm:flex sm:gap-5">
                                <p>{userData.username}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="relative z-20 bg-white w-full h-full opacity-100 p-4 flex flex-col justify-center items-center text-3xl gap-12 ">
                            <div>
                                <Link className={stylesNavFooter.common} href="#">LetrasSinFiltro</Link>
                            </div>
                            <div className=" flex flex-col gap-2 sm:flex sm:gap-5">
                                <Link className={stylesNavFooter.callToAction} href="#">Register</Link>
                                <Link className={stylesNavFooter.callToAction} href="#">Login</Link>
                            </div>
                        </div>
                        
                    </div>
            }
        </div>
    )
}