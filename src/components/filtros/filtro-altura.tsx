import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateAltura } from "../../actions/ProfileActions";
import CommonFilter from "./CommonFilter";

import {useTranslation} from "react-i18next";


const alturaOptions = [
  { id: 1, name: "< 1,60m", unavailable: false },
  { id: 2, name: "+ / - 1,65m", unavailable: false },
  { id: 3, name: "> 1,70m", unavailable: false },
];

const FiltroAltura: React.FC = () => {
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();
  const alturaRedux = useSelector(
    (state: any) => state.profile?.profile?.altura || null
  );

  const handleAlturaChange = (newValue: string) => {
    dispatch(updateAltura(newValue));
  };

  return (
    <CommonFilter
    label={t('filter.height')}
      options={alturaOptions}
      value={alturaRedux}
      onChange={handleAlturaChange}
      placeholder={t('filter.select_height')}
      />
  );
};

export default FiltroAltura;
