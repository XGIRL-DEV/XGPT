import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Continent {
  id: number;
  name: string;
  unavailable: boolean;
}

interface ListCategoryProps {
  handleContinentChange: (continent: Continent) => void;
  darkMode: boolean;
}

const continents: Continent[] = [
  { id: 1, name: "Mulheres", unavailable: false },
  { id: 2, name: "Homens", unavailable: false },
  { id: 3, name: "Trans", unavailable: false },
  { id: 4, name: "..", unavailable: false },
  { id: 5, name: "Cascais", unavailable: false },
];

const ListCategory: React.FC<ListCategoryProps> = ({
  handleContinentChange,
  darkMode,
}) => {
  const [selectedContinent, setSelectedContinent] = useState<Continent>({
    id: 0,
    name: "Categoria",
    unavailable: false,
  });

  const handleLocalContinentChange = (selectedContinent: Continent) => {
    setSelectedContinent(selectedContinent);
    handleContinentChange(selectedContinent); // Chama a função do componente pai
  };

  return (
    <div>
      <Listbox value={selectedContinent} onChange={handleLocalContinentChange}>
        <Listbox.Button className="flex justify-center px-10 mt-2 py-1 w-56 shadow-sm border border-pink-400 text-md rounded-full items-center hover:bg-pink-400 hover:text-black text-pink-400 bg-[#2b3945] transition duration-300 ease-in-out transform hover:scale-105">
          {selectedContinent.name}
          <MdKeyboardArrowDown size={18} />
        </Listbox.Button>
        <Listbox.Options
          className={`absolute z-10 mt-2 py-4 px-4 w-44 bg-zinc-800 text-white text-xs border rounded-sm shadow-md cursor-pointer ${
            darkMode ? "text-white dark:bg-[#2b3945]" : "text-gray-600 bg-white"
          }`}
        >
          {continents.map((continent) => (
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

export default ListCategory;
