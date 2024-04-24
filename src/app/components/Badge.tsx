interface BadgeProps {
    text: string;
    icon: boolean;
    type: string;
}

interface BadgeType {
    style: string;
    icon: string;
}

interface Types {
    [key: string]: BadgeType;
}

const types: Types = {
    defaultStyle: {
        style: ' bg-opacity-50 px-3 py-1 rounded-md text-sm font-medium ',
        icon: 'arrow-right-s-line'
    },
    success: {
        style: ' bg-green-200 text-green-600 ',
        icon: 'shield-check-line'
    },
    information: {
        style: ' bg-blue-200 text-blue-600 ',
        icon: 'info-i'
    },
    warning: {
        style: ' bg-yellow-200 text-yellow-600 ',
        icon: 'error-warning-line'
    },
    attention: {
        style: 'bg-stone-200 text-stone-600',
        icon: 'honour-line'
    },
    error: {
        style: ' bg-red-200 text-red-600 ',
        icon: 'error-warning-fill'
    },
}

const Badge: React.FC<BadgeProps> = ({ text, type, icon }) => {

    const { defaultStyle } = types;
    const selectedType = types[type] || {};

    return (
        <div>
           {icon ? (
                <span className={`${defaultStyle.style} ${selectedType.style}`}>
                    <i className={`ri-${selectedType.icon} mr-2`}></i>
                    {text}
                </span>
            ) : (
                <span className={`${defaultStyle.style} ${selectedType.style}`}>{text}</span>
            )}
        </div>
    );
};

export default Badge;