import React, {useState, useEffect} from "react";
import MainCard from "./main-card";
import {fetchProfiles} from "@/services/profileService";

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const districts = [
	"Aveiro",
	"Beja",
	"Braga",
	"Coimbra",
	"Évora",
	"Faro",
	"Madeira",
	"Açores",
	"Leiria",
	"Lisboa",
	"Portalegre",
	"Porto",
	"Santarém",
	"Setúbal",
	"Viseu",
];

const SearchModal: React.FC<SearchModalProps> = ({isOpen, onClose, searchQuery, setSearchQuery}) => {
	const [profiles, setProfiles] = useState<any[]>([]);
	const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [showMoreDistricts, setShowMoreDistricts] = useState(false);

	useEffect(() => {
		if (!isOpen) return;
		async function fetchData() {
			try {
				const fetchedProfiles = await fetchProfiles();
				setProfiles(Array.isArray(fetchedProfiles) ? fetchedProfiles : []);
			} catch (error) {
				console.error("Erro ao buscar perfis:", error);
			}
		}
		fetchData();
	}, [isOpen]);

	useEffect(() => {
		const filtered = profiles.filter(acompanhante => {
			const nome = acompanhante?.nome?.toLowerCase() || "";
			const distrito = acompanhante?.distrito?.toLowerCase() || "";
			return nome.includes(searchQuery.toLowerCase()) || distrito.includes(searchQuery.toLowerCase());
		});
		setFilteredProfiles(filtered);
	}, [searchQuery, profiles]);

	const startIndex = (currentPage - 1) * 5;
	const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + 5);

	const filterByDistrict = (district: string) => setSearchQuery(district);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex justify-center items-center px-4 bg-black bg-opacity-60 backdrop-blur-lg' onClick={onClose}>
			<div className='w-4/5 bg-gray-800 p-6 rounded-xl shadow-2xl overflow-auto max-h-[90vh]' onClick={e => e.stopPropagation()}>
				{/* Header */}
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-lg md:text-xl text-white font-semibold'>Buscar</h1>
					<button onClick={onClose} className='py-2 px-3 rounded-full hover:bg-gray-700'>
						<span className='text-gray-400 hover:text-pink-500 transition-colors'>X</span>
					</button>
				</div>
				<div className='border-t border-gray-700 mb-6'></div>
				<div className='flex flex-col gap-4 mb-6'>
					<input
						type='text'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none'
						placeholder='Digite o nome ou cidade'
					/>
				</div>
				<div className='mb-6'>
					<h2 className='text-white font-medium text-lg mb-4'>Distritos</h2>
					<div className='flex flex-wrap gap-2 mb-4 text-xs'>
						{districts.slice(0, showMoreDistricts ? districts.length : 16).map(district => (
							<button
								key={district}
								onClick={() => filterByDistrict(district)}
								className='bg-gray-700 text-white py-1 px-3 rounded-md hover:bg-pink-600 transition-colors'
							>
								{district}
							</button>
						))}
					</div>
				</div>
				<div>
					<h2 className='text-white font-medium text-lg'>Acompanhantes</h2>
					{paginatedProfiles.length > 0 ? (
						<MainCard profiles={paginatedProfiles} currentPage={currentPage} itemsPerPage={5} onProfileClick={onClose} />
					) : (
						<p className='text-gray-400 text-center'>Nenhum resultado encontrado</p>
					)}
				</div>
				<div className='border-t border-gray-700 my-6'></div>
			</div>
		</div>
	);
};

export default SearchModal;
