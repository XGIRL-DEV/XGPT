/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";
import { VscVerifiedFilled } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

interface CertificadoProps {
  setShowCertificado: (show: boolean) => void;
  selectedProfile?: {
    nome: string;
    Tarifa: number;
    // Add other necessary properties here
  };
}

const Certificado: React.FC<CertificadoProps> = ({ setShowCertificado }) => {
  const [mostrarCertificado, setMostrarCertificado] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null); // Referência para o modal
  const { t, i18n } = useTranslation();

  // Função para fechar o modal
  const fecharCertificado = () => {
    setMostrarCertificado(false);
    setShowCertificado(false); // Resetar o estado showCertificado no componente Profile
  };

  // Fechar o modal se clicar fora dele
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      fecharCertificado();
    }
  };

  // Usando useEffect para adicionar o evento de clique fora do modal
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Adiciona o ouvinte de evento
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Remove o ouvinte quando o componente desmontar
    };
  }, []);

  return (
    <>
      {mostrarCertificado && (
        <div className="fixed inset-0 flex justify-center items-center px-8 bg-black bg-opacity-60 backdrop-blur-md z-50">
          <div
            ref={modalRef} // Vincula a referência ao modal
            className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg md:text-xl text-white font-semibold">
              {t("profile.certified_profile")}
              </h1>
              <button onClick={fecharCertificado} className="p-2 rounded-full hover:bg-gray-700">
                <ImCross
                  size={16}
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                />
              </button>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-700 mb-6"></div>

            {/* Certificado Badge */}
            <div className="flex items-center justify-center bg-green-600 py-2 px-4 rounded-lg mb-6">
              <span className="text-white font-medium">{t("profile.certified")}</span>
              <VscVerifiedFilled size={20} className="text-white ml-2" />
            </div>

            {/* Certificado Description */}
            <div className="text-gray-400">
  <p className="mb-4">
    {t("profile.certified_description_1", {
      team: <span className="text-pink-500 font-medium">XGirl</span>,
    })}
  </p>
  <p className="mb-4">{t("profile.certified_description_2")}</p>
  <p>
    <strong className="text-gray-200">{t("profile.certified_satisfaction")}</strong>
  </p>
</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificado;
