"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckDeslocacoes from "@/components/Register/CheckDeslocacoes";
import CheckPagamento from "@/components/Register/CheckPagamento";
import CheckLinguas from "@/components/Register/CheckLinguas";
import CheckServico from "@/components/Register/CheckServico";
import FiltroPrice from "@/components/Filtros/FiltroTarifa";
import {
  updateDescription,
  updatePagamento,
  updateLingua,
  updateServico,
} from "@/actions/ProfileActions";
import dynamic from "next/dynamic";

import { Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';



const RegistoContacto: React.FC = () => {
  const dispatch = useDispatch();

  const userEmailRedux = useSelector(
    (state: any) => state.profile?.profile?.email
  );
  const servicoRedux = useSelector(
    (state: any) => state.profile?.profile?.servico
  );
  const pagamentoRedux = useSelector(
    (state: any) => state.profile?.profile?.pagamento
  );
  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );
  const descriptionRedux = useSelector(
    (state: any) => state.profile?.profile?.description
  );

  const [selectedPagamento, setSelectedPagamento] = useState<string[]>(
    pagamentoRedux || []
  );
  const [selectedServico, setSelectedServico] = useState<string[]>(
    servicoRedux || []
  );
  const [selectedLingua, setSelectedLingua] = useState<string[]>(
    linguaRedux || []
  );
  const [description, setDescription] = useState<string>(
    descriptionRedux || ""
  );

  useEffect(() => {
    setSelectedPagamento(pagamentoRedux || []);
  }, [pagamentoRedux]);

  useEffect(() => {
    setSelectedLingua(linguaRedux || []);
  }, [linguaRedux]);

  useEffect(() => {
    setSelectedServico(servicoRedux || []);
  }, [servicoRedux]);

  useEffect(() => {
    setDescription(descriptionRedux || "");
  }, [descriptionRedux]);

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
    dispatch(updateDescription(content));
  };

  const handlePaymentChange = (updatedPayments: string[]) => {
    dispatch(updatePagamento(updatedPayments));
    setSelectedPagamento(updatedPayments);
  };

  const handleServicoChange = (updatedServico: string[]) => {
    dispatch(updateServico(updatedServico));
    setSelectedServico(updatedServico);
  };

  const handleLinguaChange = (updatedLingua: string[]) => {
    dispatch(updateLingua(updatedLingua));
    setSelectedLingua(updatedLingua);
  };

  const reduxState = useSelector((state: any) => state);
  console.log("Estado Redux completo:", reduxState);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-transparent backdrop-blur-md z-50">
    <div className="w-full max-w-4xl bg-gray-800 text-white rounded-xl shadow-xl overflow-hidden h-[90vh] sm:h-auto sm:max-h-[80vh] overflow-y-auto">
        <div className="w-full pt-2 mb-2">
          <p className="text-pink-800 text-xl mt-8 pb-0 px-6">
            Cria o teu Perfil de Anunciante
          </p>
        </div>


        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-transparent backdrop-blur-md z-50">
    <div className="w-full max-w-4xl  bg-gray-800 text-white rounded-xl shadow-xl overflow-hidden h-[90vh] sm:h-auto sm:max-h-[80vh] overflow-y-auto">
            <div className="flex w-full">
              <div className="flex flex-col w-full mx-6 pt-4">
                <div className="w-full mt-0">
                  <p className="text-pink-800">Preço*</p>
                  <FiltroPrice />
                </div>

                <div className="w-3/4 mt-2 gap-4">
                  <p className="text-md text-pink-800">Meio de contacto</p>
                  <CheckDeslocacoes />
                </div>

                <div className="w-full mt-6">
                  <p className="text-md text-pink-800">Meios de Pagamento</p>
                  <CheckPagamento />
                </div>

                <div className="w-full mt-6">
                  <p className="text-md text-pink-800">Línguas</p>
                  <CheckLinguas />
                </div>

                <div className="w-full mt-6">
                  <p className="text-md text-pink-800">Serviços</p>
                  <CheckServico
                    selectedServico={selectedServico}
                    setSelectedServico={setSelectedServico}
                  />
                </div>


         

<div className="w-full mt-6">
      <Field>
        <Label className="text-md text-pink-800">Descrição</Label>
        <Textarea
          name="description"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className={clsx(
            "w-full h-32 p-4 border rounded-lg",
            "data-[hover]:shadow-lg text-gray-600 data-[focus]:bg-gray-100",
            "focus:outline-none focus:ring-2 focus:ring-pink-800"
          )}
          placeholder="Escreva a descrição aqui..."
        />
      </Field>
    </div>




              </div>
            </div>

            <footer className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0">
          <div className="flex justify-between">
          <Link
                href={{
                  pathname: "/registo-entrada",
                  query: { email: userEmailRedux },
                }}
              >
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition">
                Voltar
              </button>
              </Link>
              <Link href="/registo-fotos">
              <button className="px-6 py-3 bg-pink-800 hover:bg-pink-900 rounded-lg text-sm font-medium ">
                Continuar
              </button>
            </Link>
          </div>
        </footer>

            
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default RegistoContacto;
