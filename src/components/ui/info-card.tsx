"use client";
import React from "react";
import Link from "next/link";

interface CardProps {
	title: string;
	description: string;
	linkText: string;
	linkHref: string;
	stat: string;
}

const InfoCardItem: React.FC<CardProps> = ({title, description, linkText, linkHref, stat}) => {
	return (
		<div className='flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82'>
			<div className='rounded-lg shadow-lg bg-gray-800 p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl'>
				<p className='font-bold text-2xl mb-4 text-white'>{stat}</p>
				<p className='font-medium text-gray-300 mb-6 text-sm text-center'>{description}</p>
				<Link href={linkHref}>
					<p className='text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out'>{linkText}</p>
				</Link>
			</div>
		</div>
	);
};

const InfoCard: React.FC = () => {
	return (
		<div className='bg-black w-full rounded-xl h-full mb-2 flex justify-center'>
			<div className='flex flex-wrap justify-center gap-4 mt-6'>
				{/* Reusable InfoCardItem Components */}
				<InfoCardItem
					title='Utilizadores'
					description='Descobre escorts de TOP, massagistas e outros serviços na tua zona'
					linkText='Ver Anúncios'
					linkHref='/girls'
					stat='2103 Utilizadores'
				/>
				<InfoCardItem
					title='Visitas Diárias'
					description='Descobre os últimos comentários postados sobre escorts na tua região'
					linkText='Ver Anúncios'
					linkHref='/escort'
					stat='+ 5000 Visitas Diárias'
				/>
				<InfoCardItem
					title='Publica o teu anúncio'
					description='Publica o teu anúncio gratuitamente em O Teu Desejo. Site erótico n1 em Portugal'
					linkText='Inscreve-te'
					linkHref='/regista'
					stat='Publica o teu anúncio'
				/>
			</div>
		</div>
	);
};

export default InfoCard;
