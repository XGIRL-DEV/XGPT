import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";


function Footer() {

  const { t, i18n } = useTranslation();


  return (
    <footer className="bg-gray-800 w-full pt-8" style={{ borderTop: '4px solid #C2136A' }}>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* LOGO */}
          <div className="mb-8">
            <Link href="/">
              <div className="w-36 h-12 object-contain mx-auto md:mx-0 mb-4">
                <Image
                  src="/photos/logo1.png"
                  alt="logo"
                  width={144}
                  height={48}
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
            {t('Footer.services_description')}
            </p>
          </div>

          {/* LIENS RAPIDES */}
          <div className="mb-8">
          <p className="text-xl text-white py-2">{t('Footer.quick_links_title')}</p>
          <ul className="space-y-1">
              <li>
                <Link
                  href="/Acompanhantes?distrito=Lisboa"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                   {t('Footer.escort_paris')}
                </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Porto"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.escort_lyon')}
                 </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Faro"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                   {t('Footer.escort_marseille')}
                </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Madeira"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.escort_lille')}
                </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Acores"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.escort_toulouse')}
                </Link>
              </li>
            </ul>
          </div>

          {/* TOP CATÉGORIE */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">{t('Footer.top_categories_title')}</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/Acompanhantes"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                   {t('Footer.vip_escorts')}
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifs"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                   {t('Footer.bdsm')}
                </Link>
              </li>
              <li>
                <Link
                  href="/apropos"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                   {t('Footer.salons')}
                </Link>
              </li>
              <li>
                <Link
                  href="/Stories"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                   {t('Footer.stories')}
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                 {t('Footer.erotic_massage')}
                </Link>
              </li>
            </ul>
          </div>

          {/* À PROPOS */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">{t('Footer.about_title')}</p>
            <ul className="space-y-1">
              <li className="flex space-x-2">
                <Link
                  href="/faq"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                 {t('Footer.faq')}
                </Link>
                <span className="text-white">/</span>
                <Link
                  href="/dmca"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.dmca')}
                </Link>
                <span className="text-white">/</span>
                <Link
                  href="/report"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.report')}
                </Link>
              </li>
              <li>
                <Link
                  href="/Termos"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                 {t('Footer.terms_conditions')}
                </Link>
              </li>
              <li>
                <Link
                  href="/Privacidade"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.privacy_policy')}
                </Link>
              </li>
              <li className="flex space-x-2">
                <Link
                  href="/faq"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.xgirl_history')}
                </Link>
                <span className="text-white">/</span>
                <Link
                  href="/contact"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  {t('Footer.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/regista2"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                 {t('Footer.join_us')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Droit Ressource */}
        <div className="text-xs text-gray-400 md:flex-1 ">
        {t('Footer.disclaimer')}
        </div>
        </div>
        {/* FOOTER BAS */}
<div className="bg-gray-900 w-full mt-8">
  <div className="grid grid-cols-3 gap-4 py-4">
    {/* Colonne de gauche (peut être utilisée pour un logo ou autres éléments) */}
    <div className="flex items-center justify-start pr-4">
      {/* Tu peux ajouter ici des éléments comme un logo ou d'autres liens */}
    </div>
    
    {/* Colonne du milieu (COPYRIGHT centré) */}
    <div className="flex items-center justify-center">
    <p className="text-xs text-white text-center">
        {t('Footer.copyright', { year: new Date().getFullYear() })}
      </p>
    </div>

    {/* Colonne de droite (Méthodes de paiement) */}
    <div className="flex items-center justify-end padding-righ pr-10">
      <img
        src="/photos/icon_paiement.webp"
        alt="Méthodes de paiement"
        width={150}
      />
    </div>
  </div>
</div>

    </footer>
  );
}

export default Footer;
