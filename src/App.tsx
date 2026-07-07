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
  Image,
  CreditCard,
  Lightbulb,
  Layers,
  Video,
  Pause,
  RefreshCw
} from "lucide-react";
import { testimonials, faqItems } from "./data";
import { readyToUseCreatives } from "./creativesData";
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
  const [activeSubTab, setActiveSubTab] = useState<"library" | "ai-generator">("library");

  // Countdown timer state for high-converting scarcity (14:59 repeating)
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("mci_timer_left");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.minutes === "number" && typeof parsed.seconds === "number") {
          return parsed;
        }
      } catch (e) {}
    }
    return { minutes: 14, seconds: 59 };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let nextSeconds = prev.seconds - 1;
        let nextMinutes = prev.minutes;
        if (nextSeconds < 0) {
          nextSeconds = 59;
          nextMinutes = prev.minutes - 1;
        }
        if (nextMinutes < 0) {
          nextMinutes = 14;
          nextSeconds = 59;
        }
        const state = { minutes: nextMinutes, seconds: nextSeconds };
        localStorage.setItem("mci_timer_left", JSON.stringify(state));
        return state;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: { minutes: number; seconds: number }) => {
    const m = String(time.minutes).padStart(2, "0");
    const s = String(time.seconds).padStart(2, "0");
    return `${m}:${s}`;
  };
  
  // Simulated Reels playback states
  const [reelsPlaying, setReelsPlaying] = useState(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [carouselSlideIdx, setCarouselSlideIdx] = useState(0);

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

  // Simulated Reels script playback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (reelsPlaying) {
      const activeCreative = activeSubTab === "library" 
        ? readyToUseCreatives.find(c => c.id === selectedCreativeId)
        : generatedAdCreative;
      
      const scriptLength = activeCreative?.videoScript?.length || 0;
      if (scriptLength > 0) {
        timer = setInterval(() => {
          setCurrentSceneIdx((prev) => {
            if (prev >= scriptLength - 1) {
              setReelsPlaying(false);
              return 0;
            }
            return prev + 1;
          });
        }, 4000); // 4 seconds per scene
      }
    } else {
      setCurrentSceneIdx(0);
    }
    return () => clearInterval(timer);
  }, [reelsPlaying, selectedCreativeId, activeSubTab, generatedAdCreative]);

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
    <div className="min-h-screen bg-[#050508] text-gray-100 font-sans antialiased overflow-x-hidden relative pb-20">
      

          {/* HIGH CONVERTING TOP BAR WITH TIMER */}
          <div className="bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 text-white text-[11px] sm:text-xs font-bold text-center py-2.5 px-4 flex items-center justify-center gap-2 relative z-50 shadow-lg">
            <Clock className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>
              ⚡ <span className="text-yellow-300 font-extrabold uppercase">OFERTA IMPERDÍVEL:</span> Método Completo + <span className="underline decoration-yellow-300 font-extrabold text-white">3 Bônus Exclusivos</span> por apenas R$ 29,90 expira em:
            </span>
            <span className="font-mono bg-black/50 px-2 py-0.5 rounded text-yellow-300 border border-yellow-300/30 font-black tracking-wider shadow">
              {formatTime(timeLeft)}
            </span>
          </div>

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
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              SISTEMA COMPROVADO DE ENGENHARIA DE PROMPTS DE ELITE
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold leading-tight tracking-tight text-white">
              Pare de Perder Horas Criando Conteúdo. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Aprenda o método de IA que já ajudou mais de 10 mil pessoas</span> a produzir conteúdos, anúncios e estratégias, mesmo sem experiência.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              O método definitivo de Copywriting e Engenharia de Prompts para transformar seu Instagram em uma <strong className="text-white">máquina automática de atração de clientes</strong> — sem precisar gastar horas do seu dia ou sofrer com bloqueio criativo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              {isPhotoMode ? (
                <div 
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-display font-extrabold text-lg py-5 px-10 rounded-2xl w-full sm:w-auto text-center select-none shadow-xl shadow-purple-500/10"
                  id="hero-buy-btn"
                >
                  QUERO ACESSO IMEDIATO
                </div>
              ) : (
                <>
                  <a 
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-extrabold text-lg py-5 px-10 rounded-2xl w-full sm:w-auto inline-block shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition duration-300 text-center cursor-pointer uppercase tracking-wide"
                    id="hero-buy-btn"
                  >
                    ⚡ QUERO ACESSO IMEDIATO
                  </a>
                  
                  <a 
                    href="#como-funciona" 
                    className="bg-zinc-900/80 hover:bg-zinc-800 text-white font-medium py-5 px-8 rounded-2xl w-full sm:w-auto border border-zinc-800 hover:border-zinc-700 transition flex items-center justify-center gap-2 cursor-pointer"
                    id="hero-test-btn"
                  >
                    Conhecer o Método
                  </a>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2 text-xs text-zinc-500 font-semibold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-purple-500" /> Acesso Imediato</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-purple-500" /> Pagamento 100% Seguro</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-purple-500" /> 7 dias de garantia</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-center lg:items-stretch gap-8">
            <div className="relative w-full max-w-[420px] sm:max-w-md mx-auto h-[440px] sm:h-[480px]">
              {/* Visual Phone Mockup representing App value */}
              <div className="absolute left-0 bottom-2 w-[180px] sm:w-[210px] aspect-[9/16] bg-zinc-950 rounded-[38px] p-2.5 border-4 border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 transition hover:scale-105 duration-300">
                {/* Phone Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-zinc-800 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-zinc-900 rounded-full" />
                </div>

                {/* Inner screen content */}
                <div className="relative h-full w-full bg-[#0a0a10] rounded-[28px] overflow-hidden flex flex-col justify-between p-4 sm:p-5">
                  {/* Simulated Social Status Header */}
                  <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold tracking-wider pt-1">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[6px]">5G</span>
                      <div className="w-3 h-1.5 bg-emerald-500 rounded-sm" />
                    </div>
                  </div>

                  {/* Cover branding design */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl mb-3 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    
                    <span className="text-[9px] uppercase font-bold tracking-widest text-blue-400">Sistema Premium</span>
                    <h2 className="text-base sm:text-lg font-display font-black leading-tight mt-1 text-white">
                      MÉTODO<br />
                      CONTEÚDO<br />
                      <span className="text-blue-500 font-extrabold">INTELIGENTE</span>
                    </h2>
                    <p className="text-[9px] text-zinc-500 mt-2 max-w-[140px]">
                      20 Prompts Elite + Calendário 30 Dias + Estrutura Viral
                    </p>
                  </div>

                  {/* Quick Stats Mockup */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2 space-y-1">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-zinc-400">Resultados:</span>
                      <span className="text-emerald-400 font-bold">+241% alcance</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[85%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gorgeous Hardcover Ebook Mockup */}
              <div className="absolute right-0 top-2 w-[180px] sm:w-[210px] aspect-[3/4] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-20 border border-zinc-800/80 hover:scale-105 transition duration-300 bg-zinc-950">
                <img 
                  src={ebookCover} 
                  alt="E-book Método Conteúdo Inteligente" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 right-3 bg-indigo-600 text-white font-mono font-black text-[9px] tracking-widest uppercase px-2 py-1 rounded-md shadow-lg select-none">
                  E-BOOK OFICIAL
                </div>
              </div>

              {/* Glowing aura background on the side */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-full blur-2xl -z-10" />
            </div>

            {/* DYNAMIC SCARCITY COUNTDOWN & EXCLUSIVE BONUSES HIGHLIGHT */}
            <div className="bg-purple-950/15 border border-purple-500/30 p-5 rounded-3xl w-full max-w-md mx-auto space-y-4 shadow-[0_0_30px_rgba(147,51,234,0.08)] text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-black text-red-400 uppercase tracking-widest">Apenas poucas vagas restantes!</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                  <Clock className="w-4 h-4 text-purple-400 animate-pulse" />
                  Tempo restante da oferta: 
                  <span className="font-mono text-yellow-300 font-black text-sm bg-black/60 px-3 py-1 rounded-xl border border-purple-500/30 shadow-inner">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
              <div className="border-t border-purple-500/10 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-left space-y-1">
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest block w-fit">Incluso Hoje</span>
                  <p className="text-xs text-zinc-300 font-medium">
                    Método MCI + <span className="text-white font-extrabold underline decoration-purple-400">3 Bônus Gratuitos</span> <span className="text-purple-400 font-bold">(Biblioteca + Pack + Calendário)</span>
                  </p>
                </div>
                <span className="text-xs bg-emerald-500/15 text-emerald-400 font-mono font-extrabold px-3 py-1 rounded-xl border border-emerald-500/20 shadow">
                  70% DE DESCONTO ATIVO
                </span>
              </div>
            </div>
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
              <p className="text-zinc-400 text-sm leading-relaxed">Passa horas olhando para uma tela em branco pensando no que postar, procrastina e acaba não postando nada.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-none bg-zinc-900/40 relative overflow-hidden group hover:bg-zinc-900/60 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <Edit3 className="text-red-400 mb-5 w-9 h-9" />
              <h4 className="font-display font-bold text-lg mb-2 text-white">Legendas Frias</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Cria textos robóticos ou formais demais que não engajam, não retêm a atenção e não geram conexão real.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-none bg-zinc-900/40 relative overflow-hidden group hover:bg-zinc-900/60 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <HelpCircle className="text-red-400 mb-5 w-9 h-9" />
              <h4 className="font-display font-bold text-lg mb-2 text-white">Medo do ChatGPT</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Tenta usar IA mas recebe respostas genéricas, superficiais e com aquele típico tom "robótico" sem graça.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-none bg-zinc-900/40 relative overflow-hidden group hover:bg-zinc-900/60 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <TrendingUp className="text-red-400 mb-5 w-9 h-9" />
              <h4 className="font-display font-bold text-lg mb-2 text-white">Zero Clientes</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Até posta algumas dicas úteis, mas seu conteúdo não gera leads e ninguém te pergunta o preço do serviço no Direct.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES & WHAT'S INCLUDED SECTION - 8 POWER CORES FOR MASSIVE PERCEIVED VALUE */}
      <section id="como-funciona" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-500">A Solução Definitiva</span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold italic text-white">O Sistema Completo Que Você Vai Receber Hoje:</h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Esqueça materiais superficiais. O Método Conteúdo Inteligente é uma estrutura integrada e profissional de vendas que coloca o seu perfil em outro nível.
          </p>
          <div className="w-20 h-1 bg-purple-500/50 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Método Completo */}
          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block">✔ Método Completo</span>
            <h3 className="font-display font-extrabold text-base text-white">Manual do Funil de Alta Conversão</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              O exato passo a passo estratégico e psicológico para entender os desejos profundos do seu comprador e estruturar um perfil de alto valor.
            </p>
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-purple-400 font-mono">Incluso</span>
            </div>
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
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-emerald-400 font-mono font-bold">R$ 197,00 (Grátis)</span>
            </div>
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
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-emerald-400 font-mono font-bold">R$ 297,00 (Grátis)</span>
            </div>
          </div>

          {/* Pillar 4: Atualizações */}
          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
              <RefreshCw className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block">✔ Atualizações</span>
            <h3 className="font-display font-extrabold text-base text-white">Upgrade de Inteligência</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Acesso garantido a todos os novos prompts estratégicos, modificações e aditivos à área de membros sem pagar nada a mais.
            </p>
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-purple-400 font-mono">Incluso</span>
            </div>
          </div>

          {/* Pillar 5: Templates */}
          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
              <Layers className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block">✔ Templates</span>
            <h3 className="font-display font-extrabold text-base text-white">Modelos Prontos Escaneáveis</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Esqueça blocos maciços de texto. Entenda como formatar seus textos com quebra de linha visual para atrair cliques e segurar a leitura dos seguidores.
            </p>
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-purple-400 font-mono">Incluso</span>
            </div>
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
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-emerald-400 font-mono font-bold">R$ 147,00 (Grátis)</span>
            </div>
          </div>

          {/* Pillar 7: IA Pronta */}
          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block">✔ IA Pronta</span>
            <h3 className="font-display font-extrabold text-base text-white">Gerador Inteligente Integrado</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Sua máquina interna de conteúdo. Use o gerador interativo em nosso painel de forma 100% gratuita para criar ideias e rascunhos sem custo adicional.
            </p>
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-purple-400 font-mono">Incluso</span>
            </div>
          </div>

          {/* Pillar 8: Suporte */}
          <div className="glass-card p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/60 rounded-[24px] space-y-4 transition duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-bold uppercase text-[10px] tracking-widest text-purple-400 block">✔ Suporte VIP</span>
            <h3 className="font-display font-extrabold text-base text-white">Suporte ao Aluno Confiável</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Nunca fique com dúvidas. Canal exclusivo direto de suporte ao aluno na área de membros para analisar suas estratégias de conteúdo e acelerar suas conversões.
            </p>
            <div className="text-[10px] text-zinc-500 font-bold flex justify-between items-center pt-2 border-t border-zinc-900">
              <span>Valor individual:</span>
              <span className="text-purple-400 font-mono">Incluso</span>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED RESULTS & TESTIMONIALS */}
      <section id="depoimentos" className="py-24 bg-[#08080c] border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-500">Histórias Reais de Crescimento</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold italic text-white">Quem já usou o Método Conteúdo Inteligente aprovou:</h2>
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
                        ? "bg-purple-600 text-white shadow"
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
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30" 
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
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="border-t border-zinc-900 pt-4 mt-6 flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <span>Nicho: <strong className="text-zinc-400">{t.niche}</strong></span>
                  <span className="flex items-center gap-1 text-purple-500"><CheckCircle2 className="w-3.5 h-3.5" /> Aluno Verificado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSIVE BONUSES VISUAL SHOWCASE */}
      <section id="bonus-exclusivos" className="py-24 bg-gradient-to-b from-[#030306] via-[#0d091e] to-[#030306] border-y border-purple-900/30 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">
              🎁 Bônus Exclusivos Limitados
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white italic tracking-tight">
              Adquira Hoje e Ganhe <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent underline decoration-amber-400/50">3 Super Bônus</span> Gratuitos
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Multiplique seus resultados instantaneamente com este pacote adicional completo de recursos e facilitadores de velocidade.
            </p>
            <div className="w-20 h-1 bg-purple-500/40 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Beautiful 3D Bonus Stack Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-12">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4]">
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

                {/* Bonus 1: Biblioteca Premium de Prompts */}
                <div className="absolute left-[15%] top-0 w-[200px] sm:w-[240px] aspect-[3/4] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-20 border-2 border-purple-500/50 hover:scale-105 hover:border-purple-400 transition duration-300 bg-zinc-950 group cursor-pointer">
                  <img 
                    src={bonusOneCover} 
                    alt="Bônus 1 – Biblioteca Premium de Prompts" 
                    className="w-full h-full object-cover group-hover:opacity-90 transition"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[9px] font-extrabold bg-purple-600 text-white w-fit px-3 py-1 rounded-full mb-1.5 uppercase tracking-widest animate-pulse">BÔNUS 1 INCLUSO</span>
                    <h3 className="text-sm sm:text-base font-display font-black text-white leading-tight tracking-tight">Biblioteca Premium de Prompts</h3>
                    <p className="text-[10px] text-zinc-300 leading-normal mt-0.5">Ganchos e Modelos Virais</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bonus Listing with details */}
            <div className="lg:col-span-7 space-y-6">
              
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
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full">BÔNUS ESPECIAL 1</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">VALOR: <span className="line-through text-red-500/80">R$ 197</span></span>
                    </div>
                    <h3 className="text-lg font-display font-extrabold text-white">Biblioteca Premium de Prompts Virais</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Tenha em mãos o nosso cofre secreto com mais de 50 ganchos altamente viciantes que obrigam o usuário a parar o feed do Instagram e ler o seu conteúdo de forma hipnotizante.
                    </p>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4" /> INCLUSO GRATUITAMENTE NA SUA COMPRA
                    </div>
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
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">BÔNUS ESPECIAL 2</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">VALOR: <span className="line-through text-red-500/80">R$ 297</span></span>
                    </div>
                    <h3 className="text-lg font-display font-extrabold text-white">Pack Premium de Prompts de Alta Conversão</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Centenas de variações de prompts customizáveis estruturados com frameworks de vendas profissionais (como AIDA, PAS, e Storytelling) para treinar a IA a imitar copywriters de elite.
                    </p>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4" /> INCLUSO GRATUITAMENTE NA SUA COMPRA
                    </div>
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
                      <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full">BÔNUS ESPECIAL 3</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">VALOR: <span className="line-through text-red-500/80">R$ 147</span></span>
                    </div>
                    <h3 className="text-lg font-display font-extrabold text-white">Calendário Inteligente de 365 Dias</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Diga adeus ao desespero diário. Um cronograma estratégico anual que te diz exatamente o que postar, com qual objetivo e qual prompt do pack você deve usar a cada dia.
                    </p>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4" /> INCLUSO GRATUITAMENTE NA SUA COMPRA
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO AREA (THE MCI PAINEL IN ACTION) */}
      <section className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Experimente Grátis Agora Mesmo</span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold italic text-white">Toque Abaixo e Teste Nosso Gerador de Conteúdo MCI</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            O ChatGPT comum te entrega textos chatos. Nossa tecnologia integrada demonstra na prática o poder do método. Faça um teste real agora:
          </p>
          <div className="w-20 h-1 bg-blue-500/50 mx-auto rounded-full" />
        </div>

        {/* INTERACTIVE COMPONENT SLATE CARD */}
        <div className="bg-[#0b0b14] border border-zinc-800/80 rounded-[32px] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Tabs header */}
          <div className="flex border-b border-zinc-800/80 bg-zinc-950/50 p-2 sm:p-3 items-center justify-between">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveSubTab("library")}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${activeSubTab === "library" ? "bg-blue-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"}`}
              >
                <Layers className="w-4 h-4" />
                Criativos Prontos (Biblioteca)
              </button>
              <button 
                onClick={() => setActiveSubTab("ai-generator")}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${activeSubTab === "ai-generator" ? "bg-purple-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"}`}
              >
                <Sparkles className="w-4 h-4" />
                Gerador Estratégico com IA
              </button>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-zinc-500 font-black tracking-widest bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800/80">
              <Lock className="w-3 h-3 text-yellow-500" /> ACESSO PREMIUM ATIVO
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {activeSubTab === "library" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Criativos list */}
                <div className="lg:col-span-5 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">Selecione uma Estrutura Validada:</h4>
                  {readyToUseCreatives.map((creative) => (
                    <button
                      key={creative.id}
                      onClick={() => {
                        setSelectedCreativeId(creative.id);
                        setReelsPlaying(false);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition flex flex-col justify-between gap-1 group relative overflow-hidden cursor-pointer ${selectedCreativeId === creative.id ? "bg-blue-950/20 border-blue-500/50 shadow-md" : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700/60"}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-extrabold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded uppercase">{creative.format}</span>
                        <span className="text-[9px] text-zinc-500 font-mono">{creative.angle}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm group-hover:text-blue-400 transition mt-1">{creative.title}</h5>
                      <p className="text-[10px] text-zinc-400 line-clamp-1">{creative.hook}</p>
                    </button>
                  ))}

                  <div className="pt-4 border-t border-zinc-900">
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                      * Esta é apenas uma pequena amostra estratégica. Na área de membros completa, você terá acesso a centenas de estruturas organizadas por nichos específicos.
                    </p>
                  </div>
                </div>

                {/* Preview and script */}
                <div className="lg:col-span-7 bg-zinc-950/40 rounded-2xl p-6 border border-zinc-800/60 space-y-6">
                  {readyToUseCreatives.find(c => c.id === selectedCreativeId) ? (() => {
                    const activeCreative = readyToUseCreatives.find(c => c.id === selectedCreativeId)!;
                    return (
                      <>
                        <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
                          <div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{activeCreative.format} • {activeCreative.angle}</span>
                            <h4 className="font-display font-extrabold text-white text-base sm:text-lg leading-tight mt-0.5">{activeCreative.title}</h4>
                          </div>
                          
                          {/* Simulated play button */}
                          <button 
                            onClick={() => setReelsPlaying(!reelsPlaying)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${reelsPlaying ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"}`}
                          >
                            {reelsPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5 fill-red-400" />
                                Pausar Simulação
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-emerald-400" />
                                Assistir Enredo
                              </>
                            )}
                          </button>
                        </div>

                        {/* Script simulator container */}
                        <div className="relative bg-zinc-950/80 rounded-2xl border border-zinc-800/80 overflow-hidden min-h-[220px] flex flex-col justify-between">
                          {reelsPlaying ? (
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-zinc-500 font-bold uppercase tracking-wider">CENA {currentSceneIdx + 1} de {activeCreative.videoScript.length}</span>
                                  <span className="text-blue-400 animate-pulse font-mono flex items-center gap-1">● EM REPRODUÇÃO</span>
                                </div>
                                <div className="p-4 bg-blue-950/10 border border-blue-500/10 rounded-xl space-y-1.5">
                                  <span className="text-[9px] font-black bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md">VISUAL DA TELA:</span>
                                  <p className="text-xs text-blue-200 italic">"{activeCreative.videoScript[currentSceneIdx].visual}"</p>
                                </div>
                                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1.5">
                                  <span className="text-[9px] font-black bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md">ÁUDIO (O QUE FALAR):</span>
                                  <p className="text-sm font-bold text-white">"{activeCreative.videoScript[currentSceneIdx].audio}"</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pt-4">
                                <div className="h-1 bg-zinc-800 rounded-full flex-1 overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 transition-all duration-1000" 
                                    style={{ width: `${((currentSceneIdx + 1) / activeCreative.videoScript.length) * 100}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-mono text-zinc-500">{currentSceneIdx + 1}/{activeCreative.videoScript.length}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
                              <div className="w-12 h-12 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center text-blue-400 animate-bounce">
                                <Video className="w-6 h-6" />
                              </div>
                              <div className="space-y-1">
                                <h5 className="font-bold text-white text-sm">Visualizador de Reels Interativo</h5>
                                <p className="text-xs text-zinc-500 max-w-sm">Toque no botão "Assistir Enredo" para ver o roteiro simulado em cenas lógicas de 4 segundos.</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Copy tools */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-zinc-400">Texto Complementar de Legenda (Copy):</span>
                            <button
                              onClick={() => copyCreativePartToClipboard(activeCreative.id, "caption", activeCreative.textCopy)}
                              className="text-xs text-zinc-500 hover:text-white flex items-center gap-1"
                            >
                              {copiedCreativeId === activeCreative.id && copiedCreativePart === "caption" ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  Copiado!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  Copiar Legenda
                                </>
                              )}
                            </button>
                          </div>
                          <div className="p-4 bg-zinc-900/40 rounded-xl text-xs text-zinc-300 leading-relaxed border border-zinc-800/60 max-h-[140px] overflow-y-auto font-mono whitespace-pre-wrap">
                            {activeCreative.textCopy}
                          </div>
                        </div>
                      </>
                    );
                  })() : null}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* AI Inputs Form */}
                <form onSubmit={handleGenerate} className="lg:col-span-5 space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">Escolha o seu Nicho de atuação:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {popularNiches.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setNicheInput(n);
                            setErrorMsg("");
                          }}
                          className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition border ${nicheInput === n ? "bg-purple-950/30 border-purple-500/50 text-purple-200" : "bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:text-white"}`}
                        >
                          {n}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setNicheInput("Outro");
                          setErrorMsg("");
                        }}
                        className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition border ${nicheInput === "Outro" ? "bg-purple-950/30 border-purple-500/50 text-purple-200" : "bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:text-white"}`}
                      >
                        Outro nicho...
                      </button>
                    </div>
                  </div>

                  {nicheInput === "Outro" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-purple-400">Digite seu nicho personalizado:</label>
                      <input 
                        type="text" 
                        value={customNiche}
                        onChange={(e) => setCustomNiche(e.target.value)}
                        placeholder="Ex: Advogado Tributário, Lash Designer..."
                        className="w-full bg-zinc-950 rounded-xl px-4 py-3 text-sm text-white border border-zinc-800 focus:border-purple-500 focus:outline-none transition"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">Objetivo do Post Estratégico:</label>
                    <select
                      value={postObjective}
                      onChange={(e) => setPostObjective(e.target.value)}
                      className="w-full bg-zinc-950 rounded-xl px-4 py-3 text-sm text-white border border-zinc-800 focus:border-purple-500 focus:outline-none transition cursor-pointer"
                    >
                      <option value="Atrair novos seguidores e vender">Atrair novos seguidores e vender</option>
                      <option value="Quebrar objeção de preço e fechar agendamento">Quebrar objeção de preço e fechar agendamento</option>
                      <option value="Gerar curiosidade para Direct / WhatsApp">Gerar curiosidade para Direct / WhatsApp</option>
                      <option value="Gerar autoridade e conexão profunda">Gerar autoridade e conexão profunda</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">Público-Alvo Específico:</label>
                    <input 
                      type="text" 
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="Ex: mães ocupadas, empresários endividados..."
                      className="w-full bg-zinc-950 rounded-xl px-4 py-3 text-sm text-white border border-zinc-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Gerando seu Conteúdo MCI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        CRIAR POST CONVERSOR COM IA
                      </>
                    )}
                  </button>
                </form>

                {/* AI Output Result screen */}
                <div className="lg:col-span-7 bg-zinc-950/40 rounded-2xl p-6 border border-zinc-800/60 min-h-[350px] flex flex-col justify-between">
                  {isGenerating ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                        <Sparkles className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                      </div>
                      <div className="space-y-2 max-w-sm">
                        <h5 className="font-bold text-white text-base">O Copywriter Inteligente está trabalhando...</h5>
                        <p className="text-xs text-purple-400 font-medium italic animate-pulse">"{loadingSteps[generationStep]}"</p>
                      </div>
                    </div>
                  ) : generatedPost ? (
                    <div className="space-y-6 flex-1 flex flex-col justify-between">
                      {/* Post Heading niche */}
                      <div className="flex justify-between items-start pb-4 border-b border-zinc-900">
                        <div>
                          <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">MCI IA GENERATOR V2.0</span>
                          <h4 className="font-display font-extrabold text-white text-base sm:text-lg mt-1">Seu Conteúdo Inteligente Pronto!</h4>
                        </div>
                        <span className="text-[9px] text-zinc-500 font-mono">Processado em 1.8s</span>
                      </div>

                      {/* Display elements: Slider structure and caption */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                        
                        {/* Slide Deck preview */}
                        <div className="sm:col-span-5 space-y-3">
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Visual do Carrossel:</span>
                          <div className="aspect-square bg-gradient-to-br from-indigo-950/30 to-[#0c0c16] rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl" />
                            
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">SLIDE {generatedPost.carouselSlides[activeSlide].slide} de {generatedPost.carouselSlides.length}</span>
                              <Instagram className="w-3.5 h-3.5 text-zinc-600" />
                            </div>

                            <div className="space-y-2 my-2">
                              <h5 className="text-xs sm:text-sm font-display font-black text-white leading-tight tracking-tight">{generatedPost.carouselSlides[activeSlide].title}</h5>
                              <p className="text-[10px] text-zinc-300 leading-normal">{generatedPost.carouselSlides[activeSlide].text}</p>
                            </div>

                            <div className="flex justify-between items-center border-t border-zinc-900/50 pt-2 text-[8px] text-zinc-500 font-bold uppercase">
                              <span>👉 Deslize para o lado</span>
                              <span>{activeSlide + 1}/{generatedPost.carouselSlides.length}</span>
                            </div>
                          </div>

                          {/* Slide Select Buttons */}
                          <div className="flex gap-1 justify-center">
                            {generatedPost.carouselSlides.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveSlide(idx)}
                                className={`w-6 h-1.5 rounded-full transition ${activeSlide === idx ? "bg-purple-500" : "bg-zinc-800 hover:bg-zinc-700"}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Caption copy */}
                        <div className="sm:col-span-7 space-y-4">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Legenda do Instagram (Copy):</span>
                              <button
                                onClick={() => copyToClipboard(generatedPost.caption, "caption")}
                                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 cursor-pointer"
                              >
                                {copiedCaption ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    Copiar
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto">
                              {generatedPost.caption}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Hashtags Recomendadas:</span>
                              <button
                                onClick={() => copyToClipboard(generatedPost.hashtags, "hashtags")}
                                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 cursor-pointer"
                              >
                                {copiedHashtags ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    Copiar
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-purple-400 font-mono">
                              {generatedPost.hashtags}
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Call to action summary */}
                      <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-center text-xs text-purple-300">
                        🎉 Gostou da qualidade do texto? Garanta hoje o Método Completo por apenas <strong>R$ 29,90</strong> e receba os <strong>20 Prompts Elite Secretos</strong> que criam conteúdos 10 vezes mais persuasivos e adaptados ao seu nicho!
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                      <div className="w-12 h-12 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center text-zinc-500">
                        <Sparkles className="w-6 h-6 text-zinc-400" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-white text-sm">Seu conteúdo gerado estrategicamente por IA</h5>
                        <p className="text-xs text-zinc-500 max-w-sm">Insira os dados do seu negócio no formulário ao lado e clique em "Criar Post Conversor" para ver a engenharia de prompts gerar a mágica.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DOUBLE GUARANTEE & SECURITY SECTION */}
      <section id="oferta" className="py-24 max-w-5xl mx-auto px-6">
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[40px] p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Ambient vector details */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-4 border-yellow-400/20">
                <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-full" />
                <div className="text-center text-white">
                  <span className="font-mono text-3xl sm:text-4xl font-black block tracking-tight">7</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest block -mt-1">DIAS DE</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest block text-yellow-300">GARANTIA</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-5 text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Risco Zero Absoluto</span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight italic">
                Sua satisfação blindada ou 100% do seu dinheiro de volta
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Queremos que você tome essa decisão com total tranquilidade. Garantimos a qualidade do nosso material. Adquira o Método hoje, explore todo o nosso cronograma tático de 30 dias e execute os prompts. 
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Se você não notar uma melhora significativa na velocidade de criação ou achar que as legendas não parecem incrivelmente humanas, basta solicitar o reembolso na Kiwify em até 7 dias. Devolvemos cada centavo do seu investimento sem perguntas, sem burocracias e sem ressentimentos.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="py-24 max-w-4xl mx-auto px-6 border-t border-zinc-900/60">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-500">Dúvidas Frequentes</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold italic text-white">Tem alguma dúvida? Nós te ajudamos:</h2>
          <div className="w-20 h-1 bg-purple-500/50 mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div 
                key={item.id} 
                className="bg-zinc-950/60 border border-zinc-850 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 hover:bg-zinc-900/20 transition cursor-pointer"
                >
                  <h4 className="font-bold text-white text-sm sm:text-base">{item.question}</h4>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transition duration-300 ${isOpen ? "rotate-180 text-purple-400" : ""}`} />
                </button>
                
                {isOpen && (
                  <div className="p-5 sm:p-6 pt-0 border-t border-zinc-900/40 text-xs sm:text-sm text-zinc-400 leading-relaxed bg-zinc-950/30">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION / PURCHASE BOX */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-tr from-zinc-950 via-[#0d091e] to-zinc-950 border-2 border-purple-500/30 p-8 sm:p-12 md:p-16 rounded-[48px] relative overflow-hidden space-y-8 shadow-[0_0_80px_rgba(147,51,234,0.06)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-purple-400 block bg-purple-500/10 px-3.5 py-1.5 rounded-full w-fit mx-auto border border-purple-500/20">
              OFERTA ESPECIAL DE LANÇAMENTO
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black leading-none text-white italic tracking-tight">
              Comece a Criar Conteúdos Magnéticos Ainda Hoje
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Ganhe tempo livre, atraia seguidores altamente qualificados que desejam seus serviços e ative as vendas automáticas no Instagram através da IA.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-black/40 border border-zinc-850 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center text-xs text-zinc-500 font-bold uppercase">
              <span>Método Completo + 3 Bônus:</span>
              <span className="line-through text-red-500/80 font-mono text-sm">R$ 97,00</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-purple-400 font-extrabold uppercase tracking-wider bg-purple-500/10 px-2.5 py-1 rounded-lg">PROMOÇÃO EXCLUSIVA:</span>
              <div className="text-right">
                <span className="text-xs text-zinc-400 font-bold block">Apenas 1x de</span>
                <span className="text-4xl sm:text-5xl font-display font-black text-white font-mono tracking-tight">R$ 29,90</span>
              </div>
            </div>

            <div className="text-[10px] text-zinc-500 font-semibold border-t border-zinc-900 pt-3 text-left">
              * Pagamento único sem taxas ocultas ou cobranças recorrentes. Acesso vitalício imediato.
            </div>
          </div>

          <div className="space-y-4">
            {isPhotoMode ? (
              <div 
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-display font-extrabold text-lg py-5 px-12 rounded-2xl w-full max-w-md mx-auto text-center select-none shadow-xl shadow-purple-500/20"
                id="footer-buy-btn"
              >
                QUERO MEU ACESSO COM 70% OFF
              </div>
            ) : (
              <a 
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-extrabold text-lg py-5 px-12 rounded-2xl w-full max-w-md mx-auto inline-block shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition duration-300 text-center cursor-pointer uppercase tracking-wider"
                id="footer-buy-btn"
              >
                ⚡ QUERO MEU ACESSO COM 70% OFF
              </a>
            )}

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-zinc-500 font-semibold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Compra Garantida</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-500" /> Kiwify Segura</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-500" /> 7 dias de garantia</span>
            </div>
          </div>
        </div>
      </section>

      {/* ACCREDITATION & TRADEMARK FOOTER */}
      <footer className="border-t border-zinc-900 py-12 max-w-6xl mx-auto px-6 text-center space-y-6">
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-7 h-7 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/20">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-display font-black text-sm tracking-tight text-white uppercase">
            MÉTODO CONTEÚDO INTELIGENTE
          </span>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto text-[11px] text-zinc-600 leading-relaxed">
          <p>
            © {new Date().getFullYear()} Método Conteúdo Inteligente. Todos os direitos reservados.
          </p>
          <p>
            Este site não faz parte do site do Facebook, Instagram ou da Meta Platforms, Inc. Além disso, este site não é endossado pelo Facebook ou Instagram de qualquer forma. FACEBOOK e INSTAGRAM são marcas comerciais da META PLATFORMS, INC.
          </p>
          <p>
            Os resultados podem variar de pessoa para pessoa. Todas as informações fornecidas neste produto têm caráter educacional e prático para acelerar a produtividade, não sendo garantia implícita de faturamento sem esforço do aplicador.
          </p>
        </div>
      </footer>

      {/* PERSISTENT FLOATING BAR FOR ACTION SCARCITY */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/80 py-4 px-6 z-40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] max-w-7xl mx-auto rounded-t-3xl md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 self-center hidden xs:block shadow">
            <img src={ebookCover} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="text-left space-y-0.5">
            <span className="text-[10px] bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest">OFERTA ATIVA</span>
            <h5 className="text-xs sm:text-sm font-bold text-white">Método Completo + 3 Super Bônus</h5>
            <p className="text-[10px] text-zinc-400">Por apenas <span className="text-emerald-400 font-extrabold font-mono">1x R$ 29,90</span> sem taxas recorrentes.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-500/20">
            <Clock className="w-3.5 h-3.5 text-yellow-400 animate-pulse" /> Expira em {formatTime(timeLeft)}
          </span>
          
          {isPhotoMode ? (
            <div 
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-display font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl w-full sm:w-auto text-center select-none shadow shadow-purple-500/10 uppercase tracking-wider"
              id="floating-buy-btn"
            >
              Comprar Agora
            </div>
          ) : (
            <a 
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl w-full sm:w-auto inline-block shadow shadow-purple-500/15 hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition duration-300 text-center cursor-pointer uppercase tracking-wider"
              id="floating-buy-btn"
            >
              Comprar Agora
            </a>
          )}
        </div>
      </div>

      {/* FLOATING ADMIN/TEST CONFIGURATOR - REMOVED / HIDDEN FOR FINAL USER */}
      {!hideFloatingSelector && (
        <div className="fixed bottom-24 right-6 bg-zinc-950 border-2 border-purple-500/50 p-5 rounded-3xl shadow-2xl z-50 max-w-xs space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
            <span className="text-xs font-black text-purple-400 flex items-center gap-1.5"><Settings className="w-3.5 h-3.5 animate-spin" /> CONFIG LANDING PAGE</span>
            <button onClick={() => setHideFloatingSelector(true)} className="text-[10px] text-zinc-500 hover:text-white uppercase font-black">Fechar</button>
          </div>
          
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-zinc-500 uppercase block">Modo de Visualização:</span>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setIsPhotoMode(true)} 
                className={`flex-1 text-center py-2 rounded-lg text-[10px] font-black uppercase transition ${isPhotoMode ? "bg-purple-600 text-white" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              >
                📸 Foto (Ebook Estático)
              </button>
              <button 
                onClick={() => setIsPhotoMode(false)} 
                className={`flex-1 text-center py-2 rounded-lg text-[10px] font-black uppercase transition ${!isPhotoMode ? "bg-purple-600 text-white" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              >
                ⚡ Interativo (Original)
              </button>
            </div>
          </div>

          <form onSubmit={handleCheckoutSave} className="space-y-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase block">Checkout Integrado (Kiwify):</span>
            <input 
              type="text" 
              value={checkoutUrl}
              onChange={(e) => setCheckoutUrl(e.target.value)}
              placeholder="Link da Kiwify..."
              className="w-full bg-zinc-900 rounded-lg px-3 py-2 text-xs text-white border border-zinc-800 focus:border-purple-500 focus:outline-none transition"
            />
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg text-xs transition">Salvar Link Checkout</button>
          </form>
        </div>
      )}

      {/* DUMMY TRIGGER SELECTOR ICON IN BOTTOM CORNER - ABSOLUTELY HIDDEN */}
      <button 
        onClick={() => setHideFloatingSelector(!hideFloatingSelector)} 
        className="fixed bottom-24 right-6 w-9 h-9 bg-zinc-900/60 hover:bg-zinc-900 rounded-full border border-zinc-800/80 flex items-center justify-center text-zinc-500 hover:text-white transition z-50 opacity-0 hover:opacity-10 pointer-events-auto"
      >
        <Settings className="w-4 h-4" />
      </button>

    </div>
  );
}
