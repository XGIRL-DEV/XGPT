import { useState, useEffect , useMemo} from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { updateServico } from "../../actions/ProfileActions";
import { useTranslation } from 'react-i18next'; // Importar o hook useTranslation

interface State {
  [key: string]: boolean;
}



interface CheckServicoProps {
  selectedServico: string[];
  setSelectedServico: (selectedServico: string[]) => void;
}



const CheckServico: React.FC<CheckServicoProps> = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const servicoRedux = useSelector(
    (state: any) => state.profile?.profile?.servico
  );
  console.log("servicos selecionados:", servicoRedux);


  const initialState: State = useMemo(() => ({
    [t('69')]: false,
    [t('AnulingusActivo')]: false,
    [t('AnulingusPassivo')]: false,
    [t('Champagne Dourado Activo')]: false,
    [t('Champagne Dourado Passivo')]: false,
    [t('Atende Casais')]: false,
    [t('Dedos Anal')]: false,
    [t('Dedos Vagina')]: false,
    [t('Dominacao soft')]: false,
    [t('Dupla Penetracao')]: false,
    [t('Duo')]: false,
    [t('Ejaculacao Corporal')]: false,
    [t('Ejacular na Facial')]: false,
    [t('Multipla Ejeculacao')]: false,
    [t('Face Sitting')]: false,
    [t('Fetichismo')]: false,
    [t('BeijoFrances')]: false,
    [t('Garganta Profunda')]: false,
    [t('Jogos Eroticos')]: false,
    [t('Lingerie')]: false,
    [t('Massagem Erotica')]: false,
    [t('Masturbacao')]: false,
    [t('Experiencia Porn Star')]: false,
    [t('Servico VIP')]: false,
    [t('Sexo em Grupo')]: false,
    [t('Sex Toys')]: false,
    [t('Sodomia Activa')]: false,
    [t('Sodomia Passiva')]: false,
    [t('Striptease')]: false,
  }), [t]);

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
  }, [selectedServico, initialState]);

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-pink-500 mb-6">{t("profile.services")}</h2>
        <FormGroup className="text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(checkboxes).map(([key, value]) => (
              <div 
                key={key} 
                className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 
                  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 
                  transition-colors duration-200"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: "rgb(219, 39, 119)", // pink-600
                        '&.Mui-checked': {
                          color: "rgb(219, 39, 119)",
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                      onChange={handleCheckChange}
                      name={key}
                      checked={value}
                    />
                  }
                  label={
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-200 text-sm">
                        {t(`profile.servico.${key}`)}
                      </span>
                    </div>
                  }
                  className="m-0 flex-1"
                />
              </div>
            ))}
          </div>
        </FormGroup>
      </div>
    </div>
  );
};

export default CheckServico;
