'use client'

// Context
import { EmotionProvider } from "./context/EmotionContext"

// Components
import Link from "next/link"
import Badge from "./components/Badge"
import GenTab from "./components/blocks/GenTab"

// Utils
import HomeSteps from './utils/HomeSteps.json'
import IndexCardUrl from '../app/utils/IndexCardsUrl.json'
import IndexCards from "./components/IndexCards"

export default function Home() {
  return (
    <EmotionProvider>
      <main className="flex min-h-screen flex-col items-center justify-center mx-auto">
        <section className="min-h-screen min-w-screen" id="heroHome">
          <section className="mt-44 mx-auto p-6 max-w-6xl ">
            <div className="flex items-center justify-center">
              <Badge text="Generador de indirectas ya disponible" icon={true} type="success" />
            </div>
            <div className="flex flex-col max-w-3xl mx-auto text-center mt-8">
              <h1 className="text-4xl sm:text-6xl font-bold">Tu historia, tus palabras, nuestro generador único.</h1>
              <h4 className="text-lg font-medium opacity-60">Crea frases que motiven y conecten. Tu historia merece ser contada. Únete a nosotros y comparte tu inspiración</h4>
              <div className="flex justify-center items-center gap-4 mt-8">
                <Link className="text-black bg-transparent border border-gray-300 py-2 px-4 rounded-lg hover:bg-black hover:text-white transition-all duration-200" href="/generator">Generador</Link>
                <button className="text-white select-none cursor-not-allowed  bg-blue-600 py-2 px-4 rounded-lg transition-all duration-200">Plantillas <i className="ri-arrow-right-line"></i> </button>
              </div>
            </div>
            <div className="flex flex-col gap-y-16 sm:flex-row sm:gap-24 justify-center items-center mt-32">
              {
                HomeSteps.map((step, index) => (
                  <div className="max-w-[180px]" key={index}>
                    <img src={`/assets/imgs/home/${step.img}`} alt={`Paso numero ${index}`} />
                    <p className="opacity-70">{step.text}</p>
                  </div>
                ))
              }
            </div>
          </section>
        </section>
        <section className="flex flex-col mx-auto my-24 p-6 max-w-6xl" id="heroTemplates">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="font-extrabold text-3xl sm:text-5xl">Las <span className="font-extrabold bg-gradient-to-b from-[#10468F] to-[#106beb59]  bg-clip-text text-transparent">plantillas perfectas</span> para dar vida a <span className="font-extrabold bg-gradient-to-b from-[#943C95] to-[#F778EC]  bg-clip-text text-transparent">tus pensamientos</span></h2>
              <h4 className="opacity-50 font-medium text-lg sm:text-xl">Libera tu imaginación con nuestras plantillas personalizables. Únete y dale vida a tus ideas.</h4>
              <div className="mt-6">
                <Link className="text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-200" href="/templates">Explorar <i className="ri-arrow-right-line"></i> </Link>
              </div>
            </div>
              <div className="m-4 mx-auto mt-24 max-w-[80%] sm:max-w-[100%] max-h-[70%] sm:min-h-[50px] min-w-[50px]">
                <IndexCards src="/index-post-1.png" href="/" />
              </div>
          </div>
          <div className="flex justify-center gap-4 max-w-[100%] mt-8 items-center sm:gap-0 sm:items-start sm:justify-between sm:mt-12">
            {
              IndexCardUrl.map( ({ src, href }, index)  => (
                <div key={index} className="w-[25%]">
                  <IndexCards src={src} href={href} />
                </div>
              ))
            }
          </div>
        </section>
        <section className="w-full" id="heroGenerator">
          <section className="max-w-6xl mt-28 mb-6 mx-auto p-6">
            <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-pretty"><span className="font-extrabold bg-gradient-to-b from-[#943C95] to-[#F778EC]  bg-clip-text text-transparent">Sorpresa, intriga y diversion</span> Con nuestro <span className="font-extrabold bg-gradient-to-b from-[#10468F] to-[#106beb59]  bg-clip-text text-transparent">generador</span> de indirectas único</h2>
              <h4 className="text-lg sm:text-xl opacity-50">Expresa tus pensamientos con un toque de misterio. Nuestro generador de indirectas te guía</h4>
            </div>
            <div className="my-32">
              <GenTab select={1} />
            </div>
          </section>
        </section>
      </main>
    </EmotionProvider>
  )
}
