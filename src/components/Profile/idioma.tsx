/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";

interface Profile {
  lingua: string[];
}

interface LinguasProps {
  selectedProfile?: Profile;
}

const Linguas: React.FC<LinguasProps> = ({ selectedProfile }) => {
  const linguasRedux = useSelector(
    (state: any) => state.profile && state.profile.lingua
  );
  // console.log("Linguas Redux", linguasRedux);

  const linguaCheckboxes = useSelector(
    (state: any) => state.profile.linguaCheckboxes
  );
  // console.log("Lingua Checkboxes", linguaCheckboxes);




  const obterBandeira = (lingua: string): string => {
    switch (lingua) {
      case "Russo":
        return "/Flags/ru.svg"; // Caminho relativo para a pasta public
      case "Alemão":
        return "/Flags/ale.svg";
      case "Português":
        return "/Flags/pt.svg";
      case "Francês":
        return "/Flags/fr.svg";
      case "Inglês":
        return "/Flags/ing.svg";
      case "Italiano":
        return "/Flags/it.svg";
      case "Espanhol":
        return "/Flags/es.svg";
      case "Árabe":
        return "/Flags/ar.png";
      default:
        return ""; // Pode definir uma imagem padrão para línguas sem bandeira específica
    }
  };

  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );


  return (
    <div className="bg-gray-800 pl-12 pt-10 pb-10 mb-8 md:mb-0 w-full border border-zinc-700 rounded-3xl">
      <p className="text-pink-600 text-2xl">Idiomas</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-4">
        {linguaRedux &&
          linguaRedux.map((lingua: string, index: number) => (
            <div key={index} className="flex items-center">
              <img
                src={obterBandeira(lingua)}
                alt={`${lingua} flag`}
                className="w-6 h-6 mr-2 rounded-full object-cover"
              />
              <span className="text-white">{lingua}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Linguas;
