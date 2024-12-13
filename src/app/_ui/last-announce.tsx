import Link from "next/link";
import {FaMapMarkerAlt} from "react-icons/fa";
import {VscVerifiedFilled} from "react-icons/vsc";
import {RiMessage2Fill} from "react-icons/ri";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Image from "next/image";
interface Profile {
	nome: string;
	cidade: string;
	photos: string[];
	tag: string;
	tagtimestamp: string; // Certifique-se de que tagtimestamp está presente e é uma string.
}

interface LastAnnounceProps {
	profiles: Profile[];
}

const LastAnnounce: React.FC<LastAnnounceProps> = ({profiles}) => {
	const nomeRedux = useSelector((state: {profile: {profileData: {nome: string}}}) => state.profile?.profileData?.nome);

	const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);

	const formatTimeElapsed = (minutesElapsed: number): string => {
		const hoursElapsed = minutesElapsed / 60;

		if (hoursElapsed > 48) {
			return "Há mais de 48 horas";
		} else if (minutesElapsed < 60) {
			return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? "s" : ""}`;
		} else {
			const hours = Math.floor(hoursElapsed);
			const minutes = minutesElapsed % 60;
			return `Há ${hours} hora${hours !== 1 ? "s" : ""}${minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? "s" : ""}` : ""}`;
		}
	};

	const calculateTimeElapsed = (tagTimestamp: string): string => {
		const timestampDate = new Date(tagTimestamp);

		if (isNaN(timestampDate.getTime())) {
			return "Tempo indeterminado";
		}

		const currentTime = Date.now();
		const elapsedTime = currentTime - timestampDate.getTime();
		const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));

		return formatTimeElapsed(minutesElapsed);
	};

	useEffect(() => {
		const timeElapsed = profiles.map(profile => calculateTimeElapsed(profile.tagtimestamp));
		setTimeElapsedList(timeElapsed);

		const interval = setInterval(() => {
			const updatedTimeElapsed = profiles.map(profile => calculateTimeElapsed(profile.tagtimestamp));
			setTimeElapsedList(updatedTimeElapsed);
		}, 60000);

		return () => clearInterval(interval);
	}, [profiles]);

	const shuffledProfiles = profiles.sort(() => Math.random() - 0.5);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-5 mx-14  md:mx-0 gap-8 mt-10 pb-16'>
			{shuffledProfiles.slice(0, 5).map((profile, index) => (
				<Link className='border-zinc-500 border-2 rounded-md' key={index} href={`/escort/${nomeRedux}`}>
					<div className='relative'>
						<div className='image-container overflow-hidden'>
							<Image
								src={profile.photos[0] || "/logo.webp"}
								alt={profile.nome}
								className='w-full h-72 object-cover transition duration-300 ease-in-out transform hover:scale-105 bg-pink-200 hover:bg-pink-800 hover:opacity-50'
								priority
								width={100}
								height={100}
							/>
						</div>
						<p className='flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-2 text-white text-md px-2 rounded'>
							<FaMapMarkerAlt className='text-pink-700 mr-2' /> {profile.cidade}
						</p>
						<p className='absolute bottom-7 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-xl px-2 rounded whitespace-nowrap flex items-center'>
							{profile.nome} <VscVerifiedFilled className='text-green-400 ml-2' />
						</p>
					</div>
					<div className='h-20 bg-gray-900 dark:bg-gray-800 border-t border-zinc-700 rounded-md flex flex-col justify-center items-center'>
						<p className='text-white text-xs italic'>{profile.tag}</p>

						<div className='flex justify-center items-center mt-2'>
							<p className='text-yellow-500 text-xs italic'>{timeElapsedList[index]}</p>
							<RiMessage2Fill className='text-yellow-500 ml-2' />
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default LastAnnounce;
