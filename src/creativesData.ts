export interface AdCreative {
  id: string;
  title: string;
  format: "Vídeo Reels" | "Anúncio Carrossel" | "Anúncio Estático / Stories";
  angle: string;
  hook: string;
  videoScript?: {
    scene: string;
    action: string;
    audio: string;
  }[];
  carouselSlides?: {
    slide: number;
    title: string;
    text: string;
  }[];
  caption: string;
  productionTips: string;
}

export const readyToUseCreatives: AdCreative[] = [
  {
    id: "creative-1",
    title: "⚡ Roteiro de Vídeo: O Fim das Dancinhas (Venda Direta)",
    format: "Vídeo Reels",
    angle: "Quebra de Padrão & Dor de Produção",
    hook: "O algoritmo do Instagram mudou de novo e o seu alcance despencou?",
    videoScript: [
      {
        scene: "Cena 1 (0s a 3s)",
        action: "Grave com a câmera traseira do celular em boa iluminação, gesticulando com a mão de forma firme. Texto na tela: 'O algoritmo mudou (de novo)?'",
        audio: "O algoritmo do Instagram mudou de novo e o seu alcance foi pro buraco? Deixa eu te falar uma verdade que ninguém te conta:"
      },
      {
        scene: "Cena 2 (3s a 8s)",
        action: "Aponte para o lado ou faça um take rápido gravando a tela do seu computador mostrando um gráfico de engajamento subindo ou postagens organizadas.",
        audio: "Você NÃO precisa passar horas fazendo dancinha ridícula ou gravando reels perfeitos para atrair clientes prontos para comprar."
      },
      {
        scene: "Cena 3 (8s a 15s)",
        action: "Mostre o PDF do guia ou a tela do celular abrindo a área de membros do Método Conteúdo Inteligente.",
        audio: "O segredo está em usar engenharia de prompts avançada para criar posts magnéticos e altamente persuasivos em minutos. Textos que parecem escritos por um copywriter de dez mil reais."
      },
      {
        scene: "Cena 4 (15s a 22s)",
        action: "Volte para a câmera frontal, fale direto com convicção e faça o sinal com os dedos direcionando para a legenda.",
        audio: "Custa menos que uma pizza grande e vai te dar um ano inteiro de conteúdos que vendem no automático. Clica no botão abaixo, conheça o Método e comece a faturar hoje."
      }
    ],
    caption: `⚠️ PARE DE FAZER REELS DE DANCINHA PARA TENTAR VENDER NO INSTAGRAM.

Você não precisa virar um palhaço do algoritmo para encher sua agenda ou fechar novos clientes. 

O que você precisa é de CONTEÚDO ESTRATÉGICO que fala diretamente com o bolso do seu cliente ideal.

No "Método Conteúdo Inteligente", nós empacotamos a engenharia de prompts exata que grandes agências usam para gerar posts, carrosséis e roteiros de vendas altamente persuasivos em menos de 10 segundos.

O que você leva:
✅ Guia definitivo de Copywriting Prático
✅ 20 Prompts Premium Inéditos (só copiar e colar)
✅ Calendário Estratégico de 30 Dias
✅ Garantia incondicional de 7 dias

Tudo isso por um pagamento único de APENAS R$ 29,90.

👉 Toque no botão "Acesso Imediato" agora mesmo e destrave suas vendas de uma vez por todas!`,
    productionTips: "Use uma música de fundo em alta no Instagram com volume bem baixo (entre 5% e 8%) para impulsionar a entrega orgânica. Use legendas dinâmicas grandes na tela para reter a atenção."
  },
  {
    id: "creative-2",
    title: "🎨 Carrossel: Engenharia de Prompt vs Textos Frios",
    format: "Anúncio Carrossel",
    angle: "Educativo & Revelação de Bastidores",
    hook: "Escrever posts que vendem não é sobre dom. É sobre engenharia de copy.",
    carouselSlides: [
      {
        slide: 1,
        title: "O ERRO QUE TE CUSTA VENDAS",
        text: "Você passa 2 hours escrevendo uma legenda fofa, posta, e a única pessoa que curte é sua mãe. Por que isso acontece?"
      },
      {
        slide: 2,
        title: "A COPY FRIA NÃO CONVERTE",
        text: "A maioria das pessoas escreve textos corporativos chatos ou usa IA de forma básica que gera respostas robóticas e óbvias."
      },
      {
        slide: 3,
        title: "A VIRADA DE CHAVE",
        text: "Grandes produtores usam estruturas secretas de neuromarketing (AIDA, PAS) combinadas com engenharia de prompts avançada."
      },
      {
        slide: 4,
        title: "COPIE NOSSO SISTEMA",
        text: "Acesse agora os 20 prompts de elite que criam posts de alta conversão em 10 segundos. Clique no link para garantir o seu por R$ 29,90!"
      }
    ],
    caption: `Seus posts atuais estão trazendo clientes ou apenas curtidas vazias? 🤔

Se você passa horas escrevendo legendas para receber apenas silêncio no direct, o problema não é o seu produto. É a sua COPY.

Escrever conteúdo que converte seguidor em comprador não exige dom de escrita ou inspiração divina. É pura engenharia estratégica.

Nós criamos o Método Conteúdo Inteligente para que você tenha acesso aos exatos prompts profissionais que geram carrosséis magnéticos, ganchos impossíveis de ignorar e chamadas persuasivas que fazem as pessoas comentarem "eu quero" instantaneamente.

🚨 Chega de sofrer com a tela em branco.

Por apenas R$ 29,90 (pagamento único), você tem a biblioteca de prompts de elite na sua mão.

👉 Clique em "Acesso Imediato" na bio ou no anúncio para garantir sua licença antes que o preço suba!`,
    productionTips: "Ao criar as imagens dos slides no Canva, use cores contrastantes (fundo escuro com fontes neon amarelas ou azuis). Mantenha no máximo 3 linhas de texto por slide para leitura rápida."
  },
  {
    id: "creative-3",
    title: "🍕 Stories / Estático: Comparativo de Valor Irrecusável",
    format: "Anúncio Estático / Stories",
    angle: "Quebra de Objeção de Preço (Ancoragem)",
    hook: "Uma pizza média com refrigerante custa R$ 50,00 e dura 20 minutos...",
    caption: `Uma pizza média com refrigerante custa R$ 50,00 e dura 20 minutos... 🍕
Um cafezinho gourmet com pão de queijo custa R$ 25,00 e dura 10 minutos... ☕

O "Método Conteúdo Inteligente" custa R$ 29,90 (pagamento único) e destrava o seu perfil para vender o ano inteiro no automático. 🧠⚡

Qual das escolhas vai colocar dinheiro no seu bolso esta semana?

Se você está cansado de produzir conteúdo que ninguém lê e quer começar a usar inteligência artificial de verdade para fechar clientes diários no direct, essa é a oferta mais óbvia da sua carreira.

O que você recebe imediatamente:
👉 O Guia Definitivo de Inteligência Artificial aplicada ao Instagram
👉 20 Prompts Profissionais de Cópia Exata (só preencher seu nicho e gerar)
👉 Modelos prontos de Ganchos Virais e CTAs de Conversão
👉 Garantia de Satisfação de 7 Dias (se não gostar, devolvemos tudo)

Chega de desculpas de última hora ou bloqueio criativo. 

👉 Clique no link abaixo e garanta o seu kit completo agora por R$ 29,90!`,
    productionTips: "Esse criativo funciona muito bem em formatos de stories com uma foto bonita de um notebook aberto em uma cafeteria ou mesa de escritório organizada, com um sticker de link direto."
  }
];

