import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateOlhos } from "../../actions/ProfileActions";

const olhosOptions = [
  { id: 1, name: "Castanhos", unavailable: false },
  { id: 2, name: "Pretos", unavailable: false },
  { id: 3, name: "Azuis", unavailable: false },
  { id: 4, name: "Verdes", unavailable: false },
];

const FiltroOlhos: React.FC = () => {
  const dispatch = useDispatch();
  const olhosRedux = useSelector(
    (state: any) => state.profile?.profile?.olhos || null
  );

  const handleOlhosChange = (newValue: string) => {
    dispatch(updateOlhos(newValue));
  };

  return (
    <CommonFilter
      label="Cor Olhos"
      options={olhosOptions}
      value={olhosRedux}
      onChange={handleOlhosChange}
      placeholder="Cor dos Olhos"
    />
  );
};

export default FiltroOlhos;
