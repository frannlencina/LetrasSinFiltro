'use client'
import CardTemplate from "../CardTemplate";
import * as htmlToImage from 'html-to-image';
import { useState } from "react";
import { stylesToolsGen } from "@/app/utils/styles";

export default function Generator() {

    {/* Simulacion temporal  almacenamiento de frases. Proximamente utilizacion de API en IA */ }

    const frases = [
        "El amor no tiene fronteras ni reglas, solo te pide ser auténtico.",
        "Eres la melodía que le da sentido a todas las notas de mi vida.",
        "Amarte es un verbo que conjugo a todas horas en mi corazón.",
        "En cada latido se escribe tu nombre, en cada sueño, tu sonrisa.",
        "Tus ojos son constelaciones que guían mi alma hacia el paraíso.",
        "En tu abrazo encuentro el hogar que siempre busqué en este mundo.",
        "El amor es como un fuego que nunca se apaga.",
        "Amar es encontrar en la felicidad de otro tu propia felicidad.",
        "El amor es el único tesoro que no se saca con pico y pala, sino con el corazón.",
        "El amor es el idioma que todos los corazones entienden.",
        "Amar es darse completamente sin garantías.",
        "El amor es un viaje interminable de descubrimiento.",
        "El amor es como una flor: hay que regarlo todos los días para que crezca y florezca.",
        "Amar es encontrar a alguien que te haga olvidar por qué tenías miedo de amar.",
        "El amor es la poesía de los sentidos.",
        "Amar es como un viento que no puedes ver, pero puedes sentir.",
        "El amor es una melodía que toca el corazón.",
        "En cada canción, en cada verso, encuentro la melodía perfecta que eres tú en mi vida.",
        "Eres el anhelo constante en mis días, la razón que da luz a cada paso que doy.",
        "En cada estrella veo el brillo de tus ojos, en cada susurro siento la dulzura de tu voz.",
        "Eres la calma en medio del caos, la certeza en un mundo incierto, mi refugio en la tempestad.",
        "Cada latido lleva tu nombre, como si mi corazón supiera que le perteneces.",
        "Eres mi historia favorita en un libro de amores imposibles, pero a la vez, mi realidad más hermosa.",
        "Eres el sueño del que no quiero despertar, la melodía que nunca quiero que termine.",
        "En cada lugar que mis pies pisan, siento que es un camino para encontrarte.",
        "Eres el abrazo que mi alma anhela, el destino al que mi corazón siempre vuelve.",
        "Eres mi universo en un simple 'hola', mi esperanza en cada 'te extraño' y mi felicidad en cada 'te quiero'.",
        "Cada minuto a tu lado es un poema que mi corazón escribe eternamente.",
        "El amor es el idioma que mi corazón habla con el tuyo en silencio.",
        "En tu mirada encuentro la paz que ningún verso pudo brindarme.",
        "Tu amor es el tatuaje indeleble en el lienzo de mi existencia.",
        "Tus risas son partituras que alegran la sinfonía de mi vida.",
        "Eres el final de todas mis búsquedas, mi anhelo más profundo.",
        "Amar es descubrir en ti, cada día, algo nuevo que me enamora.",
        "Nuestro amor es un cuento sin fin, escrito en cada latido del corazón.",
        "Eres el sueño que nunca quise despertar, la realidad que siempre soñé.",
        "Cada suspiro lleva tu nombre, cada latido late por tu amor.",
        "Tu presencia es el sol en un día lluvioso, la luz en mi oscuridad.",
        "Eres el verso que nunca pude rimar, pero siempre anhelé escribir.",
        "Tu amor es la melodía que siempre está sonando en mi corazón."
    ]

    const downloadToImage = async () => {
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
    }

    const [textFocus, setTextFocus] = useState<string>(frases[0]);

    const reloadTextFocus = () => {
        const randomIndex = Math.floor(Math.random() * frases.length);
        const fraseSeleccionada = frases[randomIndex];
        setTextFocus(fraseSeleccionada);
    };
    return (
        <div>
            <div id="mainCard" className="pb-32">
                <div className="min-w-[450px] min-h-[450px] flex justify-center items-center">
                    <div id="elementToDownload" className="hover:scale-105 transition-all duration-200">
                        <CardTemplate text={textFocus} />
                    </div>
                </div>
                <div className="flex justify-between max-w-[50%] mx-auto text-2xl translate-y-4">
                    <div className="flex gap-4">
                        <button onClick={reloadTextFocus} className={`text-blue-600 ` + stylesToolsGen.common}><i className="ri-loop-left-line"></i></button>
                        <button className={`text-yellow-400 ` + stylesToolsGen.common}><i className="ri-star-line"></i></button>
                    </div>
                    <div className="flex gap-4 opacity-50">
                        <button className={stylesToolsGen.common} ><i className="ri-share-forward-line"></i></button>
                        <button className={stylesToolsGen.common} onClick={downloadToImage}><i className="ri-download-line"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}