export interface EbookChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
}

export interface PremiumPrompt {
  id: string;
  category: "Reels / Vídeos" | "Carrosséis de Elite" | "Stories Engajamento" | "Scripts de Direct";
  title: string;
  description: string;
  promptText: string;
  usageTips: string;
}

export interface CalendarDay {
  day: number;
  objective: "Engajamento" | "Autoridade" | "Conexão" | "Venda Direta" | "Quebra de Objeção";
  title: string;
  action: string;
  hookSuggestion: string;
}

export const ebookIntroduction = {
  title: "Método Conteúdo Inteligente ⚡",
  subtitle: "O Guia Supremo de Vendas, Neuromarketing e Engenharia de Prompts no Instagram",
  author: "Equipe de Engenharia de Conteúdo e Copywriting",
  version: "Edição Premium Especial Completa - v1.5",
  description: "Parabéns por adquirir o Método Conteúdo Inteligente! Este manual técnico e prático de alta performance foi desenhado para agir como seu copywriter particular de elite de forma perpétua. Aqui, você não encontrará teorias obsoletas ou conselhos acadêmicos entediantes sobre marketing digital tradicional. Este material é uma rota cirúrgica que combina os princípios mais profundos da neurociência aplicada ao consumo, à redação publicitária (copywriting) e à engenharia de prompts avançada para inteligência artificial.\n\nPreparamos um ecossistema completo para que você consiga planejar, criar e programar meses de conteúdo magnético, persuasivo e altamente focado em conversão de vendas em menos de 10 minutos por dia. Use os capítulos de fundamentação para reprogramar sua mentalidade de criação, copie nossa biblioteca secreta de 20 prompts mestre de engenharia reversa e execute o cronograma exato de 30 dias para reaquecer e monetizar seguidores frios."
};

