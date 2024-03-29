'use client'
import Link from "next/link"
import { stylesNavFooter } from "../utils/styles"
import CardSocial from "./CardSocial"
import Image from "next/image";

export default function Footer() {
    const socials = {
        instagram: {
            name: "Instagram",
            logoSrc: "/instagram-logo.png",
            desc: "For announcements, updates and exclusive information.",
            link: "https://www.instagram.com/letrassinnfiltro/"
        },
        twitter: {
            name: "Twitter/X",
            logoSrc: "/x-logo.png",
            desc: "For announcements, tips and general information.",
            link: "https://twitter.com/letrass1nfiltro"
        },
        cafecito: {
            name: "Cafecito",
            logoSrc: "/cafecito-logo.jpg",
            desc: "To help keep this beautiful project going",
            link: "https://cafecito.app/letrassinfiltro"
        },
    };
    return (
        <footer className="w-full flex flex-col items-center justify-center font-medium text-lg pb-12 mt-48">
            <div className="text-center">
                <h4 className="text-stone-800 text-4xl sm:text-5xl font-black mb-2">Comunidad</h4>
                <p className="font-medium text-stone-400">Expresa tus pensamientos con un toque de misterio.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 my-24">
                {Object.entries(socials).map(([key, value]) => (
                    <CardSocial
                        key={key}
                        name={value.name}
                        desc={value.desc}
                        logoSrc={value.logoSrc}
                        link={value.link}
                    />
                ))}
            </div>
            <div className="flex flex-col text-center sm:flex-row gap-5 mb-12 sm:mb-4">
                <Link className={stylesNavFooter.common} href="/register">Registrarse</Link>
                <Link className={stylesNavFooter.common} href="/login">Entrar</Link>
                <Link className={stylesNavFooter.common} href="/about-us">Acerca de</Link>
            </div>
            <p className="flex flex-col sm:flex-row items-center gap-2 text-medium text-stone-500">Desarrollado con <span className="flex items-center justify-center gap-2"> <Image className="w-5 h-5" src="/iphone-hearthh.png" width={20} height={20} alt="Corazon" />  por </span> <Link href="https://www.linkedin.com/in/francisco-lencina/"  className="text-blue-500 hover:text-blue-300" target="_blank">@francisco.lencina</Link></p>
        </footer>
    )
}