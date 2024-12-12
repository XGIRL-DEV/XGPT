import supabase from "@/database/supabase";
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {FaUser} from "react-icons/fa";
import {logout} from "@/actions/ProfileActions";
import {useDispatch} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirmation from "./ModalConfirmation";

const AccountSettings: React.FC = () => {
	const dispatch = useDispatch();
	const userUID = useSelector((state: any) => state.profile?.profile.userUID);
	const [status, setStatus] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuspendModal, setShowSuspendModal] = useState(false);

	const handleDeleteVerificationPhotos = async (userUID: string) => {
		try {
			const {error} = await supabase.from("VPhoto").delete().match({userUID});

			if (error) {
				throw new Error(`Erro ao eliminar fotos de verificação: ${error.message}`);
			}

			console.log("Fotos de verificação eliminadas com sucesso.");
		} catch (error) {
			console.error("Erro ao eliminar as fotos de verificação:", error);
		}
	};

	const handleDeleteStories = async (userUID: string) => {
		try {
			const {error} = await supabase.from("stories").delete().match({userUID});

			if (error) {
				throw new Error(`Erro ao eliminar stories: ${error.message}`);
			}

			console.log("Stories eliminados com sucesso.");
		} catch (error) {
			console.error("Erro ao eliminar stories:", error);
		}
	};

	const handleDeleteProfile = async (userUID: string) => {
		try {
			const {error} = await supabase.from("ProfilesData").delete().match({userUID});

			if (error) {
				throw new Error(`Erro ao eliminar perfil: ${error.message}`);
			}

			console.log("Perfil eliminado com sucesso.");
		} catch (error) {
			console.error("Erro ao eliminar o perfil:", error);
		}
	};

	const deleteAccount = async () => {
		if (!userUID) {
			console.error("Usuário não está logado ou ID do usuário não disponível.");
			return;
		}

		try {
			await handleDeleteStories(userUID);
			await handleDeleteVerificationPhotos(userUID);
			await handleDeleteProfile(userUID);

			const response = await fetch("/api/delete-account", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({userId: userUID}),
			});

			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error);
			}

			toast.success("A tua conta foi eliminada permanentemente com sucesso."); // Toast de sucesso

			const {error} = await supabase.auth.signOut();
			if (error) {
				throw new Error("Erro ao fazer logout: " + error.message);
			}
			dispatch(logout());

			window.location.replace("/login");
		} catch (error) {
			toast.error("Erro ao eliminar conta ou perfil."); // Toast para erro
			console.error("Erro ao eliminar conta ou perfil:", error);
		}
	};

	const toggleStatus = async () => {
		const newStatus = !status;
		const {error} = await supabase.from("ProfilesData").update({status: newStatus}).match({userUID});

		if (error) {
			toast.error("Erro ao atualizar o status."); // Toast para erro
			console.error("Erro ao atualizar o status:", error);
		} else {
			setStatus(newStatus);
			const message = newStatus ? "O teu Perfil foi Reactivado com Sucesso." : "O teu Perfil foi Suspendido Temporariamente com Sucesso.";
			toast.success(message); // Toast de sucesso
		}
	};

	useEffect(() => {
		const fetchStatus = async () => {
			const {data, error} = await supabase.from("ProfilesData").select("status").eq("userUID", userUID).single();

			if (error) {
				console.error("Erro ao buscar status:", error);
			} else {
				setStatus(data.status);
			}
		};

		if (userUID) {
			fetchStatus();
		}
	}, [userUID]);

	const toggleAccountStatus = async () => {
		try {
			setStatus(!status);
			toast.success(status ? "Conta suspensa com sucesso!" : "Conta reativada com sucesso!");
			setShowSuspendModal(false);
		} catch (error) {
			toast.error("Ocorreu um erro ao alterar o status da conta.");
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg'>
			<ToastContainer />
			<h2 className='text-2xl font-semibold mb-6 text-pink-500 flex items-center'>
				<FaUser className='mr-2 text-3xl' /> Configurações da Conta
			</h2>

			<p className='text-gray-300 mb-6'>Gerencie sua conta e suas preferências. Você pode suspender temporariamente ou eliminar sua conta definitivamente.</p>

			<div className='space-y-6'>
				<div className='bg-gray-700 p-4 rounded-lg flex items-center justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-white'>{status ? "Suspender Conta Temporariamente" : "Reativar Conta"}</h3>
						<p className='text-gray-400 text-sm'>
							{status ? "Você poderá reativar sua conta a qualquer momento." : "Sua conta está suspensa. Clique para reativar."}
						</p>
					</div>
					<button
						onClick={() => setShowSuspendModal(true)}
						className={`py-2 px-4 rounded-lg transition-all ${
							status ? "bg-pink-800 text-white hover:bg-pink-600" : "bg-green-700 text-white hover:bg-green-900"
						}`}
					>
						{status ? "Suspender" : "Reativar"}
					</button>
				</div>

				<div className='bg-red-800 p-4 rounded-lg flex items-center justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-white'>Eliminar Conta Definitivamente</h3>
						<p className='text-gray-200 text-sm'>Esta ação é irreversível. Todos os dados serão permanentemente removidos.</p>
					</div>
					<button onClick={() => setShowDeleteModal(true)} className='mt-4 px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-700 transition-colors'>
						Eliminar Conta
					</button>
				</div>

				<ModalConfirmation
					show={showSuspendModal}
					title={status ? "Suspender Conta" : "Reativar Conta"}
					message={
						status ? "Tem certeza de que deseja suspender sua conta? Você pode reativá-la a qualquer momento." : "Tem certeza de que deseja reativar sua conta?"
					}
					onConfirm={toggleAccountStatus}
					onCancel={() => setShowSuspendModal(false)}
				/>

				<ModalConfirmation
					show={showDeleteModal}
					title='Tem certeza que deseja eliminar sua conta?'
					message='Todos os seus dados serão permanentemente removidos.'
					onConfirm={deleteAccount}
					onCancel={() => setShowDeleteModal(false)}
				/>
			</div>
		</div>
	);
};

export default AccountSettings;
