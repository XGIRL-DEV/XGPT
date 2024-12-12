import CommonInput from "@/components/ui/common-input";
import supabase from "@/database/supabase";
import React, {useState} from "react";
import {FaLock} from "react-icons/fa";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Password: React.FC = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			setError("As senhas não correspondem.");
			return;
		}

		const {
			data: {user},
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user) {
			setError("Erro ao obter o usuário.");
			return;
		}

		// Verifique a senha atual
		const {error: signInError} = await supabase.auth.signInWithPassword({
			email: user.email as string,
			password: currentPassword,
		});

		if (signInError) {
			setError("A palavra-passe atual está incorreta.");
			return;
		}

		// Tente atualizar a senha com a nova senha
		const {error: updateError} = await supabase.auth.updateUser({
			password: newPassword,
		});

		if (updateError) {
			setError(updateError.message);
		} else {
			setSuccess("Senha alterada com sucesso!");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
			setError(null);
		}
	};

	return (
		<div className='bg-gray-800 p-8 rounded-lg mb-6 shadow-lg  z-50'>
			<h2 className='text-3xl font-bold mb-6 text-pink-500 flex items-center'>
				<FaLock className='mr-2 text-4xl' /> Alterar Senha
			</h2>
			<form className='mt-4' onSubmit={handleChangePassword}>
				<div className='mb-6'>
					<CommonInput
						label='Palavra-passe Atual:'
						value={currentPassword}
						onChange={(e: string) => setCurrentPassword(e)}
						type='password'
						placeholder='Digite sua palavra-passe atual'
					/>
				</div>

				<div className='mb-6'>
					<CommonInput
						label='Nova Senha:'
						value={newPassword}
						onChange={(e: string) => setNewPassword(e)}
						type='password'
						required
						placeholder='Digite sua nova senha'
					/>
				</div>

				<div className='mb-6'>
					<CommonInput
						label='Confirmar Nova Senha:'
						value={confirmPassword}
						onChange={(e: string) => setConfirmPassword(e)}
						type='password'
						required
						placeholder='Confirme sua nova senha'
					/>
				</div>

				{error && <p className='text-red-500 mb-4'>{error}</p>}
				{success && <p className='text-green-500 mb-4'>{success}</p>}

				<button type='submit' className='w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md'>
					Alterar Senha
				</button>

				<div className='mt-4 text-gray-400 text-sm'>
					Dicas para criar uma senha forte:
					<ul className='list-disc list-inside'>
						<li>Use pelo menos 8 caracteres.</li>
						<li>Inclua letras maiúsculas e minúsculas.</li>
						<li>Adicione números e símbolos.</li>
					</ul>
				</div>
			</form>

			<ToastContainer />
		</div>
	);
};

export default Password;
