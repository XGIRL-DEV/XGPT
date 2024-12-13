import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateTatuagem } from "../../actions/ProfileActions";

const tatuagemOptions = [
  { id: 1, name: "Com Tatuagens", unavailable: false },
  { id: 2, name: "Sem Tatuagens", unavailable: false },
];

interface FiltrosState {
  tatuagem?: string[];
}

interface FiltroTatuagemProps {
  setFiltros?: React.Dispatch<React.SetStateAction<FiltrosState>>;
}

const FiltroTatuagem: React.FC<FiltroTatuagemProps> = ({ setFiltros }) => {
  const dispatch = useDispatch();
  const tatuagemRedux = useSelector(
    (state: any) => state.profile?.profile?.tatuagem || null
  );

  const handleTatuagemChange = (newValue: string) => {
    dispatch(updateTatuagem(newValue));
    // Update filtros state if setFiltros is provided
    if (setFiltros) {
      setFiltros((prev) => ({
        ...prev,
        tatuagem: [newValue],
      }));
    }
  };

  return (
    <CommonFilter
      label="Tatuagens"
      options={tatuagemOptions}
      value={tatuagemRedux}
      onChange={handleTatuagemChange}
      placeholder="Tatuagens"
    />
  );
};

export default FiltroTatuagem;
