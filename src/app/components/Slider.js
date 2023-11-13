import Image from "next/image"

export default function Slider(props){

    return(
        <div>
            <div className="embla overflow-hidden" ref={emblaRef}>
            {items.map((image, index) => (
                    <button key={index}>
                        <Image
                            className={image.emotion === emotion ? 'rounded-lg cursor-pointer bg-blue-500 scale-110' : 'rounded-lg cursor-pointer hover:scale-110 transition-all hover:bg-blue-500 '}
                            src={image.src}
                            width={80}
                            height={80}
                            alt={image.alt}
                        />
                    </button>
                ))}
        </div>
        </div>
    )
}