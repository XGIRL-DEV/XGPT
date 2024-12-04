import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateAltura } from "../../actions/ProfileActions";

interface FiltroAlturaProps {
  buttonPadding?: string;
  rounded?: string;
  bgColor?: string;
  onChange?: (newValue: string) => void;
  padding?: string;
}

const altura = [
  { id: 1, name: "< 1,60m", unavailable: false },
  { id: 2, name: "+ / - 1,65m", unavailable: false },
  { id: 3, name: "> 1,70m", unavailable: false },
];

const FiltroAltura: React.FC<FiltroAlturaProps> = ({
  buttonPadding = "py-1",
  rounded = "rounded-xl",
  bgColor = "bg-gray-700",
  onChange,
}) => {
  const dispatch = useDispatch();

  const alturaRedux = useSelector(
    (state: any) => state.profile?.profile?.altura || null
  );
  console.log("Altura do redux", alturaRedux);

  const [alturaSelecionada, setAlturaSelecionada] = useState<string>(
    alturaRedux || ""
  );

  const handleAlturaChange = (newValue: string) => {
    dispatch(updateAltura(newValue));
    if (onChange) onChange(newValue);
  };

  return (
    <div className="w-full mb-2 md:mb-0">
      <Listbox
        value={alturaSelecionada}
        onChange={(selectedOption: any) =>
          handleAlturaChange(selectedOption.name)
        }
        name="altura"
      >
        {({ open }) => (
          <div>
            <div className="relative mt-1">
              <p className="text-pink-800 ">Altura</p>
              <Listbox.Button
                className={`relative w-full mt-1 bg-gray-700 text-slate-200 z-100 text-xs ${bgColor} ${buttonPadding} md:text-sm cursor-default py-1 pl-3 pr-10 text-left ${rounded} shadow-md sm:text-sm`}
              >
                <span className="block truncate">
                  {alturaRedux || "Altura"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-white"
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
                    absolute mt-1 max-h-60 w-full overflow-auto bg-gray-700 text-white rounded-lg text-md md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                    ${open ? "block" : "hidden"}
                  `}
                >
                  {altura.map((method, methodIdx) => (
                    <Listbox.Option
                      key={methodIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-md md:text- opacity-90 Z-10 ${
                          active
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-700 text-gray-300"
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
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3  text-pink-800 border-zinc-400">
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

export default FiltroAltura;
