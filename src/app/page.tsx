'use client'
import Badge from "./components/Badge"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-6xl mx-auto">
      <section id="heroHome">
        <div className="flex items-center justify-center">
          <Badge text="Generador de indirectas ya disponible" icon={true} type="warning" />
        </div>
        <div className="flex flex-col max-w-2xl mx-auto text-center mt-8">
          <h1 className="text-5xl font-bold">Tu historia, tus palabras, nuestro generador único.</h1>
          <h4 className=" text-lg font-medium opacity-60">Crea frases que motiven y conecten. Tu historia merece ser contada. Únete a nosotros y comparte tu inspiración</h4>
          <div className="flex justify-center items-center gap-4 mt-4">
            <Link className="text-black bg-white border border-gray-500  py-2 px-4 rounded-lg" href="/generator">Generador</Link>
            <Link className="text-white bg-blue-600 py-2 px-4 rounded-lg" href="/templates">Plantillas <i className="ri-arrow-right-line"></i> </Link>
          </div>
        </div>
      </section>
      <section id="heroTemplates"></section>
      <section id="heroGenerator"></section>
    </main>
  )
}
