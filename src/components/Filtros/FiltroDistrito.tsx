import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateDistrito } from "../../actions/ProfileActions";

interface Distrito {
  id: number;
  name: string;
  unavailable: boolean;
}

const distrito: Distrito[] = [
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
  { id: 18, name: "Açores", unavailable: false },
];

interface FiltroDistritoProps {
  buttonPadding?: string;
  rounded?: string;
  bgColor?: string;
  padding?: string;
}

const FiltroDistrito: React.FC<FiltroDistritoProps> = ({
  buttonPadding = "py-1",
  rounded = "rounded-md",
  bgColor = "bg-gray-700",
}) => {
  const dispatch = useDispatch();
  const DistritoRedux = useSelector(
    (state: any) => state.profile?.profile?.distrito || null
  );
  console.log("Distrito do Redux:", DistritoRedux);

  const handleDistritoChange = (newValue: Distrito) => {
    dispatch(updateDistrito(newValue.name));
  };

  return (
    <div className="w-full mb-2 md:mb-0">
      <Listbox
        onChange={(selectedOption: any) => handleDistritoChange(selectedOption)}
        // @ts-ignore
        id="distrito"
        name="distrito"
      >
        {({ open }) => (
          <div>
            <div className="relative mt-1">
              <p className="text-pink-800">Distrito</p>
              <Listbox.Button
                className={`relative w-full mt-1 bg-gray-700 text-white z-100 text-xs ${bgColor} ${buttonPadding} md:text-sm cursor-default py-1 pl-3 pr-10 text-left shadow-md sm:text-sm ${rounded}`}
              >
                <span className="block truncate">
                  {DistritoRedux || "Distrito"}
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
                  {distrito.map((method) => (
                    <Listbox.Option
                      key={method.id}
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

export default FiltroDistrito;
