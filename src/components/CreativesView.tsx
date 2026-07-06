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
  Pause, 
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
  Calendar,
  Smartphone,
  Image,
  CreditCard,
  Lightbulb,
  Layers,
  Video,
  RefreshCw
} from "lucide-react";
import { readyToUseCreatives } from "../creativesData";
import { GeneratedAdCreative } from "../types";

interface CreativesViewProps {
  checkoutUrl: string;
  setCurrentView: (view: "landing" | "checkout" | "creatives") => void;
}

export default function CreativesView({ checkoutUrl, setCurrentView }: CreativesViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<"library" | "ai-generator">("library");
  
  // Ad Creative Center States
  const [selectedCreativeId, setSelectedCreativeId] = useState<string>("creative-1");
  const [copiedCreativeId, setCopiedCreativeId] = useState<string | null>(null);
  const [copiedCreativePart, setCopiedCreativePart] = useState<string | null>(null);
  
  // Simulated Reels playback states
  const [reelsPlaying, setReelsPlaying] = useState(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [carouselSlideIdx, setCarouselSlideIdx] = useState(0);

  // Custom Dynamic Creative Generator States
  const [creativeProduct, setCreativeProduct] = useState("Método Conteúdo Inteligente");
  const [creativeFormat, setCreativeFormat] = useState("Vídeo Reels");
  const [creativeAngle, setCreativeAngle] = useState("Quebra de Objeção");
  const [creativeAudience, setCreativeAudience] = useState("Empreendedores, infoprodutores e profissionais liberais que querem vender mais no Instagram sem sofrer escrevendo posts");
  const [generatedAdCreative, setGeneratedAdCreative] = useState<GeneratedAdCreative | null>(null);
  const [isGeneratingAdCreative, setIsGeneratingAdCreative] = useState(false);
  const [adCreativeError, setAdCreativeError] = useState("");

  const activeCreative = activeSubTab === "library" 
    ? readyToUseCreatives.find(c => c.id === selectedCreativeId)
    : generatedAdCreative;

  // Simulated Reels script playback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (reelsPlaying && activeCreative?.videoScript) {
      const scriptLength = activeCreative.videoScript.length;
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
    setReelsPlaying(false);
    setCurrentSceneIdx(0);
    setCarouselSlideIdx(0);

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

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-fade-in" id="creatives-hub-root">
      
      {/* Subheader Banner */}
      <div className="relative rounded-[32px] border border-zinc-800/80 bg-zinc-950/40 p-8 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" /> Central de Criativos Oficial
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white leading-tight">
              Central de Criativos de <span className="text-blue-500">Alta Conversão</span>
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed font-light">
              Tenha acesso aos melhores roteiros, slides de carrossel e modelos prontos de anúncios que vendem o Método Conteúdo Inteligente diariamente ou gere variações ilimitadas para o seu produto usando o poder do Gemini.
            </p>
          </div>

          {/* Sub-tab Pill Switcher */}
          <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                setActiveSubTab("library");
                setReelsPlaying(false);
              }}
              className={`flex-1 md:flex-none px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                activeSubTab === "library"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Lightbulb className="w-4 h-4" /> Modelos de Elite
            </button>
            <button
              onClick={() => {
                setActiveSubTab("ai-generator");
                setReelsPlaying(false);
              }}
              className={`flex-1 md:flex-none px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                activeSubTab === "ai-generator"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Gerador com IA
            </button>
          </div>
        </div>
      </div>

      {/* VIEW SWITCH CONDITIONAL */}
      {activeSubTab === "library" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: SELECT TEMPLATE */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500 px-1">
                Selecione o Modelo de Anúncio
              </h3>
              
              <div className="space-y-3">
                {readyToUseCreatives.map((creative) => {
                  const isSelected = selectedCreativeId === creative.id;
                  return (
                    <button
                      key={creative.id}
                      onClick={() => {
                        setSelectedCreativeId(creative.id);
                        setCarouselSlideIdx(0);
                        setReelsPlaying(false);
                        setCurrentSceneIdx(0);
                      }}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 relative overflow-hidden ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-950/30 to-purple-950/10 border-blue-500 shadow-lg shadow-blue-500/5"
                          : "bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                      )}
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                          creative.format === "Vídeo Reels"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : creative.format === "Anúncio Carrossel"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {creative.format}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-medium font-mono">Oficial MCI</span>
                      </div>
                      
                      <h4 className="font-bold text-white text-xs sm:text-sm leading-snug">
                        {creative.title.replace("⚡ ", "").replace("🎨 ", "").replace("🍕 ", "")}
                      </h4>
                      
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                        <strong>Ângulo:</strong> {creative.angle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AD ANGLE CHEATSHEET */}
            <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-[28px] p-6 space-y-5">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" /> Ângulos Psicológicos
              </h4>
              
              <div className="space-y-4 text-xs">
                <div className="border-l-2 border-purple-500 pl-3 py-1.5 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">1. Quebra de Padrão Brutal</p>
                  <p className="text-zinc-400 leading-relaxed text-[11px] font-light">Inicie o anúncio com uma negação que gera curiosidade (ex: "Pare de escrever posts bonitinhos que ninguém lê").</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3 py-1.5 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">2. Ancoragem de Valor</p>
                  <p className="text-zinc-400 leading-relaxed text-[11px] font-light">Compare o valor do seu infoproduto com um gasto bobo do dia a dia (lanche, pizza) para tornar a oferta irresistível.</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-3 py-1.5 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">3. Dor Latente e Cansaço</p>
                  <p className="text-zinc-400 leading-relaxed text-[11px] font-light">Descreva a frustração de passar horas na tela em branco e postar sem receber nenhuma mensagem no Direct.</p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-3 py-1.5 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">4. Bastidores & Simplicidade</p>
                  <p className="text-zinc-400 leading-relaxed text-[11px] font-light">Mostre você mesmo abrindo a planilha ou gerando textos com IA em 10 segundos, provando a velocidade real.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT WORKSPACE: PREVIEW & ACTIONS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive Component Preview */}
            {activeCreative && (
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-[32px] p-6 sm:p-8 space-y-8">
                
                {/* Creative Detail Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">
                      Visualização Interativa
                    </span>
                    <h2 className="text-lg sm:text-xl font-display font-black text-white">
                      {activeCreative.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-600/10 text-blue-400 border border-blue-600/20 px-3 py-1 rounded-full font-bold">
                      Ângulo: {activeCreative.angle}
                    </span>
                  </div>
                </div>

                {/* INTERACTIVE MEDIA DEMO */}
                {activeCreative.format === "Vídeo Reels" && activeCreative.videoScript && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Smartphone Reels Preview Simulator */}
                    <div className="md:col-span-5 flex justify-center">
                      <div className="w-[240px] aspect-[9/16] bg-zinc-950 rounded-[40px] p-3 border-4 border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        
                        {/* Lens cut */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-800 rounded-full z-20 flex items-center justify-center">
                          <span className="w-2.5 h-2.5 bg-zinc-900 rounded-full border border-zinc-700/50" />
                        </div>

                        {/* Floating Reels info overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10 p-5 flex flex-col justify-between">
                          <div className="flex justify-between items-center text-[8px] text-zinc-400 font-bold pt-2">
                            <span>MCI Inteligente</span>
                            <span className="bg-red-500 text-white font-black px-1.5 py-0.5 rounded animate-pulse uppercase">GRAVANDO</span>
                          </div>

                          {/* Central Video Graphic Simulation */}
                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 pt-4">
                            <div className={`w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 transition-transform duration-500 ${
                              reelsPlaying ? "scale-110 bg-purple-500/10 text-purple-400 border-purple-500/20 animate-pulse" : ""
                            }`}>
                              {reelsPlaying ? (
                                <Video className="w-7 h-7" />
                              ) : (
                                <Play className="w-7 h-7 ml-1" />
                              )}
                            </div>

                            <div className="space-y-1.5 px-2">
                              <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-black font-mono">
                                Teleprompter
                              </span>
                              <p className="text-[10px] font-bold text-white leading-tight min-h-[50px] flex items-center justify-center">
                                {reelsPlaying 
                                  ? activeCreative.videoScript[currentSceneIdx]?.audio 
                                  : activeCreative.hook}
                              </p>
                              <span className="text-[8px] bg-zinc-900 text-blue-400 px-2.5 py-0.5 rounded-full inline-block font-mono">
                                {reelsPlaying 
                                  ? activeCreative.videoScript[currentSceneIdx]?.scene 
                                  : "Simulador Inativo"}
                              </span>
                            </div>
                          </div>

                          {/* Bottom user details mockup */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-black text-white">
                                MCI
                              </div>
                              <div className="text-[8px]">
                                <p className="font-bold text-white">@cesarogabriel</p>
                                <p className="text-zinc-400 text-[6px]">Método Conteúdo Inteligente</p>
                              </div>
                            </div>

                            {/* Simulated Progress Slider */}
                            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ 
                                  width: reelsPlaying 
                                    ? `${((currentSceneIdx + 1) / activeCreative.videoScript.length) * 100}%` 
                                    : "0%" 
                                }} 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Black Phone Screen Background */}
                        <div className="absolute inset-0 bg-[#07070a] -z-10" />
                      </div>
                    </div>

                    {/* Script Details & Play controls */}
                    <div className="md:col-span-7 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                          Roteiro Estruturado (Cena a Cena)
                        </h4>

                        <button
                          onClick={() => {
                            setReelsPlaying(!reelsPlaying);
                            if (!reelsPlaying) setCurrentSceneIdx(0);
                          }}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition ${
                            reelsPlaying
                              ? "bg-red-600 text-white animate-pulse"
                              : "bg-blue-600 hover:bg-blue-500 text-white"
                          }`}
                        >
                          {reelsPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" /> Parar Áudio
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" /> Dar Play e Gravar
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {activeCreative.videoScript.map((scene, idx) => {
                          const isActive = reelsPlaying && currentSceneIdx === idx;
                          return (
                            <div 
                              key={idx}
                              className={`p-4 rounded-xl border transition-all duration-300 relative ${
                                isActive
                                  ? "bg-blue-950/20 border-blue-500"
                                  : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-800"
                              }`}
                            >
                              {isActive && (
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-3/4 bg-blue-500 rounded-r" />
                              )}
                              <div className="flex justify-between items-center mb-1.5">
                                <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? "text-blue-400" : "text-zinc-500"}`}>
                                  {scene.scene}
                                </span>
                                <button
                                  onClick={() => copyCreativePartToClipboard(activeCreative.id, `scene-fala-${idx}`, scene.audio)}
                                  className="text-zinc-500 hover:text-white transition cursor-pointer"
                                  title="Copiar Fala desta Cena"
                                >
                                  {copiedCreativeId === activeCreative.id && copiedCreativePart === `scene-fala-${idx}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400 animate-scale-up" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              <p className="text-[11px] text-zinc-400 mb-2 leading-relaxed font-light">
                                <strong className="text-zinc-300 font-bold">Câmera:</strong> {scene.action}
                              </p>
                              <p className={`text-[11px] font-mono leading-relaxed p-2.5 rounded-lg font-medium ${
                                isActive ? "bg-blue-950/40 text-blue-100" : "bg-zinc-950/50 text-zinc-300"
                              }`}>
                                🗣️ "{scene.audio}"
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

                {/* INTERACTIVE CAROUSEL PREVIEW */}
                {activeCreative.format === "Anúncio Carrossel" && activeCreative.carouselSlides && (
                  <div className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      
                      {/* Left Deck Slider Representation */}
                      <div className="md:col-span-6 flex flex-col items-center">
                        
                        {/* Instagram-style Card Frame */}
                        <div className="w-full aspect-square max-w-[320px] bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                          
                          {/* Branding top */}
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            <span>MCI @cesarogabriel</span>
                            <span className="bg-blue-500 text-white font-mono font-black px-2 py-0.5 rounded text-[9px]">
                              SLIDE {carouselSlideIdx + 1}/4
                            </span>
                          </div>

                          {/* Card Middle Typography */}
                          <div className="space-y-4 py-4 text-center">
                            <h3 className="text-xl sm:text-2xl font-display font-black leading-tight text-white tracking-tight uppercase">
                              {activeCreative.carouselSlides[carouselSlideIdx]?.title}
                            </h3>
                            <p className="text-xs sm:text-sm font-medium text-blue-400 leading-relaxed max-w-xs mx-auto">
                              {activeCreative.carouselSlides[carouselSlideIdx]?.text}
                            </p>
                          </div>

                          {/* Slide footer indicators */}
                          <div className="flex justify-between items-center border-t border-zinc-900 pt-4">
                            <div className="flex gap-1">
                              {activeCreative.carouselSlides.map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`h-1 rounded-full transition-all duration-300 ${
                                    carouselSlideIdx === i ? "w-4 bg-blue-500" : "w-1.5 bg-zinc-800"
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1">
                              Arrastar <ArrowRight className="w-3 h-3 text-blue-400" />
                            </span>
                          </div>

                          {/* Subtle radial gradients */}
                          <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
                        </div>

                        {/* Deck controls */}
                        <div className="flex items-center gap-4 mt-5">
                          <button
                            onClick={() => setCarouselSlideIdx(prev => Math.max(0, prev - 1))}
                            disabled={carouselSlideIdx === 0}
                            className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white disabled:opacity-40 cursor-pointer hover:bg-zinc-800 transition"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-bold text-zinc-400 uppercase font-mono">
                            Slide {carouselSlideIdx + 1} de {activeCreative.carouselSlides.length}
                          </span>
                          <button
                            onClick={() => setCarouselSlideIdx(prev => Math.min(activeCreative.carouselSlides!.length - 1, prev + 1))}
                            disabled={carouselSlideIdx === activeCreative.carouselSlides.length - 1}
                            className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white disabled:opacity-40 cursor-pointer hover:bg-zinc-800 transition"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                      {/* Slide Canva Details */}
                      <div className="md:col-span-6 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                          Diretrizes para Produzir no Canva
                        </h4>

                        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-blue-400 block font-mono">Texto Principal</span>
                            <p className="text-xs font-mono p-3 bg-zinc-950 rounded-xl border border-zinc-900 font-bold text-white">
                              "{activeCreative.carouselSlides[carouselSlideIdx]?.title}"
                            </p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-zinc-500 block">Texto de Apoio</span>
                            <p className="text-xs text-zinc-300 font-medium">
                              {activeCreative.carouselSlides[carouselSlideIdx]?.text}
                            </p>
                          </div>

                          <div className="border-t border-zinc-800/80 pt-4 space-y-1.5">
                            <span className="text-[10px] font-black uppercase text-zinc-500 block">Dica de Design</span>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                              Use fundo escuro profundo com fontes sem serifa pesadas (estilo Inter ou Montserrat) em tamanho gigante. Pinte as palavras principais em amarelo néon ou azul elétrico para saltar nos olhos do feed.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* STORIES / ESTATICO FORMAT MOCKUP */}
                {activeCreative.format === "Anúncio Estático / Stories" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Stories smartphone outline */}
                    <div className="md:col-span-5 flex justify-center">
                      <div className="w-[240px] aspect-[9/16] bg-zinc-950 rounded-[40px] p-3 border-4 border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        
                        <div className="absolute top-2.5 left-5 right-5 h-0.5 grid grid-cols-3 gap-1 z-20">
                          <div className="bg-white rounded-full h-full" />
                          <div className="bg-white/40 rounded-full h-full" />
                          <div className="bg-white/40 rounded-full h-full" />
                        </div>

                        {/* Main story graphical mockup */}
                        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between text-center pt-8">
                          
                          <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold">
                            <span>MCI @cesarogabriel</span>
                            <span className="text-blue-400 font-mono">Patrocinado</span>
                          </div>

                          {/* Anchoring Card content */}
                          <div className="space-y-4 my-auto">
                            <span className="bg-blue-500 text-white text-[7px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block">
                              Linha de Conteúdo Viral
                            </span>
                            
                            <div className="space-y-2 text-left">
                              {/* Item A */}
                              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
                                <span className="text-base shrink-0">🍕</span>
                                <div className="text-[9px]">
                                  <p className="font-bold text-white">Pizza de Fim de Semana</p>
                                  <p className="text-zinc-500">R$ 50,00 (Dura 20 minutos)</p>
                                </div>
                              </div>

                              {/* Item B */}
                              <div className="bg-emerald-500/10 border-2 border-emerald-500 rounded-xl p-3 flex items-center gap-2">
                                <span className="text-base shrink-0">⚡</span>
                                <div className="text-[9px]">
                                  <p className="font-bold text-emerald-400">Método Conteúdo Inteligente</p>
                                  <p className="text-emerald-300">R$ 29,90 (Dura a vida inteira)</p>
                                </div>
                              </div>
                            </div>

                            <p className="text-[9px] text-zinc-400 font-light leading-relaxed max-w-[170px] mx-auto">
                              "Você passa horas pensando no que postar? Invista menos que o preço de uma pizza e tenha um estoque infinito de posts."
                            </p>
                          </div>

                          {/* Story link sticker */}
                          <div className="space-y-3">
                            <a 
                              href={checkoutUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-11/12 mx-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-[8px] py-2 px-3 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1 tracking-widest uppercase cursor-pointer"
                            >
                              <Zap className="w-2.5 h-2.5 text-white animate-bounce" /> Acesso Imediato R$ 29
                            </a>
                            <span className="text-[6px] text-zinc-600 font-bold tracking-widest uppercase block">
                              Arraste para cima para garantir
                            </span>
                          </div>

                        </div>

                        {/* Black Phone Screen Background */}
                        <div className="absolute inset-0 bg-[#07070a] -z-10" />
                      </div>
                    </div>

                    {/* Anchoring Strategy Details */}
                    <div className="md:col-span-7 space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                        A Estratégia do Comparativo Irracional
                      </h4>
                      <p className="text-zinc-300 text-xs leading-relaxed font-light">
                        A melhor maneira de quebrar a objeção de preço é a **ancoragem de preço**. Ao comparar o custo de R$ 29,90 (pagamento único) com gastos fúteis cotidianos (uma pizza, um café gourmet, um lanche de delivery), o investimento se torna insignificante e o valor percebido sobe instantaneamente.
                      </p>
                      <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-zinc-400 text-xs space-y-2">
                        <p>🌟 <strong className="text-white">Quando usar:</strong> Ideal para campanhas de remarketing (público morno que já visitou a página mas não comprou) ou anúncios frios de conversão rápida.</p>
                        <p>📸 <strong className="text-white">Dica de Imagem:</strong> Tire uma foto com o celular mostrando o seu e-book aberto ao lado de uma xícara de café estilosa e coloque os balões de preço em cima com texto limpo.</p>
                      </div>
                    </div>

                  </div>
                )}

                {/* COPY-PASTEABLE CAPTION (LEGENDA) BOX */}
                <div className="border-t border-zinc-800/80 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-500" /> Legenda do Anúncio (Instagram Caption)
                    </span>

                    <button
                      onClick={() => copyCreativePartToClipboard(activeCreative.id, "legend", activeCreative.caption)}
                      className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-zinc-800 transition"
                    >
                      {copiedCreativeId === activeCreative.id && copiedCreativePart === "legend" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" /> Copiar Legenda
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 bg-zinc-950/75 border border-zinc-900 rounded-2xl text-xs sm:text-sm text-zinc-300 leading-relaxed font-light font-sans max-h-[250px] overflow-y-auto whitespace-pre-wrap select-text selection:bg-blue-500/30 selection:text-white">
                    {activeCreative.caption}
                  </div>
                </div>

                {/* PRODUCTION TIPS BLOCK */}
                <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-black uppercase text-white tracking-wider">
                      Dica de Tráfego & Produção de Elite
                    </h5>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {activeCreative.productionTips}
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: AI PARAMETERS FORM */}
          <div className="lg:col-span-5 bg-zinc-900/30 border border-zinc-800 rounded-[32px] p-6 sm:p-8 space-y-6">
            
            <div className="space-y-1.5 border-b border-zinc-800/80 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> IA de Copywriting Ativa
              </span>
              <h3 className="text-lg font-display font-black text-white">
                Configurar Gerador de Criativos
              </h3>
              <p className="text-zinc-500 text-xs font-light">
                Use o modelo Gemini 3.5 para arquitetar roteiros de anúncios, carrosséis ou imagens específicas para seu produto.
              </p>
            </div>

            <form onSubmit={handleGenerateCreative} className="space-y-5">
              {/* Nome do Produto */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Nome do seu Produto / Oferta
                </label>
                <input
                  type="text"
                  value={creativeProduct}
                  onChange={(e) => setCreativeProduct(e.target.value)}
                  placeholder="Ex: Método Conteúdo Inteligente"
                  className="w-full rounded-xl px-4 py-3 text-xs bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Formato */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Formato do Anúncio
                </label>
                <select
                  value={creativeFormat}
                  onChange={(e) => setCreativeFormat(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-xs bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer font-bold"
                >
                  <option value="Vídeo Reels">Vídeo Reels (Roteiro em 4 Cenas)</option>
                  <option value="Anúncio Carrossel">Anúncio Carrossel (Slides para o Canva)</option>
                  <option value="Anúncio Estático / Stories">Anúncio Estático / Stories (Imagem Única)</option>
                </select>
              </div>

              {/* Ângulo de Venda */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Ângulo Persuasivo de Cópia
                </label>
                <select
                  value={creativeAngle}
                  onChange={(e) => setCreativeAngle(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-xs bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer font-bold"
                >
                  <option value="Quebra de Objeção">Quebra de Objeção Prática</option>
                  <option value="Quebra de Padrão & Dor">Quebra de Padrão Brutal & Dor</option>
                  <option value="Ancoragem de Valor">Ancoragem de Preço Irracional</option>
                  <option value="História de Superação / Bastidores">História de Superação & Bastidores</option>
                  <option value="Prova Social e Impacto">Prova Social & Validação de Alunos</option>
                </select>
              </div>

              {/* Público-Alvo */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Descreva seu Público-Alvo (Dores e Medos)
                </label>
                <textarea
                  value={creativeAudience}
                  onChange={(e) => setCreativeAudience(e.target.value)}
                  rows={4}
                  placeholder="Ex: Empreendedores, infoprodutores e profissionais liberais que passam horas escrevendo posts e não vendem nada."
                  className="w-full rounded-xl p-4 text-xs bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-blue-500 transition-colors font-light leading-relaxed resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGeneratingAdCreative}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-display font-black py-4 px-6 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-blue-500/10 disabled:opacity-50"
              >
                {isGeneratingAdCreative ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Gerando com Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Criar Roteiro Personalizado
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: AI GENERATOR PREVIEW */}
          <div className="lg:col-span-7">
            {isGeneratingAdCreative ? (
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-[32px] p-12 text-center flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] -z-10 animate-pulse" />
                
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Sparkles className="w-9 h-9 text-blue-400 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-spin" />
                </div>

                <h4 className="font-display font-black text-white text-base uppercase tracking-wider mb-2">
                  Gemini está escrevendo seu anúncio
                </h4>
                <p className="text-zinc-500 text-xs max-w-sm leading-relaxed mb-6 font-light">
                  Nossa inteligência artificial de resposta direta está usando neuromarketing para formatar ganchos, cenas e legendas escaneáveis de alta conversão...
                </p>

                {/* Automated ticker simulation */}
                <div className="w-64 h-1.5 bg-zinc-950 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-blue-500 animate-infinite-loading" />
                </div>
                <span className="text-[10px] text-blue-400 font-mono font-black uppercase tracking-wider animate-pulse">
                  Escrevendo Linhas de Copy...
                </span>
              </div>
            ) : generatedAdCreative ? (
              <div className="bg-zinc-900/30 border-2 border-purple-500/30 rounded-[32px] p-6 sm:p-8 space-y-8 animate-fade-in">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest">
                        Gerado com Sucesso!
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-display font-black text-white">
                      {generatedAdCreative.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full font-bold">
                      {generatedAdCreative.format}
                    </span>
                  </div>
                </div>

                {/* Interactive Simulator area */}
                {generatedAdCreative.format === "Vídeo Reels" && generatedAdCreative.videoScript && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Smartphone Reels Simulator */}
                    <div className="md:col-span-5 flex justify-center">
                      <div className="w-[220px] aspect-[9/16] bg-zinc-950 rounded-[40px] p-3 border-4 border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-800 rounded-full z-20 flex items-center justify-center" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 p-5 flex flex-col justify-between">
                          <div className="flex justify-between items-center text-[7px] text-zinc-500 font-bold pt-2">
                            <span>MCI Personalizado</span>
                            <span className="bg-blue-500 text-white font-black px-1.5 py-0.5 rounded uppercase">PRONTO</span>
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                              {reelsPlaying ? (
                                <Video className="w-6 h-6 animate-pulse" />
                              ) : (
                                <Play className="w-6 h-6 ml-1" />
                              )}
                            </div>

                            <div className="space-y-1 px-1">
                              <span className="text-[6px] text-zinc-500 uppercase tracking-widest font-black font-mono">
                                Teleprompter
                              </span>
                              <p className="text-[9px] font-bold text-white leading-tight min-h-[40px] flex items-center justify-center">
                                {reelsPlaying 
                                  ? generatedAdCreative.videoScript[currentSceneIdx]?.audio 
                                  : generatedAdCreative.hook}
                              </p>
                              <span className="text-[7px] bg-zinc-900 text-purple-400 px-1.5 py-0.5 rounded-full inline-block font-mono">
                                {reelsPlaying 
                                  ? generatedAdCreative.videoScript[currentSceneIdx]?.scene 
                                  : "Simulador Inativo"}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-[6px] font-black text-white">
                                AI
                              </div>
                              <div className="text-[7px]">
                                <p className="font-bold text-white">Criativo Gerado</p>
                                <p className="text-zinc-500 text-[5px] truncate max-w-[100px]">{creativeProduct}</p>
                              </div>
                            </div>

                            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 transition-all duration-300"
                                style={{ 
                                  width: reelsPlaying 
                                    ? `${((currentSceneIdx + 1) / generatedAdCreative.videoScript.length) * 100}%` 
                                    : "0%" 
                                }} 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-[#07070a] -z-10" />
                      </div>
                    </div>

                    {/* Interactive scenes list */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                          Roteiro do Vídeo Gerado
                        </h4>

                        <button
                          onClick={() => {
                            setReelsPlaying(!reelsPlaying);
                            if (!reelsPlaying) setCurrentSceneIdx(0);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition ${
                            reelsPlaying
                              ? "bg-red-600 text-white"
                              : "bg-purple-600 hover:bg-purple-500 text-white"
                          }`}
                        >
                          {reelsPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          {reelsPlaying ? "Pausar" : "Simular Vídeo"}
                        </button>
                      </div>

                      <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                        {generatedAdCreative.videoScript.map((scene, idx) => {
                          const isActive = reelsPlaying && currentSceneIdx === idx;
                          return (
                            <div 
                              key={idx}
                              className={`p-3 rounded-xl border text-xs transition-all duration-300 relative ${
                                isActive
                                  ? "bg-purple-950/25 border-purple-500/80"
                                  : "bg-zinc-950/40 border-zinc-900"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[8px] font-mono font-black uppercase text-purple-400">
                                  {scene.scene}
                                </span>
                                <button
                                  onClick={() => copyCreativePartToClipboard(generatedAdCreative.title, `ai-scene-${idx}`, scene.audio)}
                                  className="text-zinc-500 hover:text-white transition cursor-pointer"
                                >
                                  {copiedCreativeId === generatedAdCreative.title && copiedCreativePart === `ai-scene-${idx}` ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                              <p className="text-[10px] text-zinc-400 mb-1 leading-relaxed"><strong>Câmera:</strong> {scene.action}</p>
                              <p className="text-[10px] font-mono p-2 bg-zinc-950 rounded border border-zinc-900 text-zinc-300 leading-relaxed">
                                🗣️ "{scene.audio}"
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

                {/* Interactive Carousel */}
                {generatedAdCreative.format === "Anúncio Carrossel" && generatedAdCreative.carouselSlides && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Slide Card preview */}
                    <div className="md:col-span-6 flex flex-col items-center">
                      <div className="w-full aspect-square max-w-[280px] bg-zinc-950 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden">
                        
                        <div className="flex justify-between text-[8px] font-black uppercase text-zinc-500">
                          <span>MCI IA CARROSSEL</span>
                          <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded font-mono">
                            {carouselSlideIdx + 1}/{generatedAdCreative.carouselSlides.length}
                          </span>
                        </div>

                        <div className="space-y-3 text-center py-4">
                          <h3 className="text-lg font-display font-black text-white leading-tight uppercase">
                            {generatedAdCreative.carouselSlides[carouselSlideIdx]?.title}
                          </h3>
                          <p className="text-xs font-semibold text-blue-400 max-w-[200px] mx-auto leading-relaxed">
                            {generatedAdCreative.carouselSlides[carouselSlideIdx]?.text}
                          </p>
                        </div>

                        <div className="flex justify-between items-center text-[8px] border-t border-zinc-900 pt-3 text-zinc-500 font-bold">
                          <div className="flex gap-1">
                            {generatedAdCreative.carouselSlides.map((_, i) => (
                              <div 
                                key={i} 
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  carouselSlideIdx === i ? "w-3 bg-blue-500" : "w-1 bg-zinc-800"
                                }`} 
                              />
                            ))}
                          </div>
                          <span>Arrastar</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => setCarouselSlideIdx(prev => Math.max(0, prev - 1))}
                          disabled={carouselSlideIdx === 0}
                          className="p-2 rounded-full bg-zinc-950 border border-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-900 transition"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] font-bold uppercase font-mono text-zinc-500">
                          Slide {carouselSlideIdx + 1} de {generatedAdCreative.carouselSlides.length}
                        </span>
                        <button
                          onClick={() => setCarouselSlideIdx(prev => Math.min(generatedAdCreative.carouselSlides!.length - 1, prev + 1))}
                          disabled={carouselSlideIdx === generatedAdCreative.carouselSlides.length - 1}
                          className="p-2 rounded-full bg-zinc-950 border border-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-900 transition"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Canva suggestions right */}
                    <div className="md:col-span-6 space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-zinc-400">
                        Detalhes do Slide {carouselSlideIdx + 1}
                      </h4>

                      <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900 space-y-3 text-xs">
                        <div>
                          <span className="text-[8px] font-black uppercase text-blue-400 block mb-0.5">Texto do Slide</span>
                          <p className="font-bold font-mono text-white p-2.5 bg-zinc-950 rounded border border-zinc-900 leading-relaxed">
                            "{generatedAdCreative.carouselSlides[carouselSlideIdx]?.title}"
                          </p>
                        </div>
                        <div>
                          <span className="text-[8px] font-black uppercase text-zinc-500 block mb-0.5">Texto de Apoio</span>
                          <p className="text-zinc-400 leading-relaxed font-light">
                            {generatedAdCreative.carouselSlides[carouselSlideIdx]?.text}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Static / Stories Format */}
                {generatedAdCreative.format === "Anúncio Estático / Stories" && (
                  <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Image className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Sugestão de Gancho para Imagem</h4>
                      <p className="text-zinc-300 font-mono italic p-2 bg-zinc-950 rounded border border-zinc-900 mt-1 leading-relaxed">
                        🗣️ "{generatedAdCreative.hook}"
                      </p>
                      <p className="text-zinc-500 text-[11px] leading-relaxed pt-1 font-light">
                        Utilize este gancho escrito em fonte grande com alto contraste sobre uma foto de bastidor profissional ou no formato caixa de pergunta do Instagram.
                      </p>
                    </div>
                  </div>
                )}

                {/* Caption Legenda */}
                <div className="border-t border-zinc-800/80 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                      Legenda do Anúncio Gerada
                    </span>

                    <button
                      onClick={() => copyCreativePartToClipboard(generatedAdCreative.title, "ai-caption", generatedAdCreative.caption)}
                      className="px-4 py-2 bg-zinc-950 border border-zinc-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-zinc-900 transition"
                    >
                      {copiedCreativeId === generatedAdCreative.title && copiedCreativePart === "ai-caption" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" /> Copiar Legenda
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 bg-zinc-950/75 border border-zinc-900 rounded-2xl text-xs sm:text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-wrap max-h-[220px] overflow-y-auto">
                    {generatedAdCreative.caption}
                  </div>
                </div>

                {/* Production Tips */}
                <div className="bg-purple-600/5 border border-purple-500/20 rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-lg">💡</span>
                  <div className="space-y-0.5 text-xs">
                    <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Dicas Práticas de Gravação / Arte</h5>
                    <p className="text-zinc-400 leading-relaxed text-[11px] font-light">
                      {generatedAdCreative.productionTips}
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-[32px] p-12 text-center flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/5 rounded-full blur-[90px] -z-10" />
                
                <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800/80 flex items-center justify-center text-zinc-500 mb-5 shadow-inner">
                  <Lightbulb className="w-7 h-7" />
                </div>

                <h4 className="font-display font-black text-white text-base uppercase tracking-wider mb-2">
                  Nenhum Criativo Gerado Ainda
                </h4>
                
                <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-sm leading-relaxed mb-6">
                  Preencha os dados do seu produto no formulário ao lado, selecione o formato e o ângulo desejado, e clique em <strong>Criar Roteiro Personalizado</strong> para que o Gemini elabore sua campanha!
                </p>

                <div className="flex flex-wrap justify-center gap-3 text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                  <span className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-900 font-mono">⚡ Conversão Direta</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-900 font-mono">🧠 Estruturas AIDA/PAS</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-900 font-mono">🚀 Tráfego Pago</span>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </main>
  );
}
