"use client";

import React, {useState, ChangeEvent} from "react";
import {useSelector, useDispatch} from "react-redux";
import Link from "next/link";
import {IoTrashBin} from "react-icons/io5";
import supabase from "@/database/supabase";
import {updatePhotos, updateVPhotos} from "@/actions/ProfileActions";
import {BlurImage} from "@/components/ui/blur-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const RegistoFotos: React.FC = () => {
	const dispatch = useDispatch();
	const userUID = useSelector((state: any) => state.profile?.profile.userUID);
	const photosFromRedux = useSelector((state: any) => state.profile.profile.photos || []);
	const vphotosFromRedux = useSelector((state: any) => state.profile.profile.vphotos || []);

	const [selectedPhotos, setSelectedPhotos] = useState<string[]>(photosFromRedux);
	const [VselectedPhotos, VsetSelectedPhotos] = useState<string[]>(vphotosFromRedux);

	const handleDeletePhoto = (index: number) => {
		const updatedPhotos = [...selectedPhotos];
		updatedPhotos.splice(index, 1);
		setSelectedPhotos(updatedPhotos);
		dispatch(updatePhotos(updatedPhotos));
	};

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const files = Array.from(event.target.files).slice(0, 10);
			const uploadedPhotoURLs: string[] = [];

			const uploadPromises = files.map(async file => {
				const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}.webp`;
				try {
					const {data, error} = await supabase.storage.from("profileFoto").upload(filePath, file);

					if (error) throw new Error(error.message);
					const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
					uploadedPhotoURLs.push(publicURLFoto);
					console.log("Foto de perfil carregada:", publicURLFoto);
				} catch (error: any) {
					console.error("Erro durante o upload:", error.message);
				}
			});

			await Promise.all(uploadPromises);
			const newSelectedPhotos = [...selectedPhotos, ...uploadedPhotoURLs];
			setSelectedPhotos(newSelectedPhotos);
			dispatch(updatePhotos(newSelectedPhotos));
		}
	};

	const handleDeleteVerificationPhoto = (index: number) => {
		const updatedVPhotos = [...VselectedPhotos];
		updatedVPhotos.splice(index, 1); // Remove a foto de verificação pelo índice
		VsetSelectedPhotos(updatedVPhotos); // Atualiza o estado local
		dispatch(updateVPhotos(updatedVPhotos)); // Atualiza o estado globalmente usando Redux
		console.log("Foto de verificação removida.");
	};

	const handleVerificationPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0]; // Apenas uma foto de verificação permitida
			const fileName =
				file.name
					.toLowerCase()
					.replace(/ /g, "_")
					.replace(/[^a-z0-9_]/g, "") + ".webp";
			const filePath = `${userUID}/${fileName}`;

			try {
				const {data, error} = await supabase.storage.from("verificationFoto").upload(filePath, file);

				if (error) {
					console.error("Erro durante o upload:", error.message);
				} else {
					const publicURLFotoV = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/verificationFoto/${filePath}`;
					VsetSelectedPhotos([publicURLFotoV]);
					dispatch(updateVPhotos([publicURLFotoV]));
					console.log("Foto de verificação carregada:", publicURLFotoV);
				}
			} catch (error: any) {
				console.error("Erro durante o upload:", error.message);
			}
		}
	};

	return (
		<Dialog>
			<DialogContent className='w-full max-w-4xl h-[90vh] sm:h-auto sm:max-h-[80vh]'>
				{/* Header */}
				<header className='w-full px-6 pt-8 pb-4'>
					<h1 className='text-pink-800 text-2xl font-semibold'>Cria o teu Perfil de Anunciante</h1>
				</header>

				{/* Fotos de Perfil */}
				<section className='bg-gray-800 w-full mb-10 border border-gray-700 rounded-md pb-6'>
					<div className='px-8 pt-6'>
						<h2 className='text-pink-500 text-xl font-semibold'>Fotos de Perfil</h2>
						<p className='text-gray-300 mt-2'>
							Podes adicionar até <span className='font-semibold'>10 Fotos</span>.
						</p>
					</div>

					{/* Grid com fotos e placeholders */}
					<div className='grid grid-cols-5 gap-6 mx-6 my-6'>
						{selectedPhotos.map((photo, index) => (
							<div key={index} className='relative'>
								{selectedPhotos[index] ? (
									<>
										<BlurImage src={selectedPhotos[index]} alt={`Foto ${index}`} className='w-full h-24 object-cover rounded-md border border-gray-600' />
										<IoTrashBin
											size={24}
											className='absolute top-1 right-1 cursor-pointer text-white bg-gray-700 hover:bg-red-600 p-1 rounded-full transition-colors'
											onClick={() => handleDeletePhoto(index)}
										/>
									</>
								) : (
									<div className='w-full h-24 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-md text-gray-500'>
										<span className='text-sm'>Adicionar Foto</span>
									</div>
								)}
							</div>
						))}
					</div>

					<div className='px-8 flex items-center justify-start'>
						<label htmlFor='upload-photo' className='text-md text-white bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-500 transition'>
							+ Adicionar Fotos de Perfil...
						</label>
						<input type='file' id='upload-photo' style={{display: "none"}} onChange={handleFileUpload} multiple />
					</div>
				</section>

				{/* Foto de Verificação */}
				<section className='bg-gray-800 w-full mb-10 border border-gray-700 rounded-md pb-6'>
					<div className='px-8 pt-6'>
						<h2 className='text-pink-500 text-xl font-semibold'>Foto de Verificação</h2>
						<p className='text-gray-300 mt-2'>
							Adiciona uma foto de verificação para obteres um <span className='font-semibold'>Perfil Certificado</span>.
						</p>
					</div>

					{/* Placeholder para foto de verificação */}
					<div className='flex justify-center mt-6'>
						{VselectedPhotos.length > 0 ? (
							VselectedPhotos.map((vphoto, index) => (
								<div key={index} className='relative w-40 h-40'>
									<BlurImage src={vphoto} alt={`Foto de Verificação ${index}`} className='w-full h-full object-cover rounded-md border border-gray-600' />
									<IoTrashBin
										size={24}
										className='absolute top-2 right-2 cursor-pointer text-white bg-gray-700 hover:bg-red-600 p-1 rounded-full transition-colors'
										onClick={() => handleDeleteVerificationPhoto(index)}
									/>
								</div>
							))
						) : (
							<div className='w-40 h-40 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-md text-gray-500'>
								<span className='text-sm'>Adicionar Foto</span>
							</div>
						)}
					</div>

					<div className='px-8 flex items-center justify-center mt-6'>
						<label
							htmlFor='upload-verification-photo'
							className='text-md text-white bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-500 transition'
						>
							+ Adicionar Foto de Verificação
						</label>
						<input type='file' id='upload-verification-photo' style={{display: "none"}} onChange={handleVerificationPhotoUpload} />
					</div>
				</section>

				{/* Footer */}
				<footer className='bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0'>
					<div className='flex justify-between items-center'>
						<Link href='/registo-contacto'>
							<button className='px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition'>Voltar</button>
						</Link>
						<Link href='/registo-pagamento'>
							<button className='px-6 py-3 bg-pink-800 hover:bg-pink-700 rounded-lg text-sm font-medium transition'>Continuar</button>
						</Link>
					</div>
				</footer>
			</DialogContent>
		</Dia>
	);
};

export default RegistoFotos;
