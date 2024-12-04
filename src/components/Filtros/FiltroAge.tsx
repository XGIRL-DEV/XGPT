import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, Dispatch, SetStateAction } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { updateTatuagem } from "../../actions/ProfileActions"; // Ação para atualizar tatuagem
import { useDispatch, useSelector } from "react-redux";

interface FiltrosState {
  age?: number[];
}

interface FiltroAgeProps {
  buttonPadding?: string;
  rounded?: string;
  setFiltros: Dispatch<SetStateAction<FiltrosState>>;
}

const Idade = [
  { id: 1, name: "18-20", unavailable: false },
  { id: 2, name: "21-25", unavailable: false },
  { id: 3, name: "26-30", unavailable: false },
  { id: 4, name: "31-40", unavailable: true },
  { id: 5, name: "+41", unavailable: true },
];

const FiltroAge: React.FC<FiltroAgeProps> = ({
  buttonPadding = "py-1",
  rounded = "rounded-md",
  setFiltros,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full mb-2 md:mb-4">
      <Listbox
        onChange={(selectedOption: { id: number; name: string }) => {
          console.log("Idade selecionada:", selectedOption.name);

          // Atualiza os filtros com o ID selecionado
          setFiltros((prev) => ({
            ...prev,
            age: [selectedOption.id], // Substitua a lógica conforme necessário
          }));
        }}
        name="idade"
      >
        {({ open }) => (
          <div>
            <div className="relative mt-1">
              <p className="text-pink-800">Idade</p>
              <Listbox.Button
                className={`relative w-full mt-1 bg-pink-900 text-white z-100 text-xs ${buttonPadding} md:text-sm cursor-default py-1 pl-3 pr-10 text-left shadow-md sm:text-sm ${rounded}`}
              >
                <span className="block truncate">Selecionar idade</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-pink-800"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className={`
                    absolute mt-1 max-h-60 w-full overflow-auto bg-gray-700 border border-gray-600 text-white text-xs md:text-sm shadow-lg ring-1 rounded-md ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                    ${open ? "block" : "hidden"} 
                  `}
                >
                  {Idade.map((method) => (
                    <Listbox.Option
                      key={method.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-xs md:text-sm opacity-90 ${
                          active ? "bg-zinc-500 text-white" : "text-gray-900"
                        }`
                      }
                      value={method}
                      disabled={method.unavailable}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {method.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-800">
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

export default FiltroAge;
