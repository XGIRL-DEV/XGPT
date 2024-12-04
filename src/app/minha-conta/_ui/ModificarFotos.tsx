/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import supabase from "@/database/supabase";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updatePhotos } from "@/actions/ProfileActions";
import { createCanvas, loadImage } from "canvas"; // Importe createCanvas e loadImage usando 'import'
import watermarkImage from "../../../../public/logo.png"; // Importe a imagem da marca d'água
import Link from "next/link";
import { BlurImage } from "@/components/BlurImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


interface ModificarFotosProps {
  handleVoltar: () => void;
  // handleGuardar: () => void;
  
}

async function addWatermark(
  imagePath: string,
  outputFormat: string,
  scale = 0.2
): Promise<string> {
  // scale parameter with default value
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const watermark = await loadImage(watermarkImage.src);

    // Redimensionar a marca d'água
    const watermarkWidth = watermark.width * scale;
    const watermarkHeight = watermark.height * scale;

    // Calcular a posição para centralizar a marca d'água redimensionada
    const x = (image.width - watermarkWidth) / 2;
    const y = (image.height - watermarkHeight) / 2;

    const opacity = 0.4; // Definir opacidade
    ctx.globalAlpha = opacity;

    // Desenhar a marca d'água redimensionada
    ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

    return canvas.toDataURL(`image/webp` as any);
  } catch (error: any) {
    throw new Error("Erro ao adicionar marca d'água: " + error.message);
  }
}

