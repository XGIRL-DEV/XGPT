import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateCorpo } from "../../actions/ProfileActions";
import { RootState } from "@/store";

const corpoOptions = [
  { id: 1, name: "Normal", unavailable: false },
  { id: 2, name: "Atletica", unavailable: false },
  { id: 3, name: "Magra", unavailable: false },
  { id: 4, name: "Gordinha", unavailable: false },
  { id: 5, name: "XXL", unavailable: false },
];

const FiltroCorpo: React.FC = () => {
  const dispatch = useDispatch();
  const corpoRedux = useSelector(
    (state: RootState) => state.profile?.profile?.corpo || null
  );

  const handleCorpoChange = (newValue: string) => {
    dispatch(updateCorpo(newValue));
  };

  return (
    <CommonFilter
      label="Corpo"
      options={corpoOptions}
      value={corpoRedux}
      onChange={handleCorpoChange}
      placeholder="Silhueta"
    />
  );
};

export default FiltroCorpo;
