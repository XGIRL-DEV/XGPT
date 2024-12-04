import Link from "next/link";
import Image from "next/image";

function Footer() {
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
              Découvrez les meilleurs services descort dans les principales régions de France.
            </p>
          </div>

          {/* LIENS RAPIDES */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">LIENS RAPIDES</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/Acompanhantes?distrito=Lisboa"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Escort à Paris
                </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Porto"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Escort à Lyon
                </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Faro"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Escort à Marseille
                </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Madeira"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Escort à Lille
                </Link>
              </li>
              <li>
                <Link
                  href="/girls?distrito=Acores"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Escort à Toulouse
                </Link>
              </li>
            </ul>
          </div>

          {/* TOP CATÉGORIE */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">TOP CATÉGORIE</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/Acompanhantes"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Escortes VIP
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifs"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  BDSM
                </Link>
              </li>
              <li>
                <Link
                  href="/apropos"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Salons
                </Link>
              </li>
              <li>
                <Link
                  href="/Stories"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/Stories"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Massage érotique
                </Link>
              </li>
            </ul>
          </div>

          {/* À PROPOS */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">À PROPOS</p>
            <ul className="space-y-1">
              <li className="flex space-x-2">
                <Link
                  href="/faq"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  FAQ
                </Link>
                <span className="text-white">/</span>
                <Link
                  href="/dmca"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  DMCA
                </Link>
                <span className="text-white">/</span>
                <Link
                  href="/report"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Report
                </Link>
              </li>
              <li>
                <Link
                  href="/Termos"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Termes et Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/Privacidade"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Politique de Confidentialité
                </Link>
              </li>
              <li className="flex space-x-2">
                <Link
                  href="/faq"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Lhistoire de XGIRL
                </Link>
                <span className="text-white">/</span>
                <Link
                  href="/dmca"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/regista2"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"
                >
                  Nous rejoindre
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Droit Ressource */}
        <div className="text-xs text-gray-400 md:flex-1 ">
        Ce site web est une ressource publicitaire et dinformation et, à ce titre, na aucun lien ni aucune responsabilité
        avec les sites ou individus mentionnés ici. Nous vendons UNIQUEMENT des espaces publicitaires, 
        nous ne sommes pas une agence descorte et nous ne sommes en aucun cas impliqués dans des activités 
        descorte ou de prostitution. Nous nassumons aucune responsabilité pour le contenu ou les actions de sites 
        web des tiers ou des individus auxquels vous pouvez accéder en suivant les liens, les e-mails ou les contacts 
        téléphoniques de ce portail.
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
        &copy; {new Date().getFullYear()} XGirl. Tous droits réservés.
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
