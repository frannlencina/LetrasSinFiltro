type CardTemplateProps = {
    text: string;
};
const CardTemplate: React.FC<CardTemplateProps> = ({ text }) => {
    return (
        <div className="flex justify-center items-center text-center text-2xl p-4 font-black rounded-3xl mt-32  text-white pointer-events-none select-none cursor-pointer  w-[360px] h-[360px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <p>{text}</p>
        </div>
    )
}
export default CardTemplate;