import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updatePelos } from "../../actions/ProfileActions";

const pelosOptions = [
  { id: 1, name: "Rapadinha", unavailable: false },
  { id: 2, name: "Parcialmente Rapada", unavailable: false },
  { id: 3, name: "Ao Natural", unavailable: false },
];

const FiltroPelos: React.FC = () => {
  const dispatch = useDispatch();
  const pelosRedux = useSelector(
    (state: any) => state.profile?.profile?.pelos || null
  );

  const handlePelosChange = (newValue: string) => {
    dispatch(updatePelos(newValue));
  };

  return (
    <CommonFilter
      label="Pelos"
      options={pelosOptions}
      value={pelosRedux}
      onChange={handlePelosChange}
      placeholder="Pelos"
    />
  );
};

export default FiltroPelos;
