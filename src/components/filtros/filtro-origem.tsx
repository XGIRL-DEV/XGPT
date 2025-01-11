import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateOrigem } from "../../actions/ProfileActions";

const origemOptions = [
  { id: 1, name: "Portuguesa", unavailable: false },
  { id: 2, name: "Brasileira", unavailable: false },
  { id: 3, name: "Espanhola", unavailable: false },
  { id: 4, name: "Africana", unavailable: false },
  { id: 5, name: "Latina", unavailable: false },
  { id: 6, name: "Oriental", unavailable: false },
];

const FiltroOrigem: React.FC = () => {
  const dispatch = useDispatch();
  const origemRedux = useSelector(
    (state: any) => state.profile?.profile?.origem || null
  );

  const handleOrigemChange = (newValue: string) => {
    dispatch(updateOrigem(newValue));
  };

  return (
    <CommonFilter
      label="Origem"
      options={origemOptions}
      value={origemRedux}
      onChange={handleOrigemChange}
      placeholder="Selecione uma Origem"
    />
  );
};

export default FiltroOrigem;
