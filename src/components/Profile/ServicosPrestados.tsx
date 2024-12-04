import React from "react";
import { FaCheck } from "react-icons/fa6";

interface ServicosPrestadosProps {
  selectedProfile: any;
}

const ServicosPrestados: React.FC<ServicosPrestadosProps> = ({
  selectedProfile,
}) => {
  const servico = selectedProfile?.servico;

  return (
    <div className="bg-gray-800 grid gap-2 py-6 w-full px-10  border border-zinc-700 rounded-3xl">
      <p className="text-pink-600 text-2xl mb-2">Serviços Prestados</p>
      {servico && Array.isArray(servico) ? (
        <div className="grid grid-cols- md:grid-cols-3 gap-3 w-full">
          {servico.map((servicoItem, index) => (
            <div key={index} className="flex items-center text-sm text-white">
              <FaCheck className="text-green-600 mr-2" /> {/* Visto verde */}
              {servicoItem}{" "}
              {/* Renderiza cada serviço em uma linha separada, trim() remove espaços em branco */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">Nenhum serviço</p>
      )}
    </div>
  );
};

export default ServicosPrestados;
