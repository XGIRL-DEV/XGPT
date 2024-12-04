import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface FiltroLinguaProps {
  onChange?: (value: string) => void;
}

const linguas = [
  { id: 1, name: "Portugues", unavailable: false },
  { id: 2, name: "Ingles", unavailable: false },
  { id: 3, name: "Frances", unavailable: false },
  { id: 4, name: "Espanhol", unavailable: true },
  { id: 5, name: "Italiano", unavailable: false },
  { id: 6, name: "Russo", unavailable: false },
];

const FiltroLingua: React.FC<FiltroLinguaProps> = ({ onChange }) => {
  return (
    <div className="w-full mb-2 md:mb-4">
      <Listbox
        onChange={(selectedOption: { name: string }) => {
          if (onChange) selectedOption.name;
        }}
        name="linguas"
      >
        {({ open }) => (
          <div>
            <div className="relative mt-1">
              <p className="text-pink-800">Idioma</p>
              <Listbox.Button className="relative w-full mt-1 bg-zinc-700 z-100 text-xs rounded-md md:text-sm cursor-default py-1 pl-3 pr-10 text-left shadow-md sm:text-sm">
                <span className="block truncate">------</span>
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
                  {linguas.map((method, methodIdx) => (
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
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600 border-zinc-400">
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

export default FiltroLingua;
