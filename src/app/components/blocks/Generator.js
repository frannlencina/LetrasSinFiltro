'use client'
import CardTemplate from "../CardTemplate";
import * as Popover from '@radix-ui/react-popover';
import * as htmlToImage from 'html-to-image';
import { useState, useEffect } from "react";
import { stylesToolsGen } from "@/app/utils/styles";
import { useEmotion } from "@/app/context/EmotionContext";
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastCustom } from '../../utils/ToastCustom'
import Tooltip from "../Tooltip";
export default function Generator() {
    const [ toImageLoader, setToImageLoader ] = useState(false)

    const { emotion } = useEmotion()

    const router = useRouter();

    const searchParams = useSearchParams()
    const text = searchParams.get('text')

    useEffect(() => {
        // Validación para saber si trae texto la URL
        if (text) {
            setTextFocus(textReverse(text))
            // Eliminamos parametro text de la URL para evitar conflictos y estetica.
            router.replace(`/?focus=${emotion}`, undefined, { shallow: false });
        } else {
            console.log('No hay text');
        }
    }, [emotion]);

    {/* Simulacion temporal  almacenamiento de frases. Proximamente utilizacion de API en IA */ }

    const frases = {
        tristeza: [
            "A veces, las lágrimas son las palabras que el corazón no puede expresar.",
            "La soledad es un silencio que grita en el alma.",
            "El dolor puede ser un maestro, pero sus lecciones son duras.",
            "Las cicatrices en el corazón duelen más que las visibles en la piel.",
            "A veces, el peso de la tristeza parece imposible de llevar.",
            "La ausencia a veces se siente como un eco constante en el corazón.",
            "Las lágrimas son el lenguaje silencioso del dolor.",
            "Hasta las sonrisas más brillantes pueden ocultar la tristeza más profunda.",
            "La tristeza a veces es como un manto que envuelve el alma.",
            "En el silencio de la noche, la tristeza a menudo susurra sus secretos más oscuros.",
            "El corazón roto no suena, pero a veces se siente como un estruendoso grito en el alma.",
            "El vacío se siente más pesado cuando estaba lleno de sueños.",
            "A veces, la tristeza es como una tormenta que arrasa los paisajes del alma.",
            "El dolor puede ser el eco de un amor perdido que aún resuena en el corazón.",
            "El dolor es un maestro severo que nos enseña lecciones invaluables.",
            "La tristeza es una lluvia que empapa el alma sin mojar el cuerpo.",
            "A veces, las lágrimas son la única respuesta a la pregunta del dolor.",
            "La tristeza a menudo se viste de silencio para no ser descubierta.",
            "El dolor puede ser un peso que parece imposible de liberar.",
            "En la tristeza más profunda, a veces encontramos la verdadera esencia de la compasión."
        ],
        enamoradizo: [
            "Tu sonrisa es el sol que ilumina mis días más oscuros.",
            "Cada momento contigo es una pincelada de amor en el lienzo de mi vida.",
            "El amor tiene mil formas, pero todas convergen en tu mirada.",
            "En tu abrazo encuentro el hogar que mi corazón siempre buscó.",
            "Eres la melodía que alegra la sinfonía de mi existencia.",
            "En cada latido, mi corazón susurra tu nombre.",
            "El amor contigo es un viaje que siempre desearé recorrer.",
            "Tus ojos son el reflejo de un universo donde deseo perderme por siempre.",
            "Tu amor es la partitura que da sentido a la música de mi vida.",
            "En cada instante a tu lado, descubro un nuevo matiz de amor.",
            "Amar es ver en ti lo que nadie más ve y sentir en ti lo que nadie más siente.",
            "En cada amanecer encuentro una nueva razón para amarte más.",
            "Tu presencia es el regalo más preciado en el escenario de mi existencia.",
            "El amor contigo es la melodía que siempre anhelé componer.",
            "Eres la respuesta a cada pregunta que mi corazón ha formulado.",
            "El amor a tu lado es el capítulo más hermoso de mi historia.",
            "En cada palabra tuya descubro un universo nuevo para explorar.",
            "Tu amor es el faro que guía mis pasos en la oscuridad.",
            "En cada suspiro encuentro la certeza de que estás en cada latido de mi corazón.",
            "Amar es descubrir en ti, cada día, algo nuevo que me enamora."
        ],
        felicidad: [
            "La felicidad es un viaje, no un destino.",
            "En la sonrisa de un niño encontramos la pureza que despierta la felicidad.",
            "La alegría es contagiosa, esparce esa luz por donde vayas.",
            "La felicidad se encuentra en los pequeños momentos que atesoramos.",
            "En la gratitud encontramos la semilla de la felicidad duradera.",
            "La verdadera felicidad reside en el corazón agradecido.",
            "La felicidad no es tener lo que deseas, es disfrutar lo que tienes.",
            "La sonrisa es el idioma universal de la felicidad.",
            "La felicidad es un tesoro que se multiplica al ser compartido.",
            "La felicidad a menudo se esconde en las cosas más simples de la vida.",
            "La felicidad es un perfume que derramas sobre los demás sin mancharte.",
            "La risa es la sinfonía del corazón que celebra la felicidad.",
            "La felicidad no es algo listo, viene de tus propias acciones.",
            "En la aceptación y el amor propio, encontramos las semillas de la felicidad.",
            "La gratitud transforma lo que tenemos en suficiente, y más.",
            "La felicidad es un estado mental que puedes elegir cada día.",
            "La verdadera riqueza es la paz interior que trae consigo la felicidad.",
            "La felicidad es un regalo que te das a ti mismo.",
            "En la felicidad del otro encontramos la nuestra.",
            "La felicidad es un jardín que florece en el cuidado y la atención que le damos."
        ],
        locura: [
            "La locura es solo el resultado de ser demasiado brillante para este mundo.",
            "A veces, la genialidad es solo la locura que encuentra su razón de ser.",
            "La locura y la creatividad bailan juntas en el escenario del genio.",
            "En la mente caótica a menudo nacen las ideas más brillantes.",
            "La locura es solo la etiqueta que la normalidad le pone a la genialidad.",
            "En la locura a menudo se encuentran los caminos menos transitados.",
            "La genialidad es la chispa que enciende la llama de la locura.",
            "La locura es el lienzo en blanco donde pinta el genio.",
            "La locura es solo el disfraz de la originalidad en un mundo de convenciones.",
            "A veces, la locura es solo una expresión diferente de la realidad.",
            "Los locos son los que cambian el mundo mientras los demás observan.",
            "La locura es la antesala de las grandes ideas.",
            "La genialidad y la locura a menudo son dos caras de la misma moneda.",
            "En la locura se gestan las revoluciones que transforman el mundo.",
            "La locura es solo el boleto de entrada a un mundo diferente de posibilidades.",
            "La genialidad es un toque de locura que da color al mundo.",
            "La locura es solo el precio de la genialidad en un mundo de mediocridad.",
            "La locura es el terreno fértil donde crecen las ideas más revolucionarias.",
            "La genialidad a menudo es vista como locura hasta que se convierte en un estándar.",
            "La locura es la musa que inspira a los visionarios a desafiar lo imposible."
        ],
        enojado: [
            "El enojo es el viento que apaga la llama de la razón.",
            "A veces, el enojo es solo la superficie de un mar de emociones más profundas.",
            "El enojo puede ser un veneno que bebemos esperando que otros se sientan mal.",
            "La ira a menudo es un fuego que quema al que la lleva y al que la recibe.",
            "El enojo es una llama que consume la paz interior.",
            "En el silencio del enojo, a menudo se oculta el ruido del sufrimiento.",
            "La ira es como sostener un carbón caliente con la intención de lanzárselo a alguien más.",
            "El enojo es la expresión de una herida que aún no ha sido sanada.",
            "La ira es el veneno que uno toma esperando que el otro muera.",
            "El enojo muchas veces es el disfraz de otras emociones más profundas.",
            "El enojo es el ácido que puede hacer más daño al recipiente que lo contiene.",
            "La ira es el viento que apaga la luz de la razón.",
            "El enojo es como agarrar un cuchillo afilado: puede lastimarte a ti y a otros.",
            "La ira es el fuego que consume la alegría del corazón.",
            "El enojo es como un vaso de agua sucia: no puedes ver a través de él hasta que se asiente.",
            "La ira es una llama que puede consumir la sensatez.",
            "El enojo es una respuesta temporal a algo que nos ha herido más profundamente.",
            "La ira es una tormenta que a menudo despeja el camino hacia la reflexión.",
            "El enojo es una sombra que oscurece la claridad del pensamiento.",
            "La ira es un peso que se lleva hasta que se aprende a soltar."
        ]
    };

    const downloadToImage = async () => {
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
    }

    const [fraseFocus, setFraseFocus] = useState([]);
    const [textFocus, setTextFocus] = useState('');

    const reloadTextFocus = () => {
        switch (emotion) {
            case 'Triste':
                setFraseFocus(frases.tristeza);
                break;
            case 'Enamorado':
                setFraseFocus(frases.enamoradizo);
                break;
            case 'Feliz':
                setFraseFocus(frases.felicidad);
                break;
            case 'Enojado':
                setFraseFocus(frases.enojado);
                break;
            case 'Loco':
                setFraseFocus(frases.locura);
                break;
            default:
                setFraseFocus(['Por favor selecciona un mood']);
                break;
        }
        const randomIndex = Math.floor(Math.random() * fraseFocus.length);
        const fraseSeleccionada = fraseFocus[randomIndex];
        setTextFocus(fraseSeleccionada);
    };

    const textToWithout = () => {
        // Eliminar espacios y reemplazarlos con guiones
        const fraseProcesada = textFocus.replace(/\s+/g, '-');
        return fraseProcesada;
    }

    function textReverse(fraseProcesada) {
        // Reemplazar guiones con espacios
        const fraseOriginal = fraseProcesada.replace(/-/g, ' ');
        return fraseOriginal;
    }


    const onCopyUrl = () => {
        ToastCustom({text: 'URL copiada correctamente!'})
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL + `&text=${textToWithout()}`)
    }

    const copyToClipboard = () => {
        if (textFocus !== 'Por favor selecciona un mood') {
            if (!navigator.clipboard) {
                ToastCustom({text: 'Tu navegador no es compatible con esta funcion :('})
            } else {
                try {
                    navigator.clipboard.writeText(textFocus);
                    ToastCustom({text: 'Texto copiado correctamente!'})
                } catch (err) {
                    console.error('Async: Could not copy text: ', err);
                }
            }
        } else {
            alert('No hay ninguna frase')
        }
    }

    return (
        <div>
            <div id="mainCard" className="pb-32">
                <div className="min-w-[450px] min-h-[450px] flex justify-center items-center">
                    <div className="mt-32">
                        <div id="elementToDownload" className="transition-all duration-200">
                            <CardTemplate text={textFocus ? textFocus : 'Por favor selecciona un mood'} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between max-w-[50%] mx-auto text-2xl translate-y-4">
                    <div className="flex gap-4 items-center">
                        <button onClick={reloadTextFocus} className='text-blue-500 hover:scale-110 hover:rotate-180  px-2 py-1 rounded-xl transition-all duration-200'><i className="ri-loop-left-line"></i></button>
                        <div className="relative group">
                        <Tooltip text={'proximamente'}/>
                            <button className={stylesToolsGen.disable}><i className="ri-star-line"></i></button>
                        </div>
                        
                    </div>
                    <div className="flex gap-4 opacity-50 items-center">
                        <button className={stylesToolsGen.common} >
                            <Popover.Root >
                                <Popover.Trigger asChild>
                                    <button className="IconButton" aria-label="Update dimensions">
                                        <i className="ri-share-forward-line"></i>
                                    </button>
                                </Popover.Trigger>
                                <Popover.Portal >
                                    <Popover.Content className="flex divide-y flex-col gap-2 items-center bg-white p-2 rounded-lg" sideOffset={5}>
                                        <div className="text-center items-center">
                                            <a className={stylesToolsGen.shareButtons}  href={`https://twitter.com/intent/tweet?text=${textFocus}`} target="_blank">Twitter<i class="ri-twitter-x-line"></i></a>
                                        </div>

                                        <div>
                                            <button className={stylesToolsGen.shareButtons} onClick={onCopyUrl}>Copiar Url</button>
                                        </div>
                                        <div>
                                            <button className={stylesToolsGen.shareButtons} onClick={() => copyToClipboard()}>Copiar Txt</button>
                                        </div>
                                        <Popover.Arrow className="opacity-30" />
                                    </Popover.Content>
                                </Popover.Portal>
                            </Popover.Root></button>
                        {
                            toImageLoader ? <button className={stylesToolsGen.disable} onClick={downloadToImage}><i className="ri-download-line"></i></button> : <button className={stylesToolsGen.common} onClick={downloadToImage}><i className="ri-download-line"></i></button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}