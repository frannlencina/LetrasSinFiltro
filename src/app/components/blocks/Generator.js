'use client'
import CardTemplate from "../CardTemplate";
import * as Popover from '@radix-ui/react-popover';
import * as htmlToImage from 'html-to-image';
import { useState, useEffect } from "react";
import { stylesToolsGen } from "@/app/utils/styles";
import { useEmotion } from "@/app/context/EmotionContext";
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastCustom } from '../../utils/ToastCustom'
import { v4 as uuidv4 } from 'uuid';
import Badge from "../Badge";
import { useLogged } from "@/app/context/LoggedContext";
import axios from 'axios'

import dynamic from 'next/dynamic'
const AuthButton = dynamic(() => import('../../utils/AuthButton'), { ssr: false })

export default function Generator() {

    const [toImageLoader, setToImageLoader] = useState(false)

    const { emotion } = useEmotion()

    const router = useRouter();

    const searchParams = useSearchParams()
    const paramText = searchParams.get('paramText')

    // Constante mensaje cuando no hay un mood seleccionado.
    const noTextFocus = 'Por favor selecciona un mood';

    // Funcion para asegurar el retorno del mensaje noTextFocus y el estado del textFocus
    const noTextFocusReturn = () => {
        setTextFocus(noTextFocus);
        return noTextFocus
    }

    useEffect(() => {
        // Validación para saber si trae texto la URL
        if (paramText) {
            setTextFocus(textReverse(paramText))
            // Eliminamos parametro text de la URL para evitar conflictos y estetica.
            router.replace(`/?focus=${emotion}`, undefined, { shallow: false });
        } else {

        }
    }, [emotion]);

    const { logged } = useLogged()

    const downloadToImage = async () => {
        if (textFocus !== noTextFocus || textFocus === null) {
            setToImageLoader(true)
            setTimeout(function () {
                setToImageLoader(false)
            }, 1000); // 1000 milisegundos = 1 segundo
            const element = document.getElementById('elementToDownload');
            if (element) {
                try {
                    const dataUrl = await htmlToImage.toPng(element);
                    const link = document.createElement('a');
                    link.download = 'frase.png';
                    link.href = dataUrl;
                    link.click();
                } catch (error) {
                    console.error('Error al descargar la imagen:', error);
                }
            } else {
                console.error('Elemento no encontrado');
            }
        } else {
            if (logged == true) {
                ToastCustom({ text: noTextFocus })
            }
        }
    }

    {/* Simulacion temporal  almacenamiento de frases. Proximamente utilizacion de API en IA */ }
    const [frases, setFrases] = useState({})

    const baseURL = `http://localhost:3000/api/emotions?emotion=${emotion}`


    useEffect(() => {
        axios.get(baseURL)
            .then(res => {
                setFrases(res.data.frases);
            })
            .catch(err => {
                console.error(`Error: ${err}`);
            });
    }, [emotion]);

    const [textFocus, setTextFocus] = useState([]);

    const reloadTextFocus = () => {
        if (emotion) {
            setTextFocus(getRandomFrase(frases))
        } else {
            setTextFocus(['Por favor selecciona un mood']);
            ToastCustom({ text: 'No hay mood seleccionado.' });
        }
    };

    function getRandomFrase(arr) {
        console.log(arr)
        // if (Array.isArray(arr) && textFocus.length > 1) {
        //     // get random index value
        //     const randomIndex = Math.floor(Math.random() * arr.length);
    
        //     // get random item
        //     const item = arr[randomIndex];
        //     return item.frase;
        // }
    }
    

    useEffect(() => {
        if (paramText) {
            // Hacer algo si paramText existe
        } else if (frases && Object.keys(frases).length !== 0) {
            reloadTextFocus();
        }
    }, [frases]);


    // Pasar frase a los espacios con guiones para la url
    const textToWithout = () => {
        // Eliminar espacios y reemplazarlos con guiones
        const fraseProcesada = textFocus.replace(/\s+/g, '-');
        return fraseProcesada;
    }

    // Pasar frase de URL  a frase Normal 
    function textReverse(fraseProcesada) {
        // Reemplazar guiones con espacios
        const fraseOriginal = fraseProcesada.replace(/-/g, ' ');
        return fraseOriginal;
    }

    // Copiar URl
    const onCopyUrl = () => {

        if (textFocus !== noTextFocus) {
            ToastCustom({ text: 'URL copiada correctamente!' })
            const currentURL = window.location.href;
            navigator.clipboard.writeText(currentURL + `&text=${textToWithout()}`)
        } else {
            ToastCustom({ text: noTextFocus });
        }
    }

    // Copiar Texto a porta papeles.
    const copyToClipboard = () => {

        // Utiliza LoggedChecker como un componente de React
        if (textFocus !== noTextFocus) {
            if (!navigator.clipboard) {
                ToastCustom({ text: 'Tu navegador no es compatible con esta funcion :(' })
            } else {
                try {
                    navigator.clipboard.writeText(textFocus);
                    ToastCustom({ text: 'Texto copiado correctamente!' })
                } catch (err) {
                    console.error('Async: Could not copy text: ', err);
                }
            }
        } else {
            ToastCustom({ text: noTextFocus });
        }


    }

    const cardData = {
        name: 'Default',
        config: {
            background: {
                type: 'gradient',
                colors: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
            },
            text: {
                font: 'Arial',
                size: '24px',
                colorType: {
                    type: 'gradient',
                    color: '#f2ff00, #0015ff',
                },
            },
        },
    };

    const [favoriteCards, setFavoriteCards] = useState([]);

    const addToFavorites = (card) => {
        if (textFocus !== noTextFocus && textFocus.length > 1) {
            // Obtener los datos de localStorage y convertirlos de nuevo a un array
            const storedFavoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || [];

            // Verificar si la tarjeta ya está en la lista de favoritos
            const isCardAlreadyAdded = storedFavoriteCards.some((favoriteCard) => (
                favoriteCard.name === card.name && favoriteCard.text === card.text
            ));

            if (!isCardAlreadyAdded) {
                // Añadir una nueva card a la lista de favoritos
                const cardId = uuidv4(); // Generar un identificador único
                const newFavoriteCard = { id: cardId, ...card }; // Agregar el identificador a la tarjeta
                const newFavoriteCards = [...storedFavoriteCards, newFavoriteCard];

                // Guardar la nueva lista en localStorage
                localStorage.setItem('favoriteCards', JSON.stringify(newFavoriteCards));

                // Actualizar el estado del componente
                setFavoriteCards(newFavoriteCards);
            } else {
                ToastCustom({ text: 'La tarjeta ya está en favoritos' });
            }
        } else {
            ToastCustom({ text: noTextFocus })
        }
    };


    return (
        <div id="mainCard" className="flex flex-col pb-16  ">
            <div className="flex justify-center items-center ">
                <div className="mt-16 ">
                    <div className="mb-4">
                        <Badge text={cardData.name} type="" icon={false} />
                    </div>
                    <div id="elementToDownload" className="transition-all duration-200 mx-auto ">
                        <CardTemplate cardData={cardData} text={textFocus.length > 1 ? textFocus : noTextFocusReturn()} />
                    </div>
                </div>
            </div>
            <div className="flex justify-between sm:w-[50%] mx-auto text-2xl translate-y-4">
                <div className="flex items-center">
                    <button onClick={reloadTextFocus} className='text-blue-500 hover:scale-110 hover:rotate-180  px-2 py-1 rounded-xl transition-all duration-200'><i className="ri-loop-left-line"></i></button>
                    <div className="relative group">
                        <AuthButton onClick={() => addToFavorites({ name: cardData.name, text: textFocus })}><span className='text-yellow-500 hover:scale-110 hover:skew-y-12 px-2 py-1 rounded-xl transition-all duration-200'><i className="ri-star-line"></i></span></AuthButton>

                    </div>
                </div>
                <div className="flex opacity-50 items-center">
                    <button className={stylesToolsGen.common} >
                        <Popover.Root >
                            <Popover.Trigger asChild>
                                <span className="IconButton" aria-label="Update dimensions">
                                    <i className="ri-share-forward-line"></i>
                                </span>
                            </Popover.Trigger>
                            <Popover.Portal >
                                <Popover.Content className="flex divide-y flex-col gap-2 items-start justify-start bg-white py-2 px-4 rounded-lg" sideOffset={5}>
                                    <div className="w-full">
                                        <AuthButton onClick={() => copyToClipboard()}><a className={stylesToolsGen.shareButtons} href={textFocus !== noTextFocus && logged ? `https://twitter.com/intent/tweet?text=${textFocus}` : null} target="_blank">
                                            <i className="ri-twitter-x-line"></i>Twitter
                                        </a></AuthButton>
                                    </div>
                                    <div className="w-full">
                                        <AuthButton onClick={onCopyUrl}><span className={stylesToolsGen.shareButtons}>
                                            <i className="ri-link"></i> Compartir enlace
                                        </span></AuthButton>
                                    </div>

                                    <div className="w-full">
                                        <AuthButton onClick={() => copyToClipboard()}><span className={stylesToolsGen.shareButtons}>
                                            <i className="ri-file-list-3-line"></i> Copiar Txt
                                        </span></AuthButton>
                                    </div>
                                    <Popover.Arrow className="opacity-30" />
                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root></button>
                    {
                        toImageLoader ? <AuthButton onClick={downloadToImage}><span className={stylesToolsGen.disable} ><i className="ri-download-line"></i></span></AuthButton> :
                            <AuthButton onClick={downloadToImage}><span className={stylesToolsGen.common} ><i className="ri-download-line"></i></span></AuthButton>
                    }
                </div>
            </div>
        </div>
    )
}