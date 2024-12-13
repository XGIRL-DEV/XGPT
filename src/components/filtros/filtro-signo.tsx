import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateSigno } from "../../actions/ProfileActions";
import CommonFilter from "./common-filter";

const signoOptions = [
  { id: 1, name: "Carneiro", unavailable: false },
  { id: 2, name: "Touro", unavailable: false },
  { id: 3, name: "Gémeos", unavailable: false },
  { id: 4, name: "Caranguejo", unavailable: false },
  { id: 5, name: "Leão", unavailable: false },
  { id: 6, name: "Virgem", unavailable: false },
  { id: 7, name: "Balança", unavailable: false },
  { id: 8, name: "Escorpião", unavailable: false },
  { id: 9, name: "Sagitário", unavailable: false },
  { id: 10, name: "Capricórnio", unavailable: false },
  { id: 11, name: "Aquário", unavailable: false },
  { id: 12, name: "Peixes", unavailable: false },
];

interface FiltroSignoProps {
  onChange?: (value: string) => void;
}

const FiltroSigno: React.FC<FiltroSignoProps> = ({ onChange }) => {
  const dispatch = useDispatch();
  const signoRedux = useSelector(
    (state: any) => state.profile?.profile?.signo || null
  );

  const handleSignoChange = (newValue: string) => {
    dispatch(updateSigno(newValue));
    if (onChange) onChange(newValue);
  };

  return (
    <CommonFilter
      label="Signo"
      options={signoOptions}
      value={signoRedux}
      onChange={handleSignoChange}
      placeholder="Selecione um Signo"
    />
  );
};

export default FiltroSigno;
