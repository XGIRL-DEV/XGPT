import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";

import FiltroAltura from "@/components/filtros/filtro-altura";
import FiltroCorpo from "@/components/filtros/filtro-corpo";
import FiltroMamas from "@/components/filtros/filtro-mamas";
import FiltroOlhos from "@/components/filtros/filtro-olhos";
import FiltroPeito from "@/components/filtros/filtro-peito";
import FiltroPelos from "@/components/filtros/filtro-pelos";
import FiltroTatuagem from "@/components/filtros/filtro-tatuagem";
import FiltroSigno from "@/components/filtros/filtro-signo";
import FiltroTarifa from "@/components/filtros/filtro-tarifa";
import supabase from "@/database/supabase";
import FiltroDistrito from "@/components/filtros/filtro-distrito";
import {updateProfileData} from "@/services/profileService";
import {
	updateNome,
	updateuserUID,
	updateIdade,
	updateTelefone,
	updateCidade,
	updateMamas,
	updateAltura,
	updateDistrito,
	updateOrigem,
	updateCorpo,
	updateCabelo,
	updateOlhos,
	updateSeios,
	updatePelos,
	updateTatuagem,
} from "@/actions/ProfileActions";
import {useParams} from "next/navigation";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Button} from "@/components/ui/button";
import CommonInput from "@/components/ui/common-input";

interface ModificarPerfilProps {
	handleVoltar: () => void;
	onClose: () => void;
	open: boolean;
}

