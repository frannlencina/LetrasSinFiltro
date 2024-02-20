export default function AboutUs() {

    const aboutCards =
    {
        "Por que?": {
            description: "LetrasSinFiltro comenzó con el objetivo de crear un proyecto que ayudara a las personas a expresar sus sentimientos de forma rápida y sencilla a través de las redes sociales u otros medios.",
        },
        "Mision": {
            description: "Nuestra misión es proporcionar un espacio donde las personas puedan desahogarse de manera más fácil y también ofrecer una herramienta para aquellas comunidades que se dedican a crear frases e indirectas para estas personas.",
        },
        "Vision": {
            description: "Nuestra visión es convertirnos en el principal recurso en línea para aquellos que buscan expresar sus pensamientos y sentimientos de manera creativa y significativa, creando un impacto positivo en la comunidad en general.",
        },
        "Equipo": {
            description: "Contamos con un equipo dedicado y apasionado que comparte la visión de LetrasSinFiltro. Nuestros miembros provienen de diversas disciplinas y aportan una variedad de habilidades para hacer realidad nuestro objetivo común."
        },
        "Contacto": {
            description: "Puedes ponerte en contacto con nosotros a través de nuestro correo electrónico contact@letrassinfiltro.com o enviándonos un mensaje a través de nuestras redes sociales."
        },
        "Donacion": {
            description: "Si deseas apoyar nuestra misión y ayudarnos a expandir nuestro alcance, considera realizar una donación. Tu contribución nos permitirá seguir mejorando nuestros servicios y llegar a más personas que necesitan expresarse."
        }
    };


    return (
        <div className="w-full h-full flex flex-col justify-center items-center mt-48">
            <div>
                <h2 className=" text-md sm:text-2xl">sobre</h2>
                <h1 className=' text-3xl sm:text-5xl font-black text-center text-blue-600'>LetrasSinFiltro</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 p-4 sm:p-12 max-w-6xl">
                {
                    Object.entries(aboutCards).map(([title, info], index) =>
                        <div key={index} className="max-w-2xl border rounded-xl p-4 pointer-events-none">
                            <h4 className="font-bold text-lg sm:text-2xl mb-2">{title}</h4>
                            <p className="text-sm opacity-70">{info.description}</p>
                        </div>
                    )

                }

            </div>
        </div>
    )
}

