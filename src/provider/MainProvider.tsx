"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeaderMobile from "@/components/layout/header-mobile";

export interface MainProviderProps {
	children: React.ReactNode;
}

export function MainProvider(props: MainProviderProps) {
	const {children} = props;

	return (
		<>
			{/* Header visível apenas em telas médias ou maiores */}
			<div className='hidden md:block mb-4'>
				<Header />
			</div>
			<div className='block md:hidden '>
				<HeaderMobile />
			</div>
			<main className='md:mt-24'>{children}</main>
			<footer className=''>
				<Footer />
			</footer>
		</>
	);
}
