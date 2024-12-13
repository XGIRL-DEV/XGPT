import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateCabelo } from "../../actions/ProfileActions";

const cabeloOptions = [
  { id: 1, name: "Preto", unavailable: false },
  { id: 2, name: "Loiro", unavailable: false },
  { id: 3, name: "Castanho", unavailable: false },
  { id: 4, name: "Ruiva", unavailable: false },
  { id: 5, name: "Outro", unavailable: false },
];

const FiltroCabelo: React.FC = () => {
  const dispatch = useDispatch();
  const cabeloRedux = useSelector(
    (state: any) => state.profile?.profile?.cabelo || null
  );

  const handleCabeloChange = (newValue: string) => {
    dispatch(updateCabelo(newValue));
  };

  return (
    <CommonFilter
      label="Cor Cabelo"
      options={cabeloOptions}
      value={cabeloRedux}
      onChange={handleCabeloChange}
      placeholder="Cabelo"
    />
  );
};

export default FiltroCabelo;
