import Link from "next/link"
import { useState } from "react";
import Image from "next/image"
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { ToastCustom } from "../../app/utils/ToastCustom";
import { useLogged } from "../../app/context/LoggedContext";

export default function Login() {
    

    const router = useRouter();

    const preventFormDefault = (e) => {
        event.preventDefault();
    }

    const { changeLogged, logged } = useLogged()

    const [body, setBody] = useState({ username: '', password: '' });

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        });
        console.log(body)
    }

    const baseURL = 'http://localhost:3000/api/auth/login';

    const Redirect = () => {
        const timeout = setTimeout(() => {
            // Redirije a /admindashboard
            router.push('/');
        }, 200);
        return () => clearTimeout(timeout);
    }

    const [ buttonState, setButtonState ] = useState(true)

    const handleSubmit = async () => {
        
        setButtonState(false)
        event.preventDefault();
        // Cambiar username por email y en el backend tambien
        const data = { username: `${body.username}`, password: `${body.password}`, };
        
        axios.post(baseURL, data)
            .then(response => {

                console.log(response.data.resultado)
                const tokenJWT = response.data.tokenJWT
                Cookies.set('tokenFirmado', tokenJWT, { expires: 1 / 24 })
                Cookies.set('user_data', JSON.stringify(response.data.resultado), { expires: 1 / 24 })

                ToastCustom({text: "Bienvenido de vuelta :)"})

                // Cambiamos estado global de loggeo 
                changeLogged(true)
                Redirect()
            })
            .catch(error => {
                console.log('Error al iniciar sesión:', error);
                setButtonState(true)
            });
    }
    
    return (
        <div className="flex items-center justify-center h-screen w-full bg-white">
            <Toaster />
            <div className="grid gridcols-1 sm:grid-cols-2 rounded-xl">
                <div className="bg-[#5596F1] px-12 rounded-l-xl flex items-center justify-center ">
                    <Image src="/memojis-login.png" width={350} height={350} />
                </div>
                <div className="bg-white px-12 rounded-r-xl">
                    <div id="loginLogo" className="w-[350px] h-[80px] my-6"></div>
                    <div className="text-black py-6">
                        <h2 className="font-black text-3xl mb-3 opacity-80">INGRESA A TU CUENTA</h2>
                        <h4 className="text-xl flex items-center gap-2">Bienvenido de vuelta <span><Image src="/emoji-welcome.png" width={20} height={20} /></span></h4>
                        <h5 className="mb-8 font-medium opacity-60">Ingresa a tu cuenta aqui</h5>
                    </div>
                    <form onSubmit={preventFormDefault} className="flex flex-col gap-4 pb-6">
                        <label>
                            <input onChange={inputChange} value={body.username} className="min-w-full placeholder:text-black font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-stone-300 py-2 px-4 bg-opacity-40 bg-[#D9D9D9] outline outline-2 outline-[#1e1e1e25] rounded-lg transition-all duration-200" type="text" name="username" placeholder="Ingresa tu usuario" />
                        </label>
                        <label className="mb-4">
                            <input onChange={inputChange} value={body.password} className="min-w-full placeholder:text-black font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-stone-300 py-2 px-4 bg-opacity-40 bg-[#D9D9D9] outline outline-2 outline-[#1e1e1e25] rounded-lg transition-all duration-200" type="password" name="password" placeholder="Ingresa tu contraseña" />
                        </label>
                        {
                            buttonState ? <button onClick={handleSubmit} className="bg-[#004AAD] text-white px-4 py-2 my-4 rounded-lg hover:scale-105 focus:ring-4 focus:ring-blue-300 transition-all duration-200">Login</button> : <button onClick={handleSubmit} className="bg-stone-200 cursor-default pointer-events-none text-white px-4 py-2 my-4 rounded-lg hover:scale-105 transition-all duration-200">Login</button>
                        }
                        <p className="text-black opacity-70 text-center">No tienes cuenta? <span className="text-blue-500 hover:text-blue-300"><Link href='/Register'>Registrate aqui</Link></span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}