import CardTemplate from "../CardTemplate";
import { useEffect, useState } from 'react';
import { stylesMenuBar, stylesToolsGen } from "@/app/utils/styles";
import * as Popover from '@radix-ui/react-popover';
import { ToastCustom } from "@/app/utils/ToastCustom";
import * as htmlToImage from 'html-to-image';
import Badge from "../Badge";
export default function Favorites() {

  const noTextFocus = 'Por favor selecciona un mood';
  const [toImageLoader, setToImageLoader] = useState(false)

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
  const [textFocus, setTextFocus] = useState(noTextFocus);

  useEffect(() => {
    // Obtener los datos de localStorage y convertirlos de nuevo a un array
    const storedFavoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || [];
    setFavoriteCards(storedFavoriteCards);
    console.log(storedFavoriteCards)
  }, []);


  const textToWithout = (cardText) => {
    // Eliminar espacios y reemplazarlos con guiones
    const fraseProcesada = cardText.replace(/\s+/g, '-');
    return fraseProcesada;
  }

  // Copiar URl
  const onCopyUrl = (cardText) => {
    ToastCustom({ text: 'URL copiada correctamente!' })
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL + `&text=${textToWithout(cardText)}`)
  }

  // Copiar Texto a porta papeles.
  const copyToClipboard = ({ cardText }) => {
    if (!navigator.clipboard) {
      ToastCustom({ text: 'Tu navegador no es compatible con esta funcion :(' })
    } else {
      try {
        navigator.clipboard.writeText(cardText);
        ToastCustom({ text: 'Texto copiado correctamente!' })
      } catch (err) {
        console.error('Async: Could not copy text: ', err);
      }
    }
  }

  const [showModal, setShowModal] = useState(false)
  const [ cardToDeleteId, setCardToDeleteId ] = useState(null)

  const openModal = (id) => {
    setShowModal(true)
    setCardToDeleteId(id)
  }

  // Eliminar carta de local storage.
  const removeFavoriteCard = (id) => {

    setShowModal(false)

    // Filtrar las tarjetas favoritas y mantener solo las que no coincidan con el ID proporcionado
    const updatedFavoriteCards = favoriteCards.filter((card) => card.id !== id);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('favoriteCards', JSON.stringify(updatedFavoriteCards));

    // Actualizar el estado del componente
    setFavoriteCards(updatedFavoriteCards);
    ToastCustom({ text: "Carta eliminada correctamente." })
  };

  const downloadToImage = async ({ cardId }) => {
    setToImageLoader(true)
    setTimeout(function () {
      setToImageLoader(false)
    }, 1000); // 1000 milisegundos = 1 segundo
    const element = document.getElementById('elementToDownload-' + cardId);
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


  return (
    <div>
      {
        showModal ?
          <div className="bg-black bg-opacity-80 w-screen h-screen fixed z-50  top-0 left-0 flex justify-center items-center">
            <div className="min-w-[400px] min-h-[200px] bg-stone-100 rounded-lg p-6 flex justify-between flex-col">
              <span className="scale-115"><Badge text="Seguro que quiere eliminar de favoritos?" icon={true} /></span>
              <p className="max-w-md mb-8 px-2 mt-4 font-medium opacity-70">Si eliminas dicha carta tendras que tener la suerte de volver a generarla para recordarla</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => { removeFavoriteCard(cardToDeleteId) }} className="bg-blue-500 text-white rounded-md px-2 py-1 text-md hover:scale-105 focus:ring-4 focus:ring-blue-200">Confirmar</button>
                <button onClick={() => { setShowModal(false) }} className="bg-stone-500 text-white rounded-md px-2 py-1 text-md hover:scale-105 focus:ring-4 focus:ring-stone-200">Cancelar</button>
              </div>
            </div>
          </div> : ''
      }
      <div className="mt-6">
        <h1 className="text-4xl font-black text-blue-500">Favoritos</h1>
        <p className="font-medium opacity-50">Recuerda, mira, comparte y elimina tus frases favoritas generadas</p>
      </div>
      <hr className="mb-24 mt-6 max-w-4xl mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {
          favoriteCards.map((card, index) => (
            <div className="flex flex-col justify-center items-center gap-4  scale-75 select-none">
              <div id={`elementToDownload-` + card.id} className="scale-100 hover:scale-105 transition-all hover:ring-[15px] ring-stone-200 hover:outline-stone-100 hover:outline outline-8 rounded-3xl">
                <CardTemplate key={index} cardData={cardData} text={card.text} />
              </div>
              <div className="flex justify-center gap-8 items-center text-3xl">
                <button className=' opacity-50 hover:scale-110 transition-all' >
                  <Popover.Root >
                    <Popover.Trigger asChild>
                      <button clas
                        sName="IconButton" aria-label="Update dimensions">
                        <i className="ri-share-forward-line"></i>
                      </button>
                    </Popover.Trigger>
                    <Popover.Portal >
                      <Popover.Content className="flex divide-y flex-col gap-2 items-center bg-white p-2 rounded-lg" sideOffset={5}>
                        <div className="text-center items-center">
                          <a className={stylesToolsGen.shareButtons} href={'https://twitter.com/intent/tweet?text=' + card.text} target="_blank"><i class="ri-twitter-x-line"></i>Twitter</a>
                        </div>
                        <div>
                          <button className={stylesToolsGen.shareButtons} onClick={() => onCopyUrl(card.text)}><i class="ri-link"></i> Copiar enlace</button>
                        </div>
                        <div>
                          <button className={stylesToolsGen.shareButtons} onClick={() => copyToClipboard({ cardText: card.text })}><i class="ri-file-list-3-line"></i> Copiar Txt</button>
                        </div>
                        <Popover.Arrow className="opacity-30" />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root></button>

                <button className={stylesToolsGen.common + ' opacity-50'} onClick={() => { downloadToImage({ cardId: card.id }) }}><i className="ri-download-line "></i></button>

                <button onClick={ () => { openModal(card.id) }} className="text-red-600 opacity-50 hover:opacity-100 transition-all">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
