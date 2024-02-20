'use client'
import Badge from "./components/Badge";
import { EmotionProvider } from "./context/EmotionContext";
import { Toaster } from 'react-hot-toast';
import GenTab from './components/blocks/GenTab'
import { useState } from "react";

export default function Home() {

  const [chooseGen, setChooseGen] = useState(1)

  return (
    <>
      <EmotionProvider>
        <div className="flex min-h-screen flex-col items-center justify-center max-w-6xl mx-auto">
          <Toaster />
          <div className="flex flex-col items-center justify-center pt-48 pb-12">
            <Badge text="Alpha v1.0" type="yellow" icon={true} />
            <div className="flex flex-col justify-center items-start gap-4 p-4">
              <h1 id="heroTitle" className="font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200 text-3xl sm:text-6xl text-center max-w-3xl">Generá <span id="heroTitleMid" className="text-stone-800">frases que te</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-200 ">identifiquen</span></h1>
              <h4 className="text-center font-medium opacity-50 max-w-lg mx-auto ">Tu desahogo emocional tiene un espacio en nuestras frases. Cada palabra es un portal para expresar tus emociones, brindándote un refugio en el vasto mundo digital.</h4>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-12">
            <button onClick={() => setChooseGen(1)} className={chooseGen === 1 ? 'text-lg bg-blue-200 cursor-pointer font-medium text-blue-500 bg-opacity-50 transition-all py-1 px-2 rounded-lg flex items-center gap-4' : 'hover:text-blue-500 bg-stone-200 cursor-pointer font-medium text-stone-500 bg-opacity-50 transition-all py-1 px-2 rounded-lg flex items-center gap-4'} >Generador</button>
            <button onClick={() => setChooseGen(2)} className={chooseGen === 2 ? 'text-lg cursor-pointer font-medium bg-green-200 text-green-500 bg-opacity-50 transition-all py-1 px-2 rounded-lg flex items-center gap-4' : 'hover:text-green-500 cursor-pointer bg-stone-200 font-medium text-stone-500 bg-opacity-50 transition-all py-1 px-2 rounded-lg flex items-center gap-4'} >Favoritos</button>
          </div>
          <section className="flex flex-col gap-6 justify-center mt-16 max-w-4xl">
            <GenTab select={chooseGen} />
          </section>
        </div>
      </EmotionProvider>
    </>
  )
}
