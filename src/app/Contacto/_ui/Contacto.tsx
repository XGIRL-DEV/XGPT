"use client";
import { useState, useRef } from "react";
import emailjs from "emailjs-com"; // Importando o EmailJS
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contacto() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);


  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value); // Atualiza o estado do reCAPTCHA
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Validação do reCAPTCHA
    if (!recaptchaValue) {
      toast.error("Por favor, complete o reCAPTCHA antes de enviar.");
      return;
    }

    const templateParams = {
      from_email: email, // Certifique-se que o nome da variável no template do EmailJS é o mesmo
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        "service_dbp2kn8", // Substitua pelo seu ID do serviço
        "template_hghiro9", // Substitua pelo seu ID do template
        templateParams,
        "xinftXeZEUNtgiQHk" // Substitua pela sua chave pública
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success("Mensagem enviada com sucesso!");

        // Limpa os campos após envio
        setEmail("");
        setSubject("");
        setMessage("");

        // Reseta o reCAPTCHA
        setRecaptchaValue(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset(); // Reseta a aparência do reCAPTCHA
        }
      })
      .catch((err) => {
        console.error("FAILED...", err);
        toast.error("Falha no envio da mensagem. Tente novamente mais tarde.");
      });
  };

  return (
    <div className="text-gray-200 bg-gray-900 pt-18 rounded-lg shadow-lg w-full max-w-xl mx-auto px-4 py-6 font-sans space-y-4 ">
      <section className="bg-gray-800 rounded-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-800 mb-4">
          Contato
        </h1>
        <h2 className="text-sm font-light text-center text-gray-400 mb-6">
          Tem alguma dúvida? Envie-nos uma mensagem e responderemos em até 24
          horas.
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Seu e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Assunto
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block p-2 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Como podemos ajudá-lo?"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Sua mensagem
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Deixe sua mensagem..."
              required
            ></textarea>
          </div>

          {/* Botão desativado enquanto o reCAPTCHA não é preenchido */}
          <button
            type="submit"
            className="py-2 md:py-3 text-sm font-medium text-center text-white rounded-lg bg-pink-800 w-full hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!recaptchaValue}
          >
            Enviar Mensagem
          </button>
        </form>

        {/* ReCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LfQCIsqAAAAAMQdYB7cd_pvfwbyL5mnPMUZ1ipa" // Substitua pela sua chave pública do Google reCAPTCHA
          onChange={handleRecaptchaChange}
          ref={recaptchaRef}
          className="mt-4"
        />

        {/* Toast Container */}
        <ToastContainer />

        <p className="mt-6 text-center text-gray-400 text-sm">
          Obrigado por entrar em contato com a XGirl.pt!
        </p>
      </section>
    </div>
  );
}

export default Contacto;
