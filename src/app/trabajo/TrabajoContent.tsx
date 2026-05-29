"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Bot, User, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

const WHATSAPP_NUMBER = "818055184200";

type Message = { from: "bot" | "user"; text: string };
type Answers = { name?: string; nationality?: string; visa?: string; experience?: string; contact?: string };

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
];

const ui = {
  ja: {
    back: "トップへ戻る",
    title: "求職サポートボット",
    online: "オンライン",
    whatsapp: "WhatsAppで送信する",
    placeholderDone: "送信完了",
    placeholderTyping: "ここに入力してください...",
  },
  es: {
    back: "Volver al inicio",
    title: "Asistente de Empleo",
    online: "En línea",
    whatsapp: "Enviar por WhatsApp",
    placeholderDone: "Datos listos para enviar",
    placeholderTyping: "Escribe tu respuesta...",
  },
  en: {
    back: "Back to home",
    title: "Employment Assistant",
    online: "Online",
    whatsapp: "Send via WhatsApp",
    placeholderDone: "Ready to send",
    placeholderTyping: "Type your answer...",
  },
  pt: {
    back: "Voltar ao início",
    title: "Assistente de Emprego",
    online: "Online",
    whatsapp: "Enviar pelo WhatsApp",
    placeholderDone: "Pronto para enviar",
    placeholderTyping: "Digite sua resposta...",
  },
} satisfies Record<Lang, object>;

const flow: Record<Lang, (string | ((a: string) => string) | ((a: Answers) => string))[]> = {
  ja: [
    "こんにちは！ブリッジサービスの求職サポートボットです 👋\nいくつか質問させてください。まず、お名前を教えてください。",
    (name: string) => `${name}さん、ありがとうございます！\n国籍を教えてください。`,
    "日本での在留資格（ビザの種類）を教えてください。\n例：特定技能、技術・人文知識・国際業務、定住者 など",
    "これまでの職歴・経験のある職種を教えてください。\n例：製造業、物流、食品加工、事務 など",
    "ご連絡先の電話番号またはLINE IDを教えてください。",
    (a: Answers) =>
      `ありがとうございます！以下の内容でご担当者にお伝えします：\n\n👤 お名前：${a.name}\n🌏 国籍：${a.nationality}\n📋 在留資格：${a.visa}\n💼 経験：${a.experience}\n📞 連絡先：${a.contact}\n\n下のボタンを押してWhatsAppで送信してください。`,
  ],
  es: [
    "¡Hola! Soy el asistente de empleo de Bridge Service 👋\nTe haré algunas preguntas. ¿Cuál es tu nombre completo?",
    (name: string) => `¡Mucho gusto, ${name}!\n¿Cuál es tu nacionalidad?`,
    "¿Qué tipo de visa de residencia tienes en Japón?\nEj: Especificada, Trabajo, Residente permanente, Estudiante...",
    "¿En qué área tienes experiencia laboral?\nEj: Manufactura, Logística, Alimentos, Administración...",
    "¿Cuál es tu número de teléfono o LINE ID para contactarte?",
    (a: Answers) =>
      `¡Perfecto! Estos son los datos que enviaremos a nuestro equipo:\n\n👤 Nombre：${a.name}\n🌏 Nacionalidad：${a.nationality}\n📋 Visa：${a.visa}\n💼 Experiencia：${a.experience}\n📞 Contacto：${a.contact}\n\nPresiona el botón para enviar por WhatsApp.`,
  ],
  en: [
    "Hello! I'm the employment assistant from Bridge Service 👋\nI'll ask you a few questions. What is your full name?",
    (name: string) => `Nice to meet you, ${name}!\nWhat is your nationality?`,
    "What type of residence visa do you have in Japan?\nE.g.: Specified Skilled Worker, Engineer/Specialist, Permanent Resident, Student...",
    "What area do you have work experience in?\nE.g.: Manufacturing, Logistics, Food Processing, Office Work...",
    "What is your phone number or LINE ID so we can contact you?",
    (a: Answers) =>
      `Perfect! Here is the information we will send to our team:\n\n👤 Name: ${a.name}\n🌏 Nationality: ${a.nationality}\n📋 Visa: ${a.visa}\n💼 Experience: ${a.experience}\n📞 Contact: ${a.contact}\n\nPress the button to send via WhatsApp.`,
  ],
  pt: [
    "Olá! Sou o assistente de emprego da Bridge Service 👋\nVou fazer algumas perguntas. Qual é o seu nome completo?",
    (name: string) => `Prazer, ${name}!\nQual é a sua nacionalidade?`,
    "Que tipo de visto de residência você tem no Japão?\nEx.: Trabalhador Qualificado, Engenheiro/Especialista, Residente Permanente, Estudante...",
    "Em qual área você tem experiência profissional?\nEx.: Manufatura, Logística, Processamento de Alimentos, Administração...",
    "Qual é o seu número de telefone ou LINE ID para contato?",
    (a: Answers) =>
      `Perfeito! Estes são os dados que enviaremos à nossa equipe:\n\n👤 Nome: ${a.name}\n🌏 Nacionalidade: ${a.nationality}\n📋 Visto: ${a.visa}\n💼 Experiência: ${a.experience}\n📞 Contato: ${a.contact}\n\nPressione o botão para enviar pelo WhatsApp.`,
  ],
};

