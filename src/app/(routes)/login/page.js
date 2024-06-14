'use client'
import Link from "next/link"
import { useState } from "react";
import Image from "next/image"
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { ToastCustom } from "../../utils/ToastCustom";
import { useLogged } from "../../context/LoggedContext";

import jwt from 'jsonwebtoken';

export default function Login() {

    const JSONWKEY = process.env.JSONWKEY;
    const POST_URL_LOGIN = process.env.POST_URL_LOGIN

    const preventFormDefault = (e) => {
        e.preventDefault();
    }

    const { changeLogged, logged } = useLogged()

    const [body, setBody] = useState({ username: '', password: '' });

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        });
    }


    const Redirect = () => {
        const timeout = setTimeout(() => {
            window.location.href = '/';
        }, 200);
        return () => clearTimeout(timeout);
    }

    const [buttonState, setButtonState] = useState(true)

    const handleSubmit = async () => {

        setButtonState(false)
        event.preventDefault();
        
        // Cambiar username por email y en el backend tambien
        const data = { username: `${body.username}`, password: `${body.password}`, };

        if (data.username.length < 1 || data.password.length < 1) {
            ToastCustom({ text: "Datos invalidos" })
        } else {
            axios.post(POST_URL_LOGIN, data)
                .then(response => {

                    const tokenInfo = response.data.resultado
                    // Generar un token JWT firmado y encriptado

                    const token = jwt.sign(tokenInfo, JSONWKEY, { algorithm: 'HS256', expiresIn: '1h' });
                    Cookies.set('tokenFirmado', token, { expires: 1 / 24, secure: true, sameSite: 'strict' })

                    ToastCustom({ text: "Bienvenido de vuelta :)" })

                    // Cambiamos estado global de loggeo 
                    changeLogged(true)
                    Redirect()
                })
                .catch(error => {
                    setButtonState(true)
                });
        }

    }

    return (
        <main className="flex items-center justify-center h-screen w-full bg-white ">
            <Toaster />
            <section className="grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-[#5596F1] px-12 rounded-l-xl flex items-center justify-center ">
                    <Image src="/memojis-login.png" width={350} height={350} />
                </div>
                <div className="bg-white px-12 rounded-r-xl ">
                    <div id="loginLogo" className="w-[350px] h-[80px] my-6"></div>
                    <div className="text-black py-6">
                        <h2 className="font-black text-3xl mb-3 opacity-80">INGRESA A TU CUENTA</h2>
                        <h4 className="text-xl flex items-center gap-2">Bienvenido de vuelta <span><Image src="/emoji-welcome.png" width={20} height={20} /></span></h4>
                        <h5 className="mb-8 font-medium opacity-60">Ingresa a tu cuenta aqui</h5>
                    </div>
                    <form onSubmit={preventFormDefault} className="flex flex-col gap-4 pb-6">
                        <label>
                            <input onChange={inputChange} value={body.username} className="min-w-full placeholder:text-black font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-stone-300 py-2 px-4 bg-opacity-40 bg-[#D9D9D9] outline outline-2 outline-[#1e1e1e25] rounded-lg transition-all duration-200" type="text" name="username" placeholder="Ingresa tu username" />
                        </label>
                        <label className="mb-4">
                            <input onChange={inputChange} value={body.password} className="min-w-full placeholder:text-black font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-stone-300 py-2 px-4 bg-opacity-40 bg-[#D9D9D9] outline outline-2 outline-[#1e1e1e25] rounded-lg transition-all duration-200" type="password" name="password" placeholder="Ingresa tu contraseña" />
                        </label>
                        <button onClick={handleSubmit} className="bg-[#5596F1] text-white px-4 py-2 my-4 rounded-lg hover:scale-105 focus:ring-4 focus:ring-blue-300 transition-all duration-200">Login</button>
                        <p className="text-black opacity-70 text-center">No tienes cuenta? <span className="text-blue-500 hover:text-blue-300"><Link href='/register'>Registrate aqui</Link></span></p>
                    </form>
                </div>
            </section>
        </main>
    )
}

