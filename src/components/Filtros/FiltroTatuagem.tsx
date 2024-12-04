import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react"; // Correção: Usar os componentes diretamente do pacote
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateTatuagem } from "../../actions/ProfileActions"; // Ação para atualizar tatuagem

const tatuagemOptions = [
  { id: 1, name: "Com Tatuagens", unavailable: false },
  { id: 2, name: "Sem Tatuagens", unavailable: false },
];

interface FiltroTatuagemProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosState>>;

}

const FiltroTatuagem: React.FC<FiltroTatuagemProps> = ({
  bgColor = "bg-gray-700",
  buttonPadding = "py-1",
  rounded = "rounded-md",
}) => {
  const dispatch = useDispatch();


  
  // Obter o valor inicial de tatuagem do Redux
  const tatuagemRedux = useSelector(
    (state: any) => state.profile?.profile?.tatuagem || null
  );
  console.log("Tatuagem Redux:", tatuagemRedux);

  // Estado local para a seleção atual
  const [tatuagemSelecionada, setTatuagemSelecionada] = useState(
    tatuagemOptions.find((option) => option.name === tatuagemRedux) ||
      tatuagemOptions[0]
  );

  // Atualizar Redux quando o valor selecionado mudar
  const handleTatuagemChange = (selectedOption: { id: number; name: string }) => {
    dispatch(updateTatuagem(selectedOption.name)); // Atualiza o Redux com o nome selecionado
  };

  // Atualizar o estado local se o Redux mudar
  useEffect(() => {
    const optionFromRedux = tatuagemOptions.find(
      (option) => option.name === tatuagemRedux
    );
    if (optionFromRedux) {
      setTatuagemSelecionada(optionFromRedux);
    }
  }, [tatuagemRedux]);

  return (
    <div className="w-full mb-2 md:mb-4">
      <Listbox
        value={tatuagemSelecionada} // Controlar o estado pelo valor selecionado
        onChange={(selectedOption) => {
          setTatuagemSelecionada(selectedOption); // Atualiza o estado local
          handleTatuagemChange(selectedOption); // Atualiza o Redux
        }}
      >
        {({ open }) => (
          <div>
            <div className="relative mt-1">
              <p className="text-pink-800">Tatuagens</p>
              <Listbox.Button
                className={`relative w-full mt-1 ${bgColor} text-white z-100 text-xs ${buttonPadding} md:text-sm cursor-default py-1 pl-3 pr-10 text-left shadow-md sm:text-sm ${rounded}`}
              >
                <span className="block truncate">
                  {tatuagemRedux || "Tatuagens"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-pink-800"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as="div"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={`
                    absolute mt-1 max-h-60 w-full overflow-auto bg-zinc-700 text-white text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                    ${open ? "block" : "hidden"}
                  `}
                >
                  {tatuagemOptions.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-xs md:text-sm opacity-90 ${
                          active ? "bg-pink-700 text-white" : "text-gray-200"
                        }`
                      }
                      value={option} // Passar o objeto inteiro como valor
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default FiltroTatuagem;