const keys: (keyof Answers)[] = ["name", "nationality", "visa", "experience", "contact"];

const waMessages: Record<Lang, (a: Answers) => string> = {
  ja: (a) => `【求職登録】\nお名前：${a.name}\n国籍：${a.nationality}\n在留資格：${a.visa}\n経験職種：${a.experience}\n連絡先：${a.contact}`,
  es: (a) => `【Registro de Empleo】\nNombre：${a.name}\nNacionalidad：${a.nationality}\nVisa：${a.visa}\nExperiencia：${a.experience}\nContacto：${a.contact}`,
  en: (a) => `[Job Registration]\nName: ${a.name}\nNationality: ${a.nationality}\nVisa: ${a.visa}\nExperience: ${a.experience}\nContact: ${a.contact}`,
  pt: (a) => `[Registro de Emprego]\nNome: ${a.name}\nNacionalidade: ${a.nationality}\nVisto: ${a.visa}\nExperiência: ${a.experience}\nContato: ${a.contact}`,
};

export default function TrabajoContent() {
  const { lang, setLang } = useLang();

  useEffect(() => {
    if (lang === "ja") setLang("es");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeLang = lang === "ja" ? "es" : lang;
  const script = flow[activeLang];
  const copy = ui[activeLang];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (instant = false) => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: instant ? "instant" : "smooth" });
    }, 50);
  };

  const addBot = (text: string) => setMessages((m) => [...m, { from: "bot", text }]);

  // Adjust container height when mobile keyboard opens/closes
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${vv.height}px`;
      }
      scrollToBottom(true);
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    setMessages([]);
    setStep(0);
    setAnswers({});
    setDone(false);
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      addBot(script[0] as string);
    }, 800);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    if (!typing && !done) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [typing, done]);

  const handleSend = () => {
    const value = input.trim();
    if (!value || done) return;

    setMessages((m) => [...m, { from: "user", text: value }]);
    setInput("");

    const key = keys[step];
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    const nextStep = step + 1;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      if (nextStep < keys.length) {
        const q = script[nextStep];
        addBot(typeof q === "function" ? (q as (a: string) => string)(value) : (q as string));
        setStep(nextStep);
      } else {
        const summary = script[script.length - 1];
        addBot(typeof summary === "function" ? (summary as (a: Answers) => string)(newAnswers) : (summary as string));
        setDone(true);
      }
    }, 900);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(waMessages[activeLang](answers));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div ref={containerRef} className="flex flex-col bg-[#F8FAFC] overflow-hidden" style={{ height: "100dvh" }}>
      {/* Top bar */}
      <div className="bg-[#0f2347] py-2.5 px-4 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors flex-shrink-0">
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">{copy.back}</span>
            <span className="sm:hidden">Inicio</span>
          </Link>
          {/* Language selector */}
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-white/50 flex-shrink-0" />
            <select
              value={activeLang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="bg-white/10 text-white text-sm border border-white/25 rounded-lg px-3 py-1.5 focus:outline-none focus:border-white/60 cursor-pointer appearance-none pr-7 relative"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
            >
              {LANG_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-[#0f2347] text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chat header */}
      <div className="bg-gradient-to-r from-[#1B3A6B] to-[#2a5298] flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">{copy.title}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/60 text-xs">{copy.online}</span>
            </div>
          </div>
          <div className="ml-auto text-right hidden sm:block">
            <p className="text-white/50 text-xs font-[var(--font-noto)]">Bridge Service</p>
            <p className="text-white/30 text-xs">株式会社ブリッジサービス</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  msg.from === "bot"
                    ? "bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4]"
                    : "bg-gray-200"
                }`}>
                  {msg.from === "bot"
                    ? <Bot size={15} className="text-white" />
                    : <User size={15} className="text-gray-500" />}
                </div>
                <div className={`max-w-[85%] sm:max-w-[78%] px-3 sm:px-4 py-2.5 rounded-2xl text-sm leading-relaxed font-[var(--font-noto)] whitespace-pre-line ${
                  msg.from === "bot"
                    ? "bg-white text-[#1A1A2E] shadow-sm border border-gray-100 rounded-tl-sm"
                    : "bg-[#4A9FD4] text-white rounded-tr-sm"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4] flex items-center justify-center flex-shrink-0">
                  <Bot size={15} className="text-white" />
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#4A9FD4]"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp button */}
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center pt-2"
            >
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 sm:gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-green-200 transition-colors text-sm w-full sm:w-auto justify-center"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {copy.whatsapp}
              </button>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 sm:px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2 sm:gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            onFocus={() => scrollToBottom(true)}
            disabled={done || typing}
            placeholder={done ? copy.placeholderDone : copy.placeholderTyping}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none focus:border-[#4A9FD4] focus:ring-2 focus:ring-[#4A9FD4]/20 transition-all font-[var(--font-noto)] disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={done || typing || !input.trim()}
            className="bg-[#4A9FD4] hover:bg-[#1B3A6B] disabled:bg-gray-200 text-white p-3 rounded-xl transition-colors flex items-center justify-center flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
