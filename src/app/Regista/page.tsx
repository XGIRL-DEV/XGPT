/* eslint-disable @next/next/no-img-element */
"use client";
import { FaClock, FaMoneyBillWave, FaStar, FaGift } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import Link from "next/link";
import Image from "next/image";

const Regista: React.FC = () => {
  return (
    <div className="text-gray-600 bg-[#1b1b1b]">
      <div className="pb-4 bg-[#1b1b1b]">
        <div className="bg-[#1b1b1b] pt-28 px-44">
          <p className="text-pink-800 text-4xl flex justify-center py-8">
            Cria o teu perfil no X-Girl
          </p>

          <div className="flex gap-14 h-full">
            <div className="bg-[#1E2427] w-1/2 mb-10 border border-zinc-600 flex flex-col justify-end items-center">
              <div>
                <p className="text-pink-800 text-xl pt-6 pb-2 px-6">
                  Você é uma profissional independente ou trabalha em um salão
                  erótico?
                </p>
                <div className="flex">
                  <div className="flex justify-center items-center">
                    <Image
                      src="/photos/register1.png"
                      style={{ width: "360px", height: "300px" }}
                      alt="Register as Advertiser"
                      layout="responsive"

                    />
                  </div>
                  <div className="px-10 pb-2 pt-1 justify-center align-middle items-center">
                    <div className="flex items-center">
                      <TfiCup className="text-pink-800 mr-4" size={36} />
                      <p className="text-white py-2">
                        O site mais completo em Portugal
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-pink-800 mr-4" size={36} />
                      <p className="text-white py-2">
                        O processo de inscrição é simples e rápido.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave
                        className="text-pink-800 mr-4"
                        size={52}
                      />
                      <p className="text-white py-2">
                        Ganhe muito dinheiro! Atenda de 20 a 200 contactos por
                        mês.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-pink-800 mr-4" size={44} />
                      <p className="text-white py-2">
                        Vários destaques por mês e por dia sem pagar mais
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaGift className="text-yellow-500 mr-4" size={44} />
                      <p className="text-yellow-500 underline cursor-pointer py-2">
                        Clique aqui para ver todas as vantagens.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-8 my-4">
                  <Link
                    href="/regista2"
                    className="flex justify-center items-center rounded-md cursor-pointer text-white w-56 bg-pink-800 py-2 mb-4 hover:bg-pink-600"
                  >
                    Regista-te como Anunciante
                  </Link>
                  <Link
                    href="/regista2"
                    className="flex justify-center items-center rounded-md cursor-pointer text-white w-56 bg-pink-800 py-2 mb-4 hover:bg-pink-600"
                  >
                    Regista um estabelecimento
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#1E2427] w-1/2 mb-10 border border-zinc-600 flex flex-col justify-end items-center">
              <div>
                <p className="text-pink-800 text-xl pt-6 pb-2 px-6">
                  Você é uma profissional independente ou trabalha em um salão
                  erótico?
                </p>
                <div className="flex">
                  <div className="flex justify-center items-center mx-4">
                    <img
                      src="/photos/register2.png"
                      style={{ width: "360px", height: "300px" }}
                      alt="Register as Member"
                    />
                  </div>
                  <div className="px-10 pb-2 pt-1 justify-center align-middle items-center">
                    <div className="flex items-center">
                      <TfiCup className="text-pink-800 mr-4" size={36} />
                      <p className="text-white py-2">
                        Disfruta do site com mais filtros em Portugal
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-pink-800 mr-4" size={36} />
                      <p className="text-white py-2">
                        Adicione uma garota aos seus favoritos para acompanhar
                        sua atividade.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave
                        className="text-pink-800 mr-4"
                        size={52}
                      />
                      <p className="text-white py-2">
                        Publique avaliações após seus encontros.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-pink-800 mr-4" size={44} />
                      <p className="text-white py-2">
                        Vários destaques por mês e por dia sem pagar mais
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaGift className="text-yellow-500 mr-4" size={44} />
                      <p className="text-yellow-500 underline cursor-pointer py-2">
                        Clique aqui para ver todas as vantagens.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center px-8 my-4">
                  <Link
                    href="/regista2"
                    className="flex justify-center items-center rounded-md cursor-pointer text-white w-56 bg-pink-800 py-2 mb-4 hover:bg-pink-600"
                  >
                    Cria o teu perfil de Membro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regista;
