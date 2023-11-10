
type SocialShareProps = {
    text: string;
};
const SocialShare: React.FC<SocialShareProps> = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center text-center text-2xl p-4 font-black rounded-3xl  text-white  w-[360px] h-[360px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                
            </div>
        </div>
    )
}
export default SocialShare;