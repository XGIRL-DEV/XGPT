/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaMapMarkerAlt, FaFireAlt, FaVideo } from "react-icons/fa"; // Ícone de "Movie"
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiMessage2Fill } from "react-icons/ri";
import { MdFiberManualRecord } from "react-icons/md";  // Ícone de "Live"
import Image from "next/image";
import { useEffect, useState } from "react";

interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[]; // Histórias
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  live: boolean | string;
   // live pode ser booleano ou string
}

interface MainCardProps {
  profiles: Profile[];
  currentPage: number; // Página atual
  itemsPerPage: number; 
  onProfileClick: () => void;
  customClass?: string;
 
}

const MainCard: React.FC<MainCardProps> = ({ profiles, currentPage, itemsPerPage, onProfileClick, a }) => {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);
 

  const formatTimeElapsed = (minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60;

    if (hoursElapsed > 48) {
      return "Há mais de 48 horas";
    } else if (minutesElapsed < 60) {
      return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(hoursElapsed);
      const minutes = minutesElapsed % 60;
      return `Há ${hours} hora${hours !== 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? 's' : ''}` : ''}`;
    }
  };

  const calculateTimeElapsed = (tagTimestamp: string): string => {
    const timestampDate = new Date(tagTimestamp);
  
    // Check if the timestamp is a valid date
    if (isNaN(timestampDate.getTime())) {
      return "Tempo indeterminado";
    }
  
    const currentTime = Date.now();
    const elapsedTime = currentTime - timestampDate.getTime();
    const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));
  
    return formatTimeElapsed(minutesElapsed);
  };

  useEffect(() => {
    const timeElapsed = profiles.map((profile) => calculateTimeElapsed(profile.tagtimestamp));
    setTimeElapsedList(timeElapsed);

    const interval = setInterval(() => {
      const updatedTimeElapsed = profiles.map((profile) => calculateTimeElapsed(profile.tagtimestamp));
      setTimeElapsedList(updatedTimeElapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, [profiles]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-5 gap-6 md:gap-8 mt-4 pb-16">
      {paginatedProfiles.map((profile, index) => (
        <Link
          key={index}
          href={`/Acompanhantes/${profile.nome}`}
          className="group rounded-xl bg-gray-800 shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
          onClick={onProfileClick} 
        >
          {/* Imagem e Badge */}
          <div className="relative w-full h-64 bg-gray-800">
            {/* Live Sex Badge - Corrigido para verificar a condição corretamente */}
            {profile.live && (
              <div className="absolute flex top-4 left-2 md:left-4 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 animate-pulse">
                <MdFiberManualRecord className="text-white mr-1 text-xs items-center" />
                <span className="text-xs">Live Cam</span>
              </div>
            )}

            {/* Stories Badge - Corrigido para verificar se stories existe e tem conteúdo */}
            {Array.isArray(profile.stories) && profile.stories.length > 0 && (
              <div className="absolute top-4 right-2 md:right-3 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center">
                <FaVideo className="text-white mr-1 text-xs" />
                <span className="text-xs">Stories</span>
              </div>
            )}

            <Image
              src={profile.photos[0] || "/logo.webp"}
              alt={profile.nome}
              className="w-full h-full object-cover group-hover:scale-105 transition-all rounded-t-lg"
              priority
              width={500}
              height={500}
            />
            
            {/* Nome e Localização sobre a Imagem */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-semibold text-xl px-4">
            <p className="absolute bottom-7 left-1/2 transform -translate-x-1/2 text-white font-bold text-md md:text-xl px-2 rounded whitespace-nowrap flex items-center">
              {profile.nome}
              {profile.certificado && (
                <VscVerifiedFilled className="text-green-400 ml-2" />
              )}
            </p>              <p className="text-sm text-gray-300 mt-1 flex items-center">
                <FaMapMarkerAlt className="text-pink-800 mr-2" />
                {profile.cidade}
              </p>
            </div>
          </div>

          {/* Rodapé com Tag e Tempo */}
       <div className="bg-gray-800 border-t border-gray-600 rounded-b-lg p-4 flex flex-col items-center">
  {/* Tag com animação de atualização recente */}
  <div className="mb-2 flex items-center">
  <span
    className={`text-xs font-medium text-gray-200 px-3 py-1 rounded-full bg-gray-800 ${profile.tagtimestamp && timeElapsedList[index] && timeElapsedList[index].includes("há") ? "animate-pulse" : ""}`}
  >
    &quot;{profile.tag}&quot;
  </span>
  {/* Tamanho fixo para o ícone */}
</div>

  {/* Mostrar o tempo de atualização */}
  <div className="flex items-center space-x-2">
    <p className="text-yellow-500 text-xs">
      {timeElapsedList[index]} {/* Tempo desde que a tag foi atualizada */}
    </p>
    <RiMessage2Fill className="text-yellow-500 ml-2" />

  </div>
</div>
        </Link>
      ))}
    </div>
  );
};

export default MainCard;
