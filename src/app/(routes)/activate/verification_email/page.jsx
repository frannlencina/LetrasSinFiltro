'use client'
import axios from "axios";
// import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { useLogged } from "@/app/context/LoggedContext";
import Cookies from "js-cookie";
import { verifyAndDecodeJWT } from "@/app/utils/VerifyAndDecodeJSWT";
import { useRouter } from 'next/navigation';
import { ToastCustom } from "@/app/utils/ToastCustom";

export default function VerifyEmailPage() {

    const { logged } = useLogged();
    const router = useRouter();

    const getTokenFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('token');
    };

    const tokenParams = getTokenFromUrl();
    
    const [message, setMessage] = useState('Verifying email...');
    const [verified, setVerified] = useState(false);

    const POST_CONFIRM_EMAIL = "/api/emails/confirm_email";
    const JSONWKEY = process.env.JSONWKEY;

    useEffect(() => {
        if (logged) {
            // Verifica si el usuario tiene el mail confirmado
            const userData = verifyAndDecodeJWT(Cookies.get('tokenFirmado'));

            if (userData.email_verify.isVerify) {
                setVerified(true);
                router.push('/');
            }
        }
    }, [logged, router]);

    useEffect(() => {
        if (logged && !verified) {
            const data = { token: `${tokenParams}` };
            axios.post(POST_CONFIRM_EMAIL, data)
                .then(response => {
                    console.log(response.data); // Muestra los datos devueltos por la petición

                    Cookies.remove('tokenFirmado');
                    ToastCustom({ text: 'Email verificado correctamente, ingresa una vez más.' });
                    router.push('/login')

                    setVerified(true); // Actualiza el estado de verificación en caso de éxito
                    setMessage('Email successfully verified.'); // Actualiza el mensaje en caso de éxito
                })
                .catch(error => {
                    console.error("There was an error confirming the email!", error); // Muestra el error si ocurre
                    setMessage('Failed to verify email.'); // Actualiza el mensaje en caso de error
                });
        } else if (!tokenParams) {
            setMessage('No se ha encontrado un token para poder verificar este email. Por favor verifica bien tu correo.');
        }
    }, [logged, tokenParams, verified, JSONWKEY]);

    if (!logged) {

        router.push('/login');
        ToastCustom({ text: 'No puedes verificar tu correo sin antes estar logeado' });
        

        return (
            <main className="flex flex-col justify-center items-center min-h-screen ">
                <div className="text-center p-4">
                    <h1 className="font-black text-2xl sm:text-4xl">Verificacion de email</h1>
                    <p className="opacity-60 text-red-800">No puedes verificar tu email si no estas logeado en tu cuenta.</p>
                </div>
            </main>
        );
    }

    return (
        <div className='grid place-content-center py-40'>
            <div className='max-w-sm text-center'>
                <div className="text-center p-4">
                    <h1 className="font-black text-2xl sm:text-4xl">Verificacion de email</h1>
                    <p className="opacity-60 ">Estamos verificando tu email, esto puede demorar dependiendo de tu conexion a internet</p>
                </div>
                <div>
                    <p className='text-lg text-muted-foreground'>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}