const ModificarFotos: React.FC<ModificarFotosProps> = ({ handleVoltar }) => {
  const dispatch = useDispatch();
  const photoURLsRedux = useSelector(
    (state: any) => state.profile?.profile.photos
  );
console.log("fotos redux", photoURLsRedux)

  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  // const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);


  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const selected = files.slice(0, 10);
      const uploadedPhotoURLs: string[] = [];
  
      const uploadPromises = selected.map(async (file) => {
        const filePath = `${userUID}/${file.name
          .toLowerCase()
          .replace(/ /g, "_")
          .replace(/\./g, "_")}`;
  
        console.log("filePath", filePath);
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);
  
          await new Promise<void>((resolve) => {
            reader.onload = async () => {
              const watermarkedURL = await addWatermark(
                reader.result as string,
                "webp",
                0.3
              );
              const watermarkedFile = await fetch(watermarkedURL);
              const blob = await watermarkedFile.blob();
  
              const { data, error } = await supabase.storage
                .from("profileFoto")
                .upload(filePath, blob);
              console.log(data, error);
              if (error) throw new Error(error.message);
  
              const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
              uploadedPhotoURLs.push(publicURLFoto);
  
              resolve();
            };
          });
        } catch (error: any) {
          console.error("Erro durante o upload:", error.message);
        }
      });
  
      await Promise.all(uploadPromises);
  
      // Inserir URLs das fotos na tabela profilephoto
      const photoInsertionsProfile = uploadedPhotoURLs.map((photoURL) => ({
        userUID,
        imageurl: photoURL,
      }));
  
      try {
        const { data: photoData, error: photoError } = await supabase
          .from("profilephoto")
          .insert(photoInsertionsProfile);
  
        if (photoError) {
          throw new Error("Erro ao inserir URLs das fotos na tabela profilephoto: " + photoError.message);
        }
  
        console.log("URLs das fotos inseridas com sucesso na tabela profilephoto:", photoData);
  
        // Atualizar o Redux com as novas URLs de fotos
        const newPhotoURLs = [...photoURLsRedux, ...uploadedPhotoURLs];
        dispatch(updatePhotos(newPhotoURLs));
  
      } catch (error: any) {
        console.error("Erro ao inserir URLs das fotos na tabela:", error.message);
      }
    }
  }

  const handleDeletePhoto = async (index: number) => {
    try {
      const updatedPhotosArray = [...photoURLsRedux];
  
      // Verificar se a foto existe no índice especificado
      if (updatedPhotosArray[index]) {
        const photoURLToDelete = updatedPhotosArray[index];
        const fileName = photoURLToDelete.split("/").pop(); // Extrai o nome do arquivo da URL
        
        if (!fileName) {
          throw new Error("Nome do arquivo não encontrado no URL.");
        }
  
        const filePath = `${userUID}/${fileName}`; // Usa o fileName para construir o filePath
  
        console.log("Tentando deletar do storage com filePath:", filePath);
  
        // Remover a foto do storage da Supabase
        const { error: storageError } = await supabase.storage
          .from("profileFoto")
          .remove([filePath]);
  
        if (storageError) {
          console.error("Erro ao deletar do storage:", storageError.message);
          throw new Error("Erro ao remover foto do storage: " + storageError.message);
        }
  
        console.log("Foto deletada do storage com sucesso:", fileName);
  
        // Remover a foto do banco de dados
        const { error: dbError } = await supabase
          .from("profilephoto")
          .delete()
          .match({ imageurl: photoURLToDelete, userUID });
  
        if (dbError) {
          console.error("Erro ao deletar do banco de dados:", dbError.message);
          throw new Error("Erro ao remover foto da tabela: " + dbError.message);
        }
  
        console.log("Foto deletada da tabela com sucesso:", photoURLToDelete);
  
        // Atualizar o estado do Redux com as fotos restantes
        updatedPhotosArray.splice(index, 1);
        dispatch(updatePhotos(updatedPhotosArray));
  
        console.log("Foto excluída com sucesso do storage e da tabela:", photoURLToDelete);
      } else {
        console.error("A foto não existe no índice especificado.");
      }
    } catch (error: any) {
      console.error("Erro ao excluir foto:", error.message);
    }
  };


  const handleGuardar = () => {
    // Aqui vai a lógica de salvar as alterações
    console.log("Fotos guardadas com sucesso!");
    toast.success('Alteração efetuada com sucesso!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-transparent backdrop-blur-lg z-50 ">
    <div className="md:w-full md:max-w-4xl bg-gray-800 text-white rounded-xl border border-gray-500 shadow-xl my-24 mx-12 overflow-hidden h-2/3 md:h-4/5 sm:max-h-[80vh] overflow-y-auto">
        
    <header className="bg-pink-800 py-6 px-4 md:px-10">
          <h1 className="text-xl md:text-3xl font-bold tracking-wide text-center">
          Gerir Fotos
          </h1>
          <p className="text-center text-gray-200 text- md:text-sm mt-2">
          odes adicionar até 10 Fotos          </p>
          <ToastContainer />
                  </header>
        <div className="p-10">
         
        <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
  {/* Botão para adicionar fotos */}
  <label
    htmlFor="upload-photo"
    className="flex items-center justify-center px-6 py-3 bg-green-500 text-white text-sm md:text-base font-medium rounded-full shadow-md hover:bg-green-400 hover:shadow-lg transition duration-300 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
    <span>Adicionar Fotos</span>
    <input
      type="file"
      id="upload-photo"
      style={{ display: "none" }}
      onChange={handleFileUpload}
      multiple
    />
  </label>

  {/* Botão para regras */}
  <Link
    href=""
    className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white text-sm md:text-base font-medium rounded-full shadow-md hover:bg-gray-500 hover:shadow-lg transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h10.5m-10.5 5.25h6.75m-6.75 5.25h10.5"
      />
    </svg>
    <span>Regras</span>
  </Link>
</div>

  
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(photoURLsRedux) &&
              photoURLsRedux.map((photoURL: string, index: number) => (
                <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  <IoTrashBin
                    size={26}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300"
                    onClick={() => handleDeletePhoto(index)}
                  />
                  <BlurImage
                    src={photoURL}
                    alt={`Foto ${index}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              ))}
          </div>
        </div>
  
        <footer className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0">
        <div className="flex justify-between">         
           <button
           className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition"
            onClick={handleVoltar}
          >
            <span>Voltar</span>
          </button>
          <button
            className="px-6 py-3 bg-pink-800 hover:bg-pink-900 rounded-lg text-sm font-medium "
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
        </footer>
      </div>
    </div>
  );
  
 
  

};

export default ModificarFotos;
