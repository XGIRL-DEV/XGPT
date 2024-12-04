import { useState } from "react";
import ListDistritos from "./HeaderFilter/ListDistritos";
import ListCidade from "./HeaderFilter/ListCidade";
import ListCategory from "./HeaderFilter/ListCategory";
import Filtro from "./Filtro";
interface Distrito {
  id: number;
  name: string;
  unavailable: boolean;
}
interface FilterBarProps {
  setSelectedDistrito?: (distrito: Distrito) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setSelectedDistrito }) => {
  const [filtroAberto, setFiltroAberto] = useState<boolean>(false);

  const toggleFiltro = () => {
    setFiltroAberto(!filtroAberto);
  };

  return (
    <div className="w-full bg-gray-900 mb-8">
      <div className="flex mx-auto md:mx-20 my-1 justify-between bg-gray-800 h-16 items-center">
        {setSelectedDistrito && (
          <ListDistritos setSelectedDistrito={setSelectedDistrito} />
        )}
        <ListCidade
          darkMode
          handleContinentChange={() => console.log("Mudou a cidade")}
        />
        <ListCategory
          darkMode
          handleContinentChange={() => console.log("Mudou a categoria")}
        />
        <button
          className="flex justify-center px-10 mt-2 py-1 w-56 shadow-sm border border-yellow-500 hover:bg-yellow-500 hover:text-black text-md rounded-full items-center text-yellow-500 bg-[#2b3945]"
          onClick={toggleFiltro}
        >
          Filtros
        </button>
      </div>
      {filtroAberto && <Filtro />}
    </div>
  );
};

export default FilterBar;
