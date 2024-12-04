import React from "react";
import { useSelector } from "react-redux";
import {
  FaEuroSign,
  FaCcMastercard,
  FaBitcoin,
  FaCcVisa,
} from "react-icons/fa";
import { RiPaypalLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa6";

interface TarifasProps {
  selectedProfile: {
    nome: string;
    pagamento: string[];
  };
}

const Tarifas: React.FC<TarifasProps> = ({ selectedProfile }) => {
  const tarifaRedux = useSelector(
    (state: any) => state.profile && state.profile?.profile?.tarifa
  );
// console.log("tarifa: ", tarifaRedux)


  const pagamentos = selectedProfile?.pagamento;

  return (
    <div className="bg-gray-800 px-10 pt-10 pb-10 w-full border border-zinc-700 rounded-3xl">
      <p className="text-pink-600 text-2xl">Tarifas</p>
      <p className="text-white text-lg mt-4 mb-8">
        Tarifas a partir de {tarifaRedux} €
      </p>
      <p className="text-pink-600 text-2xl">Aceita:</p>
      {pagamentos && Array.isArray(pagamentos) ? (
        <div className="grid grid-cols-2 mt-4">
          {pagamentos.map((pagamento, index) => (
            <div key={index} className="flex items-center text-white my-2">
              {pagamento === "Paypall" && (
                <RiPaypalLine className="mr-2 text-blue-400" />
              )}
              {pagamento === "Bitcoin" && (
                <FaBitcoin className="mr-2 text-orange-400" />
              )}
              {pagamento === "Euro" && (
                <FaEuroSign className="mr-2 text-yellow-500" />
              )}
              {pagamento === "Mastercard" && (
                <FaCcMastercard className="mr-2 text-blue-400" />
              )}
              {pagamento === "Dollars" && (
                <FaDollarSign className="mr-2 text-blue-400" />
              )}
              {pagamento === "Visa" && (
                <FaCcVisa className="mr-2 text-blue-400" />
              )}
              <p className="">{pagamento}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">Nenhum método de pagamento selecionado.</p>
      )}
    </div>
  );
};

export default Tarifas;
