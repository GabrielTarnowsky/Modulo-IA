import { Testimonial, FaqItem } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Cesar Gabriel",
    role: "Especialista em Marketing",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    content: "Fazia semanas que eu não postava com consistência no meu perfil. Depois de usar o Método, criei uma linha editorial completa de 30 dias em menos de 1 hora. O resultado? Mais de 12 novos clientes vindo direto do direct querendo comprar meu serviço.",
    niche: "Marketing Digital",
    metric: "+12 Clientes direct"
  },
  {
    id: 2,
    name: "Dra. Amanda Costa",
    role: "Nutricionista Clínica",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    content: "Eu odiava escrever legendas, passava horas e o resultado era frio. Agora eu só coloco meu tema e os prompts fazem todo o trabalho de copy de forma extremamente humana. Meu alcance triplicou e fechei 4 novos acompanhamentos individuais em uma única semana.",
    niche: "Saúde & Estética",
    metric: "3x mais Alcance"
  },
  {
    id: 3,
    name: "Rodrigo Mendes",
    role: "Proprietário de E-commerce",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    content: "O calendário estratégico me salvou. As ideias de carrossel engajam demais e o gancho realmente segura as pessoas lendo os slides até o final. Tivemos um aumento expressivo nas vendas de coleções novas aplicando os roteiros específicos de Reels.",
    niche: "E-commerce & Moda",
    metric: "+47% Faturamento"
  },
  {
    id: 4,
    name: "Mariana Souza",
    role: "Psicóloga Terapeuta",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    content: "Sempre tive receio de usar Inteligência Artificial por parecer muito robotizado. Mas a engenharia desses prompts realmente gera textos acolhedores e éticos, conectando profundamente com o que meu paciente ideal busca. Recomendo muito!",
    niche: "Profissional Liberal",
    metric: "Recorde de Salvamentos"
  }
];

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "Como vou receber o material do Método?",
    answer: "O acesso é 100% imediato! Assim que o seu pagamento de apenas R$ 29,90 for processado (no Pix cai na hora), você receberá um e-mail automático com os links de acesso para baixar o Guia Completo, os 20 Prompts Premium e os bônus estratégicos."
  },
  {
    id: 2,
    question: "Preciso pagar alguma assinatura ou mensalidade?",
    answer: "Não! O pagamento é único. Você paga apenas R$ 29,90 hoje, garante o acesso vitalício à área de membros exclusiva e tem direito a todas as futuras atualizações e melhorias do material sem custo adicional."
  },
  {
    id: 3,
    question: "O método serve para quem tem poucos seguidores?",
    answer: "Com certeza! Na verdade, ele é ideal para perfis pequenos. Como o método é focado em conteúdo estratégico com alto poder de conversão (em vez de posts vazios de entretenimento), ele ensina você a transformar seus poucos seguidores atuais em clientes pagantes."
  },
  {
    id: 4,
    question: "Eu preciso ter a versão paga do ChatGPT?",
    answer: "Não! Todos os prompts foram meticulosamente desenvolvidos e testados para funcionar com excelência tanto no ChatGPT gratuito (GPT-3.5 ou GPT-4o-mini) quanto em outras ferramentas de IA disponíveis no mercado, como o Gemini do Google e o Claude."
  },
  {
    id: 5,
    question: "Como funciona a garantia de 7 dias?",
    answer: "O seu risco é absolutamente zero. Você pode garantir sua vaga hoje, abrir o material, testar os prompts nos seus posts e, se em até 7 dias você sentir que o método não é para você ou não agregou valor, basta nos enviar um e-mail para receber 100% do seu dinheiro de volta."
  }
];
