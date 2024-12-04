"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const InfoCard: React.FC = () => {

  return (
    <div className="bg-black  w-full rounded-xl h-full mb-2 flex justify-center">
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82">
          <div className="rounded-lg shadow-lg bg-gray-800  p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl">
            <p className="font-bold text-2xl mb-4 text-white">2103 Utilisateurs</p>
            <p className="font-medium text-gray-300 mb-6 text-sm text-center">

              Descobre escorts de TOP, maseeeeesagistas e outros serviços na tua zona


            </p>
            <Link href="/girls">
              <p className="text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out">
              Voir les Annonces
              </p>
            </Link>
          </div>
        </div>
  
        {/* Cartão de Visitas Diárias */}
        <div className="flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82">
        <div className="rounded-lg shadow-lg bg-gray-800  p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl">
        <p className="font-bold text-2xl mb-4 text-white">+ 5000 Visites </p>
            <p className="font-medium text-gray-300 mb-6 text-sm text-center">
            Découvrez les derniers commentaires postés sur les escorts dans votre région
            </p>
            <Link href="/Acompanhantes">
              <p className="text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out">
              Voir les Annonces
              </p>
            </Link>
          </div>
        </div>
  
        {/* Cartão de Publicação de Anúncio */}
        <div className="flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82">
        <div className="rounded-lg shadow-lg bg-gray-800  p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl">
            <p className="font-bold text-2xl mb-4 text-white">Publiez votre annonce</p>
            <p className="font-medium text-gray-300 mb-6 text-sm text-center">
            Publiez votre annonce gratuitement sur O Teu Desejo. Le site érotique n°1 au Portugal
                        </p>
            <Link href="/regista">
              <p className="text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out">
              Inscrivez-vous              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default InfoCard;