export const ebookChapters: EbookChapter[] = [
  {
    id: "chap-1",
    title: "Capítulo 1: O Fim das Dancinhas e a Era do Conteúdo de Venda Direta",
    subtitle: "A neuro-arquitetura por trás dos posts que ativam o córtex pré-frontal e geram desejo de compra imediata.",
    content: [
      "Para começar a colher resultados de verdade no digital, você precisa desconstruir imediatamente a mentira do entretenimento gratuito compulsivo. Fazer dancinhas ridículas no Reels, postar fotos de paisagens bonitas com legendas genéricas extraídas da internet ou produzir o chamado 'conteúdo de valor genérico' (aquele post chato em formato de lista conceitual que qualquer um encontra pesquisando no Google em 10 segundos) não encherá o seu carrinho de compras e nem a sua conta bancária.",
      "Quando você publica algo que apenas ensina teorias sem gerar conexão com o seu produto, o seu seguidor lê, curte, agradece mentalmente e vai comprar do seu concorrente que tem um posicionamento de vendas muito mais forte. Por quê? Porque as pessoas buscam atalhos estruturados e soluções de conveniência prontas, e não mais aulas conceituais em formatos de posts de feed. A venda ocorre quando o cliente percebe que o seu conteúdo diagnosticou uma ferida que ele possui e revelou o remédio exato na forma de oferta comercial.",
      "Para construir posts que vendem de forma orgânica ou em anúncios de tráfego pago, seu conteúdo precisa respeitar com precisão cirúrgica três grandes leis neuro-comportamentais dos canais de mídia social:",
      "1. Interrupção Traumática de Padrão (Pattern Interruption): O cérebro humano em ambiente digital navega pelo feed de postagens em um estado semiconsciente, quase hipnotizado, ativado pelo fluxo infinito de dopamina barata. Para atrair a atenção do seu cliente ideal, o seu primeiro elemento (o título, a capa do carrossel ou os primeiros 3 segundos do vídeo) precisa chocar, quebrar as expectativas mecânicas e criar um contraste visual e cognitivo violento. Use cores conflitantes, negue dogmas consolidados do seu mercado e faça perguntas que forcem a autoidentificação imediata de uma dor oculta.",
      "2. Agitação Sutil do Estresse Latente (A Fórmula PAS - Problema, Agitação, Solução): Conecte-se de maneira profunda e viscerais com a dor do cliente. Mostre com clareza clínica que você entende o peso e as consequências do problema dele, agite a dor mostrando os malefícios psicológicos ou financeiros de continuar fingindo que essa ferida não existe e, apenas no final, apresente o seu método, produto ou serviço como a única ponte lógica de escape saudável e o atalho definitivo para a solução.",
      "3. Chamadas de Ação Interativas Orientadas a Negócios (CTA Conversora): Elimine de uma vez por todas chamadas tolas como 'curta se gostou' ou 'comente o que achou'. O engajamento moderno serve exclusivamente para segmentar leads qualificados e iniciar conversas comerciais de alta intimidade. Direcione o seu público para ações específicas de resposta em mensagens diretas (DM) ou cliques em links estratégicos de checkout rápido."
    ]
  },
  {
    id: "chap-2",
    title: "Capítulo 2: A Neuro-Arquitetura das Fórmulas Tradicionais de Redação",
    subtitle: "Desconstruindo as consagradas fôrmas AIDA, PAS e BAB para a nova economia da atenção acelerada.",
    content: [
      "O copywriting de alta conversão apoia-se em padrões testados há mais de um século pelo marketing de resposta direta tradicional. Na era digital de sobrecarga sensorial, essas fôrmas tornaram-se ainda mais cruciais para organizar mensagens persuasivas. A primeira grande fôrma é o AIDA (Atenção, Interesse, Desejo, Ação). Ela funciona guiando a jornada cognitiva do leitor: começamos capturando sua ATENÇÃO imediata com um gancho emocional; geramos INTERESSE ao detalhar uma estatística ou fato chocante; nutrimos o DESEJO descrevendo os benefícios práticos da transformação oferecida; e concluímos chamando para a AÇÃO de forma simples e imperativa.",
      "A segunda fôrma de extrema performance é o PAS (Problema, Agitação, Solução). É o método mais eficaz para produtos digitais de entrada (MVP). O problema é mapeado, a agitação o torna insuportável no subconsciente do cliente ao pintar o cenário de omissão contínua, e a solução é entregue pronta para consumo imediato. Ao agitar um problema, você gera a tensão cognitiva necessária que apenas a ação de compra é capaz de resolver e aliviar.",
      "Por fim, a fôrma BAB (Before-After-Bridge / Antes-Depois-Ponte) é excelente para ganchos de depoimentos, cases de sucesso e histórias de superação. No 'Antes', descrevemos o estado caótico e frustrante original do comprador; no 'Depois', pintamos o cenário idílico da transformação realizada; e a 'Ponte' é a ferramenta que operou essa mágica – o seu produto. Quando estruturado nessa lógica, o cliente percebe o produto não como uma despesa, mas como a única máquina capaz de transportá-lo entre as duas realidades."
    ]
  },
  {
    id: "chap-3",
    title: "Capítulo 3: A Ciência Oculta por trás da Engenharia de Prompts de Elite",
    subtitle: "Como estruturar comandos profissionais para transformar as IAs em redatores de nível sênior.",
    content: [
      "Se você ainda recebe respostas insossas, genéricas, cheias de clichês textuais ou frases robóticas do ChatGPT ou do Gemini, o culpado não é o modelo de inteligência artificial. O problema está na superficialidade das suas instruções de entrada. Se você digita comandos básicos como 'escreva um texto persuasivo para vender meu serviço', a IA consultará a média estatística de textos existentes na internet, gerando um material medíocre e previsível que afugenta compradores reais de alto padrão.",
      "Para que a IA aja como um redator publicitário de alto nível, treinado em agências multinacionais de publicidade, você precisa dominar o framework de Engenharia de Prompts em Camadas Sistêmicas (RPCC - Role, Path, Constraints, Context):",
      "Primeiro, defina o PAPEL (Role): Não peça apenas um texto, estabeleça a identidade psicológica e a bagagem cultural do agente. Instrua o modelo a agir como um 'Diretor de Criação obstinado por conversão direta e marketing de resposta rápida, com estilo de escrita que mescla a agressividade de Gary Halbert e o minimalismo estético das marcas de luxo modernas'.",
      "Segundo, defina o CONTEXTO de Dor Profunda: Detalhe as dores do seu cliente sob a perspectiva do sofrimento emocional cotidiano e da reputação social, não apenas sob métricas puramente técnicas. Diga à IA exatamente quais são as noites de sono perdidas, os medos latentes de fracasso profissional e as mentiras nas quais o público-alvo tem acreditado ultimamente.",
      "Terceiro, imponha RESTRIÇÕES Estritas (Constraints): Escreva comandos negativos explícitos. Proíba terminologias clichês sósias de robô como 'revolucionário', 'empolgante', 'descubra como', 'transforme sua vida', ou o uso irritante de emojis em excesso em todas as frases. Ordene que o texto utilize frases curtas, variação rítmica de leitura, palavras cotidianas informais e parágrafos de no máximo duas linhas, tornando a leitura fluida e impossível de abandonar."
    ]
  },
  {
    id: "chap-4",
    title: "Capítulo 4: Funis Automatizados de Direct (ManyChat e WhatsApp)",
    subtitle: "Como desenhar fluxos de conversação humana de 1 para 1 para fechamento em escala sem parecer invasivo.",
    content: [
      "A geração moderna de conteúdo exige a integração direta com sistemas de automação de conversas, sendo o ManyChat a ferramenta de excelência para o Instagram. O fluxo de vendas clássico consiste em criar um gatilho de comentário em seus posts ou Reels (exemplo: 'Comente META para receber no direct'). Quando o usuário comenta, um fluxo automatizado e personalizado de mensagens privadas é disparado no mesmo segundo.",
      "No entanto, o maior erro do produtor digital iniciante é programar o ManyChat como se fosse uma máquina de telemarketing fria ou um robô de suporte burocrático, despejando blocos massivos de textos publicitários repletos de links de checkout de uma só vez. Isso ativa instantaneamente a autodefesa do comprador, que fecha a janela e abandona o canal de comunicação imediatamente.",
      "O segredo para um funil de direct que converte até 45% dos contatos iniciados é a progressão de intimidade humanizada. A automação deve realizar perguntas curtas e interativas para identificar o nível de maturidade e a maior dor do lead antes de enviar a oferta final. O robô atua como um assistente atencioso de triagem de problemas, fazendo com que o cliente se sinta ouvido e compreendido. Somente após essa micro-qualificação, o link de pagamento é apresentado de maneira natural, contextualizado como a resposta definitiva para o problema diagnosticado."
    ]
  },
  {
    id: "chap-5",
    title: "Capítulo 5: A Psicologia das Ofertas Irresistíveis e Gatilhos de Ancoragem",
    subtitle: "Como remover a fricção de preço e transformar um produto de R$ 29,90 em uma decisão óbvia e irresistível.",
    content: [
      "Para vender qualquer infoproduto com extrema facilidade, a percepção de valor percebido do material precisa superar, de maneira escandalosa e incontestável, o preço cobrado na página de pagamento. Essa assimetria cognitiva é a base das ofertas que vendem bilhões em todo o mundo. Se o cliente ideal percebe que os bônus acumulados, o manual prático e os prompts prontos pouparão semanas de esforço doloroso ou milhares de reais em contratações de profissionais terceirizados, o preço cobrado torna-se um mero detalhe irrelevante.",
      "A ancoragem de valor consiste em comparar o investimento único no seu produto com despesas banais, insignificantes e cotidianas da vida do cliente ideal. Mostre com argumentos inegáveis que o valor de R$ 29,90 equivale a menos do que uma única pizza de fim de semana, ou que custa menos de R$ 1,00 por dia ao longo de um mês.",
      "Ao comparar a compra de um ativo intelectual permanente (que gera lucro e economiza tempo de vida útil) com passivos fúteis e passageiros que duram minutos (como assinaturas esquecidas de streaming ou guloseimas de delivery), você força a racionalização do gasto, removendo a culpa financeira e apresentando a conversão de compra como o único caminho inteligente."
    ]
  },
  {
    id: "chap-6",
    title: "Capítulo 6: O Caminho de Escala para o Seu MVP Digital",
    subtitle: "A estrutura de upsell pós-compra e como monetizar o mesmo cliente com consultorias de alto tíquete.",
    content: [
      "Um produto de ticket baixo (como este guia de R$ 29,90) é a melhor ferramenta de atração e qualificação de clientes que existe no mercado moderno. O cliente comprador, por ter vencido a barreira psicológica de passar o cartão de crédito e confiar na sua transação, é até 10 vezes mais propenso a comprar de você novamente do que um mero seguidor gratuito orgânico.",
      "O verdadeiro lucro do negócio digital não reside na primeira venda do MVP, mas no funil de profundidade conhecido como Lifetime Value (LTV). Imediatamente após a confirmação do pagamento, você deve oferecer produtos complementares (Order Bump e One-Click Upsell). O cliente pode adicionar, por exemplo, um kit de modelos de imagem no Canva por R$ 19,90, ou um pacote de análise de perfil gravada em vídeo por R$ 97,00.",
      "No médio prazo, use a base de compradores satisfeitos do seu MVP de R$ 29,90 para preencher sua agenda de consultorias individuais ou mentorias em grupo de ticket elevado (de R$ 1.000 a R$ 5.000). Os compradores já testaram a sua qualidade intelectual e operacional na escala de baixo custo e agora pagarão de forma voluntária por um acompanhamento customizado, intimista e focado em seus problemas específicos."
    ]
  }
];