const ModificarPerfil: React.FC<ModificarPerfilProps> = ({handleVoltar, onClose, open}) => {
	const dispatch = useDispatch();
	const {userUID} = useParams<{userUID: string}>();

	const [nome, setNome] = useState<string>("");
	const [idade, setIdade] = useState<string>("");
	const [telefone, setTelefone] = useState<string>("");
	const [cidade, setCidade] = useState<string>("");
	const [distrito, setDistrito] = useState<string>("");
	const [origem, setOrigem] = useState<string>("");
	const [altura, setAltura] = useState<string>("");
	const [mamas, setMamas] = useState<string>("");
	const [pelos, setPelos] = useState<string>("");
	const [corpo, setCorpo] = useState<string>("");
	const [cabelo, setCabelo] = useState<string>("");
	const [olhos, setOlhos] = useState<string>("");
	const [seios, setSeios] = useState<string>("");
	const [tatuagem, setTatuagem] = useState<string>("");

	const reduxState = useSelector((state: any) => state);
	const userUIDd = useSelector((state: any) => state.profile?.profile?.userUID);

	const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
	const idadeRedux = useSelector((state: any) => state.profile?.profile?.idade);
	const telefoneRedux = useSelector((state: any) => state.profile?.profile?.telefone);
	const cidadeRedux = useSelector((state: any) => state.profile?.profile?.cidade);
	const origemRedux = useSelector((state: any) => state.profile?.profile?.origem);
	const distritoRedux = useSelector((state: any) => state.profile?.profile?.distrito);
	const alturaRedux = useSelector((state: any) => state.profile?.profile?.altura);
	const mamasRedux = useSelector((state: any) => state.profile?.profile?.mamas);
	const pelosRedux = useSelector((state: any) => state.profile?.profile?.pelos);
	const corpoRedux = useSelector((state: any) => state.profile?.profile?.corpo);
	const cabeloRedux = useSelector((state: any) => state.profile?.profile?.cabelo);
	const olhosRedux = useSelector((state: any) => state.profile?.profile?.olhos);
	const seiosRedux = useSelector((state: any) => state.profile?.profile?.seios);
	const tatuagemRedux = useSelector((state: any) => state.profile?.profile?.tatuagem);

	const signoRedux = useSelector((state: any) => state.profile?.profile?.signo);

	const handleGuardar = async () => {
		const dataToUpdate = {
			nome,
			idade,
			telefone,
			cidade,
			distrito,
			origem,
			altura,
			pelos,
			userUID: userUIDd,
			mamas,
			corpo,
			cabelo,
			olhos,
			seios,
			tatuagem,
		};

		try {
			await updateProfileData(dataToUpdate, userUIDd);
			toast.success("Alteração efetuada com sucesso!", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			// onClose(); // Fechar modal ou realizar outra ação de sucesso
		} catch (error) {
			console.error("Erro ao atualizar perfil na base de dados:" + error);
			toast.error("Erro ao atualizar perfil na base de dados: " + error, {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
	};

	useEffect(() => {
		if (userUID) {
			dispatch(updateuserUID(userUID));
		}
	}, [dispatch, userUID]);

	useEffect(() => {
		const getSession = async () => {
			const {data, error} = await supabase.auth.getSession();
			if (error || !data.session) {
				console.log("Sessão não iniciada ou erro ao verificar a sessão:", error);
			} else {
				console.log("Sessão iniciada:", data.session);
			}
		};

		getSession();
	}, []);

	useEffect(() => {
		// Adiciona estilo para ocultar o overflow do body
		document.body.style.overflow = "hidden";

		// Remove o estilo quando o componente for desmontado
		return () => {
			document.body.style.overflow = ""; // Restaura o estilo original
		};
	}, []);

	useEffect(() => {
		if (nomeRedux) setNome(nomeRedux);
		if (idadeRedux) setIdade(idadeRedux);
		if (telefoneRedux) setTelefone(telefoneRedux);
		if (cidadeRedux) setCidade(cidadeRedux);
		if (distritoRedux) setDistrito(distritoRedux);
		if (origemRedux) setOrigem(origemRedux);
		if (alturaRedux) setAltura(alturaRedux);
		if (pelosRedux) setPelos(pelosRedux);
		if (mamasRedux) setMamas(mamasRedux);
		if (corpoRedux) setCorpo(corpoRedux);
		if (cabeloRedux) setCabelo(cabeloRedux);
		if (olhosRedux) setOlhos(olhosRedux);
		if (seiosRedux) setSeios(seiosRedux);
		if (tatuagemRedux) setTatuagem(tatuagemRedux);
		if (signoRedux) setTatuagem(signoRedux);
	}, [
		nomeRedux,
		idadeRedux,
		telefoneRedux,
		cidadeRedux,
		distritoRedux,
		origemRedux,
		alturaRedux,
		pelosRedux,
		mamasRedux,
		corpoRedux,
		cabeloRedux,
		olhosRedux,
		seiosRedux,
		tatuagemRedux,
		signoRedux,
	]);

	// INPUT ONCHANGE START

	const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const novoNome = event.target.value;
		dispatch(updateNome(novoNome));
		setNome(novoNome);
	};

	const handleIdadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const novaIdade = event.target.value;
		dispatch(updateIdade(novaIdade));
		setIdade(novaIdade);
	};

	const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const novoTelefone = event.target.value;
		dispatch(updateTelefone(novoTelefone));
		setTelefone(novoTelefone);
	};

	const handleCidadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const novaCidade = event.target.value;
		dispatch(updateCidade(novaCidade));
		setCidade(novaCidade);
	};

	// END INPUT ONCHANGE

	// LISTBOX ONCHANGE START

	const handleMamasChange = (newValue: string) => {
		dispatch(updateMamas(newValue));
		setMamas(newValue);
	};

	const handleAlturaChange = (newValue: string) => {
		dispatch(updateAltura(newValue));
		setAltura(newValue);
	};

	const handleDistritoChange = (newValue: string) => {
		dispatch(updateDistrito(newValue));
		setDistrito(newValue);
	};

	const handleOrigemChange = (newValue: string) => {
		dispatch(updateOrigem(newValue));
		setOrigem(newValue);
	};

	const handleCorpoChange = (newValue: string) => {
		dispatch(updateCorpo(newValue));
		setCorpo(newValue);
	};

	const handleCabeloChange = (newValue: string) => {
		dispatch(updateCabelo(newValue));
		setCabelo(newValue);
	};

	const handleOlhosChange = (newValue: string) => {
		dispatch(updateOlhos(newValue));
		setOlhos(newValue);
	};

	const handleSeiosChange = (newValue: string) => {
		dispatch(updateSeios(newValue));
		setSeios(newValue);
	};

	const handlePelosChange = (newValue: string) => {
		dispatch(updatePelos(newValue));
		setPelos(newValue);
	};

	const handleTatuagemChange = (newValue: string) => {
		dispatch(updateTatuagem(newValue));
		setTatuagem(newValue);
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className='max-w-4xl   h-2/3 md:h-4/5 sm:max-h-[80vh] p-0  overflow-hidden'>
				<DialogHeader className='bg-pink-800 py-6 '>
					<DialogTitle className='text-3xl font-bold tracking-wide text-center'>Modifica o teu Perfil</DialogTitle>
					<p className='text-center text-gray-200 text-sm'>
						Complete as informações para começar no <strong>Xgirl.pt</strong>
					</p>
				</DialogHeader>

				{/* Formulário */}
				<div className='p-8 space-y-8 overflow-y-auto '>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* Coluna Esquerda */}
						<div className='space-y-6'>
							<CommonInput label='Nome*' value={nome} onChange={handleNomeChange} placeholder='Digite seu nome' />

							<CommonInput label='Idade' type='number' value={idade} onChange={handleIdadeChange} placeholder='Sua idade' />

							<CommonInput label='Número de Telefone*' value={telefone} onChange={handleTelefoneChange} placeholder='Seu telefone' />
							<FiltroTarifa />
							<FiltroDistrito />

							<CommonInput label='Cidade' value={cidade} onChange={handleCidadeChange} placeholder='Sua cidade' />
							<FiltroAltura />
						</div>

						{/* Coluna Direita */}
						<div className='space-y-6'>
							<FiltroCorpo />
							<FiltroOlhos />
							<FiltroMamas />
							<FiltroPeito />
							<FiltroPelos />
							<FiltroTatuagem />
							<FiltroSigno />
						</div>
					</div>
				</div>

				<DialogFooter className='bg-gray-800 border-t border-gray-700 p-4'>
					<div className='flex justify-between w-full'>
						<Button variant='voltar' onClick={handleVoltar}>
							Voltar
						</Button>

						<Button variant='guarder' onClick={handleGuardar}>
							Guardar
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModificarPerfil;
