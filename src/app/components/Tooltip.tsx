
type TooltipProps = {
    text: string;
};
const Tooltip: React.FC<TooltipProps> = ({ text }) => {
    return (
        <span className='hidden group-hover:block group-hover:animate-fadeIn  absolute z-20 text-blue-200 font-medium bg-blue-800 rounded-lg text-xs -translate-y-4 -translate-x-1 px-2 py-[2px] '>{text}</span>
    )
}
export default Tooltip;