export const premiumPromptsList: PremiumPrompt[] = [
  {
    id: "prompt-1",
    category: "Reels / Vídeos",
    title: "🎥 O Roteiro Quebra-Padrão para Reels",
    description: "Cria roteiros de Reels dinâmicos de 15 a 30 segundos, focados em contradizer o senso comum do nicho e capturar leads no direct.",
    promptText: `Aja como um roteirista de alta conversão para Reels do Instagram. Crie um roteiro de vídeo de 30 segundos usando o método de quebra de padrão.

Parâmetros do meu negócio:
- Meu Nicho: [INSIRA SEU NICHO]
- Meu Produto: [INSIRA SEU PRODUTO/MVP]
- Dor Principal do Cliente: [INSIRA A MAIOR DOR]
- Palavra-chave para CTA no Direct: [INSIRA A PALAVRA-CHAVE, EX: QUERO]

O roteiro deve ter exatamente 3 colunas:
1. Tempo estimado (em segundos)
2. Ação visual sugerida (o que gravar com o celular)
3. Fala exata (Voiceover persuasivo e natural)

Regras de Redação:
- Comece com uma quebra de padrão chocante (ex: "Pare de fazer X se você quiser obter Y").
- Não use palavras robóticas ou excessivamente formais. Escreva como se estivesse conversando com um amigo no WhatsApp.
- Termine direcionando o usuário a comentar a [PALAVRA-CHAVE] para receber a solução no direct automatizado.`,
    usageTips: "Grave com a câmera traseira do celular (tem mais qualidade). Use uma música instrumental em alta no fundo com volume bem baixo."
  },
  {
    id: "prompt-2",
    category: "Carrosséis de Elite",
    title: "🎨 O Carrossel Educativo PAS (Problema, Agitação, Solução)",
    description: "Gera a estrutura completa slide por slide para um carrossel de 5 slides que educa e vende no final de forma sutil.",
    promptText: `Aja como um designer de conversão e copywriter profissional. Escreva o conteúdo completo para um Carrossel do Instagram de 5 slides usando a técnica PAS (Problema, Agitação, Solução).

Parâmetros:
- Produto/Serviço: [INSIRA SEU PRODUTO]
- Público-Alvo: [INSIRA SEU PÚBLICO]
- Problema central que resolvemos: [INSIRA O PROBLEMA]

Estruture a resposta contendo exatamente:
- Slide 1 (Capa): Gancho irresistível focado no problema.
- Slide 2 (Problema): Exposição detalhada da frustração diária do cliente ideal.
- Slide 3 (Agitação): Mostre o impacto negativo de continuar ignorando esse problema.
- Slide 4 (Solução): Apresente o nosso produto como o único atalho seguro e rápido.
- Slide 5 (CTA): Instrução visual exata para arrastar para o lado e digitar "EU QUERO" nos comentários.

Para cada slide, forneça:
1. "Texto Principal para imagem" (máx 12 palavras para ficar legível em telas pequenas)
2. "Orientação visual/Design" (cores, elementos ou ícones recomendados para colocar no Canva)`,
    usageTips: "Mantenha o fundo das suas imagens com cores escuras ou neutras e use apenas uma cor de destaque forte (ex: amarelo neon ou azul ciano) para guiar o olhar."
  },
  {
    id: "prompt-3",
    category: "Stories Engajamento",
    title: "💬 Sequência de 4 Stories de Conversão Direta",
    description: "Cria uma narrativa envolvendo de 4 partes para publicar nos Stories, gerando pico de visualizações e cliques no link.",
    promptText: `Escreva uma sequência de 4 Stories altamente persuasivos para o meu perfil de [SEU NICHO]. O objetivo final é fazer os seguidores clicarem no link de checkout do meu MVP: [NOME DO SEU PRODUTO] que custa apenas R$ [VALOR].

Estruture os stories da seguinte forma:

Story 1 (Sondagem/Curiosidade):
- Abordagem de uma frustração comum do público.
- Inclua uma enquete interativa sugerida (Ex: "Você também sente isso? [Sim, muito / Não, tô de boa]").

Story 2 (História/Bastidor rápido):
- Conte uma história rápida ou mostre um dado chocante que comprova que o método convencional falha.
- Insira uma caixa de perguntas sugerida (Ex: "Qual seu maior obstáculo com X hoje?").

Story 3 (Ancoragem e Oferta):
- Explique como você resolveu esse problema criando um sistema simples de copiar e colar.
- Mostre que o preço do produto é ridiculamente barato comparado a um gasto fútil diário (Ex: preço de um café).

Story 4 (Chamada Dinâmica):
- Mostre os benefícios rápidos e insira a chamada definitiva para clicar no link dos Stories.`,
    usageTips: "Publique com intervalos de 1 a 2 horas entre cada story para o algoritmo recalibrar a entrega e subir suas visualizações."
  },
  {
    id: "prompt-4",
    category: "Scripts de Direct",
    title: "🤝 Fechamento Rápido no Direct (Humano & Sem Pressão)",
    description: "Roteiro de mensagens prontas para responder o cliente que comentou em seu post ou mandou mensagem de interesse.",
    promptText: `Você é um especialista em vendas 1-para-1 pelo direct do Instagram. Crie um script de atendimento fluido e extremamente humanizado para converter pessoas interessadas no meu produto: [SEU PRODUTO].

O script deve cobrir as seguintes etapas:
1. Saudação Inicial (Quando a pessoa comenta a palavra-chave no post e nós enviamos a primeira mensagem). Deve ser amigável e despretensiosa.
2. Identificação de Dor (Uma única pergunta curta para descobrir o nível de conhecimento ou a maior dificuldade dela).
3. Apresentação da Solução (Explicar em apenas 2 parágrafos como o produto resolve exatamente essa dor, sem jargões corporativos).
4. Fechamento Rápido com Oferta Irresistível (Apresentar o preço promocional, a garantia e o link direto de pagamento).

Regras de Ouro:
- Evite parecer um robô de telemarketing.
- Use quebras de linha frequentes para facilitar a leitura no celular.
- Nunca mande um textão gigante de uma vez. Faça perguntas para incentivar o cliente a responder antes de mandar o link.`,
    usageTips: "Use ferramentas de automação (como ManyChat) apenas para a primeira mensagem. Faça as interações seguintes de forma manual para aumentar a conversão em até 3x."
  },
  {
    id: "prompt-5",
    category: "Reels / Vídeos",
    title: "⚡ Roteiro de Retenção Extrema: O Segredo Revelado",
    description: "Ideal para Reels focados em expor uma tática incomum que prende o espectador até a última palavra de forma hipnótica.",
    promptText: `Aja como redator sênior de anúncios em vídeo. Crie um roteiro de 45 segundos para Reels focado em reter a atenção através de loop visual e curiosidade cognitiva indomável.

Variáveis:
- Nicho: [SEU NICHO]
- Revelação Oculta: [QUAL O SEGREDO DO NICHO]
- CTA: [COMENTE PALAVRA]

Regras de construção:
1. Ganchos de 0 a 3s: Uma frase de desespero intelectual (ex: "Eles vão me odiar por revelar isso...").
2. Loop de Retenção: Insira uma instrução para o criador repetir a mesma frase inicial no final para um vídeo em loop infinito perfeito.
3. Ritmo de fala rápido, frases com pontuação forte.`,
    usageTips: "Utilize uma legenda que cubra o centro do vídeo e gesticule firmemente no início."
  },
  {
    id: "prompt-6",
    category: "Carrosséis de Elite",
    title: "🎨 O Carrossel de Comparativo Técnico de Alto Nível",
    description: "Desenha um carrossel de 6 slides que compara o erro de fazer as coisas sozinhos com o atalho estratégico do seu produto.",
    promptText: `Crie a arquitetura textual e visual de um Carrossel de 6 slides.
Tema: O método manual árduo versus o Método Automatizado Inteligente do meu infoproduto: [PRODUTO].

Para cada slide determine:
- Título principal com alto impacto.
- Parágrafo de explicação curta.
- Hack visual para o Canva (disposição de setas, tabelas ou prints de tela de celular).
- Direcione o leitor a deslizar os slides até o Slide 6, onde o link de R$ 29,90 se posiciona como a única saída inteligente.`,
    usageTips: "Não polua a arte com muito texto. Deixe o conteúdo respirar e mantenha a fonte em tamanho mínimo de 32px para leitura."
  },
  {
    id: "prompt-7",
    category: "Stories Engajamento",
    title: "🧠 A Caixa de Perguntas Armadilha de Conversão",
    description: "Como estruturar e responder caixas de perguntas nos Stories para converter dúvidas bobas em vendas brutais.",
    promptText: `Me dê 5 modelos de perguntas prontas para eu mesmo enviar de forma anônima na minha caixa de perguntas do Instagram, seguidas pelos roteiros de respostas ideais focadas em posicionamento de autoridade e venda disfarçada do meu infoproduto [PRODUTO].

As perguntas devem focar em dores clássicas de [SEU NICHO]:
- Falta de dinheiro.
- Falta de tempo para executar.
- Medo de ser julgado ou vergonha de gravar vídeos.
- Dúvida técnica se serve para iniciantes.

A resposta deve ser firme, dar um micro-insight gratuito e linkar diretamente com a urgência de adquirir o método completo.`,
    usageTips: "Poste as respostas em formato de prints de tela preta com textos curtos escritos com a fonte clássica do Instagram, intercalados com um story em vídeo falando."
  },
  {
    id: "prompt-8",
    category: "Scripts de Direct",
    title: "🎯 O Script do Fechamento Inevitável por Áudio",
    description: "Gera a estrutura de transcrição de áudios altamente pessoais para enviar no Direct que destroem objeções em 60 segundos.",
    promptText: `Aja como especialista em vendas invisíveis por áudio no Direct. Crie 3 modelos de roteiro de áudio falado de até 45 segundos cada para responder leads com dúvidas recorrentes.

Cenários:
- Lead diz: "Não sei se isso serve para o meu nicho específico de [NICHO]."
- Lead diz: "Já tentei comprar outros e-books e não tive resultados."
- Lead diz: "Vou deixar para comprar na próxima semana."

Use entonação de voz amigável, autoridade natural, sem parecer desesperado por dinheiro, mas de forma assertiva e focada no encerramento da venda imediata.`,
    usageTips: "Mande áudios de no máximo 40 segundos. Isso soa extremamente personalizado e autêntico e aumenta as chances de audição completa."
  },
  {
    id: "prompt-9",
    category: "Reels / Vídeos",
    title: "🎥 Vlog Narrado 'Um Dia Comigo' de Alta Persuasão",
    description: "Instruções e copywriting de narração em off para vídeos de lifestyle inteligente que constroem admiração e conexão.",
    promptText: `Escreva o roteiro completo de narração de voz (voiceover) para um Reels em formato de 'Vlog de Bastidor'.
O tema visual deve ser um dia produtivo na vida de um criador do nicho [SEU NICHO] utilizando inteligência artificial para otimizar suas tarefas.

Mostre:
- Despertando, arrumando a mesa de trabalho, notebook ligando, tomando café.
- Mostrando a tela do computador gerando conteúdos automáticos com o Método Conteúdo Inteligente.
- A mensagem final deve focar na liberdade geográfica e de tempo conquistada ao automatizar a cópia e o conteúdo de vendas.`,
    usageTips: "Faça cortes extremamente rápidos a cada 1.5 segundos para elevar as taxas de retenção e evitar a dispersão do leitor."
  },
  {
    id: "prompt-10",
    category: "Carrosséis de Elite",
    title: "🎨 Carrossel Infográfico Interativo de Ferramentas",
    description: "Gera carrossel dinâmico que exibe as melhores ferramentas de IA do ano, ancorando o seu produto no final.",
    promptText: `Aja como um curador de tecnologia e redator de conteúdo. Escreva um carrossel de 7 slides listando as 5 melhores ferramentas de Inteligência Artificial para alavancar negócios orgânicos em [SEU NICHO].

Slide 1: Capa bombástica (Ex: "Esqueça o ChatGPT: 5 IAs secretas que os milionários usam no automático").
Slide 2 a 6: Uma ferramenta real de mercado com sua utilidade prática detalhada em duas linhas.
Slide 7: A CTA inevitável de fechamento, revelando que a ferramenta número 1 de todas é o Método Conteúdo Inteligente que custa menos que uma assinatura mensal de qualquer uma das outras listadas.`,
    usageTips: "Use logotipos conhecidos (como os da OpenAI, Midjourney, etc.) nos slides para atrair a atenção do leitor ao primeiro impacto."
  },
  {
    id: "prompt-11",
    category: "Stories Engajamento",
    title: "💬 Storytelling da Virada de Chave Pessoal",
    description: "Guia passo a passo para narrar a história do seu pior momento profissional até a grande virada com o MVP.",
    promptText: `Crie um roteiro de storytelling de 5 partes para meus Stories do Instagram, estruturando a minha jornada de superação em [SEU NICHO].

Escreva na primeira pessoa:
- Parte 1: O fundo do poço (Noites sem dormir, frustração por produzir posts sem engajamento e a sensação de estar trabalhando de graça).
- Parte 2: O ponto de inflexão (O momento em que percebi que as táticas tradicionais eram mentiras obsoletas de agências tradicionais).
- Parte 3: A grande descoberta (Como simplifiquei o processo usando engenharia reversa de IA).
- Parte 4: Os primeiros resultados práticos de vendas no direct.
- Parte 5: Convite acolhedor para que a audiência replique este mesmo sistema através do link promocional.`,
    usageTips: "Não use filtros de beleza exagerados ao gravar. A vulnerabilidade e a estética orgânica aumentam a conversão do público."
  },
  {
    id: "prompt-12",
    category: "Scripts de Direct",
    title: "🤝 O Roteiro de Reativação de Clientes Frios no Chat",
    description: "Comandos para reatar conversas com leads que demonstraram interesse anterior mas desapareceram na hora da compra.",
    promptText: `Você é o mestre da recuperação de vendas perdidas. Crie um script de 3 mensagens diretas curtas e informais para reativar conversas com pessoas que solicitaram informações sobre o meu produto [PRODUTO] nos últimos 30 dias mas acabaram sumindo ou deixando no vácuo.

Regras fundamentais:
- Mensagem 1: Quebre o gelo com humor ou um bônus novo sem tentar vender de imediato.
- Mensagem 2: Notifique sobre a última chamada com o preço com desconto antes do encerramento dos bônus.
- Mensagem 3: Peça uma opinião sincera do motivo de não ter avançado, garantindo feedback sincero.`,
    usageTips: "Envie as mensagens em horários estratégicos de descanso do cliente (Ex: entre 12h e 13h30 ou após as 19h)."
  },
  {
    id: "prompt-13",
    category: "Reels / Vídeos",
    title: "🎥 O Roteiro de Polêmica Saudável e Quebra de Mitos",
    description: "Roteiro em vídeo focado em derrubar um ensinamento clássico e ineficaz que prejudica o cliente diariamente.",
    promptText: `Crie um roteiro de Reels em formato de crítica elegante e contundente.
Tema central: Por que o conselho clássico de [INSIRA UM MITO COMUM DO SEU MERCADO] está destruindo os resultados de quem está começando hoje no nicho de [NICHO].

Parâmetros do Roteiro:
- Roteiro de 40 segundos, dinâmico e direto ao ponto.
- Exponha por que as pessoas que vendem esse conselho tradicional estão enriquecendo às custas da frustração alheia.
- Direcione o leitor para encontrar a solução verdadeira dentro do Método Conteúdo Inteligente por apenas R$ 29,90.`,
    usageTips: "Mantenha o tom de voz calmo e controlado. A autoridade vem do conhecimento cirúrgico das dores do mercado, não do nervosismo."
  },
  {
    id: "prompt-14",
    category: "Carrosséis de Elite",
    title: "🎨 O Carrossel de 10 Passos Rápidos para Destravar Tudo",
    description: "Cria um carrossel visual simplificado com formato de checklist checklist definitivo para resolver um grande entrave.",
    promptText: `Escreva o conteúdo textual de um carrossel de 8 slides em formato de checklist de alta densidade.
Tema: O checklist definitivo de 7 etapas simples para destravar [OBJETIVO PRINCIPAL DO CLIENTE] em tempo recorde.

Para cada slide determine:
- O número do passo destacado em tamanho gigante.
- Duas linhas de explicação crua e direta sobre o que fazer naquela etapa específica.
- Orientação visual de design: Fundo limpo, paleta bicolor de alta legibilidade, tipografia em estilo grotesco moderno.`,
    usageTips: "Ideal para salvar e compartilhar! Esse tipo de conteúdo maximiza o compartilhamento orgânico e atrai tráfego qualificado."
  },
  {
    id: "prompt-15",
    category: "Stories Engajamento",
    title: "💬 Sequência Narrativa do 'Desafio Prático de 24 Horas'",
    description: "Sequência para criar picos de retenção desafiando sua audiência a realizar uma tarefa prática simples em conjunto.",
    promptText: `Crie um roteiro detalhado para 5 Stories consecutivos lançando o "Desafio Destrava Resultados em 24 Horas" no nicho de [SEU NICHO].

Etapas sugeridas:
- Story 1: Convocação (Ex: "Quem aqui assume o compromisso de mudar X até amanhã à noite?").
- Story 2: A tarefa simples (O primeiro micro-passo que leva menos de 10 minutos para fazer).
- Story 3: Apresentação do modelo pronto (Exiba como o Método Conteúdo Inteligente resolve isso instantaneamente).
- Story 4: Compartilhamento (Instrua a tirarem um print e marcarem seu perfil).
- Story 5: Fechamento com link para garantir o arsenal de prompts prontos.`,
    usageTips: "Crie um destaque permanente com este desafio para novos seguidores realizarem o ciclo e converterem de forma contínua."
  },
  {
    id: "prompt-16",
    category: "Scripts de Direct",
    title: "🤝 O Script de Desconto Exclusivo de Última Hora",
    description: "Comandos para abordar clientes que acessaram sua página de vendas mas desistiram na finalização da compra.",
    promptText: `Crie um script de abordagem proativa para mandar para quem interagiu em seus Stories de vendas mas não efetuou o checkout do produto [PRODUTO].

Regras do script:
- Fale com extrema gentileza, sem parecer que está rastreando o comportamento de navegação dela.
- Ofereça uma condição de pagamento diferenciada ou um bônus especial secreto não listado na página de vendas oficial.
- Faça o fechamento rápido focando em garantir o preço promocional antes que a oferta expire.`,
    usageTips: "Ofereça um bônus de áudio exclusivo de 5 minutos como incentivo extra para fechar a compra no ato."
  },
  {
    id: "prompt-17",
    category: "Reels / Vídeos",
    title: "🎥 Reels Formato Tutorial Expresso de Clique-a-Clique",
    description: "Roteiro em vídeo focado em ensinar um hack de interface ou aplicativo com alta taxa de replicação.",
    promptText: `Aja como tutor técnico sênior de [SEU NICHO]. Crie um roteiro de Reels de 30 segundos ensinando como configurar ou resolver uma tarefa técnica simples com uma ferramenta gratuita.

O roteiro deve mostrar:
- Câmera traseira gravando a tela do computador ou do celular em tempo real.
- Setas e círculos vermelhos indicando onde clicar.
- Legenda focando na economia de esforço técnico que o Método Conteúdo Inteligente oferece por ter tudo isso já pronto.`,
    usageTips: "Grave a tela de forma nítida, evite reflexos ou iluminação ruim. Use áudios explicativos claros gravados de microfone de lapela."
  },
  {
    id: "prompt-18",
    category: "Carrosséis de Elite",
    title: "🎨 O Carrossel de Bastidores e Prova Social Disfarçada",
    description: "Carrossel de 5 slides mostrando capturas de tela reais de clientes agradecendo os resultados obtidos.",
    promptText: `Escreva o conteúdo estruturado para um carrossel focado em Prova Social e Validação de Mercado.
Tema: Como o meu método de [NICHO] tirou [NOME DE UM ALUNO REAL OU FICTÍCIO] do absoluto zero e o levou a atingir [RESULTADO GRANDE].

Slide 1: Capa narrativa (Ex: "Como este único e-book de R$ 29,90 salvou os negócios do [ALUNO]").
Slide 2: O antes detalhado (As frustrações, o medo do fracasso).
Slide 3: A virada prática (Prints das conversas reais no direct elogiando o método).
Slide 4: O resultado financeiro ou de tempo economizado.
Slide 5: O convite com ancoragem para clicar na bio.`,
    usageTips: "Use prints reais borrando os nomes e fotos dos clientes para manter a privacidade ética, mas demonstrando veracidade."
  },
  {
    id: "prompt-19",
    category: "Stories Engajamento",
    title: "💬 Sequência de Stories 'Mentira vs Verdade' no Mercado",
    description: "Desmitificação de crenças que limitam a audiência de crescer, posicionando o seu produto como única saída.",
    promptText: `Crie um roteiro para uma sequência de 3 Stories usando a dinâmica de 'Verdades Dolorosas'.

Stories 1: O mito lucrativo que os gurus vendem (Ex: "Eles te disseram que você precisa produzir 3 posts por dia para crescer").
Stories 2: A realidade crua revelada pelos dados reais (Ex: "A verdade é que você está apenas cansando sua base com conteúdos inúteis").
Stories 3: A virada lógica (Apresente como focar exclusivamente em ganchos cirúrgicos e posts magnéticos de venda direta poupa tempo e traz faturamento).`,
    usageTips: "Use paletas de cores de contraste absoluto (Preto e branco) para reforçar o tom sério e o posicionamento de autoridade sincera."
  },
  {
    id: "prompt-20",
    category: "Scripts de Direct",
    title: "🤝 Script de Fechamento por Parceria e Indicação Comercial",
    description: "Fechamento de vendas sugerindo que a pessoa indique amigos em troca de benefícios ou acessos exclusivos.",
    promptText: `Escreva um roteiro de fechamento de vendas de direct com abordagem de ganho mútuo.
Se o lead está em dúvida sobre comprar, sugira uma condição onde ao adquirir o produto hoje, ele ganha uma segunda licença para presentear um sócio ou amigo de forma gratuita.

O texto deve ser curto, informal, altamente convincente e com gatilho de escassez limitado a apenas 5 cupons adicionais nas próximas 2 horas.`,
    usageTips: "Ideal para impulsionar picos de vendas em fins de semana ou feriados prolongados quando o fluxo orgânico tende a desacelerar."
  }
];

