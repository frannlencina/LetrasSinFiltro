import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter()
    return (
    <div className='h-screen w-full flex justify-center items-center'>
        <p>Perfil: {router.query.slug}</p>
    </div>
    )
}