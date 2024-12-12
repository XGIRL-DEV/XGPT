import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateSeios } from "../../actions/ProfileActions";

const peitoOptions = [
  { id: 1, name: "Pequenos Seios (A-B)", unavailable: false },
  { id: 2, name: "Grandes Seios (C-D)", unavailable: false },
  { id: 3, name: "Seios XXL (E+)", unavailable: false },
];

const FiltroPeito: React.FC = () => {
  const dispatch = useDispatch();
  const seiosRedux = useSelector(
    (state: any) => state.profile?.profile?.seios || null
  );

  const handleSeiosChange = (newValue: string) => {
    dispatch(updateSeios(newValue));
  };

  return (
    <CommonFilter
      label="Tamanho Seios"
      options={peitoOptions}
      value={seiosRedux}
      onChange={handleSeiosChange}
      placeholder="Selecione um tamanho"
    />
  );
};

export default FiltroPeito;
