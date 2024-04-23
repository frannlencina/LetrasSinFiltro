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
        style: ' bg-opacity-50 px-3 py-1 rounded-md text-xs font-medium ',
        icon: ''
    },
    succes: {
        style: '',
        icon: ''
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
        style: '',
        icon: ''
    },
    error: {
        style: ' bg-red-200 text-red-600 ',
        icon: 'arrow-up-circle-line'
    },
}

const Badge: React.FC<BadgeProps> = ({ text, type, icon }) => {

    const { defaultStyle } = types;
    const selectedType = types[type] || {};

    return (
        <div>
           {icon ? (
                <span className={`${defaultStyle.style} ${selectedType.style}`}>
                    <i className={`ri-${selectedType.icon}`}></i>
                    {text}
                </span>
            ) : (
                <span className={`${defaultStyle.style} ${selectedType.style}`}>{text}</span>
            )}
        </div>
    );
};

export default Badge;