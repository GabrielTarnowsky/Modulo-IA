import React, { useState, useEffect } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Award, 
  Clock, 
  Edit3, 
  HelpCircle, 
  TrendingUp, 
  Instagram, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  Check, 
  Play, 
  Loader2, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  Lock, 
  Share2, 
  FileText,
  Bookmark,
  Heart,
  ChevronDown,
  Settings,
  AlertCircle,
  Camera,
  BookOpen,
  Download,
  Printer,
  Calendar,
  Smartphone,
  Image
} from "lucide-react";
import { testimonials, faqItems } from "./data";
import { readyToUseCreatives } from "./creativesData";
import { GeneratedPost, GeneratedAdCreative } from "./types";

export default function App() {
  // Configurable Checkout URL (Defaults to Kiwify or generic checkout hashtag)
  const [checkoutUrl, setCheckoutUrl] = useState(() => {
    return (import.meta as any).env?.VITE_CHECKOUT_URL || localStorage.getItem("mci_checkout_url") || "https://pay.kiwify.com.br/lVk3ffM";
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isPhotoMode, setIsPhotoMode] = useState(false); // Defaulting to false (Interactive) so all real landing page checkout links are completely active and work!
  const [hideFloatingSelector, setHideFloatingSelector] = useState(true); // Default to true (hidden) to remove the test selectors from the final page

  // AI Generator Form States
  const [nicheInput, setNicheInput] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [selectedTone, setSelectedTone] = useState("Persuasivo & Magnético");
  const [targetAudience, setTargetAudience] = useState("");
  const [postObjective, setPostObjective] = useState("Atrair novos seguidores e vender");
  
  // App states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Copy feedback states
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedCarousel, setCopiedCarousel] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  // Active Carousel Preview Slide Index
  const [activeSlide, setActiveSlide] = useState(0);

  // Interactive Testimonial Filter
  const [activeTestimonialNiche, setActiveTestimonialNiche] = useState("Todos");

  // Interactive FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Ad Creative Center States
  const [selectedCreativeId, setSelectedCreativeId] = useState<string>("creative-1");
  const [copiedCreativeId, setCopiedCreativeId] = useState<string | null>(null);
  const [copiedCreativePart, setCopiedCreativePart] = useState<string | null>(null);
  
  // Custom Dynamic Creative Generator States
  const [creativeProduct, setCreativeProduct] = useState("Método Conteúdo Inteligente");
  const [creativeFormat, setCreativeFormat] = useState("Vídeo Reels");
  const [creativeAngle, setCreativeAngle] = useState("Quebra de Objeção");
  const [creativeAudience, setCreativeAudience] = useState("Empreendedores e Profissionais que querem vender mais no Instagram sem sofrer");
  const [generatedAdCreative, setGeneratedAdCreative] = useState<GeneratedAdCreative | null>(null);
  const [isGeneratingAdCreative, setIsGeneratingAdCreative] = useState(false);
  const [adCreativeError, setAdCreativeError] = useState("");



  // Predefined popular niches
  const popularNiches = [
    "Nutrição & Saúde",
    "Marketing Digital",
    "Moda & E-commerce",
    "Psicologia & Terapia",
    "Personal Trainer",
    "Finanças Pessoais",
    "Design & Criação",
  ];

  // Steps for loading text animation
  const loadingSteps = [
    "Analisando o comportamento do seu público-alvo...",
    "Formatando ganchos de alta retenção no Instagram...",
    "Escrevendo legenda escaneável com técnicas de Neuromarketing...",
    "Estruturando os 4 slides lógicos do seu carrossel...",
    "Selecionando hashtags estratégicas...",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setGenerationStep(0);
      interval = setInterval(() => {
        setGenerationStep((prev) => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleCheckoutSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mci_checkout_url", checkoutUrl);
    setShowSettings(false);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalNiche = nicheInput === "Outro" ? customNiche : nicheInput;
    
    if (!finalNiche) {
      setErrorMsg("Por favor, selecione ou digite o seu nicho.");
      return;
    }

    setErrorMsg("");
    setIsGenerating(true);
    setGeneratedPost(null);
    setActiveSlide(0);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          niche: finalNiche,
          tone: selectedTone,
          targetAudience: targetAudience || "Público geral do Instagram",
          objective: postObjective,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ocorreu um erro ao gerar o conteúdo.");
      }

      const data = await response.json();
      setGeneratedPost(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Erro de conexão com o servidor de IA. Verifique as configurações de chave de API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: "caption" | "carousel" | "hashtags") => {
    navigator.clipboard.writeText(text);
    if (type === "caption") {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } else if (type === "carousel") {
      setCopiedCarousel(true);
      setTimeout(() => setCopiedCarousel(false), 2000);
    } else if (type === "hashtags") {
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    }
  };

  const formatCarouselText = (carousel: any[]) => {
    return carousel.map(slide => `[Slide ${slide.slideNumber || slide.slide}] ${slide.title}\n${slide.description || slide.text}`).join("\n\n");
  };

  const copyCreativePartToClipboard = (creativeId: string, part: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCreativeId(creativeId);
    setCopiedCreativePart(part);
    setTimeout(() => {
      setCopiedCreativeId(null);
      setCopiedCreativePart(null);
    }, 2000);
  };

  const handleGenerateCreative = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdCreativeError("");
    setIsGeneratingAdCreative(true);
    setGeneratedAdCreative(null);

    try {
      const response = await fetch("/api/generate-creative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: creativeProduct,
          format: creativeFormat,
          angle: creativeAngle,
          audience: creativeAudience,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ocorreu um erro ao gerar o criativo.");
      }

      const data = await response.json();
      setGeneratedAdCreative(data);
    } catch (err: any) {
      console.error(err);
      setAdCreativeError(err.message || "Erro ao conectar com o gerador de criativos.");
    } finally {
      setIsGeneratingAdCreative(false);
    }
  };

  const filteredTestimonials = activeTestimonialNiche === "Todos" 
    ? testimonials 
    : testimonials.filter(t => t.niche === activeTestimonialNiche || (activeTestimonialNiche === "Outros" && !["Marketing Digital", "Saúde & Estética", "E-commerce & Moda"].includes(t.niche)));

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 font-sans antialiased overflow-x-hidden">
      


      {/* HEADER NAVIGATION */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-800/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-tight block">
              MÉTODO <span className="text-blue-500">CONTEÚDO</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 -mt-1 block">INTELIGENTE</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#como-funciona" className={`transition ${isPhotoMode ? "cursor-default text-gray-400 hover:text-gray-400" : "hover:text-white"}`}>O Método</a>
          <a href="#depoimentos" className={`transition ${isPhotoMode ? "cursor-default text-gray-400 hover:text-gray-400" : "hover:text-white"}`}>Resultados</a>
          <a href="#oferta" className={`transition ${isPhotoMode ? "cursor-default text-gray-400 hover:text-gray-400" : "hover:text-white"}`}>Garantia</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
              ⚡ O MÉTODO DE PROMPTS DE COPYS SENIORES
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.1] tracking-tight">
              Cansado de travar na tela em branco? <span className="text-gradient">Crie 30 dias de conteúdo estratégico em 1 hora.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              O <strong className="text-white">Método Conteúdo Inteligente</strong> é um sistema pronto de Engenharia de Prompts para empreendedores e profissionais. Ele treina a inteligência artificial para agir como seu Copywriter de Elite. Copie, cole e destrave vendas diretas no direct poupando mais de 20 horas semanais.
            </p>
            
            <div className="flex flex-col items-center lg:items-start gap-3 pt-2">
              {isPhotoMode ? (
                <div 
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-display font-extrabold text-lg py-5 px-10 rounded-2xl w-full sm:w-auto text-center select-none shadow-xl shadow-blue-500/10 uppercase tracking-tight"
                  id="hero-buy-btn"
                >
                  🚀 QUERO ACESSO IMEDIATO COM BÔNUS
                </div>
              ) : (
                <>
                  <a 
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-display font-extrabold text-lg py-5 px-10 rounded-2xl w-full sm:w-auto inline-block shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition duration-300 text-center cursor-pointer uppercase tracking-tight"
                    id="hero-buy-btn"
                  >
                    🚀 QUERO ACESSO IMEDIATO COM BÔNUS
                  </a>
                  
                  <a 
                    href="#como-funciona" 
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-4 px-8 rounded-2xl w-full sm:w-auto border border-zinc-800 hover:border-zinc-700 transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                    id="hero-test-btn"
                  >
                    Conhecer a Transformação
                  </a>
                </>
              )}
              
              <p className="text-[11px] text-zinc-500 font-semibold mt-1">
                🔒 Compra 100% segura • ⚡ Acesso imediato • 🛡️ 7 dias de garantia • 🔄 Atualizações inclusas
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2 text-xs text-zinc-500 font-medium uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-blue-500" /> Acesso Imediato</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-500" /> Pagamento Seguro</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-blue-500" /> 7 dias de garantia</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Phone Mockup representing App value */}
            <div className="relative w-full max-w-[340px] aspect-[9/16] bg-zinc-950 rounded-[48px] p-3.5 border-4 border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* Phone Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-zinc-800 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-zinc-900 rounded-full" />
              </div>

              {/* Inner screen content */}
              <div className="relative h-full w-full bg-[#0a0a10] rounded-[36px] overflow-hidden flex flex-col justify-between p-6">
                
                {/* Simulated Social Status Header */}
                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold tracking-wider pt-2">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full border border-zinc-600 flex items-center justify-center text-[8px]">5G</div>
                    <div className="w-4 h-2 bg-emerald-500 rounded-sm" />
                  </div>
                </div>

                {/* Cover branding design */}
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                  <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[24px] mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-400">Sistema Premium</span>
                  <h2 className="text-3xl font-display font-black leading-tight mt-1">
                    MÉTODO<br />
                    CONTEÚDO<br />
                    <span className="text-blue-500 text-gradient-gold font-extrabold">INTELIGENTE</span>
                  </h2>
                  <p className="text-[11px] text-zinc-500 mt-4 max-w-[200px]">
                    20 Prompts Elite + Calendário 30 Dias + Estrutura Viral de Carrossel
                  </p>
                </div>

                {/* Quick Stats Mockup */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-400">Resultados Práticos:</span>
                    <span className="text-emerald-400 font-bold">+241% alcance</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[85%]" />
                  </div>
                </div>
                
              </div>
            </div>

            {/* Glowing aura background on the side */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </section>

      {/* PAIN SECTION */}
      <section className="py-24 bg-[#08080c] border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">A dura realidade</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold italic">Você também enfrenta estes problemas no Instagram?</h2>
            <div className="w-20 h-1 bg-red-500/50 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-3xl border-none bg-zinc-900/40 relative overflow-hidden group hover:bg-zinc-900/60 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <Clock className="text-red-400 mb-5 w-9 h-9" />
              <h4 className="font-display font-bold text-lg mb-2 text-white">Horas Perdidas</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Você passa horas olhando para uma tela em branco tentando ter uma ideia, procrastina e acaba não postando nada pelo cansaço.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-none bg-zinc-900/40 relative overflow-hidden group hover:bg-zinc-900/60 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <Edit3 className="text-red-400 mb-5 w-9 h-9" />
              <h4 className="font-display font-bold text-lg mb-2 text-white">Textos Invisíveis</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Cria legendas frias ou cheias de conteúdo técnico chato que as pessoas ignoram no feed, sem gerar conexão com o seu público.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-none bg-zinc-900/40 relative overflow-hidden group hover:bg-zinc-900/60 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <HelpCircle className="text-red-400 mb-5 w-9 h-9" />
              <h4 className="font-display font-bold text-lg mb-2 text-white">Resultados Artificiais</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Tenta usar o ChatGPT comum e recebe respostas óbvias e artificiais, cheias de emojis bobos que gritam que foram feitos por robô.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-none bg-zinc-900/40 relative overflow-hidden group hover:bg-zinc-900/60 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <TrendingUp className="text-red-400 mb-5 w-9 h-9" />
              <h4 className="font-display font-bold text-lg mb-2 text-white">Zero Clientes na DM</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Até posta dicas úteis, mas seu conteúdo atrai apenas curiosos. Ninguém te pergunta o preço do serviço ou compra no direct.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE METHODOLOGY */}
      <section id="como-funciona" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">O Segredo Revelado</span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold italic">Os 3 Pilares do Método Conteúdo Inteligente</h2>
          <p className="text-zinc-400 text-base sm:text-lg">Diga adeus ao bloqueio criativo e crie posts estratégicos como um copywriter profissional em tempo recorde.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-[32px] border border-blue-500/20 bg-gradient-to-b from-blue-950/10 to-[#0a0a14] space-y-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/5 rounded-full blur-xl" />
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
              01
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">Atração de Compradores</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Pare de postar aleatoriedades sobre seu dia a dia. Você usará um funil de venda direta que desperta o desejo de compra nas dores profundas do cliente. Cada post guiará o leitor a levantar a mão no direct querendo seu produto ou serviço.
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Atração automática de leads prontos para pagar</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Quebra antecipada de objeções de preço</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Chamadas sutis e irresistíveis para a DM</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-[32px] border border-purple-500/20 bg-gradient-to-b from-purple-950/10 to-[#0a0a14] space-y-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-500/5 rounded-full blur-xl" />
            <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-400 font-bold border border-purple-500/20">
              02
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">Escrita Magnética Humana</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Diga adeus a textos robóticos. Nosso sistema de prompts avançados ensina a inteligência artificial a ler a mente do seu público, usando gatilhos emocionais da redação publicitária (copywriting) em parágrafos dinâmicos.
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Tom de voz 100% natural, empático e fluído</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Legendas curtas e escaneáveis no celular</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Ganchos impossíveis de ignorar no scroll</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-[32px] border border-pink-500/20 bg-gradient-to-b from-pink-950/10 to-[#0a0a14] space-y-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-pink-500/5 rounded-full blur-xl" />
            <div className="w-12 h-12 bg-pink-600/10 rounded-2xl flex items-center justify-center text-pink-400 font-bold border border-pink-500/20">
              03
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">Liberdade de Tempo</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Recupere a paz nos seus fins de semana. Com nosso calendário de funil estratégico e planejamento rápido de prompts, você criará e agendará todo o seu estoque de conteúdo estratégico para 30 dias em apenas 1 hora.
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> Fim definitivo da ansiedade do post de última hora</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> Menos desgaste mental e muito mais faturamento</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> Perfil vendendo de domingo a domingo no automático</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DELIVERABLES & WHAT'S INCLUDED SECTION */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Conteúdo do Produto</span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold italic">O que você vai receber no Método Completo:</h2>
          <div className="w-20 h-1 bg-blue-500/50 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300">
            <span className="text-3xl">📘</span>
            <span className="font-bold uppercase text-[10px] tracking-widest text-blue-400 block">Manual do Comportamento</span>
            <h3 className="font-display font-extrabold text-base text-white">Guia Prático de Copywriting</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Aprenda a psicologia humana de consumo por trás de posts que fazem o cliente abrir a carteira e comprar.</p>
          </div>

          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300">
            <span className="text-3xl">🧠</span>
            <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block">Bibliotecas Master</span>
            <h3 className="font-display font-extrabold text-base text-white">20 Prompts Elite Inéditos</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Copie e cole os comandos secretos que instruem a inteligência artificial a agir como redator profissional sênior.</p>
          </div>

          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300">
            <span className="text-3xl">📅</span>
            <span className="font-bold uppercase text-[10px] tracking-widest text-pink-400 block">Organização Completa</span>
            <h3 className="font-display font-extrabold text-base text-white">Calendário de Funil (30 Dias)</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Chega de ter ideias no dia. 30 dias de linha editorial classificada e mapeada para aquecer seguidores frios.</p>
          </div>

          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300">
            <span className="text-3xl">🎥</span>
            <span className="font-bold uppercase text-[10px] tracking-widest text-emerald-400 block">Atenção Extrema</span>
            <h3 className="font-display font-extrabold text-base text-white">Roteiros de Reels e Carrossel</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Ganchos magnéticos falados e transições pensadas para reter e direcionar as pessoas direto para a compra.</p>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE BONUSES SECTION */}
      <section className="py-24 bg-[#050508] border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Oferta Exclusiva</span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold italic">Leve esses 4 Bônus Secretos Gratuitamente:</h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
              Ao garantir sua licença hoje, você leva um pacote completo de ferramentas de aceleração comerciais que custariam mais de R$ 240 reais separadamente.
            </p>
            <div className="w-20 h-1 bg-purple-500/50 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bonus 1 */}
            <div className="glass-card p-8 rounded-[32px] border border-blue-500/20 bg-zinc-950/60 relative overflow-hidden flex flex-col justify-between group hover:border-blue-500/40 transition duration-300">
              <div className="absolute top-4 right-4 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full">
                VALOR: R$ 97,00
              </div>
              <div className="space-y-4">
                <span className="text-4xl">🤖</span>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">Super Bônus 01</span>
                <h3 className="text-2xl font-display font-extrabold text-white">Script Secreto de Vendas por Direct</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  O exato passo a passo estratégico para configurar automações no Direct (ManyChat). Faça seu celular apitar com vendas automáticas sempre que comentarem no seu post, convertendo de forma humanizada.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 uppercase font-black">Apenas Hoje</span>
                <span className="text-emerald-400 text-sm font-black uppercase">Grátis</span>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="glass-card p-8 rounded-[32px] border border-purple-500/20 bg-zinc-950/60 relative overflow-hidden flex flex-col justify-between group hover:border-purple-500/40 transition duration-300">
              <div className="absolute top-4 right-4 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-bold px-3 py-1 rounded-full">
                VALOR: R$ 47,00
              </div>
              <div className="space-y-4">
                <span className="text-4xl">🎯</span>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block">Super Bônus 02</span>
                <h3 className="text-2xl font-display font-extrabold text-white">50 Prompts Secretos para Anúncios (Meta Ads)</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Copies e roteiros de anúncios patrocinados prontos para rodar. Crie criativos de alta retenção no Instagram e Facebook, economizando dinheiro em testes e indo direto na copy validada.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 uppercase font-black">Apenas Hoje</span>
                <span className="text-emerald-400 text-sm font-black uppercase">Grátis</span>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="glass-card p-8 rounded-[32px] border border-pink-500/20 bg-zinc-950/60 relative overflow-hidden flex flex-col justify-between group hover:border-pink-500/40 transition duration-300">
              <div className="absolute top-4 right-4 bg-pink-500/10 border border-pink-500/30 text-pink-400 text-[10px] font-bold px-3 py-1 rounded-full">
                VALOR: R$ 67,00
              </div>
              <div className="space-y-4">
                <span className="text-4xl">📅</span>
                <span className="text-xs font-bold uppercase tracking-widest text-pink-400 block">Super Bônus 03</span>
                <h3 className="text-2xl font-display font-extrabold text-white">Calendário Editorial de 365 Dias</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Nunca mais trave sem saber o que postar. Tenha em mãos a linha mestra para o ano inteiro, mapeando de forma antecipada as dores do seu cliente ideal para datas comemorativas e picos sazonais do mercado.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 uppercase font-black">Apenas Hoje</span>
                <span className="text-emerald-400 text-sm font-black uppercase">Grátis</span>
              </div>
            </div>

            {/* Bonus 4 */}
            <div className="glass-card p-8 rounded-[32px] border border-emerald-500/20 bg-zinc-950/60 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition duration-300">
              <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full">
                VALOR: R$ 37,00
              </div>
              <div className="space-y-4">
                <span className="text-4xl">👥</span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">Super Bônus 04</span>
                <h3 className="text-2xl font-display font-extrabold text-white">Grupo Silencioso de Atualizações</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  O algoritmo do Instagram e a inteligência artificial atualizam constantemente. Com esse grupo silencioso, você receberá novos prompts adaptados às novas diretrizes, sem spam ou chat paralelo.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 uppercase font-black">Apenas Hoje</span>
                <span className="text-emerald-400 text-sm font-black uppercase">Grátis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED RESULTS & TESTIMONIALS */}
      <section id="depoimentos" className="py-24 bg-[#08080c] border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Resultados Reais Comprovados</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold italic">Quem colocou em prática os prompts do Método:</h2>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl w-fit mx-auto lg:mx-0">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" alt="aluno" />
                  <img className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" alt="aluno" />
                  <img className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" alt="aluno" />
                </div>
                <span className="text-xs font-bold text-emerald-400">Mais de 1.450 alunos faturando e economizando tempo com o Método</span>
              </div>
            </div>

            {/* Testimonial Filter Buttons */}
            {!isPhotoMode && (
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end bg-zinc-950/80 p-1.5 rounded-2xl border border-zinc-800">
                {["Todos", "Marketing Digital", "Saúde & Estética", "E-commerce & Moda", "Profissional Liberal"].map((niche) => (
                  <button
                    key={niche}
                    onClick={() => setActiveTestimonialNiche(niche)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      activeTestimonialNiche === niche
                        ? "bg-blue-600 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTestimonials.map((t) => (
              <div key={t.id} className="glass-card p-6 sm:p-8 rounded-[32px] border border-zinc-800/60 bg-zinc-900/20 relative overflow-hidden flex flex-col justify-between hover:border-zinc-700/60 transition duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img 
                        src={t.avatar} 
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30" 
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm">{t.name}</h4>
                        <p className="text-xs text-zinc-500">{t.role}</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {t.metric}
                    </span>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                    "{t.content}"
                  </p>

                  {/* Before & After comparison */}
                  {(t.before && t.after) && (
                    <div className="mt-4 p-3 bg-zinc-950/80 rounded-2xl border border-zinc-800/50 space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 font-bold uppercase tracking-wider shrink-0 bg-red-400/10 px-1.5 py-0.5 rounded text-[9px]">Antes</span>
                        <span className="text-zinc-400">{t.before}</span>
                      </div>
                      <div className="flex items-start gap-2 border-t border-zinc-900 pt-2">
                        <span className="text-emerald-400 font-bold uppercase tracking-wider shrink-0 bg-emerald-400/10 px-1.5 py-0.5 rounded text-[9px]">Depois</span>
                        <span className="text-zinc-200 font-semibold">{t.after}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-900 pt-4 mt-6 flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <span>Nicho: <strong className="text-zinc-400">{t.niche}</strong></span>
                  <span className="flex items-center gap-1 text-blue-500"><CheckCircle2 className="w-3.5 h-3.5" /> Aluno Verificado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROMISE & GUARANTEE */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-b from-[#0e0e1a] to-zinc-950 border border-blue-500/20 rounded-[40px] p-8 sm:p-14 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          <div className="w-20 h-20 mx-auto bg-blue-600/10 rounded-full flex items-center justify-center border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] animate-pulse">
            <ShieldCheck className="text-blue-500 w-10 h-10" />
          </div>
          
          <h3 className="text-2xl sm:text-4xl font-display font-black text-white italic">
            7 Dias de Garantia Incondicional
          </h3>
          
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Seu risco ao adquirir o Método Conteúdo Inteligente hoje é absolutamente zero. Se você colocar o sistema em prática, copiar e colar nossos prompts, e sentir que não valeu cada centavo do valor simbólico, basta enviar um único e-mail em até 7 dias que devolvemos 100% do seu pagamento. Sem burocracia.
          </p>
          
          <div className="flex justify-center gap-6 text-xs text-zinc-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-zinc-500" /> Compra segura</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> Risco Zero</span>
          </div>
        </div>
      </section>

      {/* FINAL OFFER SECTION */}
      <section id="oferta" className="py-24 bg-[#030306] border-t border-zinc-900 flex justify-center">
        <div className="max-w-2xl w-full px-6">
          <div className="glass-card p-8 sm:p-12 lg:p-16 border-2 border-blue-600 rounded-[40px] shadow-[0_0_80px_rgba(37,99,235,0.15)] text-center relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
            
            <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              ⚡ Oferta Especial por Tempo Limitado
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-black mb-6 text-white tracking-tight">
              MÉTODO CONTEÚDO INTELIGENTE + 4 SUPER BÔNUS
            </h2>
            
            <div className="mb-8 space-y-3">
              <div className="text-zinc-400 text-xs sm:text-sm space-y-1.5 max-w-md mx-auto bg-zinc-950/60 p-5 rounded-2xl border border-zinc-900 mb-6 text-left">
                <div className="flex justify-between"><span>Guia de Prompts de Elite:</span><span className="line-through">R$ 97,00</span></div>
                <div className="flex justify-between"><span>Bônus 1: Script Direct (ManyChat):</span><span className="line-through">R$ 97,00</span></div>
                <div className="flex justify-between"><span>Bônus 2: 50 Prompts Anúncios (Patrocinado):</span><span className="line-through">R$ 47,00</span></div>
                <div className="flex justify-between"><span>Bônus 3: Calendário 365 Dias:</span><span className="line-through">R$ 67,00</span></div>
                <div className="flex justify-between border-b border-zinc-800 pb-2.5"><span>Bônus 4: Grupo VIP Algoritmo:</span><span className="line-through">R$ 37,00</span></div>
                <div className="flex justify-between font-bold text-white pt-2 text-sm"><span>Valor Total Real:</span><span className="line-through text-red-500">R$ 345,00</span></div>
              </div>
              
              <p className="text-zinc-400 font-medium text-base sm:text-lg mb-2">Leve tudo hoje por apenas</p>
              <div className="flex items-end justify-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white mb-2">R$</span>
                <div className="text-7xl sm:text-9xl font-black text-white tracking-tighter leading-none">
                  29<span className="text-3xl sm:text-4xl">,90</span>
                </div>
              </div>
              
              <p className="text-emerald-400 font-black tracking-widest text-xs uppercase pt-6 animate-pulse">
                ⚡ Lote promocional limitado a apenas 14 licenças restantes!
              </p>
            </div>
            
            {isPhotoMode ? (
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-5 px-8 rounded-2xl text-lg sm:text-xl font-display font-black w-full block shadow-xl shadow-blue-500/10 uppercase tracking-tight select-none"
                id="cta-final-purchase"
              >
                🚀 QUERO GARANTIR MINHA VAGA E OS BÔNUS
              </div>
            ) : (
              <a 
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-5 px-8 rounded-2xl text-lg sm:text-xl font-display font-black w-full block shadow-xl shadow-blue-500/20 transform hover:-translate-y-0.5 hover:shadow-blue-500/30 transition-all uppercase tracking-tight cursor-pointer"
                id="cta-final-purchase"
              >
                🚀 QUERO GARANTIR MINHA VAGA E OS BÔNUS
              </a>
            )}
            
            <p className="text-[11px] text-zinc-500 mt-3 font-semibold">
              🔒 Compra 100% segura • ⚡ Acesso imediato • 🛡️ 7 dias de garantia • 🔄 Atualizações gratuitas inclusas
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-t border-zinc-900 pt-6">
              <div>
                <span className="text-white block text-sm font-black mb-0.5">PAGAMENTO</span>
                ÚNICO
              </div>
              <div className="border-x border-zinc-900">
                <span className="text-white block text-sm font-black mb-0.5">ACESSO</span>
                VITALÍCIO
              </div>
              <div>
                <span className="text-white block text-sm font-black mb-0.5">ENTREGA</span>
                IMEDIATA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Dúvidas Frequentes</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold italic">Ainda tem alguma dúvida? Perguntas frequentes:</h2>
          <div className="w-20 h-1 bg-blue-500/50 mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {isPhotoMode ? (
                <div className="p-5 text-left">
                  <span className="font-bold text-white text-sm sm:text-base leading-snug block mb-3 border-b border-zinc-800/40 pb-2">
                    {item.question}
                  </span>
                  <div className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                    className="w-full p-5 text-left flex justify-between items-center hover:bg-zinc-900/50 transition cursor-pointer"
                  >
                    <span className="font-bold text-white text-sm sm:text-base leading-snug">{item.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ml-4 ${
                        openFaqId === item.id ? "rotate-180 text-blue-500" : ""
                      }`} 
                    />
                  </button>
                  
                  {openFaqId === item.id && (
                    <div className="p-5 pt-0 border-t border-zinc-900 text-xs sm:text-sm text-zinc-400 leading-relaxed animate-slideDown">
                      {item.answer}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-zinc-600 text-xs border-t border-zinc-900 bg-[#020204]">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p>© 2026 Método Conteúdo Inteligente. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            <a href="#" className="hover:text-white transition">Termos de Uso</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Políticas de Privacidade</a>
          </div>
          <p className="text-[9px] text-zinc-700 max-w-xl mx-auto">
            Este site não tem afiliação com o Instagram ou Facebook Inc. As marcas registradas mencionadas pertencem aos seus respectivos proprietários. Os resultados demonstrados são baseados em dados reais de alunos, porém os ganhos individuais dependem do esforço e aplicação de cada usuário do método.
          </p>
        </div>
      </footer>





    </div>
  );
}
