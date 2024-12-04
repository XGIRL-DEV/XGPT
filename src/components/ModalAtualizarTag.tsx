import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import supabase from "@/database/supabase";
import { updateTag } from "@/actions/ProfileActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalAtualizarTagProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAtualizarTag: React.FC<ModalAtualizarTagProps> = ({
  isOpen,
  onClose,
}) => {
  const [tagInput, setTagInput] = useState("");

  // Obtém dados do Redux
  const tagRedux = useSelector((state: any) => state.profile?.profile?.tag);
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!tagInput.trim()) {
      toast.error("O estado não pode estar vazio!");
      return;
    }
  
    try {
      // Obter sessão do usuário
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error("Erro ao obter sessão:", sessionError);
        toast.error("Erro ao autenticar. Faça login novamente.");
        return;
      }
  
      // Atualizar tag no Supabase
      const { data, error } = await supabase
        .from("ProfilesData") // Nome da tabela
        .update({ tag: tagInput }) // Atualiza o campo `tag`
        .eq("userUID", userUID);
  
      if (error) {
        console.error("Erro ao atualizar o estado:", error.message || error);
        toast.error("Erro ao atualizar o estado. Tente novamente.");
      } else {
        console.log("Estado atualizado com sucesso:", data);
        // Atualiza o estado no Redux
        dispatch(updateTag(tagInput));
        toast.success("Novo estado atualizado com sucesso!");
  
        // Adiar o fechamento do modal para permitir exibição do toast
        setTimeout(() => {
          onClose(); // Fecha o modal
        }, 1600); // 300ms de delay
        setTagInput(""); // Limpa o campo de entrada
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro inesperado.");
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        style={{ zIndex: 10500 }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 flex justify-center items-center px-8 bg-black bg-opacity-60 backdrop-blur-md z-50">
          <div
           // Vincula a referência ao modal
            className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-2xl overflow-hidden"
          >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg md:text-xl text-white font-semibold">
              Atualizar Estado
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-700"
            >
              <FaTimes
                size={16}
                className="text-gray-400 hover:text-pink-500 transition-colors"
              />
            </button>
          </div>
  
          {/* Separator */}
          <div className="border-t border-gray-700 mb-6"></div>
  
          {/* Description */}
          <div className="text-gray-400 mb-6">
            <p>
              <span className="text-pink-500 font-medium">Nota:</span> Alterar o
              estado do seu perfil ajuda a mantê-lo em destaque na primeira
              página. Atualize regularmente para maximizar sua visibilidade e
              personalizar seu perfil!
            </p>
          </div>
  
          {/* Input Field */}
          <div>
            <label htmlFor="tagInput" className="block text-sm text-gray-300 mb-2">
              Escreva o novo estado:
            </label>
            <input
              id="tagInput"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Digite a nova tag"
              className="w-full p-3 bg-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
  
          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors mr-2 text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-700 transition-colors text-white"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ModalAtualizarTag;
