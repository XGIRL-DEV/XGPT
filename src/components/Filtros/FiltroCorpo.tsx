import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateCorpo } from "../../actions/ProfileActions"; // Importe a ação updateAltura do seu arquivo de ações
import { RootState } from "@/store";

interface FiltroCorpoProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  padding?: string;
}

const corpoOptions = [
  { id: 1, name: "Normal", unavailable: false },
  { id: 2, name: "Atletica", unavailable: false },
  { id: 3, name: "Magra", unavailable: false },
  { id: 4, name: "Gordinha", unavailable: false },
  { id: 5, name: "XXL", unavailable: false },
];

const FiltroCorpo: React.FC<FiltroCorpoProps> = ({
  bgColor = "bg-gray-700",
  buttonPadding = "py-1",
  rounded = "rounded-md",
}) => {
  const dispatch = useDispatch();

  const corpoRedux = useSelector(
    (state: RootState) => state.profile?.profile?.corpo || null
  );
  console.log("corpo do redux", corpoRedux);

  const [corpoSelecionado, setCorpoSelecionado] = useState<string>(
    corpoRedux || "Silhueta"
  );

  const handleCorpoChange = (newValue: string) => {
    dispatch(updateCorpo(newValue));
  };

  return (
    <div className="w-full mb-2 md:mb-0">
      <Listbox
        value={corpoSelecionado}
        onChange={(selectedOption: any) =>
          handleCorpoChange(selectedOption.name)
        }
        name="corpo"
      >
        {({ open }) => (
          <div>
            <div className="relative mt-1">
              <p className="text-pink-800 ">Corpo</p>
              <Listbox.Button
                className={`relative w-full mt-1 bg-gray-700 text-white z-100 text-xs ${bgColor} ${buttonPadding} md:text-sm cursor-default py-1 pl-3 pr-10 text-left shadow-md sm:text-sm ${rounded}`}
              >
                <span className="block truncate">{corpoSelecionado}</span>
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
                         absolute mt-1 max-h-60 w-full overflow-auto bg-zinc-700 text-white text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                         ${open ? "block" : "hidden"} 
                       `}
                >
                  {corpoOptions.map((method, methodIdx) => (
                    <Listbox.Option
                      key={methodIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-xs md:text- opacity-90 Z-10 ${
                          active ? "bg-teal-50 text-teal-700" : "text-gray-900"
                        }`
                      }
                      value={method}
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
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3  text-pink-600 border-zinc-400">
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

export default FiltroCorpo;
