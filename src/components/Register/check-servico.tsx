import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { updateServico } from "../../actions/ProfileActions";

interface State {
  [key: string]: boolean;
}

const initialState: State = {
  69: false,
  "Anulingus (Activo)": false,
  "Anulingus (Passivo)": false,
  "Champagne Dourado Activo": false,
  "Champagne Dourado Passivo": false,
  "Atende Casais": false,
  "Dedos Anal": false,
  "Dedos Vagina": false,
  "Dominacao soft": false,
  "Dupla Penetracao": false,
  Duo: false,
  "Ejaculacao Corporal": false,
  "Ejacular na Facial": false,
  "Multipla Ejeculacao": false,
  "Face Sitting": false,
  Fetichismo: false,
  "Bejio Frances": false,
  "Garganta Profunda": false,
  "Jogos Eroticos": false,
  Lingerie: false,
  "Massagem Erotica": false,
  Mastrubacao: false,
  "Experiencia Porn Star": false,
  "Servico VIP": false,
  "Sexo em Grupo (Orgia)": false,
  "Sex Toys": false,
  "Sodomia Activa": false,
  "Sodomia Passiva": false,
  Striptease: false,
};

interface CheckServicoProps {
  selectedServico: string[];
  setSelectedServico: (selectedServico: string[]) => void;
}

const CheckServico: React.FC<CheckServicoProps> = () => {
  const dispatch = useDispatch();

  const servicoRedux = useSelector(
    (state: any) => state.profile?.profile?.servico
  );
  console.log("servicos selecionados:", servicoRedux);

  const [checkboxes, setCheckboxes] = useState<State>(
    initialState || servicoRedux
  );
  const [selectedServico, setSelectedServico] = useState<string[]>(
    servicoRedux || []
  );

  // Atualiza os checkboxes quando os métodos de servico selecionados mudam
  useEffect(() => {
    if (selectedServico) {
      const updatedCheckboxes = { ...initialState };
      selectedServico.forEach((payment) => {
        updatedCheckboxes[payment] = true;
      });
      setCheckboxes(updatedCheckboxes);
    }
  }, [selectedServico]);

  // Função para lidar com a mudança de estado dos checkboxes
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedServico = checked
      ? [...selectedServico, name]
      : selectedServico.filter((payment) => payment !== name);

    dispatch(updateServico(updatedServico));
    setSelectedServico(updatedServico);
  };

  // Logs para depuração
  console.log("selectedservico:", selectedServico);

  return (
    <div>
      <FormGroup className="text-xs items-bottom gap-0 ">
        <div className="grid md:grid-cols-3 text-xs  items-bottom ">
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
                  <div className="flex items-center text-white">{key}</div>
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

export default CheckServico;
