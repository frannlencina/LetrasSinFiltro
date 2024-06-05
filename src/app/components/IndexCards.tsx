import Image from "next/image"
import Link from "next/link";

interface IndexCardProps {
    src: string;
    href: string;
}

const IndexCards: React.FC<IndexCardProps> = ({ src, href }) => {
    return (
        <Link target="_blank" href={href} className="relative group transition-all duration-200 rounded-xl max-h-full ">
            <Image
                className='group-hover:scale-110 group-hover:skew-x-3 transition-all duration-200 max-w-fill max-h-fit object-cover object-center'
                src={src}
                width={500}
                height={300}
                alt="Picture of a post" />
            <div>
                <div className="text-xs sm:text-base cursor-default px-1 py-1 group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 transition-all group-hover:scale-110 group-hover:skew-x-6 hover:text-white hover:border border-white hover:bg-transparent duration-200 pointer-events-none absolute top-3  right-3 bg-white rounded-full text-black sm:px-3 sm:py-2 text" >
                <i className="ri-arrow-right-up-line"></i>
                </div>
            </div>
        </Link>
    )
}
export default IndexCards;