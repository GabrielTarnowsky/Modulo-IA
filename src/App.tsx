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
              Adquira Hoje e Ganhe <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent underline decoration-amber-400">3 Super Bônus Grátis</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Você não receberá apenas o método principal. Se inscrevendo agora, você ganha acesso imediato ao nosso arsenal completo de ferramentas de conversão acelerada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual covers mockup */}
            <div className="lg:col-span-5 flex justify-center relative mb-12 lg:mb-0">
              <div className="relative w-full max-w-[340px] aspect-[4/5] sm:max-w-[400px]">
                {/* Background glowing circle */}
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

                {/* Bonus 1: Biblioteca Premium de Prompts (Main / Front book cover) */}
                <div className="absolute left-[15%] top-0 w-[200px] sm:w-[240px] aspect-[3/4] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-20 border-2 border-purple-500/50 hover:scale-105 hover:border-purple-400 transition duration-300 bg-zinc-950 group cursor-pointer">
                  <img 
                    src={bonusOneCover} 
                    alt="Bônus 1 – Biblioteca Premium de Prompts" 
                    className="w-full h-full object-cover group-hover:opacity-90 transition"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[8px] font-extrabold bg-purple-500 text-white w-fit px-2.5 py-0.5 rounded-full mb-1 uppercase tracking-wider">BÔNUS 1 INCLUSO</span>
                    <h3 className="text-xs sm:text-sm font-display font-black text-white tracking-tight">Biblioteca Premium de Prompts</h3>
                    <p className="text-[9px] text-zinc-300 leading-normal mt-0.5">Ganchos, Copys e Linhas Editoriais</p>
                  </div>
                </div>

              </div>
            </div>

            {/* List and descriptions of the bonuses */}
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
                      <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1">🎁 Bônus 1 — 100% Grátis</span>
                      <span className="text-xs text-zinc-500 line-through">Valor Original: R$ 197</span>
                    </div>
                    <h3 className="text-lg font-display font-black text-white">Bônus 1 – Biblioteca Premium de Prompts</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Modelos de ganchos virais estruturados, copys de alto impacto e linhas editoriais magnéticas. Desenvolvido estrategicamente para forçar qualquer usuário a parar o scroll e consumir todo o seu conteúdo.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Acesso Vitalício Incluso na sua Área de Membros
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
                      <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1">🎁 Bônus 2 — 100% Grátis</span>
                      <span className="text-xs text-zinc-500 line-through">Valor Original: R$ 297</span>
                    </div>
                    <h3 className="text-lg font-display font-black text-white">Bônus 2 – Pack Premium de Prompts de Alta Conversão</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Esqueça respostas genéricas e robóticas do ChatGPT. Comandos refinados e profundos de nível agência que forçam as inteligências artificiais a adotarem um tom de voz incrivelmente humano, persuasivo e empático.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Gere posts e carrosséis completos em menos de 2 minutos
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
                      <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1">🎁 Bônus 3 — 100% Grátis</span>
                      <span className="text-xs text-zinc-500 line-through">Valor Original: R$ 147</span>
                    </div>
                    <h3 className="text-lg font-display font-black text-white">Bônus 3 – Calendário Inteligente de 365 Dias</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Sua dose diária de inspiração estratégica e produtividade infinita. Um cronograma completo anual com sugestões, intenção de funil de conteúdo e temas ideais para o seu nicho publicar o ano todo sem cansar.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Selecione ideias para qualquer dia do ano em segundos
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Link to CTA Offer */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900">
                <div>
                  <span className="text-zinc-500 text-[10px] sm:text-xs font-bold block uppercase">Valor total acumulado em bônus:</span>
                  <span className="text-red-400 line-through text-base sm:text-lg font-black">R$ 641,00 em Brindes</span>
                </div>
                {isPhotoMode ? (
                  <div className="bg-emerald-600 text-white font-display font-extrabold text-sm py-3.5 px-6 rounded-xl cursor-pointer">
                    GARANTIR OS BÔNUS GRATUITOS
                  </div>
                ) : (
                  <a 
                    href="#oferta" 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-display font-black text-sm py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 transition inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    🚀 GARANTIR OS BÔNUS GRATUITOS
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* THE PROMISE & GUARANTEE */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-b from-[#0e0e1a] to-zinc-950 border border-purple-500/20 rounded-[40px] p-8 sm:p-14 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          
          <div className="w-20 h-20 mx-auto bg-purple-600/10 rounded-full flex items-center justify-center border-2 border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.15)] animate-pulse">
            <ShieldCheck className="text-purple-500 w-10 h-10" />
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
          <div className="glass-card p-8 sm:p-12 lg:p-16 border-2 border-purple-600 rounded-[40px] shadow-[0_0_80px_rgba(147,51,234,0.15)] text-center relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl" />
            
            <span className="inline-block bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 animate-pulse">
              ⚡ Oferta Especial por Tempo Limitado
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-black mb-4 text-white tracking-tight">
              MÉTODO CONTEÚDO INTELIGENTE
            </h2>

            {/* COUNTDOWN TIMER IN THE FINAL OFFER CARD */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[20px] p-4 mb-6 max-w-md mx-auto flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block text-left">O desconto expira em:</span>
                <span className="text-xs font-extrabold text-red-400 block text-left">Última oportunidade disponível</span>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-center">
                  <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl px-2.5 py-1 text-base sm:text-lg font-mono font-black text-white">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <span className="text-[7px] text-zinc-500 font-bold uppercase mt-1">Minutos</span>
                </div>
                <div className="text-lg font-mono font-black text-purple-500 self-center -mt-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl px-2.5 py-1 text-base sm:text-lg font-mono font-black text-white">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <span className="text-[7px] text-zinc-500 font-bold uppercase mt-1">Segundos</span>
                </div>
              </div>
            </div>

            {/* DETAILED BONUSES CHECKLIST INSIDE FINAL OFFER CARD */}
            <div className="text-left bg-zinc-950/40 border border-zinc-900/80 rounded-3xl p-4 sm:p-5 mb-6 space-y-3.5">
              <h4 className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5">O QUE VOCÊ VAI RECEBER HOJE:</h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Acesso vitalício ao <strong>Método Conteúdo Inteligente</strong> <span className="text-zinc-500 text-[10px]">(R$ 97,00)</span></span>
                </li>
                <li className="flex items-start gap-2 text-xs text-purple-200">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Bônus 1 – Biblioteca Premium de Prompts</span>
                    <span className="text-zinc-500 text-[10px]">Modelos de ganchos virais e roteiros de cópia. <span className="text-emerald-400 font-bold font-mono">Grátis hoje</span></span>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-xs text-purple-200">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Bônus 2 – Pack Premium de Prompts de Alta Conversão</span>
                    <span className="text-zinc-500 text-[10px]">Comandos profissionais prontos para usar. <span className="text-emerald-400 font-bold font-mono">Grátis hoje</span></span>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-xs text-purple-200">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Bônus 3 – Calendário Inteligente de 365 Dias</span>
                    <span className="text-zinc-500 text-[10px]">Cronograma anual completo de ideias. <span className="text-emerald-400 font-bold font-mono">Grátis hoje</span></span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mb-6 space-y-2">
              <p className="text-zinc-500 line-through text-base sm:text-lg font-bold">De R$ 97,00</p>
              
              <div className="flex items-center justify-center">
                <span className="text-lg sm:text-xl text-zinc-400 font-medium mr-2">Apenas</span>
                <div className="text-5xl sm:text-7xl font-black text-white tracking-tighter">
                  R$ 29<span className="text-xl sm:text-2xl">,90</span>
                </div>
              </div>
              
              <p className="text-purple-400 font-black tracking-widest text-xs uppercase pt-2">
                Economize tempo e publique com consistência estratégica
              </p>
            </div>
            
            {isPhotoMode ? (
              <div 
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-5 px-8 rounded-2xl text-lg sm:text-xl font-display font-black w-full block shadow-xl shadow-purple-500/10 uppercase tracking-tight select-none"
                id="cta-final-purchase"
              >
                🚀 QUERO GARANTIR MINHA VAGA
              </div>
            ) : (
              <a 
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white py-5 px-8 rounded-2xl text-lg sm:text-xl font-display font-black w-full block shadow-xl shadow-purple-500/20 transform hover:-translate-y-0.5 hover:shadow-purple-500/30 transition-all uppercase tracking-tight cursor-pointer"
                id="cta-final-purchase"
              >
                🚀 QUERO GARANTIR MINHA VAGA
              </a>
            )}
            
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
          <span className="text-xs font-bold uppercase tracking-widest text-purple-500">Dúvidas Frequentes</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold italic">Ainda tem alguma dúvida? Perguntas frequentes:</h2>
          <div className="w-20 h-1 bg-purple-500/50 mx-auto rounded-full" />
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
                        openFaqId === item.id ? "rotate-180 text-purple-500" : ""
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
