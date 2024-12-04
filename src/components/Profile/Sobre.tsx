import React from "react";
import { FaCheck, FaWeightScale } from "react-icons/fa6";
import { AiOutlineScissor } from "react-icons/ai";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaMapMarkerAlt, FaFlag, FaEye } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";

interface Profile {
  nome: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  peso: string;
  tatuagens: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
}

interface SobreProps {
  selectedProfile?: Profile;
}

const signoIcons: { [key: string]: JSX.Element } = {
  Carneiro: <TbZodiacAries className="text-pink-800 mr-2" />,
  Touro: <TbZodiacTaurus className="text-pink-800 mr-2" />,
  Gémeos: <TbZodiacGemini className="text-pink-800 mr-2" />,
  Caranguejo: <TbZodiacCancer className="text-pink-800 mr-2" />,
  Leão: <TbZodiacLeo className="text-pink-800 mr-2" />,
  Virgem: <TbZodiacVirgo className="text-pink-800 mr-2" />,
  Balança: <TbZodiacLibra className="text-pink-800 mr-2" />,
  Escorpião: <TbZodiacScorpio className="text-pink-800 mr-2" />,
  Sagitário: <TbZodiacSagittarius className="text-pink-800 mr-2" />,
  Capricórnio: <TbZodiacCapricorn className="text-pink-800 mr-2" />,
  Aquário: <TbZodiacAquarius className="text-pink-800 mr-2" />,
  Peixes: <TbZodiacPisces className="text-pink-800 mr-2" />,
};

const Sobre: React.FC<SobreProps> = ({ selectedProfile }) => {
  return (
    <div className=" bg-gray-800 grid gap-2 py-3 w-full px-10 border border-zinc-700 rounded-3xl">
      <p className="text-pink-600 text-2xl">Sobre {selectedProfile?.nome} </p>
      <div className="grid grid-cols-2 gap-2 mt-2 mb-4 text-sm">
        <div className="flex items-center">
          <LiaBirthdayCakeSolid className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.idade}</p>
        </div>
        <div className="flex items-center">
          <GiBodyHeight className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.altura}</p>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.distrito}</p>
        </div>
        <div className="flex items-center">
          <FaFlag className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.origem}</p>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.cidade}</p>
        </div>
        <div className="flex items-center">
          <FaWeightScale className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.peso}</p>
        </div>
        <div className="flex items-center">
          <FaCheck className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.tatuagens}</p>
        </div>
        <div className="flex items-center">
          <AiOutlineScissor className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.pelos}</p>
        </div>
        <div className="flex items-center">
          <FaEye className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.olhos}</p>
        </div>
        <div className="flex items-center">
          <FaCheck className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.seios}</p>
        </div>
        <div className="flex items-center">
          <FaCheck className="text-pink-800 mr-2" />
          <p className="text-zinc-200">{selectedProfile?.mamas}</p>
        </div>
        <div className="flex items-center">
          {selectedProfile && signoIcons[selectedProfile?.signo]}
          <p className="text-zinc-200">{selectedProfile?.signo}</p>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
