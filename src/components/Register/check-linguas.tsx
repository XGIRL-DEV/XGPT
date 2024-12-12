import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { updateLingua } from "../../actions/ProfileActions";
import { useTranslation } from 'react-i18next'; // Importar o hook useTranslation

interface State {
  [key: string]: boolean;
}

const initialState: State = {
  Português: false,
  Inglês: false,
  Francês: false,
  Espanhol: false,
  Alemão: false,
  Italiano: false,
  Russo: false,
  Árabe: false,
};

const CheckLinguas: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();


  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );
  console.log("linguaRedux", linguaRedux);

  const [checkboxes, setCheckboxes] = useState<State>(
    initialState || linguaRedux
  );
  const [selectedLingua, setSelectedLingua] = useState<string[]>(
    linguaRedux || []
  );

  useEffect(() => {
    if (selectedLingua) {
      const updatedCheckboxes = { ...initialState };
      selectedLingua.forEach((lingua) => {
        updatedCheckboxes[lingua] = true;
      });
      setCheckboxes(updatedCheckboxes);
    }
  }, [selectedLingua]);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedLingua = checked
      ? [...selectedLingua, name]
      : selectedLingua.filter((lingua) => lingua !== name);

    dispatch(updateLingua(updatedLingua));
    setSelectedLingua(updatedLingua);
  };

  return (
    <div>
      <FormGroup className="text-xs  items-bottom gap-0">
        <div className="grid grid-cols-2 md:grid-cols-3 text-xs items-bottom">
          {Object.entries(checkboxes).map(([key, value]) => (
            <div key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: "white",
                      "&.Mui-checked": { color: pink[800] },
                    }}
                    onChange={handleCheckChange}
                    name={key}
                    checked={value}
                  />
                }
                label={
                  <div className="flex items-center text-white">{t(`linguas.${key}`)}</div>
                }
                className="text-white mr-4"
              />
            </div>
          ))}
        </div>
      </FormGroup>
    </div>
  );
};

export default CheckLinguas;
