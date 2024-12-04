import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Continent {
  id: number;
  name: string;
  unavailable: boolean;
}

interface ListCidadeProps {
  handleContinentChange: (continent: Continent) => void;
  darkMode: boolean;
}

const continentList: Continent[] = [
  { id: 1, name: "Lisboa", unavailable: false },
  { id: 2, name: "Sintra", unavailable: false },
  { id: 3, name: "Amadora", unavailable: false },
  { id: 4, name: "Mafra", unavailable: false },
  { id: 5, name: "Cascais", unavailable: false },
];

const ListCidade: React.FC<ListCidadeProps> = ({
  handleContinentChange,
  darkMode,
}) => {
  const [selectedContinent, setSelectedContinent] = useState<Continent>({
    id: 0,
    name: "Cidade",
    unavailable: false,
  });

  const handleLocalContinentChange = (selectedContinent: Continent) => {
    setSelectedContinent(selectedContinent);
    handleContinentChange(selectedContinent); // Chama a função do componente pai
  };

  return (
    <div>
      <Listbox value={selectedContinent} onChange={handleLocalContinentChange}>
        <Listbox.Button className="flex px-10 mt-2 justify-center py-1 w-56 shadow-sm border border-pink-400 text-md rounded-full items-center text-pink-400 bg-[#2b3945] hover:text-black hover:bg-pink-400">
          {selectedContinent.name}
          <MdKeyboardArrowDown size={18} />
        </Listbox.Button>
        <Listbox.Options
          className={`absolute z-10 mt-2 py-4 px-4 w-44 bg-zinc-800 text-white text-xs border rounded-sm shadow-md cursor-pointer ${
            darkMode ? "text-white dark:bg-[#2b3945]" : "text-gray-600 bg-white"
          }`}
        >
          {continentList.map((continent) => (
            <Listbox.Option
              className="py-1"
              key={continent.id}
              value={continent}
              disabled={continent.unavailable}
            >
              {continent.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ListCidade;
