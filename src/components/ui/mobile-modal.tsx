// MobileModal.tsx
import React from "react";

import Email from "@/app/definicoes/_ui/Email";
import Password from "@/app/definicoes/_ui/Password";
import {Dialog, DialogContent} from "./dialog";

interface MobileModalProps {
	isOpen: boolean;
	onClose: () => void;
	modalType: "email" | "password"; // Tipos possíveis para o modal
}

const MobileModal: React.FC<MobileModalProps> = ({isOpen, onClose, modalType}) => {
	if (!isOpen) return null;

	return (
		<Dialog>
			<DialogContent className='max-w-md'>
				<button onClick={onClose} className='text-white absolute top-2 right-2 text-2xl hover:text-gray-400'>
					&times;
				</button>
				{/* Renderiza o componente baseado no tipo do modal */}
				{modalType === "email" ? <Email /> : <Password />}
			</DialogContent>
		</Dialog>
	);
};

export default MobileModal;
