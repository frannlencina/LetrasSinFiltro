import Image from "next/image";
import Link from "next/link";

type CardSocialProps = {
  name: string;
  logoSrc: string;
  desc: string;
  link: string;
};

const CardSocial: React.FC<CardSocialProps> = ({ name, logoSrc, desc, link }) => {
  return (
    <Link href={link} className="min-w-32 max-w-xs bg-white p-8 shadow-lg rounded-2xl hover:scale-105 transition-all my-12" target="_blank">
      <div className="flex gap-2 mb-4">
        <Image className="rounded-lg" src={logoSrc} width={30} height={30} alt={name} />
        <h4 className="text-xl">{name}</h4>
      </div>
      <div>
        <p className="opacity-50">{desc}</p>
      </div>
    </Link>
  );
};

export default CardSocial;