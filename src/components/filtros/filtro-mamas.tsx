import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateMamas } from "../../actions/ProfileActions";

const mamasOptions = [
  { id: 1, name: "Naturais", unavailable: false },
  { id: 2, name: "Silicone", unavailable: false },
];

interface FiltroMamasProps {
  onChange?: (value: string) => void;
}

const FiltroMamas: React.FC<FiltroMamasProps> = ({ onChange }) => {
  const dispatch = useDispatch();
  const mamasRedux = useSelector(
    (state: any) => state.profile?.profile?.mamas || null
  );

  const handleMamasChange = (newValue: string) => {
    dispatch(updateMamas(newValue));
    if (onChange) onChange(newValue);
  };

  return (
    <CommonFilter
      label="Mamas"
      options={mamasOptions}
      value={mamasRedux}
      onChange={handleMamasChange}
      placeholder="Mamas"
    />
  );
};

export default FiltroMamas;
