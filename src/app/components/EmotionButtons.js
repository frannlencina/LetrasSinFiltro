'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import { useEmotion } from '../context/EmotionContext';
import { useSearchParams, useRouter } from 'next/navigation'
import Tooltip from './Tooltip';
import useEmblaCarousel from 'embla-carousel-react'

const EmotionButtons = () => {
    const router = useRouter();

    // Carousel Ref
    const [emblaRef] = useEmblaCarousel()

    const searchParams = useSearchParams()
    const focus = searchParams.get('focus')

    const { changeEmotion, emotion } = useEmotion();

    const handleButtonClick = (newEmotion) => {
        changeEmotion(newEmotion);

        // Verificación de router para uso en el cliente
        if (router) {
            router.push(`/?focus=${newEmotion}`, { shallow: true, scroll: false });
        }
    };

    useEffect(() => {
        if (focus) {
            // Validación para permitir solo ciertos valores
            const allowedEmotions = ['Triste', 'Enamorado', 'Feliz', 'Enojado', 'Loco'];
            if (allowedEmotions.includes(focus)) {
                changeEmotion(focus);
            } else {
                console.log('No es una emoción permitida');
            }
        } else {
            console.log('No hay focus');
        }
    }, []);

    const images = [
        { src: "/memoji-triste.png", alt: "Memoji triste", emotion: "Triste" },
        { src: "/memoji-enamorado.png", alt: "Memoji enamorado", emotion: "Enamorado" },
        { src: "/memoji-festejando.png", alt: "Memoji festejando", emotion: "Feliz" },
        { src: "/memoji-enojado.png", alt: "Memoji enojado", emotion: "Enojado" },
        { src: "/memoji-loco.png", alt: "Memoji loco", emotion: "Loco" },
    ];

    return (
        <>
            <div className='max-w-6xl'>
                <div className="flex gap-4 items-center">
                    <h4 className="font-black text-black text-2xl ">Mood</h4>
                    <div className='relative group'>
                        <Tooltip text={'focus'} />
                        <svg className="icon icon-tabler icon-tabler-target opacity-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                            <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        </svg>
                    </div>
                    <p className="opacity-100  select-none  bg-blue-800 text-blue-300  rounded-lg px-2 py-[2px] text-center text-md">{emotion}</p>
                </div>
            </div>
            <hr className='my-8' />
            <div>
                <div className="embla overflow-hidden py-2 md:px-6" ref={emblaRef} >
                    <div className="embla__container flex min-w-0 md:gap-2">
                        {images.map((image, index) => (
                            <div className='flex flex-shrink-0 w-1/2 sm:w-1/5 min-w-0 mx-auto '>
                                <button key={index} className='embla__slide flex-shrink-0 mx-auto min-w-0 h-full ' onClick={() => handleButtonClick(image.emotion)}>
                                    <Image
                                        className={image.emotion === emotion ? 'rounded-lg  cursor-pointer bg-blue-500 scale-110' : 'rounded-lg cursor-pointer hover:scale-110 transition-all hover:bg-blue-500 '}
                                        src={image.src}
                                        width={80}
                                        height={80}
                                        alt={image.alt}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmotionButtons;
