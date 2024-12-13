import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateTarifa } from "../../actions/ProfileActions";
import CommonFilter from "./common-filter";

interface TarifaOption {
  id: number;
  name: string;
  value: number;
  unavailable: boolean;
}

const tarifaOptions = [
  { id: 1, name: "a partir de 50", value: 50, unavailable: false },
  { id: 2, name: "a partir de 100€", value: 100, unavailable: false },
  { id: 3, name: "a partir de 200€", value: 200, unavailable: false },
  { id: 4, name: "a partir de 500€", value: 500, unavailable: true },
  { id: 5, name: "+ 500€", value: 501, unavailable: false },
];

interface FiltroTarifaProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  onChange?: (value: string) => void;
}

const FiltroTarifa: React.FC<FiltroTarifaProps> = ({
  bgColor = "bg-gray-700",
  buttonPadding = "py-0",
  rounded = "rounded-xl",
  onChange,
}) => {
  const dispatch = useDispatch();
  const tarifaRedux = useSelector(
    (state: any) => state.profile?.profile?.tarifa || null
  );

  // Function to format the display value
  const getDisplayValue = (value: number | null): string => {
    if (!value) return "Tarifa";
    if (value > 500) return "+ 500€";
    return `a partir de ${value}€`;
  };

  // Function to handle tarifa changes
  const handleTarifaChange = (selectedName: string) => {
    const selectedOption = tarifaOptions.find(
      (opt) => opt.name === selectedName
    );
    if (selectedOption) {
      dispatch(updateTarifa(selectedOption.value));
      if (onChange) {
        onChange(String(selectedOption.value));
      }
    }
  };

  return (
    <CommonFilter
      label="Tarifa"
      options={tarifaOptions}
      value={tarifaRedux ? getDisplayValue(tarifaRedux) : null}
      onChange={handleTarifaChange}
      placeholder="Selecione uma tarifa"
      bgColor={bgColor}
      buttonPadding="py-5"
      rounded={rounded}
      iconColor="text-white"
    />
  );
};

export default FiltroTarifa;
