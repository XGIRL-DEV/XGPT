interface Profile {
  id: number;
  nome: string;
  photos: string[];
  vphotos: string[];
  photoURL: string[];
  vphotoURL: string[];
  stories: string[];
  storyURL: string[];
  userUID?: string;
  description?: string;
  tag?: string;
  tagtimestamp?: Date;
  tarifa: number;
  lingua: string[];
  telefone: string;
  email: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  adress: string;
  latitude: number;
  longitude: number;
  peso: string;
  tatuagens: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
  pagamento: string[];
  inactive: boolean;
  certificado: boolean;
  live?: boolean; // Adicionei a propriedade 'live' aqui, tornando-a opcional
}
