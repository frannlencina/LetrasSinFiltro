type CardConfig = {
    background: {
        type: 'gradient' | 'solid' | 'image';
        colors?: String;
    };
    text: {
        font: String;
        size: String;
        colorType: {
            solid: 'solid' | 'gradient';
            type: String;
            color: String;
            urlImage: String;
        };
    };
};

type CardData = {
    name: String;
    config: CardConfig;
};

type CardTemplateProps = {
    cardData: CardData;
    text: String
};

const CardTemplate: React.FC<CardTemplateProps> = ({ cardData, text }) => {
    const { name, config } = cardData;

    const backgroundConfig = () => {
        switch (config.background.type) {
            case 'gradient':
                // Lógica para fondos de gradiente
                return config.background.colors;
            case 'solid':
                // Lógica para fondos sólidos
                return config.background.colors
            case 'image':
                // Lógica para fondos de imagen
                return {
                    backgroundImage: `url(${config.background.colors})`,
                };
            default:
                return {};
        }
    };

    const textConfig = () => {
        const textStyle = {
            fontFamily: config.text.font as string, fontSize: config.text.size as string, color: ''
        };

        if (config.text.colorType.type === 'solid') {
            textStyle.color = config.text.colorType.color as string;
        } else if (config.text.colorType.solid === 'gradient') {
            textStyle.color = `#0000`
        }

        return textStyle;
    };

    return (
        <div className="flex flex-col gap-3">
            <div
                className={`flex flex-col justify-center items-center text-center text-2xl p-4 font-black rounded-3xl text-white w-screen max-w-[360px] sm:w-[360px] h-[360px]  ` + backgroundConfig()}>
                {
                    config.text.colorType.type === 'gradient' ?  <p style={textConfig()} >{text}</p> : <p style={textConfig()}>{ text }</p>
                }
            </div>
            
        </div>
    );
};

export default CardTemplate;
