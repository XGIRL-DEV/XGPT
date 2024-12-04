import { useState, useRef, useEffect } from "react";
import { LuFilter } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import FiltroAge from "./Filtros/FiltroAge";
import FiltroTarifa from "./Filtros/FiltroTarifa";
import FiltroLingua from "./Filtros/FiltroLingua";
import FiltroPeito from "./Filtros/FiltroPeito";
import FiltroMamas from "./Filtros/FiltroMamas";
import FiltroPelos from "./Filtros/FiltroPelos";
import FiltroAltura from "./Filtros/FiltroAltura";
import FiltroOlhos from "./Filtros/FiltroOlhos";
import FiltroCorpo from "./Filtros/FiltroCorpo";
import FiltroTatuagem from "./Filtros/FiltroTatuagem";
import FiltroOrigem from "./Filtros/FiltroOrigem";
import { fetchProfiles } from "@/services/profileService";

interface FiltrosState {
  age?: number[];
  tarifa?: number[];
  lingua?: string[];
  peito?: string;
  mamas?: string;
  pelos?: boolean;
  altura?: number[];
  olhos?: string;
  corpo?: string;
  tatuagem?: boolean;
  origem?: string;
}

const Filtro: React.FC = () => {
  const [mostrarFiltro, setMostrarFiltro] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosState>({});
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [totalProfiles, setTotalProfiles] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setMostrarFiltro(false);
    }
  };

  useEffect(() => {
    const loadProfiles = async () => {
      const profiles = await fetchProfiles();
      setTotalProfiles(profiles.length);
      setFilteredProfiles(profiles); // Sem filtros inicialmente
    };

    loadProfiles();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Atualiza os perfis filtrados sempre que filtros mudarem
  useEffect(() => {
    const applyFilters = (profiles: any[], filters: FiltrosState) => {
      return profiles.filter((profile) => {
        if (filters.age && !filters.age.includes(profile.age)) return false;
        if (filters.tarifa && !filters.tarifa.includes(profile.tarifa)) return false;
        if (filters.lingua && !filters.lingua.some((lang) => profile.languages.includes(lang))) return false;
        if (filters.peito && filters.peito !== profile.peito) return false;
        if (filters.mamas && filters.mamas !== profile.mamas) return false;
        if (filters.pelos !== undefined && filters.pelos !== profile.pelos) return false;
        if (filters.altura && !filters.altura.includes(profile.altura)) return false;
        if (filters.olhos && filters.olhos !== profile.olhos) return false;
        if (filters.corpo && filters.corpo !== profile.corpo) return false;
        if (filters.tatuagem !== undefined && filters.tatuagem !== profile.tatuagem) return false;
        if (filters.origem && filters.origem !== profile.origem) return false;

        return true;
      });
    };

    const loadFilteredProfiles = async () => {
      const profiles = await fetchProfiles();
      const filtered = applyFilters(profiles, filtros);
      setFilteredProfiles(filtered);
    };

    loadFilteredProfiles();
  }, [filtros]);

  return (
    <>
      {mostrarFiltro && (
        <div
          className="fixed inset-0 flex justify-center items-center px-8 bg-black bg-opacity-60 backdrop-blur-md z-50"
          onClick={() => setMostrarFiltro(false)}
        >
          <div
            ref={modalRef}
            className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg md:text-xl text-white font-semibold">Filtros</h1>
              <button
                onClick={() => setMostrarFiltro(false)}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ImCross size={16} className="text-gray-400 hover:text-pink-500 transition-colors" />
              </button>
            </div>

            <div className="border-t border-gray-700 mb-6"></div>

            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <FiltroAge setFiltros={setFiltros} />
                <FiltroTarifa setFiltros={setFiltros} />
                <FiltroLingua setFiltros={setFiltros} />
                <FiltroPelos setFiltros={setFiltros} />
                <FiltroMamas setFiltros={setFiltros} />
                <FiltroPeito setFiltros={setFiltros} />
                <FiltroOlhos setFiltros={setFiltros} />
                <FiltroAltura setFiltros={setFiltros} />
                <FiltroCorpo setFiltros={setFiltros} />
                <FiltroTatuagem setFiltros={setFiltros} />
                <FiltroOrigem setFiltros={setFiltros} />
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setMostrarFiltro(false)}
                  className="flex items-center justify-center bg-pink-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                >
                  <LuFilter className="mr-2" size={22} />
                  Aplicar Filtros ({filteredProfiles.length || totalProfiles})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Filtro;
