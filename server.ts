import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API endpoint for content generation
app.post("/api/generate", async (req, res) => {
  try {
    const { niche, tone, targetAudience, objective } = req.body;

    if (!niche) {
      return res.status(400).json({ error: "O nicho é obrigatório." });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY não foi configurada. Configure sua chave nos Segredos da AI Studio." 
      });
    }

    const postTone = tone || "Profissional e Persuasivo";
    const audience = targetAudience || "Pessoas interessadas em melhorar seus resultados";
    const postObjective = objective || "Atrair e Converter em Clientes";

    const systemInstruction = `Você é a inteligência artificial especialista do "Método Conteúdo Inteligente". Seu papel é criar conteúdos estratégicos de altíssima conversão e potencial viral para o Instagram de profissionais e negócios.

Diretrizes obrigatórias de Copywriting:
1. GANCHOS PODEROSOS: O título principal (hook) deve ser extremamente curto, magnético e quebrar padrões. Use ganchos de curiosidade, de dor intensa ou de quebra de objeção comuns no nicho selecionado.
2. CARROSSEL DE ALTO RETORNO: Planeje uma sequência dinâmica de 4 slides. Cada slide precisa dar um passo prático e lógico, mantendo o leitor rolando.
3. LEGENDA PERSUASIVA (Humana e direta): Escreva em formato escaneável (parágrafos de no máximo 2 linhas). Use quebras de linha frequentes e emojis pontuais. Evite palavras corporativas clichês. O final precisa conter uma Chamada para Ação (CTA) clara direcionando para o direct ou link da bio.
4. TONALIDADE EXATA: Siga estritamente o tom solicitado: ${postTone}.
5. SEM ALERTA DE IA: Escreva exatamente como um copywriter de R$ 10k/mês escreveria.`;

    const userPrompt = `Gere uma publicação do Método Conteúdo Inteligente com estes detalhes:
- Nicho: ${niche}
- Público-Alvo: ${audience}
- Objetivo do Post: ${postObjective}
- Tom de Voz: ${postTone}

Você deve gerar um JSON estruturado com exatamente estas chaves:
1. "hook": O título principal de forte impacto para a imagem/slide 1 (máx 60 caracteres).
2. "caption": A legenda completa para o post, formatada com emojis e parágrafos curtos, terminando com uma CTA persuasiva alinhada ao objetivo.
3. "carousel": Uma array contendo 4 slides estruturados com "slideNumber", "title" (título curto do slide, máx 35 caracteres) e "description" (explicação direta, máx 90 caracteres).
4. "hashtags": Uma array com 5 hashtags estrategicamente escolhidas para o nicho.
5. "promptUsed": Um texto explicativo ensinando ao usuário a lógica de prompt avançada que foi aplicada neste resultado, provando o valor educacional do método.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hook: {
              type: Type.STRING,
              description: "A super strong Instagram post hook title (max 60 chars)"
            },
            caption: {
              type: Type.STRING,
              description: "Persuasive caption formatted with emojis, clear line breaks, and an engaging Call to Action"
            },
            carousel: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  slideNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: "Short slide title (max 35 chars)" },
                  description: { type: Type.STRING, description: "Short slide body text (max 90 chars)" }
                },
                required: ["slideNumber", "title", "description"]
              },
              description: "Step-by-step slides for an Instagram Carousel (exactly 4 slides)"
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 highly relevant and strategic hashtags"
            },
            promptUsed: {
              type: Type.STRING,
              description: "A breakdown of the advanced copywriting prompt structure that was applied, so the user sees the professional value."
            }
          },
          required: ["hook", "caption", "carousel", "hashtags", "promptUsed"]
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("Nenhum texto retornado do modelo Gemini.");
    }

    const data = JSON.parse(textResponse.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("Erro na geração de conteúdo:", error);
    return res.status(500).json({ error: error.message || "Erro interno ao processar IA." });
  }
});

// API endpoint for ad creative generation
app.post("/api/generate-creative", async (req, res) => {
  try {
    const { product, format, angle, audience } = req.body;

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY não foi configurada. Configure sua chave nos Segredos da AI Studio." 
      });
    }

    const adProduct = product || "Método Conteúdo Inteligente";
    const adFormat = format || "Vídeo Reels";
    const adAngle = angle || "Quebra de Objeção";
    const adAudience = audience || "Profissionais liberais e infoprodutores cansados de não vender no Instagram";

    const systemInstruction = `Você é um copywriter de elite especialista em tráfego pago e orgânico de alta conversão. Seu objetivo é criar um anúncio persuasivo irresistível focado em vender o produto "${adProduct}".
    
    Diretrizes de Copywriting de Elite:
    1. GANCHO PODEROSO: O gancho (hook) deve parar o scroll imediatamente. Use gatilhos mentais fortes de curiosidade, dor intensa ou quebra de crença comum.
    2. VALOR REAL: Destaque os benefícios e resolva as objeções específicas do público-alvo: "${adAudience}".
    3. LEGENDA PERSUASIVA: Deve ser escrita de forma extremamente humana, escaneável (linhas curtas), com emojis pontuais, focado no ângulo: "${adAngle}". Termine com uma Chamada para Ação (CTA) clara de urgência.
    4. FORMATO ESPECÍFICO: 
       - Se o formato for "Vídeo Reels", preencha a array "videoScript" com 4 cenas sequenciais detalhando ação visual e fala (voiceover). Deixe "carouselSlides" vazio ou nulo.
       - Se o formato for "Anúncio Carrossel", preencha a array "carouselSlides" com exatamente 4 slides curtos e persuasivos. Deixe "videoScript" vazio ou nulo.
       - Se o formato for "Anúncio Estático / Stories", você pode deixar ambas as arrays vazias ou nulas.
    5. DICAS DE PRODUÇÃO: Escreva orientações práticas sobre gravação, trilha sonora ou design visual na chave "productionTips".`;

    const userPrompt = `Gere um criativo de anúncio de alta conversão com estes parâmetros:
    - Produto: ${adProduct}
    - Formato do Anúncio: ${adFormat}
    - Ângulo Estratégico: ${adAngle}
    - Público-Alvo: ${adAudience}
    
    Você deve gerar um JSON estruturado com exatamente estas chaves:
    1. "title": Um título atraente para identificar o criativo (máx 60 caracteres).
    2. "format": "${adFormat}"
    3. "angle": "${adAngle}"
    4. "hook": O texto/frase de gancho inicial (máx 100 caracteres).
    5. "videoScript": Uma array (somente se o formato for "Vídeo Reels") com objetos contendo: "scene" (ex: "Cena 1"), "action" (descrição da cena visual) e "audio" (fala exata). Se não aplicável, envie array vazia.
    6. "carouselSlides": Uma array (somente se o formato for "Anúncio Carrossel") com objetos contendo: "slide" (inteiro), "title" (título do slide) e "text" (corpo do slide). Se não aplicável, envie array vazia.
    7. "caption": A legenda completa do anúncio, formatada e pronta para copiar, com CTA forte.
    8. "productionTips": Dicas essenciais de filmagem ou design visual para este criativo.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            format: { type: Type.STRING },
            angle: { type: Type.STRING },
            hook: { type: Type.STRING },
            videoScript: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  scene: { type: Type.STRING },
                  action: { type: Type.STRING },
                  audio: { type: Type.STRING }
                },
                required: ["scene", "action", "audio"]
              }
            },
            carouselSlides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  slide: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  text: { type: Type.STRING }
                },
                required: ["slide", "title", "text"]
              }
            },
            caption: { type: Type.STRING },
            productionTips: { type: Type.STRING }
          },
          required: ["title", "format", "angle", "hook", "caption", "productionTips"]
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("Nenhum texto retornado do modelo Gemini.");
    }

    const data = JSON.parse(textResponse.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("Erro na geração de criativo:", error);
    return res.status(500).json({ error: error.message || "Erro interno ao processar IA para o criativo." });
  }
});


// Configure Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
