import {useState} from "react";
import Image from "next/image";
import {VscVerifiedFilled} from "react-icons/vsc";
import {IoInformationCircle} from "react-icons/io5";

import {useTranslation} from "react-i18next";
import {BlurImage} from "../ui/blur-image";

interface PhotosAndCertificadoProps {
	selectedProfile: any;
	loading: boolean;
	isCertified: boolean | null;
	handleCertificadoClick: () => void;
	handlePhotoClick: (index: number) => void;
}

const PhotosAndCertificado: React.FC<PhotosAndCertificadoProps> = ({selectedProfile, loading, isCertified, handleCertificadoClick, handlePhotoClick}) => {
	const {t, i18n} = useTranslation();

	return (
		<div className='bg-gray-800 gap-6 py-8 w-full min-h-[300px] justify-center items-center px-10  border border-zinc-700 rounded-xl shadow-lg'>
			<div className='flex justify-between mb-8'>
				<p className='text-pink-700 text-2xl mb-4 font-semibold'>{t("profile.photos_of", {name: selectedProfile?.nome})}</p>

				{loading || isCertified === null ? (
					<div className='md:ml-4 p-2 rounded-md flex items-center bg-zinc-700 h-8'>
						<p className='text-white'>{t("profile.loading")}</p>
					</div>
				) : (
					<div
						className={`ml-4 p-2 rounded-md flex items-center justify-center cursor-pointer transition duration-300 ease-in-out h-8 ${
							isCertified ? "bg-green-700 hover:bg-green-600 text-xs md:text-sm" : "bg-red-700 hover:bg-red-600 text-xs md:text-sm"
						} min-w-[120px]`}
						onClick={handleCertificadoClick}
					>
						<p className='text-white text-xs md:text-sm mr-2'>
							<p className='text-white text-xs md:text-sm mr-2'>{isCertified ? t("profile.certified") : t("profile.not_certified")}</p>{" "}
						</p>
						{isCertified ? <VscVerifiedFilled size={20} className='text-white' /> : <IoInformationCircle size={20} className='text-white' />}
					</div>
				)}
			</div>

			{selectedProfile && selectedProfile.photoURL && selectedProfile.photoURL.length > 0 ? (
				<div className='grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					{selectedProfile.photoURL.map((media: string, index: number) => {
						const isVideo = media.endsWith(".mp4") || media.endsWith(".mov") || media.endsWith(".webm");

						return isVideo ? (
							<video
								key={index}
								autoPlay
								controlsList='nodownload'
								className='rounded-2xl border border-zinc-500 shadow-md transition-transform duration-200 ease-in-out hover:scale-105'
							>
								<source src={media} type={media.endsWith(".mp4") ? "video/mp4" : media.endsWith(".webm") ? "video/webm" : "video/ogg"} />
								{t("profile.video_not_supported")}
							</video>
						) : (
							<Image
								key={index}
								src={media}
								alt={`Foto ${index + 1}`}
								className='w-full h-48 object-cover cursor-pointer rounded-2xl border border-zinc-500 shadow-md transition-opacity duration-200 ease-in-out hover:opacity-75 hover:scale-105'
								onClick={() => handlePhotoClick(index)}
								width={160}
								height={120}
								loading='lazy'
							/>
						);
					})}
				</div>
			) : (
				<BlurImage
					src={selectedProfile?.photoURL?.[0] || "/logo.webp"}
					alt={selectedProfile?.nome || "Placeholder"}
					className='w-full h-96 object-cover rounded-2xl border border-zinc-500 shadow-md'
					loading='lazy'
					width={160}
					height={120}
				/>
			)}
		</div>
	);
};

export default PhotosAndCertificado;
