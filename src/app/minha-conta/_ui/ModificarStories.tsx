/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import supabase from "@/database/supabase";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateStories } from "@/actions/ProfileActions";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { BlurImage } from "@/components/BlurImage";
import { Profile } from "@/types";
import  LoaderBar  from "@/components/LoaderBar";
import StoryBigConta from "@/components/Profile/StoryBigConta";



interface ModificarStoriesProps {
  handleVoltar: () => void;
  storyURLs: string[];
}


const ModificarStories: React.FC<ModificarStoriesProps> = ({ handleVoltar, storyURLs }) => {
  const dispatch = useDispatch();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [showLargeStory, setShowLargeStory] = useState(false);
  const [StoryIndex, setStoryIndex] = useState(0);


  const handleStoryClick = (index: number) => {
    setShowLargeStory(true);
    setStoryIndex(index);
  };

  const storyURLsRedux = useSelector(
    (state: any) => state.profile?.profile.stories);
  console.log("stories redux", storyURLsRedux);


const storiesRDX = selectedProfile?.storyURL
console.log("stories RDX", storiesRDX)

  useEffect(() => {
    console.log("photoURLsRedux atualizado:", storyURLsRedux);
  }, [storyURLsRedux]);



  const userUID = useSelector((state: any) => state.profile?.profile.userUID);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const { data: storyData, error: storyError } = await supabase
          .from("stories")
          .select("*")
          .eq("userUID", userUID);
  
        if (storyError) throw new Error(storyError.message);
  
        console.log("Stories recuperadas", storyData);
        
        // Atualize o estado Redux com as stories recuperadas
        if (storyData) {
          dispatch(updateStories(storyData.map((story) => story.storyurl))); // Aqui você chama o dispatch
        }
      } catch (error) {
        console.error("Erro ao buscar stories:", error.message);
      }   finally {
        setLoading(false); // Desativa o loading ao final da operação
      }
    };
  
    if (userUID) {
      fetchStories(); // Chame a função para buscar as histórias apenas se o userUID estiver definido
    }
  }, [userUID, dispatch]);


  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true); // Ativa o loading

    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const selected = files.slice(0, 10);
      const uploadedStoryURLs: string[] = [];

      const uploadPromises = selected.map(async (file) => {
        const filePath = `${userUID}/${file.name
          .toLowerCase()
          .replace(/ /g, "_")
          .replace(/\./g, "_")}`;

        console.log("filePath", filePath);
        try {
          const { data, error } = await supabase.storage
            .from("storyStorage")
            .upload(filePath, file);

          if (error) throw new Error(error.message);

          const publicURLStory = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/storyStorage/${filePath}`;
          uploadedStoryURLs.push(publicURLStory);
        } catch (error: any) {
          console.error("Erro durante o upload:", error.message);
          {
            // Exibe o toast de erro em caso de exceção ou erro ao submeter
            toast.error('Erro ao submeter a imagem!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.error(error);
          }

        } 
        finally {
          setLoading(false); // Desativa o loading
        }
      });

      await Promise.all(uploadPromises);

      const storyInsertionsProfile = uploadedStoryURLs.map((storyURL) => ({
        userUID,
        storyurl: storyURL,
      }));

      try {
        const { data: storyData, error: storyError } = await supabase
          .from("stories")
          .insert(storyInsertionsProfile);

        if (storyError) {
          {
            // Exibe o toast de erro em caso de exceção ou erro ao submeter
            toast.error('Erro ao submeter a imagem!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.error(error);
          }
          throw new Error("Erro ao inserir URLs das stories na tabela stories: " + storyError.message)
          ;
        
        }

        const newStoryURLs = [...storyURLsRedux, ...uploadedStoryURLs];


        dispatch(updateStories(newStoryURLs));
      } catch (error: any) {
        console.error("Erro ao inserir URLs das stories na tabela:", error.message);
        {
          // Exibe o toast de erro em caso de exceção ou erro ao submeter
          toast.error('Erro ao submeter a imagem!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.error(error);
        }
      }
    }
  }
  
  const handleDeleteStory = async (index: number) => {
    try {
      const updatedStoriesArray = [...storyURLsRedux];

      if (updatedStoriesArray[index]) {
        const StoryURLToDelete = updatedStoriesArray[index];
        const fileName = StoryURLToDelete.split("/").pop();
        
        if (!fileName) {
          throw new Error("Nome do arquivo não encontrado no URL.");
        }

        const filePath = `${userUID}/${fileName}`;

        console.log("Tentando deletar do storage com filePath:", filePath);

        const { error: storageError } = await supabase.storage
          .from("storyStorage")
          .remove([filePath]);

        if (storageError) {
          console.error("Erro ao deletar do storage:", storageError.message);
          throw new Error("Erro ao remover stories do storage: " + storageError.message);
        }

        const { error: dbError } = await supabase
          .from("stories")
          .delete()
          .match({ storyurl: StoryURLToDelete, userUID });

        if (dbError) {
          console.error("Erro ao deletar do banco de dados:", dbError.message);
          throw new Error("Erro ao remover stories da tabela: " + dbError.message);
        }

        updatedStoriesArray.splice(index, 1);
        dispatch(updateStories(updatedStoriesArray));

        console.log("stories excluída com sucesso do storage e da tabela:", StoryURLToDelete);
      } else {
        console.error("A stories não existe no índice especificado.");
      }
    } catch (error: any) {
      console.error("Erro ao excluir stories:", error.message);
    }
  };



  const handleGuardar = () => {
    try {
      // Simula operação de sucesso
      console.log("stories guardadas com sucesso!");
      
      // Exibe toast de sucesso
      toast.success('Alteração efetuada com sucesso!', {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } catch (error) {
      // Em caso de erro, exibe toast de erro
      toast.error('Erro ao guardar as alterações!', {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      console.error("Erro ao guardar as alterações:", error);
    }
  };

 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 backdrop-blur-md">
         {loading && <LoaderBar />} {/* Renderiza o loader se estiver carregando */}

      <div className="bg-gradient-to-b from-gray-900 to-gray-700 h-4/5 mt-16 mb-16 border border-zinc-600 rounded-3xl max-w-screen-lg shadow-2xl w-full overflow-y-auto flex flex-col">
        <div className="p-10 flex-grow">
          <h2 className="text-4xl text-pink-600 mb-4 font-bold text-center">
            Gerir Stories
          </h2>
          <p className="text-gray-400 mb-6 text-center">Podes adicionar até 10 Stories</p>
          <ToastContainer />
    
          <div className="flex justify-center mb-8 space-x-4">
            <label
              htmlFor="upload-story"
              className="text-white bg-green-500 px-6 py-3 rounded-full shadow-lg transition duration-300 hover:bg-green-400 hover:shadow-xl flex items-center space-x-2 cursor-pointer"
            >
              <span>+ Adicionar Stories...</span>
              <input
  type="file"
  id="upload-story"
  style={{ display: "none" }}
  onChange={handleFileUpload}
  multiple
  accept=".mp4,.mov" // Adiciona suporte a vídeos
/>
            </label>
            <Link
              href="/registo-contacto"
              className="text-white bg-gray-600 px-6 py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-500 hover:shadow-xl flex items-center space-x-2"
            >
              <span>? Regras</span>
            </Link>
          </div>


          {showLargeStory && (
           <StoryBigConta
           onClose={() => setShowLargeStory(false)}
           currentIndex={StoryIndex}
         />
            )}
    
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
  {Array.isArray(storyURLsRedux) &&
    storyURLsRedux.map((storyURL: string, index: number) => (
      <div
        onClick={() => handleStoryClick(index)}
        key={index}
        className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        <IoTrashBin
          size={26}
          className="absolute top-2 right-2 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300 z-10"
          onClick={(e) => {
            e.stopPropagation(); // Impede a propagação do clique
            handleDeleteStory(index);
          }}
        />
        <video
          src={storyURL}
          className="w-full h-32 object-cover rounded-lg border border-gray-600"
          controls={false}
          muted
          playsInline
        />
      </div>
    ))}
</div>

        </div>
    
        <div className="flex justify-between items-end px-8 py-4 bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-3xl border-t border-gray-600 sticky bottom-0">
          <button
            className="text-white bg-gray-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-500 flex items-center space-x-2"
            onClick={handleVoltar}
          >
            <span>Voltar</span>
          </button>
          <button
            className="text-white bg-pink-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-pink-500 hover:shadow-xl"
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModificarStories;
