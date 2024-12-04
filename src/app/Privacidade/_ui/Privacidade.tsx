"use client";
import { useState } from "react";

function Privacidade() {
  return (
    <div className="text-gray-400  bg-gray-800 mx-4 my-10 md:mt-44 md:mx-auto max-w-5xl p-8  rounded-lg shadow-lg font-sans space-y-12">
      <h1 className="text-center text-4xl font-bold mb-12 border-b border-gray-700 pb-4 text-pink-500">
        Política de Privacidade 
      </h1>

      {/** SEÇÕES DA POLÍTICA */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          1. Informações Gerais
        </h2>
        <p>
          Na <strong>Xgirl.pt</strong>, temos um profundo compromisso com a sua privacidade e a
          transparência.
        </p>
        <p>
          Atuamos em conformidade com o <strong>REGULAMENTO (UE) 2016/679</strong>, que estabelece
          normas para a proteção das pessoas físicas no que diz respeito ao tratamento de dados
          pessoais, assim como a <strong>Lei Orgânica 3/2018</strong>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          2. Informações Básicas Sobre Proteção de Dados
        </h2>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          <li>
            <strong>Responsável pelo Tratamento:</strong> Xgirl.pt
          </li>
          <li>
            <strong>Finalidade:</strong> Gestão administrativa e envio de comunicações comerciais.
          </li>
          <li>
            <strong>Direitos:</strong> Acesso, correção, exclusão e outros.
          </li>
          <li>
            <strong>Origem:</strong> Dados fornecidos diretamente pelo titular.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          3. Identificação
        </h2>
        <p>
          <strong>Nome:</strong> Xgirl.pt, LDA.<br />
          <strong>NIF:</strong> 123456789<br />
          <strong>Endereço:</strong> Avenida da Liberdade, n.º 100, Lisboa, Portugal.<br />
          <strong>Email:</strong>{" "}
          <a href="mailto:info@xgirl.pt" className="text-pink-500 hover:underline">
            info@xgirl.pt
          </a>
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          4. Direitos dos Usuários
        </h2>
        <ul className="list-disc list-inside ml-6 space-y-3">
          <li>
            <strong>Direito de Acesso:</strong> Saiba se seus dados estão sendo tratados.
          </li>
          <li>
            <strong>Direito à Retificação:</strong> Solicite correções em dados imprecisos.
          </li>
          <li>
            <strong>Direito ao Apagamento:</strong> Solicite a exclusão de seus dados.
          </li>
          <li>
            <strong>Direito à Restrição:</strong> Limite o tratamento de dados.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          5. Contato e Reclamações
        </h2>
        <p>
          Para exercer seus direitos ou enviar reclamações, entre em contato pelo{" "}
          <a href="mailto:info@xgirl.pt" className="text-pink-500 hover:underline">
            info@xgirl.pt
          </a>{" "}
          ou ligue para +351 910253456.
        </p>
      </section>

      {/** LINKS EXTERNOS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          6. Legislação Relevante
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679"
              className="text-pink-500 hover:underline"
            >
              Regulamento Geral de Proteção de Dados (RGPD)
            </a>
          </li>
          <li>
            <a
              href="https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations_en"
              className="text-pink-500 hover:underline"
            >
              Direitos dos cidadãos da UE no GDPR
            </a>
          </li>
        </ul>
      </section>

      {/** NOTA FINAL */}
      <section>
        <p className="text-gray-300 text-sm text-center">
          <em>
            Obrigado por confiar no <strong>Xgirl.pt</strong>. Garantimos o compromisso com sua
            privacidade.
          </em>
        </p>
      </section>
    </div>
  );
}

export default Privacidade;
