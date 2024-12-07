import { useState, useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

interface PartilhaProps {
  selectedProfile: {
    nome: string;
    Tarifa: number;
    email: string;
  };
  setShowPartilha: (show: boolean) => void;
}

const Partilha: React.FC<PartilhaProps> = ({
  selectedProfile,
  setShowPartilha,
}) => {
  const [mostrarPartilha, setMostrarPartilha] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null); // Referência para o modal
  const [copySuccess, setCopySuccess] = useState(false); // Estado para verificar se o link foi copiado com sucesso
  const { t, i18n } = useTranslation();

  // Função para fechar o modal
  const fecharPartilha = () => {
    setMostrarPartilha(false);
    setShowPartilha(false); // Resetar o estado showPartilha no componente Profile
  };

  // Função para copiar o link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true); // Definir como verdadeiro quando o link for copiado
    toast.success("O link foi copiado com sucesso!", {
      position: "top-right",
      autoClose: 3000, // Tempo em milissegundos para o toast desaparecer
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Fechar o modal se clicar fora dele
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      fecharPartilha();
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
      <ToastContainer />
      {mostrarPartilha && (
        <div className="fixed inset-0 flex justify-center items-center px-8 bg-black bg-opacity-60 backdrop-blur-md z-50">
          <div
            ref={modalRef} // Vincula a referência ao modal
            className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg md:text-xl text-white font-semibold">
              {t("profile.share_profile_of", { nome: selectedProfile?.nome })}
              </h1>
              <button className="p-2 rounded-full hover:bg-gray-700" onClick={fecharPartilha}>
                <ImCross
                  size={16}
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                />
              </button>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-700 mb-6"></div>

            {/* URL Display */}
            <div className="flex justify-center my-6">
              <p className="text-white text-sm break-words">{window.location.href}</p>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-700 my-6"></div>

            {/* Share Options */}
            <div className="flex flex-col gap-4">
              {/* Email Sharing */}
              <div className="bg-blue-600 hover:bg-blue-500 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <a
                  href={`mailto:${selectedProfile?.email}?subject=Assunto do Email&body=Corpo do Email`}
                  className="flex items-center"
                >
                  <MdEmail size={22} className="mr-2 text-white" />
                  <span className="text-white font-medium">{t("profile.share_by_email")}</span>
                  </a>
              </div>

              {/* Copy Link */}
              <div
                className="bg-pink-700 hover:bg-pink-600 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                onClick={copyToClipboard}
              >
                <MdContentCopy size={22} className="mr-2 text-white" />
                <span className="text-white font-medium">{t("profile.copy_link")}</span>
                </div>

              {/* Copy Success Message */}
              {copySuccess && (
                <div className="flex justify-center mt-2">
<span className="text-green-500 text-sm">{t("profile.link_copied")}</span>
</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Partilha;
