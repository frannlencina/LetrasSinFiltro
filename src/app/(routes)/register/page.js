'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react";
import axios from "axios";
import { Toaster } from 'react-hot-toast';
import { ToastCustom } from "../../utils/ToastCustom";
const bcrypt = require('bcryptjs');
import ActionButton from "@/app/components/ActionButton";

export default function Register() {

    const POST_URL_REGISTER = process.env.POST_URL_REGISTER

    const preventFormDefault = (e) => {
        event.preventDefault();
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const [body, setBody] = useState({ email: '', username: '', password: '' });

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        });
    }

    const [buttonState, setButtonState] = useState(true)

    const Redirect = () => {
        const timeout = setTimeout(() => {
            window.location.href = '/login';
        }, 200);
        return () => clearTimeout(timeout);
    }

    const handleSubmit = async () => {
        event.preventDefault();
        
        try {
            // Hashear la contraseña antes de enviarla al servidor
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.password, salt);
    
            // Validar el formato del correo electrónico
            const emailFormatValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
    
            if (!emailFormatValido) {
                ToastCustom({ text: "Formato de correo electrónico inválido" });
                return;
            }
    
            setButtonState(false);
    
            // Cambiar username por email y en el backend también
            const data = { username: body.username, email: body.email, password: hashedPassword, terms_and_conditions: isChecked };
    
            const response = await axios.post(POST_URL_REGISTER, data);
            ToastCustom({ text: "Registrado correctamente" });
            Redirect();
        } catch (error) {
            ToastCustom({ text: "Error al registrarse" });
            console.error(error);
            setButtonState(true);
        }
    };
    

    return (
        <main className="flex items-center justify-center h-screen w-full bg-white ">
            <Toaster />
            <section className="grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-[#355E99] px-12 rounded-l-xl flex items-center justify-center ">
                    <Image src="/memojis-register.png" width={350} height={350} />
                </div>
                <div className="bg-white px-12 rounded-r-xl ">
                    <div id="loginLogo" className="w-[350px] h-[80px] my-6"></div>
                    <div className="text-black py-6">
                        <h2 className="font-black text-3xl mb-3 opacity-80">CREA TU CUENTA</h2>
                        <h4 className="text-xl flex items-center gap-2">Hola! Bienvenido <span><Image src="/emoji-welcome.png" width={20} height={20} /></span></h4>
                        <h5 className="mb-8 font-medium opacity-60">Completa los datos aqui</h5>
                    </div>
                    <form onSubmit={preventFormDefault} className="flex flex-col gap-4 pb-6">
                        <label>
                            <input onChange={inputChange} value={body.email} className="min-w-full placeholder:text-black font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-stone-300 py-2 px-4 bg-opacity-40 bg-[#D9D9D9] outline outline-2 outline-[#1e1e1e25] rounded-lg transition-all duration-200" type="email" required name="email" placeholder="Ingresa tu email" />
                        </label>
                        <label>
                            <input onChange={inputChange} value={body.username} className="min-w-full placeholder:text-black font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-stone-300 py-2 px-4 bg-opacity-40 bg-[#D9D9D9] outline outline-2 outline-[#1e1e1e25] rounded-lg transition-all duration-200" type="text" name="username" placeholder="Ingresa tu username" />
                        </label>
                        <label className="mb-4">
                            <input onChange={inputChange} value={body.password} className="min-w-full placeholder:text-black font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-stone-300 py-2 px-4 bg-opacity-40 bg-[#D9D9D9] outline outline-2 outline-[#1e1e1e25] rounded-lg transition-all duration-200" type="password" name="password" placeholder="Ingresa tu contraseña" />
                        </label>

                        <label className="flex gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            Acepto los términos y condiciones
                        </label>
                        <hr />
                        <ActionButton disabled={!isChecked} type="submit" onClick={handleSubmit}>Registrarse</ActionButton>
                        <p className="text-black opacity-70 text-center">Ya tienes cuenta? <span className="text-blue-500 hover:text-blue-300"><Link href='/login'>Ingresa aqui</Link></span></p>

                    </form>
                </div>
            </section>
        </main>
    )
}