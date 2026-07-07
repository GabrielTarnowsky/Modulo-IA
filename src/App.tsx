import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  MessageSquare, 
  Video, 
  FileText, 
  Layers, 
  Download, 
  Lock, 
  ShieldCheck, 
  Star, 
  ChevronRight, 
  Flame, 
  Clock, 
  BookOpen, 
  Award, 
  Zap, 
  Calendar,
  Eye,
  CheckCircle,
  TrendingUp,
  Target,
  PenTool,
  Users,
  Briefcase,
  ExternalLink,
  ChevronDown,
  Info,
  Gift
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { posts, ads, customInstructions, initialGeneratedPosts, initialGeneratedAds } from "./data";
import { GeneratedPost, GeneratedAdCreative } from "./types";
import CheckoutExample from "./CheckoutExample";
import CreativesView from "./components/CreativesView";

// @ts-ignore
import ebookCover from "./assets/images/ebook_cover_mockup_1782842871838.jpg";
// @ts-ignore
import bonusOneCover from "./assets/images/bonus_one_biblioteca_1783428972753.jpg";
// @ts-ignore
import bonusTwoCover from "./assets/images/bonus_two_pack_1783428983587.jpg";
// @ts-ignore
import bonusThreeCover from "./assets/images/bonus_three_calendario_1783428999420.jpg";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "checkout" | "creatives">("landing");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  
  // Timer de escassez (15 minutos)
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 15 * 60)); // Reinicia para simular urgência contínua
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCheckoutClick = () => {
    setCurrentView("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentView === "checkout") {
    return <CheckoutExample onBack={() => setCurrentView("landing")} />;
  }

  if (currentView === "creatives") {
    return <CreativesView onBack={() => setCurrentView("landing")} />;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden" id="app-root">
      
      {/* Barra de Notificação de Urgência */}
      <div className="bg-gradient-to-r from-purple-900 via-violet-950 to-purple-950 py-2.5 px-4 text-center border-b border-purple-500/20 sticky top-0 z-50 backdrop-blur-md bg-opacity-95" id="promo-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 font-medium text-purple-200">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="font-extrabold text-white">PROMOÇÃO DE LANÇAMENTO:</span> 80% DE DESCONTO + 3 BÔNUS EXCLUSIVOS
          </span>
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-purple-500/30">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-mono font-bold text-purple-300">Expira em: {formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 px-4 overflow-hidden border-b border-zinc-900" id="hero-section">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[180px] -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[350px] bg-pink-600/5 rounded-full blur-[80px] sm:blur-[150px] -z-10 animate-pulse" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative">
          
          {/* Badge de Destaque */}
          <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-purple-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] mx-auto" id="hero-badge">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>O Guia Secreto do Copywriting com Inteligência Artificial</span>
          </div>

          {/* Headline Principal */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white leading-[1.1] max-w-4xl mx-auto" id="hero-title">
            Escreva Copys que <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">Vendem Milhares</span> Usando o ChatGPT sem Parecer um Robô
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-normal" id="hero-subtitle">
            O método exato de engenharia de prompts que grandes marcas usam para criar anúncios de alta conversão, posts virais e páginas de vendas em segundos com IA.
          </p>

          {/* CTA e Garantia */}
          <div className="flex flex-col items-center gap-4 pt-4" id="hero-cta-area">
            <button 
              onClick={handleCheckoutClick}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-base sm:text-lg px-8 py-4 sm:py-5 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition duration-300 flex items-center justify-center gap-3 group cursor-pointer"
              id="hero-cta-btn"
            >
              <span>QUERO TER ACESSO AO MÉTODO IMEDIATAMENTE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Garantia incondicional de 7 dias • Acesso vitalício e imediato
            </span>
          </div>

          {/* Mockup e Prévias Grid */}
          <div className="pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto" id="preview-grid">
            
            {/* Esquerda: Mockup do Ebook Principal */}
            <div className="lg:col-span-5 flex justify-center relative" id="ebook-mockup-wrapper">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
              
              {/* Moldura 3D do Ebook */}
              <div className="relative w-[240px] sm:w-[280px] aspect-[3/4] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden border border-zinc-800/80 transform -rotate-2 hover:rotate-0 hover:scale-102 transition duration-500 cursor-pointer bg-zinc-950 group">
                <img 
                  src={ebookCover} 
                  alt="Ebook Maquina de Copy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-black bg-purple-600 text-white w-fit px-2.5 py-0.5 rounded-full mb-1 uppercase tracking-wider">LIVRO DIGITAL</span>
                  <h3 className="text-sm font-display font-black text-white tracking-tight">MÁQUINA DE COPY COM IA</h3>
                  <p className="text-[10px] text-zinc-300 leading-tight mt-0.5">O Guia Supremo de Prompts do ChatGPT</p>
                </div>
              </div>
            </div>

            {/* Direita: O que está incluso (Lista de Benefícios) */}
            <div className="lg:col-span-7 space-y-4 text-left" id="included-features-list">
              <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
                O que você vai receber hoje:
              </h3>
              
              <div className="space-y-3.5">
                <div className="flex items-start gap-3 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-3.5 hover:border-purple-500/20 transition">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/20 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">O Ebook Máquina de Copy (PDF de 150+ Páginas)</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">O manual definitivo com 50+ templates de prompts passo a passo para criar copys impossíveis de serem ignoradas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-3.5 hover:border-purple-500/20 transition">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/20 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Bônus 1: Biblioteca de Ganchos Virais</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Guia prático para estruturar as primeiras linhas de seus posts para prender a atenção do leitor e explodir seu engajamento.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-3.5 hover:border-purple-500/20 transition">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/20 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Bônus 2: Comandos Anti-Robô</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">O segredo de engenharia de prompts para ocultar traços artificiais e dar um tom humano, natural e empático à escrita.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-3.5 hover:border-purple-500/20 transition">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/20 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Bônus 3: Calendário Inteligente de Conteúdo</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Cronograma tático estratégico anual de postagens mapeado para nunca mais sofrer com bloqueio criativo.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Prova Social / Números */}
      <section className="py-12 bg-zinc-950/40 border-b border-zinc-900" id="social-proof-strip">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-display font-black text-white">+15.000</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider">Leitores Satisfeitos</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-display font-black text-purple-400">98.7%</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider">Taxa de Aprovação</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-display font-black text-white">R$ 2M+</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider">Faturados por Clientes</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-display font-black text-pink-400">24/7</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider">Acesso e Suporte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Problema vs Solução */}
      <section className="py-20 sm:py-28 px-4" id="problem-solution-section">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Cabeçalho da Seção */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">O Grande Obstáculo</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Por que a maioria das copys criadas por IA fracassam miseravelmente?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Você já deve ter percebido que o ChatGPT costuma entregar textos genéricos, cheios de palavras batidas como "revolucionário", "mergulhe de cabeça" ou "no ecossistema atual". O público percebe isso na hora e ignora.
            </p>
          </div>

          {/* Grid de Comparação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* O Jeito Errado */}
            <div className="bg-zinc-950/80 border border-red-500/20 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-red-500/30 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 border border-red-500/20 font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">O Jeito Amador e Frustrante</h3>
                  <p className="text-[11px] text-zinc-500">O que 99% das pessoas fazem e perdem dinheiro</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  <span>Digitar comandos simples como: <code className="text-xs bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-300">"Escreva um anúncio para meu produto X"</code>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  <span>Textos robotizados, longos e repletos de clichês artificiais que o público ignora.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  <span>Falta de tom de voz, gatilhos mentais estruturados ou jornada de compra clara.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  <span>Gastar horas editando o texto ruim que a inteligência artificial te entregou.</span>
                </li>
              </ul>
            </div>

            {/* O Jeito Máquina de Copy */}
            <div className="bg-zinc-950/80 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-purple-500/40 transition relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-300 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl border-l border-b border-purple-500/20">
                RECOMENDADO
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/20 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">O Método Máquina de Copy</h3>
                  <p className="text-[11px] text-purple-400 font-semibold">Como os profissionais faturam alto</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 shrink-0 mt-0.5">✓</span>
                  <span>Usar <strong className="text-white font-bold">Prompts de Contexto Avançado</strong> que treinam a IA sobre seu avatar antes de pedir a escrita.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 shrink-0 mt-0.5">✓</span>
                  <span>Aplicar modelos consagrados de copy como <strong className="text-white font-bold">AIDA</strong>, <strong className="text-white font-bold">PAS</strong> e <strong className="text-white font-bold">Pilar de Quebra de Objeções</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 shrink-0 mt-0.5">✓</span>
                  <span>Textos 100% humanizados que conectam profundamente, geram cliques e convertem leitores em clientes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 shrink-0 mt-0.5">✓</span>
                  <span>Anúncios prontos em menos de 12 segundos para escalar suas vendas e testes.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Seção: Pilares do Livro */}
      <section className="py-20 sm:py-28 bg-zinc-950/20 border-t border-b border-zinc-900 px-4" id="book-pillars-section">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Conteúdo Prático</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              O que você vai aprender na Máquina de Copy com IA?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Este não é um livro teórico sobre conceitos genéricos de inteligência artificial. É um manual estritamente prático de engenharia de copywriting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="glass-card p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-[24px] space-y-4 hover:border-zinc-700/80 transition duration-300 relative group overflow-hidden">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
                01
              </div>
              <h3 className="font-display font-extrabold text-base text-white">Engenharia de Prompt Invisível</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Como dar instruções profundas para o ChatGPT assumir a personalidade de um redator sênior focado em conversão e resultados.
              </p>
            </div>

            {/* Pillar 2: Biblioteca Premium */}
            <div className="glass-card p-6 bg-purple-950/10 hover:bg-purple-950/20 border border-purple-500/30 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.05)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-lg overflow-hidden border border-purple-500/30 shrink-0 bg-zinc-950 shadow">
                  <img src={bonusOneCover} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block flex items-center gap-1">🎁 Bônus 1 (Gratuito)</span>
                  <h3 className="font-display font-extrabold text-base text-white">Biblioteca Premium de Prompts</h3>
                </div>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Modelos de ganchos virais e comandos refinados para forçar o usuário a parar o scroll do feed e ler o seu post até o final.
              </p>
            </div>

            {/* Pillar 3: Prompts */}
            <div className="glass-card p-6 bg-purple-950/10 hover:bg-purple-950/20 border border-purple-500/30 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.05)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-lg overflow-hidden border border-purple-500/30 shrink-0 bg-zinc-950 shadow">
                  <img src={bonusTwoCover} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block flex items-center gap-1">🎁 Bônus 2 (Gratuito)</span>
                  <h3 className="font-display font-extrabold text-base text-white">Pack Premium de Prompts de Alta Conversão</h3>
                </div>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Comandos de elite prontos para copiar e colar que fazem a inteligência artificial adotar o tom de voz humano de um copywriter profissional.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="glass-card p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-[24px] space-y-4 hover:border-zinc-700/80 transition duration-300 relative group overflow-hidden">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
                04
              </div>
              <h3 className="font-display font-extrabold text-base text-white">Vantagem Competitiva Exclusiva</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Mapeamento estratégico com ganchos ultra-específicos e abordagens altamente emocionais para se destacar da concorrência genérica.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="glass-card p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-[24px] space-y-4 hover:border-zinc-700/80 transition duration-300 relative group overflow-hidden">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
                05
              </div>
              <h3 className="font-display font-extrabold text-base text-white">Funis Automáticos Estáveis</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Segredos estruturados para manter um fluxo estável de anúncios e conteúdos valiosos rodando 24 horas por dia com suporte inteligente de IA.
              </p>
            </div>

            {/* Pillar 6: Calendário */}
            <div className="glass-card p-6 bg-purple-950/10 hover:bg-purple-950/20 border border-purple-500/30 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.05)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-lg overflow-hidden border border-purple-500/30 shrink-0 bg-zinc-950 shadow">
                  <img src={bonusThreeCover} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block flex items-center gap-1">🎁 Bônus 3 (Gratuito)</span>
                  <h3 className="font-display font-extrabold text-base text-white">Calendário Inteligente de 365 Dias</h3>
                </div>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Um cronograma mapeado estratégico anual completo com o tipo exato de post e intenção para publicar o ano inteiro sem sofrimento ou bloqueio criativo.
              </p>
            </div>

          </div>

          {/* Call to Action Interno */}
          <div className="text-center pt-4">
            <button 
              onClick={handleCheckoutClick}
              className="w-full sm:w-auto bg-white hover:bg-zinc-100 text-black font-black text-base px-8 py-4.5 rounded-2xl transition duration-300 cursor-pointer shadow-xl inline-flex items-center justify-center gap-2"
              id="pillars-cta"
            >
              <span>GARANTIR MINHA CÓPIA DIGITAL AGORA</span>
              <ArrowRight className="w-5 h-5 text-purple-600" />
            </button>
          </div>

        </div>
      </section>

      {/* ÁREA DE DEMONSTRAÇÃO PRÁTICA INTERATIVA */}
      <section className="py-20 sm:py-28 px-4 bg-zinc-950/30 relative" id="demo-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.03),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto space-y-12 relative">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Demonstração Interativa</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Veja a Máquina de Copy em Ação!
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Clique abaixo para ver exemplos de anúncios e postagens gerados usando os prompts do livro. Essa é exatamente a qualidade que você aprenderá a criar em segundos.
            </p>
          </div>

          {/* Card Interativo Principal */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mx-auto border border-purple-500/20">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">Central de Criativos de Alta Conversão</h3>
              <p className="text-zinc-400 text-sm max-w-md mx-auto">
                Explore posts virais, copies estruturadas para Instagram, ganchos emocionais para anúncios e comandos estratégicos.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView("creatives");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-6 py-3.5 rounded-xl transition cursor-pointer shadow-lg shadow-purple-600/25 group"
            >
              <span>ABRIR CENTRAL DE CRIATIVOS</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>

        </div>
      </section>

      {/* ÁREA DOS BÔNUS EXCLUSIVOS (Apresentação Visual Premium) */}
      <section className="py-20 sm:py-28 px-4 bg-zinc-950/20 border-t border-zinc-900" id="bonus-section">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">Apenas Hoje</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Leve uma Biblioteca de Bônus de R$ 591 Totalmente Grátis
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Se você tomar a decisão de garantir o seu livro Máquina de Copy agora, você receberá instantaneamente três bônus complementares extraordinários.
            </p>
          </div>

          {/* Apresentação Tridimensional dos Bônus */}
          <div className="relative max-w-lg mx-auto aspect-[4/3] flex items-center justify-center mb-12 sm:mb-20" id="bonus-mockups-container">
            {/* Ambient Purple glow behind stack */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
            
            {/* Bonus 3: Calendário Inteligente */}
            <div className="absolute left-[-20px] bottom-4 w-[180px] sm:w-[220px] aspect-[3/4] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden border border-zinc-800/80 transform -rotate-12 hover:rotate-0 hover:scale-105 hover:z-30 transition duration-500 cursor-pointer bg-zinc-950 group">
              <img 
                src={bonusThreeCover} 
                alt="Bônus 3 – Calendário Inteligente" 
                className="w-full h-full object-cover group-hover:opacity-90 transition"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[8px] font-extrabold bg-pink-500 text-white w-fit px-2.5 py-0.5 rounded-full mb-1 uppercase tracking-wider">BÔNUS 3 INCLUSO</span>
                <h3 className="text-xs sm:text-sm font-display font-black text-white tracking-tight">Calendário Inteligente</h3>
                <p className="text-[9px] text-zinc-300 leading-normal mt-0.5">365 Dias de Estratégias</p>
              </div>
            </div>

            {/* Bonus 2: Pack Premium de Prompts */}
            <div className="absolute right-[-20px] bottom-8 w-[180px] sm:w-[220px] aspect-[3/4] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden border border-zinc-800/80 transform rotate-12 hover:rotate-0 hover:scale-105 hover:z-30 transition duration-500 cursor-pointer bg-zinc-950 group">
              <img 
                src={bonusTwoCover} 
                alt="Bônus 2 – Pack Premium de Prompts" 
                className="w-full h-full object-cover group-hover:opacity-90 transition"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[8px] font-extrabold bg-indigo-500 text-white w-fit px-2.5 py-0.5 rounded-full mb-1 uppercase tracking-wider">BÔNUS 2 INCLUSO</span>
                <h3 className="text-xs sm:text-sm font-display font-black text-white tracking-tight">Pack Premium de Prompts</h3>
                <p className="text-[9px] text-zinc-300 leading-normal mt-0.5">Comandos de Alta Conversão</p>
              </div>
            </div>

            {/* Bonus 1: Biblioteca de Ganchos */}
            <div className="absolute left-[15%] top-0 w-[200px] sm:w-[240px] aspect-[3/4] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-20 border-2 border-purple-500/50 hover:scale-105 hover:border-purple-400 transition duration-300 bg-zinc-950 group cursor-pointer">
              <img 
                src={bonusOneCover} 
                alt="Bônus 1 – Biblioteca Premium de Prompts" 
                className="w-full h-full object-cover group-hover:opacity-90 transition"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-[9px] font-black bg-purple-500 text-white w-fit px-3 py-0.5 rounded-full mb-1 uppercase tracking-wider">BÔNUS 1 INCLUSO</span>
                <h3 className="text-sm sm:text-base font-display font-black text-white tracking-tight leading-tight">Biblioteca Premium de Prompts</h3>
                <p className="text-xs text-zinc-300 mt-0.5">Ganchos, Copys e Linhas Editoriais</p>
              </div>
            </div>
          </div>

          {/* Cards de Detalhamento dos Bônus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8" id="bonus-grid-list">
            
            {/* Bonus 1 Card */}
            <div className="bg-zinc-950/60 hover:bg-zinc-900/40 border border-purple-500/20 hover:border-purple-500/40 rounded-3xl p-6 transition duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-800 shadow-md shrink-0 bg-zinc-900 self-center sm:self-start group-hover:scale-105 transition duration-300">
                  <img 
                    src={bonusOneCover} 
                    alt="Capa Bônus 1" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full uppercase tracking-wider">BÔNUS 1</span>
                    <span className="text-[10px] text-zinc-500 font-bold line-through">Valor: R$ 147,00</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-purple-400 transition">Biblioteca de Ganchos de Alta Retenção</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Centenas de templates prontos das primeiras linhas mais viciantes para prender a atenção do público de forma imediata nos primeiros 3 segundos.
                  </p>
                </div>
              </div>
            </div>

            {/* Bonus 2 Card */}
            <div className="bg-zinc-950/60 hover:bg-zinc-900/40 border border-purple-500/20 hover:border-purple-500/40 rounded-3xl p-6 transition duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-800 shadow-md shrink-0 bg-zinc-900 self-center sm:self-start group-hover:scale-105 transition duration-300">
                  <img 
                    src={bonusTwoCover} 
                    alt="Capa Bônus 2" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-wider">BÔNUS 2</span>
                    <span className="text-[10px] text-zinc-500 font-bold line-through">Valor: R$ 297,00</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-indigo-400 transition">Pack Premium de Prompts de Alta Conversão</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Comandos ultra-refinados que imitam com perfeição a escrita e a empatia de um copywriter sênior profissional. Diga adeus aos textos artificiais.
                  </p>
                </div>
              </div>
            </div>

            {/* Bonus 3 Card */}
            <div className="bg-zinc-950/60 hover:bg-zinc-900/40 border border-purple-500/20 hover:border-purple-500/40 rounded-3xl p-6 transition duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-800 shadow-md shrink-0 bg-zinc-900 self-center sm:self-start group-hover:scale-105 transition duration-300">
                  <img 
                    src={bonusThreeCover} 
                    alt="Capa Bônus 3" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold bg-pink-500/10 border border-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full uppercase tracking-wider">BÔNUS 3</span>
                    <span className="text-[10px] text-zinc-500 font-bold line-through">Valor: R$ 147,00</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-pink-400 transition">Calendário Inteligente de Conteúdo (365 Dias)</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Um cronograma completo passo a passo anual com ideias estratégicas de postagem diárias mapeadas para você postar o ano todo com alto engajamento.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ÁREA DE PRECIFICAÇÃO E OFERTA IRRECUSÁVEL */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-black via-zinc-950/40 to-black border-t border-zinc-900" id="pricing-section">
        <div className="max-w-4xl mx-auto space-y-12 relative">
          
          {/* Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Oferta Especial Exclusiva</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Tome a Decisão que Vai Mudar Suas Copys para Sempre
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              Acesso vitalício imediato a todo o material estruturado. Sem mensalidades ou custos ocultos adicionais.
            </p>
          </div>

          {/* Caixa de Oferta Principal (Design Premium) */}
          <div className="bg-zinc-950 border-2 border-purple-500 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden" id="offer-box">
            
            {/* Tag de Destaque Superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-purple-500 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-widest px-6 py-1.5 rounded-b-2xl">
              Melhor Custo Benefício
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl sm:text-2xl font-display font-black text-white">O Combo Completo Máquina de Copy</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Ebook Completo Máquina de Copy + Biblioteca de Ganchos + Pack de Prompts Anti-Robô + Calendário Estratégico.
              </p>
            </div>

            {/* Lista Simplificada de Preços */}
            <div className="space-y-1 text-zinc-500 text-sm max-w-sm mx-auto border-y border-zinc-900 py-4">
              <div className="flex justify-between">
                <span>Ebook Principal:</span>
                <span className="line-through">R$ 197,00</span>
              </div>
              <div className="flex justify-between">
                <span>3 Bônus Inclusos:</span>
                <span className="line-through">R$ 591,00</span>
              </div>
              <div className="flex justify-between text-purple-400 font-bold">
                <span>Desconto Especial Hoje:</span>
                <span>- R$ 739,00</span>
              </div>
            </div>

            {/* Exibição Tridimensional do Preço */}
            <div className="space-y-1.5" id="price-display">
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Por apenas</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-zinc-400 font-bold text-lg sm:text-2xl">12x de</span>
                <span className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">R$ 4,82</span>
              </div>
              <p className="text-sm text-zinc-400 font-medium">ou <span className="text-emerald-400 font-extrabold">R$ 47,00 à vista</span> no PIX ou Cartão</p>
            </div>

            {/* CTA de Compra */}
            <div className="space-y-3 max-w-md mx-auto">
              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-base sm:text-lg px-8 py-4.5 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition duration-300 cursor-pointer flex items-center justify-center gap-3 group"
                id="pricing-cta-btn"
              >
                <span>QUERO MEU ACESSO COM DESCONTO</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-purple-500" /> Compra 100% Segura</span>
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-purple-500" /> Conexão SSL Criptografada</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SEÇÃO DA GARANTIA BLINDADA DE 7 DIAS */}
      <section className="py-20 sm:py-28 px-4 border-t border-zinc-900 bg-zinc-950/20" id="guarantee-section">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
            
            {/* Decoração de Selo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
            
            <div className="w-24 sm:w-32 shrink-0 relative flex justify-center items-center" id="seal-container">
              {/* Círculo do Selo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-purple-500/30 flex items-center justify-center relative bg-purple-500/10">
                <ShieldCheck className="w-12 h-12 text-purple-400" />
                {/* Textos rotativos ou detalhes */}
                <div className="absolute inset-2 border border-purple-500/20 rounded-full border-dashed animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            </div>

            <div className="space-y-4 flex-1 text-center md:text-left">
              <span className="text-[10px] font-black bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full uppercase tracking-wider">Garantia Absoluta</span>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white">Garantia Blindada de Satisfação de 7 Dias</h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Nós confiamos tanto na qualidade do material que oferecemos uma garantia total de reembolso. Se por qualquer motivo você achar que o manual não agregou valor para o seu negócio nos primeiros 7 dias, basta nos enviar um único e-mail e nós devolveremos 100% do seu dinheiro investido. Sem burocracia ou letras miúdas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) */}
      <section className="py-20 sm:py-28 px-4 border-t border-zinc-900" id="faq-section">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Dúvidas Comuns</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">Perguntas Frequentes</h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Ainda tem dúvidas? Veja as principais dúvidas dos nossos leitores antes de garantir o acesso.
            </p>
          </div>

          <div className="space-y-4" id="faq-accordion-list">
            
            {/* FAQ 1 */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800 transition">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === 0 ? null : 0)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-purple-400 transition cursor-pointer"
              >
                <span>Como vou receber o material?</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transform transition-transform ${activeFAQ === 0 ? "rotate-180 text-purple-400" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeFAQ === 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-zinc-900/60"
                  >
                    <p className="p-6 text-xs sm:text-sm text-zinc-400 leading-relaxed bg-black/40">
                      Imediatamente após a aprovação da compra, você receberá um e-mail com os dados de acesso exclusivos à nossa área de membros premium, onde todo o conteúdo (manual principal e bônus estruturados) estará disponível para download imediato em formato PDF.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 2 */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800 transition">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === 1 ? null : 1)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-purple-400 transition cursor-pointer"
              >
                <span>O método funciona para qualquer nicho de mercado?</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transform transition-transform ${activeFAQ === 1 ? "rotate-180 text-purple-400" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeFAQ === 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-zinc-900/60"
                  >
                    <p className="p-6 text-xs sm:text-sm text-zinc-400 leading-relaxed bg-black/40">
                      Sim! A engenharia de prompts ensinada é fundamentada em gatilhos e modelos universais de copywriting e psicologia humana. Ela pode ser aplicada com absoluta eficácia para infoprodutos, e-commerce, negócios locais, serviços e marcas pessoais.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 3 */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800 transition">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === 2 ? null : 2)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-purple-400 transition cursor-pointer"
              >
                <span>Preciso ter conhecimento prévio em Inteligência Artificial?</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transform transition-transform ${activeFAQ === 2 ? "rotate-180 text-purple-400" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeFAQ === 2 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-zinc-900/60"
                  >
                    <p className="p-6 text-xs sm:text-sm text-zinc-400 leading-relaxed bg-black/40">
                      Não! O livro foi desenhado tanto para iniciantes absolutos quanto para experientes. Nós entregamos os comandos prontos no formato "copiar e colar", bastando apenas preencher as variáveis do seu negócio.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 4 */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800 transition">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === 3 ? null : 3)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-purple-400 transition cursor-pointer"
              >
                <span>Por quanto tempo terei acesso ao material?</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transform transition-transform ${activeFAQ === 3 ? "rotate-180 text-purple-400" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeFAQ === 3 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-zinc-900/60"
                  >
                    <p className="p-6 text-xs sm:text-sm text-zinc-400 leading-relaxed bg-black/40">
                      O seu acesso é vitalício. Você poderá ler online, baixar os arquivos para qualquer dispositivo pessoal seu e usufruir de todas as futuras atualizações de prompts gratuitamente.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Rodapé da Página */}
      <footer className="py-12 bg-zinc-950/60 border-t border-zinc-900 text-zinc-500 text-xs text-center space-y-6" id="footer-section">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">MÁQUINA DE COPY COM IA</p>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Este site não é afiliado ao Facebook, Google ou a qualquer rede social. Os resultados obtidos dependem exclusivamente do esforço e aplicação estratégica de cada leitor.
          </p>
          <p className="text-zinc-600">
            © {new Date().getFullYear()} Máquina de Copy com IA • Todos os direitos reservados • CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </footer>

    </div>
  );
}