export const ebookCalendar: CalendarDay[] = [
  {
    day: 1,
    objective: "Engajamento",
    title: "A Grande Mentira do Meu Mercado",
    action: "Publique um Reels de até 15 segundos contradizendo abertamente o conselho mais repetido que os diletantes ouvem no seu nicho de atuação.",
    hookSuggestion: "Se te disseram que para atingir [Resultado] você obrigatoriamente precisa de [Crença Falsa], mentiram feio para você."
  },
  {
    day: 2,
    objective: "Autoridade",
    title: "Desmistificando os Bastidores",
    action: "Tire uma fotografia em close-up do seu equipamento, caderno de notas ou área de trabalho limpa. Narre os bastidores do seu dia e como o seu método resolve o estresse do cliente.",
    hookSuggestion: "Esta é a rotina exata que me permite economizar 4 horas de esforço improdutivo diariamente..."
  },
  {
    day: 3,
    objective: "Conexão",
    title: "O Desvio de Rota (Minha Jornada)",
    action: "Narre o erro mais amador que você já cometeu em sua carreira e o aprendizado estratégico crucial que obteve com isso.",
    hookSuggestion: "Quase desisti de tudo após perder dinheiro com este erro estúpido, mas ele me ensinou o seguinte..."
  },
  {
    day: 4,
    objective: "Quebra de Objeção",
    title: "O Mito da Falta de Tempo",
    action: "Ensine um hack prático de altíssimo impacto que leva menos de 5 minutos para ser executado e gera benefício imediato ao seguidor.",
    hookSuggestion: "O seu problema não é tempo. É a falta deste método de 120 segundos para gerenciar o seu dia."
  },
  {
    day: 5,
    objective: "Venda Direta",
    title: "A Comparação Óbvia de Valor",
    action: "Publique uma comparação de preços hilária, porém brutal, contrapondo um gasto ordinário e passageiro ao preço promocional do seu guia/serviço.",
    hookSuggestion: "Por que você compra fast-food de R$ 50 sem pestanejar, mas economiza R$ 29 no conhecimento que liberta o seu tempo?"
  },
  {
    day: 6,
    objective: "Engajamento",
    title: "Anatomia de um Amador vs Profissional",
    action: "Produza um carrossel visual expondo 3 erros imperdoáveis cometidos por amadores do mercado que profissionais de elite erradicaram.",
    hookSuggestion: "A diferença anatômica de como um iniciante e um especialista lidam com este mesmo gargalo."
  },
  {
    day: 7,
    objective: "Autoridade",
    title: "O Segredo da Minha Ferramenta de Ouro",
    action: "Revele uma plataforma, ferramenta, planilha ou utilitário pouco divulgado que acelera a entrega do seu nicho.",
    hookSuggestion: "Se você deseja prosperar na área de [Nicho], salve esta indicação antes que seus concorrentes a vejam."
  },
  {
    day: 8,
    objective: "Conexão",
    title: "O Desabafo Sincero de Fracasso Passado",
    action: "Publique um Story ou post contando a dor de se sentir empacado e cansado das mentiras dos especialistas tradicionais.",
    hookSuggestion: "Durante meses eu achei que o problema era eu... mas na verdade o sistema de posts clássicos que me venderam estava quebrado."
  },
  {
    day: 9,
    objective: "Quebra de Objeção",
    title: "Isto Serve Para Quem Não Tem Audiência?",
    action: "Explique como as técnicas modernas focam em atração direcionada via direct e anúncios baratos, ignorando a necessidade de milhares de seguidores.",
    hookSuggestion: "A maior mentira do Instagram é achar que você precisa de 10 mil seguidores para fazer sua primeira venda."
  },
  {
    day: 10,
    objective: "Venda Direta",
    title: "O Checklist de Solução Prática",
    action: "Apresente os benefícios estruturados do Método Conteúdo Inteligente e faça uma chamada direta para compra com bônus por tempo limitado.",
    hookSuggestion: "Aqui está o checklist de tudo que você recebe ao garantir sua licença hoje..."
  },
  {
    day: 11,
    objective: "Engajamento",
    title: "Pergunte Algo Chocante na Enquete",
    action: "Dispare uma enquete nos stories sobre uma prática polêmica e responda expondo a verdade matemática e de negócios.",
    hookSuggestion: "Você realmente acha que produzir post todo santo dia é o que vai te trazer clientes qualificados?"
  },
  {
    day: 12,
    objective: "Autoridade",
    title: "O Estudo de Caso de 1 Slide",
    action: "Publique uma foto de resultados numéricos ou prints de satisfação e analise o fator técnico que gerou aquela vitória.",
    hookSuggestion: "Como este perfil de nicho extremamente pequeno gerou mais de R$ 5.000 em 15 dias sem gastar nada de anúncios."
  },
  {
    day: 13,
    objective: "Conexão",
    title: "O Que Me Inspira a Seguir em Frente",
    action: "Narre a sua motivação pessoal de negócios, revelando seus valores éticos e com quais tipos de clientes você se recusa a trabalhar.",
    hookSuggestion: "Eu prefiro ter 100 seguidores engajados e compradores do que 100 mil curiosos buscando diquinha grátis."
  },
  {
    day: 14,
    objective: "Quebra de Objeção",
    title: "Eu Já Tentei de Tudo e Nada Funciona",
    action: "Se posicione contra os cursos gigantescos de marketing que são recheados de teorias inúteis e mostre por que o seu modelo é prático de preencher lacunas.",
    hookSuggestion: "Cursos de 100 aulas servem apenas para inflar o ego de quem vende. Você precisa é de ferramentas prontas de copiar e colar."
  },
  {
    day: 15,
    objective: "Venda Direta",
    title: "A Última Chamada para os Bônus Especiais",
    action: "Publique uma sequência de escassez real mostrando os bônus exclusivos que serão desativados na próxima meia-noite.",
    hookSuggestion: "Esta é literalmente a última oportunidade de garantir o Método de R$ 29,90 com todos os 20 prompts elite inclusos."
  },
  {
    day: 16,
    objective: "Engajamento",
    title: "O Erro Secreto do Canva que Deixa seu Post Feio",
    action: "Faça uma crítica técnica visual sobre carrosséis poluídos com textos e mostre como organizar fontes de forma moderna e minimalista.",
    hookSuggestion: "Se as pessoas não arrastam o seu carrossel para o lado, o erro está exatamente nesta escolha de design do Canva..."
  },
  {
    day: 17,
    objective: "Autoridade",
    title: "Como Analisar Métricas Cruciais de Venda",
    action: "Mostre quais são as únicas métricas que importam em um post estratégico (cliques no link e respostas no direct).",
    hookSuggestion: "Esqueça as curtidas. Se a sua métrica de direct não está crescendo, o seu Instagram é apenas um hobby caro."
  },
  {
    day: 18,
    objective: "Conexão",
    title: "O Que Eu Farria se Estivesse Começando do Zero Hoje",
    action: "Descreva um plano de ação enxuto e prático de 3 etapas que você executaria se perdesse todo o seu público e começasse uma conta nova hoje.",
    hookSuggestion: "Sem dinheiro, sem audiência e sem autoridade: Aqui está o plano exato que eu usaria para faturar meus primeiros R$ 2.000 este mês."
  },
  {
    day: 19,
    objective: "Quebra de Objeção",
    title: "Eu Preciso Aparecer e Gravar Vídeos para Vender?",
    action: "Derrube o mito do criador de conteúdo que precisa expor sua vida pessoal privada e mostre que perfis 'dark' (sem aparecer) faturam muito usando boa copy.",
    hookSuggestion: "Você não precisa gravar stories sorrindo e mostrando sua vida íntima para ter um negócio lucrativo no digital."
  },
  {
    day: 20,
    objective: "Venda Direta",
    title: "Apresentando os Bastidores do Nosso Ebook",
    action: "Grave a tela do seu celular passando rapidamente as páginas do guia e os 20 prompts mestre, ancorando a facilidade de cópia do material.",
    hookSuggestion: "É exatamente isso o que você receberá na sua caixa de entrada no segundo em que concluir sua inscrição..."
  },
  {
    day: 21,
    objective: "Engajamento",
    title: "A Pergunta que Nenhum Especialista te Responde",
    action: "Dispare uma polêmica sadia sobre um conselho redundante dado no nicho e convide a audiência para debater educadamente nos comentários.",
    hookSuggestion: "Por que as pessoas continuam recomendando [Crença Inútil] se os dados provam que isso não traz nenhum retorno prático?"
  },
  {
    day: 22,
    objective: "Autoridade",
    title: "O Dia da Minha Configuração de Inteligência Artificial",
    action: "Mostre o layout de como organiza sua rotina com prompts avançados para criar roteiros em menos de 10 segundos por dia.",
    hookSuggestion: "É assim que eu consigo planejar uma quinzena inteira de publicações em apenas 12 minutos livres..."
  },
  {
    day: 23,
    objective: "Conexão",
    title: "O Livro que Mudou Minha Visão de Negócios",
    action: "Indique uma leitura ou referência que moldou sua ética de trabalho e analise o principal insight desse material para o seu nicho.",
    hookSuggestion: "Se você puder ler apenas uma obra de cabeceira sobre persuasão e vendas este ano, escolha esta..."
  },
  {
    day: 24,
    objective: "Quebra de Objeção",
    title: "O Preço de R$ 29,90 é Bom Demais para Ser Verdade?",
    action: "Seja 100% honesto sobre o porquê de vender o produto tão barato: explicar que é um produto de entrada para atrair clientes de alta qualidade para consultorias futuras.",
    hookSuggestion: "Deixa eu te explicar a verdade sincera do porquê eu cobro apenas R$ 29,90 por um material que vale mil reais..."
  },
  {
    day: 25,
    objective: "Venda Direta",
    title: "Garantia de Satisfação de 7 Dias Blindada",
    action: "Foque nos termos da sua garantia de devolução integral do dinheiro sem perguntas, eliminando o risco de compra do seguidor hesitante.",
    hookSuggestion: "Se você comprar o meu guia, abrir os prompts e achar que eles não servem para o seu perfil, eu te devolvo cada centavo."
  },
  {
    day: 26,
    objective: "Engajamento",
    title: "As Palavras Proibidas que o Filtro do Instagram Odeia",
    action: "Ensine como o algoritmo pune termos de spam e como escrever legendas com sinônimos elegantes que aumentam o alcance orgânico do perfil.",
    hookSuggestion: "Evite estas 3 palavras na sua primeira linha de legenda se você não quiser ter seu post banido pelo algoritmo."
  },
  {
    day: 27,
    objective: "Autoridade",
    title: "O Fluxograma de Conversão do Direct no ManyChat",
    action: "Desenhe em um papel ou exiba na tela do computador as mensagens automáticas de boas-vindas que transformam comentários em vendas.",
    hookSuggestion: "Este é o fluxograma de automação que fecha vendas para mim enquanto estou dormindo ou almoçando com minha família..."
  },
  {
    day: 28,
    objective: "Conexão",
    title: "O Pior Conselho que Já Recebi na Vida",
    action: "Revele um conselho financeiro ou de carreira desastroso que seguiu no início e como se libertou dele.",
    hookSuggestion: "Se eu tivesse continuado seguindo este conselho tolo, eu estaria quebrado até hoje..."
  },
  {
    day: 29,
    objective: "Quebra de Objeção",
    title: "Preciso de um Computador Caro para Executar?",
    action: "Mostre que as ferramentas de IA rodam diretamente no navegador do celular mais básico do mercado, exigindo apenas conexão de internet simples.",
    hookSuggestion: "Você não precisa de um escritório luxuoso e nem do último modelo de notebook para começar a faturar com IA."
  },
  {
    day: 30,
    objective: "Venda Direta",
    title: "O Manifesto da Vitória e o Encerramento do Ciclo de 30 Dias",
    action: "Celebre o fim do ciclo estratégico, mostre os depoimentos consolidados e faça o fechamento definitivo da oferta principal com grande apelo comercial.",
    hookSuggestion: "Os 30 dias se passaram. Alguns continuaram apenas assistindo, enquanto outros já estão colhendo lucros diários no direct."
  }
];
