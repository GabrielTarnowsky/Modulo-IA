import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  CreditCard as CardIcon, 
  QrCode, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Award, 
  ArrowLeft,
  Check,
  Sun,
  Moon,
  HelpCircle
} from "lucide-react";

export default function CheckoutExample() {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "boleto">("pix");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [orderBump, setOrderBump] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  
  const [formData, setFormData] = useState({
    name: "César Gabriel",
    email: "cesarogabriel4@gmail.com",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: ""
  });

  // Prices
  const basePrice = 29.90;
  const bumpPrice = 14.90;
  const totalPrice = orderBump ? basePrice + bumpPrice : basePrice;

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      id="checkout-template-root" 
      className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? "bg-[#030306] text-zinc-100" : "bg-zinc-50 text-zinc-800"
      }`}
    >
      {/* KIWIFY COMPLIANT HEADER */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-md ${
        isDarkMode ? "border-zinc-900 bg-zinc-950/80" : "border-zinc-200 bg-white/80"
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  Ambiente Seguro
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-black tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                  Kiwify<span className="text-emerald-500">Pay</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                  Oficial
                </span>
              </div>
            </div>
          </div>

          {/* Quick theme toggles & secure label */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 text-xs font-bold px-3 ${
                isDarkMode 
                  ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-amber-400" 
                  : "border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-indigo-600"
              }`}
              title="Alternar tema para tirar print"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className={isDarkMode ? "text-zinc-300" : "text-zinc-700"}>
                Ver em Modo {isDarkMode ? "Claro" : "Escuro"}
              </span>
            </button>

            <div className={`hidden md:flex items-center gap-1.5 text-xs font-bold ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Criptografado SSL</span>
            </div>
          </div>
        </div>
      </header>

      {/* FLOATING TIMER FOR SENSATIONAL URGENCY */}
      <div className={`border-b text-center py-2 px-4 transition-all duration-300 ${
        isDarkMode ? "bg-amber-500/5 border-amber-500/10" : "bg-amber-50 border-amber-200"
      }`}>
        <p className={`text-xs font-bold flex items-center justify-center gap-2 ${
          isDarkMode ? "text-amber-400" : "text-amber-800"
        }`}>
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          Sua vaga promocional com desconto expira em: 
          <span className={`px-2 py-0.5 rounded font-mono font-black ${
            isDarkMode ? "bg-amber-500 text-zinc-950" : "bg-amber-600 text-white"
          }`}>
            {formatTime(timeLeft)}
          </span>
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTACTS & PAYMENT OPTIONS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Personal Data */}
            <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
              isDarkMode ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <div className={`flex items-center gap-3 border-b pb-4 mb-4 ${
                isDarkMode ? "border-zinc-900" : "border-zinc-100"
              }`}>
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h2 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                  Dados Pessoais
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className={`w-full rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                      isDarkMode 
                        ? "bg-[#07070a] border border-zinc-800 text-white focus:ring-purple-500 focus:border-purple-500" 
                        : "bg-zinc-50 border border-zinc-200 text-zinc-900 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                    E-mail Principal
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="exemplo@gmail.com"
                    className={`w-full rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                      isDarkMode 
                        ? "bg-[#07070a] border border-zinc-800 text-white focus:ring-purple-500 focus:border-purple-500" 
                        : "bg-zinc-50 border border-zinc-200 text-zinc-900 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                    WhatsApp (com DDD)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    className={`w-full rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                      isDarkMode 
                        ? "bg-[#07070a] border border-zinc-800 text-white focus:ring-purple-500 focus:border-purple-500" 
                        : "bg-zinc-50 border border-zinc-200 text-zinc-900 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                    CPF (Segurança fiscal)
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    className={`w-full rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                      isDarkMode 
                        ? "bg-[#07070a] border border-zinc-800 text-white focus:ring-purple-500 focus:border-purple-500" 
                        : "bg-zinc-50 border border-zinc-200 text-zinc-900 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className={`border rounded-2xl p-6 space-y-6 transition-colors duration-300 ${
              isDarkMode ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <div className={`flex items-center gap-3 border-b pb-4 ${
                isDarkMode ? "border-zinc-900" : "border-zinc-100"
              }`}>
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h2 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                  Método de Pagamento
                </h2>
              </div>

              {/* Real Kiwify Style Selector Tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === "pix"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 font-extrabold shadow-md"
                      : isDarkMode
                        ? "bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                        : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  <QrCode className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">PIX</span>
                  <span className="text-[8px] opacity-80 font-bold block mt-0.5">Aprovação Imediata</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "bg-purple-600/10 border-purple-500 text-purple-500 font-extrabold shadow-md"
                      : isDarkMode
                        ? "bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                        : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  <CardIcon className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Cartão</span>
                  <span className="text-[8px] opacity-80 font-medium block mt-0.5">Em até 12x</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("boleto")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === "boleto"
                      ? "bg-amber-500/10 border-amber-500 text-amber-500 font-extrabold shadow-md"
                      : isDarkMode
                        ? "bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                        : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  <FileText className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Boleto</span>
                  <span className="text-[8px] opacity-80 font-medium block mt-0.5">Até 3 dias úteis</span>
                </button>
              </div>

              {/* Interactive payment layout container */}
              <div className={`rounded-xl p-5 border ${
                isDarkMode ? "bg-[#06060a] border-zinc-900" : "bg-zinc-50 border-zinc-150"
              }`}>
                {/* PIX Option details */}
                {paymentMethod === "pix" && (
                  <div className="space-y-4 text-center py-2">
                    {/* Simulated Pix Logo + QR code */}
                    <div className="flex justify-center items-center gap-2 text-emerald-500 font-black text-xs tracking-wider mb-2 uppercase">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      PIX Oficial Kiwify
                    </div>
                    
                    <div className={`w-32 h-32 p-3 rounded-xl mx-auto flex items-center justify-center border ${
                      isDarkMode ? "bg-white border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                    }`}>
                      {/* Realistic looking mock QR structure */}
                      <div className="w-full h-full relative opacity-90 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-8 h-8 border-t-4 border-l-4 border-zinc-950" />
                          <div className="w-8 h-8 border-t-4 border-r-4 border-zinc-950" />
                        </div>
                        {/* QR Code core simulation */}
                        <div className="absolute inset-4 grid grid-cols-6 gap-1">
                          {Array.from({ length: 36 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${
                              (i % 2 === 0 && i % 3 !== 0) || i === 0 || i === 5 || i === 30 || i === 35 
                                ? "bg-zinc-950" 
                                : "bg-zinc-200"
                            }`} />
                          ))}
                        </div>
                        <div className="flex justify-between">
                          <div className="w-8 h-8 border-b-4 border-l-4 border-zinc-950" />
                          <div className="w-8 h-8 border-b-4 border-r-4 border-zinc-950" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 max-w-sm mx-auto">
                      <p className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-zinc-950"}`}>
                        QR Code gerado na hora!
                      </p>
                      <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                        Leia o QR Code com o aplicativo de qualquer banco. O seu produto será liberado imediatamente no e-mail.
                      </p>
                    </div>

                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-emerald-600/10 uppercase tracking-widest mt-2">
                      <QrCode className="w-4 h-4" /> Gerar Pix no valor de R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </button>
                  </div>
                )}

                {/* CREDIT CARD INTERACTIVE LAYOUT */}
                {paymentMethod === "card" && (
                  <div className="space-y-5">
                    {/* Simulated Virtual Card Preview (He loves this for screenshots!) */}
                    <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-900 to-zinc-950 p-6 flex flex-col justify-between text-white relative overflow-hidden border border-purple-500/30 shadow-2xl">
                      {/* Abstract glowing spheres for aesthetics */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/25 rounded-full blur-2xl" />
                      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-widest text-purple-300">Cartão de Crédito Virtual</p>
                          <span className="text-sm font-black tracking-tight mt-0.5 block">Método Conteúdo Inteligente</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[8px] font-mono uppercase font-black tracking-wider">Seguro</span>
                        </div>
                      </div>

                      <div className="space-y-3 relative z-10">
                        {/* Dynamic Card Number */}
                        <p className="text-base font-mono font-bold tracking-[0.2em]">
                          {formData.cardNumber || "•••• •••• •••• ••••"}
                        </p>
                        
                        <div className="flex justify-between items-end text-xs">
                          <div>
                            <span className="text-[7px] text-zinc-400 uppercase tracking-widest block font-bold">Portador</span>
                            <span className="font-mono uppercase text-[10px] tracking-wide block font-extrabold">
                              {formData.cardName || "SEU NOME IMPRESSO"}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[7px] text-zinc-400 uppercase tracking-widest block font-bold">Validade</span>
                            <span className="font-mono text-[10px] block font-extrabold">{formData.cardExpiry || "MM/AA"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs fields */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className={`text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Número do Cartão de Crédito
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          maxLength={19}
                          placeholder="0000 0000 0000 0000"
                          className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                            isDarkMode 
                              ? "bg-zinc-950 border border-zinc-800 text-white focus:ring-purple-500" 
                              : "bg-white border border-zinc-200 text-zinc-900 focus:ring-purple-500"
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className={`text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Nome Impresso no Cartão
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Ex: CESAR GABRIEL"
                          className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                            isDarkMode 
                              ? "bg-zinc-950 border border-zinc-800 text-white focus:ring-purple-500" 
                              : "bg-white border border-zinc-200 text-zinc-900 focus:ring-purple-500"
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className={`text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                            Validade (MM/AA)
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            maxLength={5}
                            placeholder="12/29"
                            className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                              isDarkMode 
                                ? "bg-zinc-950 border border-zinc-800 text-white focus:ring-purple-500" 
                                : "bg-white border border-zinc-200 text-zinc-900 focus:ring-purple-500"
                            }`}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className={`text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                            Código CVV
                          </label>
                          <input
                            type="text"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            maxLength={4}
                            placeholder="123"
                            className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                              isDarkMode 
                                ? "bg-zinc-950 border border-zinc-800 text-white focus:ring-purple-500" 
                                : "bg-white border border-zinc-200 text-zinc-900 focus:ring-purple-500"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className={`text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Parcelamento
                        </label>
                        <select
                          className={`w-full rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer ${
                            isDarkMode 
                              ? "bg-zinc-950 border border-zinc-800 text-white focus:border-purple-500" 
                              : "bg-white border border-zinc-200 text-zinc-900 focus:border-purple-500"
                          }`}
                        >
                          <option>1x de R$ {totalPrice.toFixed(2).replace(".", ",")} (Sem juros)</option>
                          <option>2x de R$ {(totalPrice / 2).toFixed(2).replace(".", ",")}</option>
                          <option>3x de R$ {(totalPrice / 3).toFixed(2).replace(".", ",")}</option>
                          <option>4x de R$ {(totalPrice / 4).toFixed(2).replace(".", ",")}</option>
                          <option>6x de R$ {(totalPrice / 6).toFixed(2).replace(".", ",")}</option>
                          <option>12x de R$ {(totalPrice / 12 * 1.05).toFixed(2).replace(".", ",")}</option>
                        </select>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-purple-600/20 uppercase tracking-widest mt-4">
                      <CardIcon className="w-4 h-4" /> Comprar Agora • R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </button>
                  </div>
                )}

                {/* BOLETO DETAILS */}
                {paymentMethod === "boleto" && (
                  <div className="space-y-4 text-center py-2">
                    <p className={`text-xs font-black ${isDarkMode ? "text-white" : "text-zinc-950"}`}>
                      Instruções para o Boleto Bancário
                    </p>
                    
                    <div className="text-left max-w-sm mx-auto space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Compensação de 1 a 3 dias úteis após o pagamento.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Um link para download do boleto PDF será enviado para seu WhatsApp e e-mail de acesso.
                        </p>
                      </div>
                    </div>

                    <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800 font-extrabold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition uppercase tracking-widest">
                      <FileText className="w-4 h-4 text-amber-500" /> Gerar Boleto Bancário de R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ORDER BUMP (SUPER EXCLUSIVE ADDON) - He can screenshot this as well! */}
            <div className={`border-2 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
              orderBump 
                ? "bg-purple-600/10 border-purple-500 shadow-xl shadow-purple-500/10 scale-[1.01]" 
                : isDarkMode 
                  ? "bg-zinc-950/40 border-purple-900/40 hover:border-purple-800/60" 
                  : "bg-white border-purple-200 hover:border-purple-300 shadow-sm"
            }`}>
              {/* Pulsing exclusive tag */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-pink-600 text-white text-[8px] font-black uppercase px-3 py-1.5 rounded-bl-xl tracking-wider select-none animate-bounce">
                OFERTA ÚNICA & EXCLUSIVA
              </div>

              <div className="flex items-start gap-4">
                <button
                  onClick={() => setOrderBump(!orderBump)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-1.5 cursor-pointer transition-all ${
                    orderBump 
                      ? "bg-purple-600 border-purple-500 text-white" 
                      : isDarkMode 
                        ? "bg-zinc-900 border-zinc-800 text-transparent" 
                        : "bg-zinc-50 border-zinc-300 text-transparent"
                  }`}
                >
                  <Check className="w-4 h-4 font-black text-white" />
                </button>

                <div className="space-y-1">
                  <h4 className={`text-xs font-black ${isDarkMode ? "text-white" : "text-zinc-950"} flex items-center gap-1.5 flex-wrap`}>
                    🔥 SIM! Quero levar o Suporte VIP via WhatsApp + Biblioteca Secreta de Stories por apenas R$ 14,90!
                  </h4>
                  <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                    Garanta <strong className="text-purple-400">Canal de Suporte Direto no WhatsApp</strong> com nossos especialistas em copy para analisar suas postagens e tirar qualquer dúvida por 12 meses + receba de bônus nossa <strong className="text-purple-400">Biblioteca Secreta com 15 modelos de roteiros de Stories de alto engajamento</strong>. Leve tudo com 70% de desconto pago uma única vez!
                  </p>
                  
                  <div className="flex items-baseline gap-1.5 pt-1.5">
                    <span className="text-[10px] line-through text-zinc-500 font-medium font-mono">R$ 49,90</span>
                    <span className="text-[10px] text-emerald-500 font-bold font-mono">R$ 14,90 pago uma única vez (Sem Mensalidades)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Satisfaction / Guarantee Panel */}
            <div className={`border rounded-2xl p-5 flex gap-4 items-center transition-colors duration-300 ${
              isDarkMode ? "bg-zinc-950/40 border-zinc-900" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20">
                <Award className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className={`text-xs font-black ${isDarkMode ? "text-white" : "text-zinc-950"}`}>
                  Garantia blindada de 7 dias
                </h4>
                <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  Fique tranquilo! Se em até 7 dias você entender que o conteúdo não é prático, devolvemos seu dinheiro na mesma hora via Kiwify de forma automatizada.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CART SUMMARY / PRODUCT PREVIEW */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real Kiwify Style Order Summary */}
            <div className={`border rounded-2xl p-6 space-y-6 transition-colors duration-300 ${
              isDarkMode ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <h2 className={`text-xs font-black uppercase tracking-wider border-b pb-3 ${
                isDarkMode ? "text-zinc-400 border-zinc-900" : "text-zinc-500 border-zinc-100"
              }`}>
                Seu Pedido
              </h2>

              <div className="space-y-4">
                {/* Main Product row */}
                <div className="flex gap-4">
                  {/* Miniature Cover Preview */}
                  <div className="w-12 h-16 bg-gradient-to-br from-purple-600 to-purple-950 rounded-lg shadow-lg shrink-0 border border-purple-500/20 flex flex-col justify-between p-2">
                    <span className="text-[5px] font-bold text-purple-300 uppercase tracking-widest block leading-none">MCI</span>
                    <span className="text-[6px] font-black text-white leading-none tracking-tight block">MÉTODO CONTEÚDO INTELIGENTE</span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <h3 className={`text-xs font-bold leading-snug ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                      Método Conteúdo Inteligente
                    </h3>
                    <p className={`text-[10px] ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      Acesso Vitalício + Atualizações
                    </p>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Ebook</span>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Liberado</span>
                    </div>
                  </div>
                </div>

                {/* Sub-item (Order bump added) */}
                {orderBump && (
                  <div className={`flex gap-4 p-3 rounded-lg border border-dashed animate-fade-in ${
                    isDarkMode ? "bg-purple-600/5 border-purple-500/30" : "bg-purple-50/50 border-purple-200"
                  }`}>
                    <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <h4 className={`text-[10px] font-bold ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                        Suporte VIP + Prompts VIP
                      </h4>
                      <p className={`text-[9px] ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>Adicional integrado ao portal</p>
                    </div>
                    <span className="text-[10px] font-bold font-mono text-purple-500">+R$ 14,90</span>
                  </div>
                )}

                {/* Mathematical price breakdown */}
                <div className={`border-t pt-4 space-y-2.5 ${
                  isDarkMode ? "border-zinc-900" : "border-zinc-100"
                }`}>
                  <div className="flex justify-between items-center text-xs text-zinc-400">
                    <span>Subtotal Original</span>
                    <span className="line-through font-mono">R$ 97,00</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-zinc-400">
                    <span>Desconto Exclusivo</span>
                    <span className="text-emerald-400 font-bold font-mono">-R$ 67,10</span>
                  </div>

                  {orderBump && (
                    <div className="flex justify-between items-center text-xs text-zinc-400">
                      <span>Upgrade Suporte VIP</span>
                      <span className="text-purple-500 font-bold font-mono">R$ 14,90</span>
                    </div>
                  )}

                  <div className={`border-t pt-4 flex justify-between items-end ${
                    isDarkMode ? "border-zinc-900" : "border-zinc-100"
                    }`}>
                    <div>
                      <span className={`text-xs font-black block ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                        Preço Total
                      </span>
                      <span className="text-[9px] text-zinc-500 block">Sem mensalidade, taxa única</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-2xl font-black tracking-tight font-mono ${
                        isDarkMode ? "text-white" : "text-zinc-900"
                      }`}>
                        R$ {totalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist of values in the Member's Area */}
            <div className={`border rounded-2xl p-6 space-y-4 transition-colors duration-300 ${
              isDarkMode ? "bg-zinc-950/40 border-zinc-900" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <h3 className={`text-[11px] font-black uppercase tracking-wider ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                Seu Acesso Inclui:
              </h3>

              <ul className="space-y-3">
                {[
                  "Acesso vitalício ao Método Conteúdo Inteligente",
                  "Bônus 1 – Biblioteca Premium de Prompts",
                  "Bônus 2 – Pack Premium de Prompts de Alta Conversão",
                  "Bônus 3 – Calendário Inteligente de 365 Dias",
                  "E-book completo no formato PDF",
                  "Área de membros Kiwify VIP",
                  "Suporte completo para dúvidas e atualizações"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[11px] text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <span className={isDarkMode ? "text-zinc-300" : "text-zinc-700"}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer trust badge logo list */}
            <div className="text-center space-y-4 px-4 pt-2">
              <div className="flex justify-center items-center gap-4 opacity-55 saturate-50">
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-mono tracking-tight ${isDarkMode ? "text-white" : "text-zinc-800"}`}>
                    Compra <span className="text-purple-500">100% Protegida</span>
                  </span>
                </div>
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-mono tracking-tight ${isDarkMode ? "text-white" : "text-zinc-800"}`}>
                    Garantia <span className="text-emerald-500">7 dias</span>
                  </span>
                </div>
              </div>

              <p className="text-[9px] text-zinc-500 leading-relaxed">
                Pagamento processado e blindado de forma oficial pela Kiwify Ltda. Caso possua dúvidas sobre os dados de cobrança, entre em contato em suporte@conteudointeligente.com
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
