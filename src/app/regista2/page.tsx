"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaClock, FaMoneyBillWave, FaStar, FaGift } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import supabase from "@/database/supabase";
import ListRegister from "@/components/Register/ListRegister";
import { registerUser } from "@/actions/ProfileActions";
import { useRouter } from "next/navigation";

const TypeDeRegistrement = [
  { id: 1, name: "Annonceur", unavailable: false },
  { id: 2, name: "Bar / Salon Érotique", unavailable: false },
  { id: 3, name: "Utilisateur", unavailable: false },
];

const Registre2: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    name: string;
    unavailable: boolean;
  } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleOptionSelect = (option: {
    id: number;
    name: string;
    unavailable: boolean;
  }) => {
    setSelectedOption(option);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      setIsLoggedIn(true);

      if (error) {
        console.error("Erreur lors de l'inscription :", error.message);
      } else {
        console.log("Utilisateur enregistré avec succès :", data.user);
        console.log("ID de l'utilisateur enregistré avec succès :", data.user?.id);

        if (data?.user?.id) {
          dispatch(registerUser(data?.user?.id, email));
        }
        console.log("Email passé au Redux :", email);

        if (selectedOption) {
          switch (selectedOption.id) {
            case 1:
              await supabase.from("ProfilesData").insert([
                {
                  userUID: data.user?.id,
                  userData: data.user,
                },
              ]);

              router.push(
                `/registre-entrée?email=${email}&userUID=${data.user?.id}`
              );
              break;

            case 2:
              await supabase.from("etablissements").insert([
                {
                  userUID: data.user?.id,
                  userData: data.user,
                },
              ]);
              router.push(
                `/registre-etablissement?email=${email}&userUID=${data.user?.id}`
              );

              break;

            case 3:
              router.push("/registre-entrée");
              break;
            default:
              break;
          }
        }
      }
    } catch (error: any) {
      console.error("Erreur lors de l'inscription :", error.message);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="bg-gray-600 rounded-md">
      <div className="pb-4 bg-gray-900 rounded-md">
        {/* <Header isLogged={isLoggedIn} /> */}
        <div className=" h-full  dark:bg-gray-900 justify-center md:flex">
          {/* CÔTÉ GAUCHE */}
          <div className="md:w-1/2 mx-auto my-auto md:flex md:flex-col justify-end items-center">
            <div>
              <p className="text-pink-900 text-3xl pb-10 px-6 font-extrabold ">
                XGirl.fr est la référence pour les annonces descort exclusives en France
              </p>
              <div className="flex ">
                <div className="px-10 pb-2 pt-1 justify-center gap-10 align-middle items-center">
                  <div className="flex items-center py-2">
                    <TfiCup className="text-pink-800 mr-4" size={48} />
                    <p className="text-gray-500 py-2">
                      Découvrez des milliers descorts sur XGirl.fr
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaClock className="text-pink-900 mr-4" size={48} />
                    <p className="text-gray-500 py-2">
                      Le processus dinscription est simple et rapide.
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaMoneyBillWave className="text-pink-900 mr-4" size={48} />
                    <p className="text-gray-500 py-2">
                      Augmentez vos revenus considérablement ! Attirez entre 30 et 450 clients chaque mois.
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaStar className="text-pink-900 mr-4" size={48} />
                    <p className="text-gray-500 py-2">
                      Profitez de mises en avant chaque mois sans frais supplémentaires.
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaGift className="text-yellow-500 mr-4" size={48} />
                    <p className="text-yellow-500 underline cursor-pointer py-2">
                      Cliquez ici pour voir tous les avantages
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-8 my-4"></div>
            </div>
          </div>

          {/* côté droit */}
          <div className="bg-gray-900 dark:bg-gray-800 mt-10 w-full max-w-lg mx-auto border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-center text-white mb-6">
              Créez un nouveau compte
            </h1>

            <form className="space-y-6">
              {/* Champ Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3"
                  required
                />
              </div>

              {/* Option supplémentaire */}
              <div>
                <ListRegister handleOptionSelect={handleOptionSelect} />
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Mot de passe*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3"
                  required
                />
              </div>

              {/* Confirmation du mot de passe */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Confirmez votre mot de passe*
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3"
                  required
                />
              </div>

              {/* Bouton Créer un compte */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full py-3 px-6 bg-pink-500 hover:bg-pink-400 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  Créez votre compte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registre2;
