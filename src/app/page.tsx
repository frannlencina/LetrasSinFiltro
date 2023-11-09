'use client'
import Badge from "./components/Badge";
import Generator from "./components/blocks/Generator";
import EmotionButtons from './components/EmotionButtons'
import { EmotionProvider, useEmotion } from "./context/EmotionContext";
import MenubarGen from './components/blocks/MenubarGen'

export default function Home() {

  const images = [
    { src: "/memoji-triste.png", alt: "Memoji triste" },
    { src: "/memoji-enamorado.png", alt: "Memoji enamorado" },
    { src: "/memoji-festejando.png", alt: "Memoji festejando" },
    { src: "/memoji-enojado.png", alt: "Memoji enojado" },
    { src: "/memoji-loco.png", alt: "Memoji loco" },
  ];

  const { emotion } = useEmotion();

  return (
    <>
      <EmotionProvider>
        <main className="flex min-h-screen flex-col items-center justify-center max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center pt-48 pb-12">

            <Badge text="Alpha v1.0" type="yellow" icon={true} />

            <div className="flex flex-col justify-center items-start gap-4 p-4">
              <h1 id="heroTitle" className="font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200 text-3xl sm:text-6xl text-center max-w-3xl">Generá <span id="heroTitleMid" className="text-stone-800">frases que te</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-200">identifiquen</span></h1>
              <h4 className="text-center font-medium opacity-50 max-w-lg mx-auto ">Tu desahogo emocional tiene un espacio en nuestras frases. Cada palabra es un portal para expresar tus emociones, brindándote un refugio en el vasto mundo digital.</h4>
            </div>
          </div>
          <div className="flex flex-col gap-6 justify-center mt-16">
            <EmotionButtons />
          </div>
          <div className="flex justify-center items-center translate-y-24">
            <MenubarGen />
          </div>
          <Generator />
        </main>
      </ EmotionProvider>
    </>
  )
}
