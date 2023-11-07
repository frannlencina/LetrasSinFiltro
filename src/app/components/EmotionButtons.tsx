import { FC, useState } from 'react';
import Image from 'next/image';
import { useEmotion } from '../context/EmotionContext';

const EmotionButtons: FC = () => {


    const { changeEmotion, emotion } = useEmotion();

    const handleButtonClick = (newEmotion: string) => {
        changeEmotion(newEmotion);
    };

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
                        <span className='hidden group-hover:block  absolute z-20 text-blue-200 font-medium bg-blue-800 rounded-lg text-xs -translate-y-8 -translate-x-3 px-2 py-[2px] '>focus</span>
                        <svg className="icon icon-tabler icon-tabler-target opacity-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                            <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        </svg>                    
                    </div>

                    <p className="opacity-100  select-none  bg-blue-200 text-blue-500  rounded-lg px-2 py-[2px] text-center text-md">{emotion}</p>
                </div>
            </div>
            <hr />
            <div className='flex gap-4'>
                {
                    images.map((image, index) => (
                        <button key={index} onClick={() => handleButtonClick(image.emotion)}>
                            <Image
                                className={image.emotion === emotion ? 'rounded-lg cursor-pointer bg-blue-500 scale-110' : 'rounded-lg cursor-pointer hover:scale-110 transition-all hover:bg-blue-500 '}
                                src={image.src}
                                width={80}
                                height={80}
                                alt={image.alt}
                            />
                        </button>
                    ))
                }
            </div>
        </>
    );
};

export default EmotionButtons;
