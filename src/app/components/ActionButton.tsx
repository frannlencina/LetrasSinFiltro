import { useState } from "react"
import MoonLoader from "react-spinners/MoonLoader";

interface Props {
    onClick?: () => void,
    className?: string
    type: keyof Styles,
    disabled?: boolean 
}

interface Styles {
    normal: string,
    secondary: string,
    submit: string
}

const disabledStyle = 'disabled:cursor-default disabled:text-white disabled:bg-stone-200 disabled:text-[#5596F1] disabled:hover:scale-100 disabled:px-4 disabled:py-2'

const styles: Styles = {
    normal: 'text-white select-none bg-blue-600 py-2 px-4 rounded-lg transition-all duration-200',
    secondary: 'text-black bg-transparent border border-gray-300 py-2 px-4 rounded-lg hover:bg-black hover:text-white transition-all duration-200',
    submit: `text-white select-none bg-blue-600 py-2 px-4 rounded-lg transition-all duration-200 ${disabledStyle}`
};

export default function ActionButton( {onClick, type, disabled, children }: React.PropsWithChildren<Props> ){
    
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await onClick?.();
        setIsLoading(false);
    };

    return(
        <button 
            className={styles[type]} 
            onClick={handleClick} 
            disabled={disabled || isLoading}> {isLoading ? <div className="flex items-center justify-center gap-2 "> <MoonLoader size={15} loading={true} /></div> : children } </button>
    )
}