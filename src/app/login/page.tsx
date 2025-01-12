"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import supabase from "@/database/supabase";
import {useDispatch} from "react-redux";
import {loginSuccess, loginFailure, addProfileData} from "@/actions/ProfileActions";
import {fetchProfileFromDatabase} from "@/services/profileService";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import InputWithIcon from "./_ui/InputWithIcon";
import {Fa0, FaP} from "react-icons/fa6";
import {Button} from "@/components/ui/button";

const Login = () => {
	const {t} = useTranslation(); // Usando o hook de tradução

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>(""); // État pour le message d'erreur
	const router = useRouter();
	const dispatch = useDispatch();

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	useEffect(() => {
		const token = localStorage.getItem("userToken");
		const email = localStorage.getItem("email"); // Recupere o email salvo no localStorage (se houver)
	
		if (token && email) {
			dispatch(
				loginSuccess({
					email, // O email salvo no localStorage
					token, // O token salvo no localStorage
					user: {}, // Use um objeto vazio ou preencha com informações relevantes
				})
			);
		} else {
			console.error("Token ou email ausente no localStorage.");
		}
	}, [dispatch]);

	useEffect(() => {
		const handleAuthStateChange = async (event: string) => {
			if (event === "SIGNED_IN") {
				const returnUrl = localStorage.getItem("returnUrl");
				if (returnUrl) {
					router.push(returnUrl);
					localStorage.removeItem("returnUrl");
				} else {
					router.push("/login");
				}
			}
		};

		const {data: authListener} = supabase.auth.onAuthStateChange(handleAuthStateChange);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, [router]);

	const fetchProfileData = async (userUID: string) => {
		try {
			const data = await fetchProfileFromDatabase(userUID);
			dispatch(addProfileData(data));
		} catch (error: any) {
			console.error("Erreur lors de la récupération des données du profil :", error.message);
		}
	};

	const handleLogin = async () => {
		setErrorMessage(""); // Limpar mensagem de erro ao tentar fazer login
		const { data: user, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		console.log("Dados retornados pelo Supabase:", user);

		if (error) {
			console.error("Erro ao fazer login:", error.message);
			setErrorMessage("Email ou senha incorretos. Por favor, tente novamente.");
			dispatch(loginFailure(error));
		} else {
			if (user) {
				const userUID = user.user.id;
				const token = user.session.refresh_token; // Obtenha o token de sessão
	
				// Buscar dados do perfil
				await fetchProfileData(userUID);
				if (user?.user?.email && user?.session?.refresh_token) {

			

				dispatch(
					loginSuccess({
						email: user!.user!.email,
						token: user!.session!.refresh_token,
						user: user!.user,
					})
				);
				if (typeof window !== "undefined") {

				// Salvar informações no localStorage
				localStorage.setItem("userToken", token);
				localStorage.setItem("email", email);
				console.log(localStorage.getItem("userToken")); // Deve retornar "exemploToken"
				console.log(localStorage.getItem("email"));
	
				// Redirecionar o usuário
				router.push("/escort");
			} else {
				console.log("O objeto usuário retornado está vazio ou indefinido.");
			}
		}}}
	};

	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>Connexion - X-Girl</title>
				<meta name='description' content='Connectez-vous à X-Girl pour découvrir des expériences uniques et confidentielles.' />
				<meta name='keywords' content='connexion, X-Girl, login, expérience confidentielle, sécurité' />
				<meta property='og:title' content='Connexion - X-Girl' />
				<meta property='og:description' content='Connectez-vous à X-Girl pour découvrir des expériences uniques et confidentielles.' />
				<meta property='og:url' content='https://www.xgirl.fr/login' />
				<meta name='robots' content='index, follow' />
			</Head>

			<div className='flex flex-col items-center mt-36 h-screen pb-4 '>
				{/* Texte motivant */}
				{/* <p className="text-center text-gray-400 text-sm mb-4 max-w-md">
          Découvrez des moments uniques avec <span className="text-pink-500 font-bold">une totale confidentialité</span> et <span className="text-pink-500 font-bold">sécurité</span>.
        </p> */}

				<div className='bg-white dark:bg-gray-800  w-full mt-10 max-w-md md:w-1/3 rounded-lg shadow-2xl shadow-gray-400 dark:shadow-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-6 space-y-4'>
					{/* En-tête */}
					<h1 className='text-3xl md:text-4xl font-extrabold text-center text-pink-500 mb-4'>{t("loginPage.title")}</h1>
					<p className='text-center text-gray-400 text-sm mb-4'>{t("loginPage.description")} </p>

					<div className='space-y-4'>
						<InputWithIcon
							label={t("loginPage.email")}
							type='email'
							placeholder={t("loginPage.email_placeholder")}
							value={email}
							onChange={handleEmailChange}
							required
							aria-label='Email'
						/>

						<InputWithIcon
							label={t("loginPage.password")}
							id='password'
							type='password'
							placeholder={t("loginPage.password_placeholder")}
							value={password}
							onChange={handlePasswordChange}
							required
							aria-label='Mot de passe'
						/>

						{/* Message d'erreur */}
						{errorMessage && <div className='text-center bg-pink-100 text-pink-500 border border-pink-500 rounded-lg p-2 text-sm'>{errorMessage}</div>}
					</div>

					{/* Bouton de connexion */}
					<Button onClick={handleLogin} variant='guarder' className='w-full'>
						{t("loginPage.login_button")}
					</Button>

					{/* Lien pour l'inscription */}
					<div className='text-center mt-4'>
						<Link href='/regista2' className='text-pink-500 cursor-pointer hover:text-pink-600 font-semibold'>
							{t("loginPage.register_link")}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
