import Image from "next/image"
import Generator from "./components/blocks/Generator";

export default function Home() {
  const images = [
    { src: "/memoji-triste.png", alt: "Memoji triste" },
    { src: "/memoji-enamorado.png", alt: "Memoji enamorado" },
    { src: "/memoji-festejando.png", alt: "Memoji festejando" },
    { src: "/memoji-enojado.png", alt: "Memoji enojado" },
    { src: "/memoji-loco.png", alt: "Memoji loco" },
  ];
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center pt-48 pb-12">
          <span className="bg-yellow-200 bg-opacity-50 text-yellow-600 px-3 py-1 rounded-md text-xs font-medium">Alpha v1.0</span>
          <div className="flex flex-col justify-center items-start gap-4 p-4">
            <h1 id="heroTitle" className="font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200 text-3xl sm:text-6xl text-center max-w-3xl">Generá <span id="heroTitleMid" className="text-stone-800">frases que te</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-200">identifiquen</span></h1>
            <h4 className="text-center font-medium opacity-50 max-w-lg mx-auto ">Tu desahogo emocional tiene un espacio en nuestras frases. Cada palabra es un portal para expresar tus emociones, brindándote un refugio en el vasto mundo digital.</h4>
          </div>
        </div>
        <div className="max-w-6xl">
          <div className="flex gap-4">
            <h4 className="font-black text-black text-2xl ">Mood</h4>
            <p className="opacity-50 bg-stone-200 rounded-lg px-2 py-2 text-center text-xs">Elige el enfoque</p>
          </div>
          <div className="flex gap-2 justify-center mt-16">

            {
              images.map((image, index) => (
                <Image key={index}
                  className="hover:bg-blue-500 rounded-lg cursor-pointer"
                  src={image.src}
                  width={80}
                  height={80}
                  alt={image.alt} />
              ))
            }
          </div>
        </div>
        <Generator />
      </main>
    </>
  )
}
