import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MoonLoader } from 'react-spinners'
import axios from 'axios'

export default function Profile() {

    const [loading, setLoading] = useState(true)
    const [found, setFound] = useState(true)
    const [userData, setUserData] = useState(null)
    const router = useRouter()

    const baseURL = `http://localhost:3000/api/users?username=${router.query.slug}`
    
    useEffect(() => {
        axios.get(baseURL)
            .then(
                res => {
                    console.log('Success!', res.data);
                    setLoading(false)
                    setFound(false)
                    document.title = `@${res.data.username} » Perfil | LetrasSinFiltro`
                    setUserData(res.data)
                }
            )
            .catch(err => {
                console.error(`Error: ${err}`);
                setLoading(false);
            })
    }, [router.query.slug])


    return (
        <div className='h-full w-full flex justify-center items-center'>
            {found ? (
                <div className='h-screen flex justify-center items-center'>
                    {
                        loading ? <MoonLoader color="#106BEB" /> : 
                        <div className='text-5xl font-black text-blue-600'>Usuario no encontrado</div>
                    }
                </div>
            ) : (
                <div>
                    <section className='flex flex-col md:flex-row max-w-6xl mt-48 mx-4'>
                        <div>
                            <div className='bg-blue-600 px-4 rounded-t-3xl'>
                                <Image className="relative md:top-24 mx-auto w-36 md:w-full " src="/profile-avatar.png" width={250} height={250} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 ml-12'>
                            <div>
                                <h2 className='text-4xl md:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600'>{userData.username}</h2>
                            </div>
                            <div className='inline-flex items-center gap-2 opacity-50 bg-stone-200 px-4 py-2 rounded-lg w-fit text-xs'>
                                Ultima conexion
                                <span>{userData.last_connection}</span>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-8 m-6'>
                                <div>
                                    <h4 className='text-2xl font-black opacity-60 mb-2 '>favoritos</h4>
                                    <span className='bg-blue-500 bg-opacity-20 text-[#106BEB] rounded-md text-opacity-80 px-2 py-1 pointer-events-none select-none'>{userData.stats.favorite_posts}</span>
                                </div>
                                <div>
                                    <h4 className='text-2xl font-black opacity-60 mb-2'>frases generadas</h4>
                                    <span className='bg-blue-500 bg-opacity-20 text-[#106BEB] rounded-md text-opacity-80 px-2 py-1 pointer-events-none select-none'>{userData.stats.generated_prhases}</span>
                                </div>
                                <div>
                                    <h4 className='text-2xl font-black opacity-60 mb-2'>publicaciones</h4>
                                    <span className='bg-blue-500 bg-opacity-20 text-[#106BEB] rounded-md text-opacity-80 px-2 py-1 pointer-events-none select-none'>{userData.stats.posts_count}</span>
                                </div>
                                <div>
                                    <h4 className='text-2xl font-black opacity-60 mb-2'>mood favorito</h4>
                                    <span className='bg-blue-500 bg-opacity-20 text-[#106BEB] rounded-md text-opacity-80 px-2 py-1 pointer-events-none select-none'>{userData.stats.favorite_mood}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <hr />
                    <section>
                        <div className='flex h-72 text-center items-end m-auto justify-center'>
                            <h2 className='text-3xl md:text-5xl font-black opacity-70'>ULTIMOS POSTS</h2>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-24'>
                            <div className='flex bg-black opacity-20 rounded-xl w-48 h-48 text-white font-black text-2xl justify-center items-center'>
                                Proximamente.
                            </div>
                            <div className='flex bg-black opacity-20 rounded-xl w-48 h-48 text-white font-black text-2xl justify-center items-center'>
                                Proximamente.
                            </div>
                            <div className='flex bg-black opacity-20 rounded-xl w-48 h-48 text-white font-black text-2xl justify-center items-center'>
                                Proximamente.
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}