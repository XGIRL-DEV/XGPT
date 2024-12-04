import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Distrito {
  id: number;
  name: string;
  unavailable: boolean;
}

interface ListDistritosProps {
  setSelectedDistrito: (distrito: Distrito) => void;
}

const distritoList: Distrito[] = [
  { id: 1, name: "Lisboa", unavailable: false },
  { id: 2, name: "Porto", unavailable: false },
  { id: 3, name: "Aveiro", unavailable: false },
  { id: 4, name: "Beja", unavailable: false },
  { id: 5, name: "Bragança", unavailable: false },
  { id: 6, name: "Braga", unavailable: false },
  { id: 7, name: "Castelo Branco", unavailable: false },
  { id: 8, name: "Coimbra", unavailable: false },
  { id: 9, name: "Évora", unavailable: false },
  { id: 10, name: "Guarda", unavailable: false },
  { id: 11, name: "Leiria", unavailable: false },
  { id: 12, name: "Santarém", unavailable: false },
  { id: 13, name: "Setúbal", unavailable: false },
  { id: 14, name: "Viana do Castelo", unavailable: false },
  { id: 15, name: "Vila Real", unavailable: false },
  { id: 16, name: "Viseu", unavailable: false },
  { id: 17, name: "Madeira", unavailable: false },
  { id: 18, name: "Acores", unavailable: false },
];

const ListDistritos: React.FC<ListDistritosProps> = ({
  setSelectedDistrito,
}) => {
  const [selectedDistrito, setSelectedDistritoLocal] = useState<Distrito>({
    id: 0,
    name: "Distrito",
    unavailable: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleLocalDistritoChange = (selectedDistrito: Distrito) => {
    setSelectedDistritoLocal(selectedDistrito);
    setSelectedDistrito(selectedDistrito); // Atualizar o distrito selecionado usando a função passada como propriedade
    setIsOpen(false); // Fechar a lista de distritos após a seleção
  };

  return (
    <div>
      <Listbox value={selectedDistrito} onChange={handleLocalDistritoChange}>
        <Listbox.Button
          className="flex px-10 mt-2 justify-center py-1 w-56 shadow-sm border border-pink-800 text-md rounded-full items-center text-pink-800 bg-[#2b3945] hover:text-black hover:bg-pink-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedDistrito.name}
          <MdKeyboardArrowDown size={18} />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-2 py-4 mx-4 w-44 bg-[#1E2427] text-white text-xs border rounded-sm shadow-md cursor-pointer border-pink-800">
          {distritoList.map((distrito) => (
            <Listbox.Option
              className="py-2 text-md w-full px-4 hover:bg-[#1b1b1b]"
              key={distrito.id}
              value={distrito}
              disabled={distrito.unavailable}
            >
              {distrito.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ListDistritos;
