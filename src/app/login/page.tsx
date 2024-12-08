'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/database/supabase';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, addProfileData } from '@/actions/ProfileActions';
import { fetchProfileFromDatabase } from '@/services/profileService';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';


const Login = () => {
  const { t } = useTranslation(); // Usando o hook de tradução

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // État pour le message d'erreur
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      dispatch(loginSuccess(token));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleAuthStateChange = async (event: string) => {
      if (event === 'SIGNED_IN') {
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          router.push(returnUrl);
          localStorage.removeItem('returnUrl');
        } else {
        router.push('/login');
      }
    };}

    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const fetchProfileData = async (userUID: string) => {
    try {
      const data = await fetchProfileFromDatabase(userUID);
      dispatch(addProfileData(data));
    } catch (error: any) {
      console.error('Erreur lors de la récupération des données du profil :', error.message);
    }
  };

  const handleLogin = async () => {
    setErrorMessage(''); // Efface le message d'erreur lors de la tentative de connexion
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erreur lors de la connexion :', error.message);
      setErrorMessage('Email ou mot de passe incorrect. Veuillez réessayer.'); // Met à jour le message d'erreur
      dispatch(loginFailure(error));
    } else {
      if (user) {
        const userUID = user.user.id;
        fetchProfileData(userUID);

        dispatch(
          loginSuccess({
            email: user.user.email,
            userUID: user.user.id,
          })
        );

        const tokenID = user.session.refresh_token;
        localStorage.setItem('userToken', tokenID);
        localStorage.setItem('email', email);

        router.push('/escort');
      } else {
        console.log("L'objet utilisateur retourné est vide ou indéfini.");
      }
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Connexion - X-Girl</title>
        <meta name="description" content="Connectez-vous à X-Girl pour découvrir des expériences uniques et confidentielles." />
        <meta name="keywords" content="connexion, X-Girl, login, expérience confidentielle, sécurité" />
        <meta property="og:title" content="Connexion - X-Girl" />
        <meta property="og:description" content="Connectez-vous à X-Girl pour découvrir des expériences uniques et confidentielles." />
        <meta property="og:url" content="https://www.xgirl.fr/login" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-col items-center mt-36 h-screen bg-gray-900 px-4 ">
        {/* Texte motivant */}
        {/* <p className="text-center text-gray-400 text-sm mb-4 max-w-md">
          Découvrez des moments uniques avec <span className="text-pink-500 font-bold">une totale confidentialité</span> et <span className="text-pink-500 font-bold">sécurité</span>.
        </p> */}

        <div className="bg-gray-800 w-full max-w-md md:w-1/3 rounded-lg shadow-2xl border border-gray-700 px-6 py-6 space-y-4">
          {/* En-tête */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 mb-4">
            {t('loginPage.title')}
          </h1>
          <p className="text-center text-gray-400 text-sm mb-4">
          {t('loginPage.description')}          </p>

          {/* Avantages */}
          {/* <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 mb-6">
            <li>
              <span className="text-pink-500">Profils exclusifs :</span> Trouvez des accompagnantes qui répondent à vos préférences.
            </li>
            <li>
              <span className="text-pink-500">Confidentialité garantie :</span> Connexions sécurisées et discrètes.
            </li>
            <li>
              <span className="text-pink-500">Facile et rapide :</span> Inscrivez-vous et commencez en quelques minutes.
            </li>
          </ul> */}

          {/* Formulaire */}
          <div className="space-y-4">
            {/* Champ Email */}
            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-300"
                htmlFor="email"
              >
                {t('loginPage.email')}
                </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder={t('loginPage.email_placeholder')} // Usar a tradução do placeholder
                  value={email}
                  onChange={handleEmailChange}
                  className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 pl-10"
                  required
                  aria-label="Email"
                />
                <svg
                  className="w-5 h-5 absolute top-3 left-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m12 4h-7m7-8H9m12 4a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-300"
                htmlFor="password"
              >
                  {t('loginPage.password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder={t('loginPage.password_placeholder')} // Usar a tradução do placeholder
                  value={password}
                  onChange={handlePasswordChange}
                  className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 pl-10"
                  required
                  aria-label="Mot de passe"
                />
                <svg
                  className="w-5 h-5 absolute top-3 left-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0-12a5 5 0 015 5v4a5 5 0 01-10 0V8a5 5 0 015-5z"
                  />
                </svg>
              </div>
            </div>

            {/* Message d'erreur */}
            {errorMessage && (
              <div className="text-center bg-pink-100 text-pink-600 border border-pink-500 rounded-lg p-2 text-sm">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Bouton de connexion */}
          <button
            onClick={handleLogin}
            className="py-2 text-lg font-medium text-center text-white rounded-lg bg-pink-600 w-full hover:bg-pink-500 transition-all duration-200 focus:ring focus:ring-pink-400"
          >
             {t('loginPage.login_button')}
          </button>

          {/* Lien pour l'inscription */}
          <div className="text-center mt-4">
            <Link
              href="/regista2"
              className="text-pink-600 cursor-pointer hover:text-pink-500 font-semibold"
            >
              {t('loginPage.register_link')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
