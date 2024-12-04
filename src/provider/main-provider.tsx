"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderMobile from "@/components/HeaderMobile"

export interface MainProviderProps {
  children: React.ReactNode;
}

export function MainProvider(props: MainProviderProps) {
  const { children } = props;

  return (
    <>
      {/* Header visível apenas em telas médias ou maiores */}
      <div className="hidden md:block mb-4">
      <Header />
      </div>
      <div className="block md:hidden ">
        <HeaderMobile />
      </div>
      <main className="md:mt-24">{children}</main>
      <footer className="">
        <Footer />
      </footer>
    </>
  );
}
