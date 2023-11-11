import toast from 'react-hot-toast';

type ToastProps = {
    text: string;
};

export const ToastCustom: React.FC<ToastProps> = ({ text }) => {
    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 py-4 pl-4">
                <div className="flex items-start">
                    <div className=" pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="/memoji-festejando.png"
                            alt=""
                        />
                    </div>
                    <div className="ml-3  w-fit">
                        <p className="text-sm font-medium text-gray-900 w-fit">
                            Francisco Lencina
                        </p>
                        <p className="text-xs opacity-70 font-medium text-gray-900 w-fit">
                            @frannlencina
                        </p>
                        <p className="mt-1 text-sm text-black w-fit">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-fit text-xl h-fit border border-transparent rounded-2xl px-2 py-1 m-2 flex items-center justify-center font-medium  text-red-600 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <i className="ri-close-fill pointer-events-none"></i>
                </button>
        </div>
    ))
}