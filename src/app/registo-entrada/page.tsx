"use client";
import { useState, useEffect, ChangeEvent,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateNome,
  updateIdade,
  updateTelefone,
  updateCidade,
  updateDistrito,
  updateAdress,
  updateLongitude,
  updateLatitude,
} from "@/actions/ProfileActions";
import { Switch, FormControlLabel } from "@mui/material";
import Link from "next/link";
import FiltroAltura from "@/components/Filtros/FiltroAltura";
import FiltroCabelo from "@/components/Filtros/FiltroCabelo";
import FiltroCorpo from "@/components/Filtros/FiltroCorpo";
import FiltroMamas from "@/components/Filtros/FiltroMamas";
import FiltroLingua from "@/components/Filtros/FiltroLingua";
import FiltroOlhos from "@/components/Filtros/FiltroOlhos";
import FiltroPeito from "@/components/Filtros/FiltroPeito";
import FiltroTatuagem from "@/components/Filtros/FiltroTatuagem";
import FiltroOrigem from "@/components/Filtros/FiltroOrigem";
import FiltroPelos from "@/components/Filtros/FiltroPelos";
import FiltroSigno from "@/components/Filtros/FiltroSigno";
import supabase from "@/database/supabase";

declare global {
  interface Window {
    google: any;
  }
}

const RegistoEntrada = () => {
  const dispatch = useDispatch();
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [adress, setAdress] = useState("");
  const [useAdress, setUseAdress] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const autocompleteRef = useRef<any>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
  const idadeRedux = useSelector((state: any) => state.profile?.profile?.idade);
  const telefoneRedux = useSelector((state: any) => state.profile?.profile?.telefone);
  const cidadeRedux = useSelector((state: any) => state.profile?.profile?.cidade);
  const distritoRedux = useSelector((state: any) => state.profile?.profile?.distrito);
  const adressRedux = useSelector((state: any) => state.profile?.profile?.adress);

  useEffect(() => {
    setNome(nomeRedux || "");
    setIdade(idadeRedux || "");
    setTelefone(telefoneRedux || "");
    setCidade(cidadeRedux || "");
    setDistrito(distritoRedux || "");
    setAdress(adressRedux || "");
  }, [nomeRedux, idadeRedux, telefoneRedux, cidadeRedux, distritoRedux, adressRedux]);

  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
    dispatch(updateNome(event.target.value));
  };

  const handleIdadeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdade(event.target.value);
    dispatch(updateIdade(event.target.value));
  };

  const handleTelefoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTelefone(event.target.value);
    dispatch(updateTelefone(event.target.value));
  };

  const handleCidadeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCidade(event.target.value);
    dispatch(updateCidade(event.target.value));
  };

  const handleDistritoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDistrito(event.target.value);
    dispatch(updateDistrito(event.target.value));
  };

  const handleAdressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdress(event.target.value);
    dispatch(updateAdress(event.target.value));
  };

  const handleFiltroTatuagem = (filtro: any) => {
    // Aqui você pode atualizar o estado geral de filtros
    console.log("Filtro de Tatuagem atualizado:", filtro);
};

  const toggleAdressOption = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setUseAdress(checked);
    if (checked) {
      setCidade("");
      setDistrito("");
      dispatch(updateCidade(""));
      dispatch(updateDistrito(""));
    } else {
      setAdress("");
      dispatch(updateAdress(""));
    }
  };

  const handleSelectAddress = (address: string, lat: number, lng: number) => {
    setAdress(address);
    setLatitude(lat);
    setLongitude(lng);
    dispatch(updateAdress(address));
    dispatch(updateLatitude(lat));
    dispatch(updateLongitude(lng));
  };

  // Carregamento dinâmico do script do Google
  useEffect(() => {
    const loadGoogleAPI = () => {
      if (typeof window !== "undefined" && !window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC9gd59nW47Bg63ksUnNd2HmigKDUDGA7E&libraries=places`;
        script.async = true;
        script.onload = () => setGoogleLoaded(true);
        document.body.appendChild(script);
      } else {
        setGoogleLoaded(true);
      }
    };

    loadGoogleAPI();
  }, []);

  useEffect(() => {
    if (googleLoaded && useAdress && window.google && !autocompleteRef.current) {
      const input = document.getElementById("adress-input") as HTMLInputElement;

      if (input && !autocompleteRef.current) {
        // Garantir que o Google Maps foi carregado antes de usar o Autocomplete
        if (window.google && window.google.maps && window.google.maps.places) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
            types: ["geocode"],
            componentRestrictions: { country: "pt" },
          });

          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current.getPlace();
            if (place?.formatted_address) {
              // Aqui, substituímos as atualizações diretas por uma chamada à função handleSelectAddress
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              handleSelectAddress(place.formatted_address, lat, lng); // Usando a função handleSelectAddress
            }
          });
        } else {
          console.error("Google Maps não foi carregado corretamente.");
        }
      }
    }

    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.unbindAll();
        autocompleteRef.current = null;
      }
    };
  }, [googleLoaded, useAdress]);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log("Erro ao verificar sessão:", error);
      } else {
        console.log("Sessão iniciada:", data.session);
      }
    };
    getSession();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-transparent backdrop-blur-md z-50">
      <div className="md:w-full md:max-w-4xl bg-gray-800 text-white rounded-xl border border-gray-500 shadow-xl my-24 mx-12 overflow-hidden h-[90vh] sm:max-h-[80vh] overflow-y-auto">
        <header className="bg-pink-800 py-6 px-4 md:px-10">
          <h1 className="text-3xl font-bold tracking-wide text-center">
            Cria o teu Perfil
          </h1>
          <p className="text-center text-gray-200 text-sm mt-2">
            Complete as informações para começar no <strong>Xgirl.pt</strong>
          </p>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Nome*</label>
                <input
                  className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={nome}
                  onChange={handleNomeChange}
                  placeholder="Digite seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Idade</label>
                <input
                  type="number"
                  className="w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={idade}
                  onChange={handleIdadeChange}
                  placeholder="Sua idade"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número de Telefone*</label>
                <input
                  className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  placeholder="Seu telefone"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Escolha a opção</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={useAdress}
                    onChange={toggleAdressOption}
                    color="primary"
                  />
                }
                label="Usar Morada Completa"
              />

              {useAdress ? (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300">Morada Completa</label>
                  <input
                    id="adress-input"
                    className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={adress}
                    onChange={handleAdressChange}
                    placeholder="Digite a morada completa"
                  />
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Cidade</label>
                    <input
                      className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={cidade}
                      onChange={handleCidadeChange}
                      placeholder="Digite a sua cidade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Distrito</label>
                    <input
                      className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={distrito}
                      onChange={handleDistritoChange}
                      placeholder="Digite o seu distrito"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <FiltroAltura rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-300" />
              <FiltroCorpo rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroOlhos rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroMamas rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroPeito rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroPelos rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroTatuagem rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroSigno rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
            </div>

          </div>
        </div>

        <footer className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0">
          <div className="flex justify-between">
            <Link href="/">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition">
                Voltar
              </button>
            </Link>
            <Link href="/registo-contacto">
              <button className="px-6 py-3 bg-pink-800 hover:bg-pink-900 rounded-lg text-sm font-medium">
                Criar Conta
              </button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RegistoEntrada;
