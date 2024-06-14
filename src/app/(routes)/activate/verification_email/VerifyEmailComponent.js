'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLogged } from '@/app/context/LoggedContext';
import Cookies from 'js-cookie';
import { verifyAndDecodeJWT } from '@/app/utils/VerifyAndDecodeJSWT';
import { ToastCustom } from '@/app/utils/ToastCustom';

export default function VerifyEmailComponent({ tokenParams }) {
    const { logged, changeLogged } = useLogged();
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    const POST_CONFIRM_EMAIL = process.env.POST_CONFIRM_EMAIL;

    useEffect(() => {
        const verifyEmail = async () => {
            if (!logged) {
                ToastCustom({ text: 'No se puede verificar el email sin antes estar logeado' });
                router.push('/login');
                return;
            }

            const token = Cookies.get('tokenFirmado');
            if (token) {
                const userData = verifyAndDecodeJWT(token);
                if (userData?.email_verify?.isVerify) {
                    setVerified(true);
                    router.push('/');
                    return;
                }
            }

            if (logged && !verified && tokenParams) {
                try {
                    const userData = verifyAndDecodeJWT(token); // Decode token to get username
                    const data = { token: tokenParams, username: userData.username };
                    const response = await axios.post(POST_CONFIRM_EMAIL, data);

                    ToastCustom({ text: 'Email verificado correctamente, ingresa una vez más.' });
                    Cookies.remove('tokenFirmado');
                    changeLogged(false);
                    
                    setVerified(true);
                   
                    router.push('/login');
                } catch (error) {
                    console.error("Ha ocurrido un error a la hora de confirmar el correo electronico", error);
                }
            } else if (!tokenParams) {
                ToastCustom({ text: 'No se ha encontrado un token para poder verificar este email. Por favor verifica bien tu correo.' });
            }
        };

        verifyEmail();
    }, [logged]);

    return (
        <>
            {
                logged ? (
                    <main className='grid place-content-center py-40'>
                        <div className='max-w-sm text-center'>
                            <div className="text-center p-4">
                                <h1 className="font-black text-2xl sm:text-4xl">Verificacion de email</h1>
                                <p className="opacity-60">Estamos verificando tu email, esto puede demorar dependiendo de tu conexion a internet</p>
                            </div>
                        </div>
                    </main>
                ) : (
                    <main className="flex flex-col justify-center items-center min-h-screen">
                        <div className="text-center p-4">
                            <h1 className="font-black text-2xl sm:text-4xl">Verificacion de email</h1>
                            <p className="opacity-60 text-red-800">No puedes verificar tu email si no estas logeado en tu cuenta.</p>
                        </div>
                    </main>
                )
            }
        </>
    );
}
