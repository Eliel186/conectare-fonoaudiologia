import { useEffect } from 'react';
import { motion } from 'motion/react';

const procedimentoDetails: Record<string, { title: string, content: string[] }> = {
  diccao: {
    title: 'Dicção e Oratória',
    content: [
      'Você sente que sua voz em público não projeta a autoridade que o seu conhecimento tem?',
      'As pessoas frequentemente pedem para você repetir uma frase, você percebe que fala "para dentro" ou atropelado?',
      'Uma dicção falha pode estar invisivelmente custando as promoções e vendas que você mereceria ter.',
      'Sua comunicação pode abrir portas!',
      'A forma como você fala impacta diretamente a forma como você é percebido.Com técnicas específicas de oratória, é possível aprimorar clareza, organização do discurso e segurança ao se comunicar.',
      'Aqui ajustamos sua comunicação para ter uma fala mais objetiva, confiante e profissional.'
    ]
  },
  infantil: {
    title: 'Fala e Linguagem Infantil',
    content: [
      'Você já sentiu a angústia de não compreender o que ele tenta comunicar e vê-lo frustrado por não conseguir se expressar?',
      'Crianças que demoram a falar podem se isolar e ter sérios prejuízos no aprendizado e interação social.',
      'O desenvolvimento da linguagem acontece de forma gradual, mas alguns sinais podem indicar que a criança precisa de uma avaliação fonoaudiológica.',
      '- Não reage a sons ou à voz dos pais',
      '- Não emite balbucios (como "ba", "da")',
      '- Não fala palavras simples (como "mamã", "água")',
      '- Não forma frases simples (ex: "quer água")',
      '- Fala sem coesão e sequência (ex: fala tudo embolado, rápido e fora da sequência dos fatos)',
      'Esperar para ver se "o tempo resolve" é sacrificar um precioso tempo de plasticidade cerebral.',
      'A intervenção fonoaudiológica mapeia atrasos e destrava a comunicação de forma lúdica, rápida e segura.',
      'Não espere a frustração aumentar: garanta hoje o desenvolvimento que o seu pequeno merece.'
    ]
  },
  gagueira: {
    title: 'Gagueira',
    content: [
      'O medo de se expor, participar de uma reunião ou até levantar a mão na escola já fez você, ou seu familiar se calar em momentos importantes?',
      'A gagueira vai muito além da fala: ela impacta a confiança, gera desgaste emocional e pode limitar experiências do dia a dia.',
      'A gagueira é um distúrbio da fluência da fala, caracterizado por interrupções involuntárias no fluxo da comunicação, como repetições de sons ou sílabas, prolongamentos e bloqueios.',
      'A terapia fonoaudiológica focada na fluência ajuda a reduzir as travas, desenvolver estratégias eficazes de comunicação e resgatar a autonomia ao falar.'
    ]
  },
  pac: {
    title: 'Processamento Auditivo Central (PAC)',
    content: [
      'Seu filho ou familiar se distrai facilmente e parece "ouvir, mas não entender" o que foi dito?',
      'Pode ser um sinal de TPAC- O Transtorno do Processamento Auditivo Central (TPAC) que ocorre quando o cérebro tem dificuldade para interpretar sons.',
      'Ou seja: a pessoa escuta, mas não processa a informação de forma eficiente.',
      'Sinais clássicos de TРАС:',
      '- Dificuldade para entender o que é dito em ambientes com barulho',
      '- Pede para repetir com frequência ("o quê?", "hã?")',
      '- Parece não escutar quando chamada',
      '- Dificuldade para seguir instruções, principalmente com mais de uma etapa',
      '- Troca ou confunde sons na fala e ou na escrita ex: troca na escrita ou fala T por D (TAPETE-DAPEDE), F por V (VACA-FACA), R por L (BARATA- BALATA).',
      'O ouvido capta os sons perfeitamente, mas o cérebro quebra na decodificação.',
      'A exaustão mental provocada pelo TPAC atrasa resultados escolares e afasta socialmente o indivíduo.',
      'Nosso treinamento auditivo guiado recria o processamento neuronal ideal, trazendo nitidez auditiva sólida sem remédios.'
    ]
  },
  disfagia: {
    title: 'Disfagia',
    content: [
      'A hora da refeição se tornou um momento silencioso de forte estresse e tensão na família?',
      'Você ou seu familiar apresentam engasgos contínuos, tosse logo ao engolir, regurgitação nasal (comida voltando pelo nariz), vômitos e/ou sensação de alimento parado?',
      'A disfagia é uma dificuldade na deglutição que vai além do desconforto: ela pode trazer riscos importantes à saúde, como pneumonias por aspiração, desnutrição, desidratação e, em casos mais graves, asfixia.',
      'Esses sinais não devem ser ignorados. A avaliação fonoaudiológica identifica o grau da dificuldade, reabilita, previne e orienta de forma segura a alimentação.',
      'Com o acompanhamento adequado, é possível tornar a alimentação mais segura, confortável e tranquila para o paciente e toda a família.'
    ]
  },
  afasia: {
    title: 'Afasia',
    content: [
      'Afasia: quando a comunicação é afetada, não a capacidade de pensar.',
      'Imagine saber exatamente o que quer dizer, mas não conseguir transformar isso em palavras.',
      'A afasia é uma alteração na comunicação, geralmente causada por eventos neurológicos como o AVC ou traumatismos, que pode afetar a fala, a compreensão, a leitura e a escrita.',
      'Essa mudança impacta não só quem vive a afasia, mas também toda a família, interferindo na rotina, nas relações e na autonomia.',
      'O grau de dificuldade varia de acordo com cada caso, mas o cérebro possui uma importante capacidade de adaptação, chamada neuroplasticidade.',
      'Com estímulos adequados e acompanhamento fonoaudiológico, é possível reconstruir formas de se comunicar, desenvolver novas estratégias e retomar a participação nas interações do dia a dia.'
    ]
  },
  motricidade: {
    title: 'Motricidade Orofacial',
    content: [
      'A motricidade orofacial é a área da fonoaudiologia responsável pelo funcionamento dos músculos da face, lábios, língua e mandíbula.',
      'Essas estruturas estão diretamente envolvidas em funções essenciais como respiração, mastigação, deglutição e fala.',
      'Quando há desequilíbrios, podem surgir alterações que impactam a qualidade de vida, a comunicação e até o desenvolvimento facial.',
      'Alguns casos são: Bruxismo (ranger ou apertar os dentes), Alterações na articulação temporomandibular (ATM), Dor orofacial, Hábitos orais, Ronco, Apneia do sono, Mastigação ineficiente ou unilateral, Deglutição atípica (empurrando a língua), Respiração pela boca, Pós-ortodontico, Pós-cirurgias ortognáticas, Cirurgia bariátrica, Alterações no posicionamento de língua e lábios e Dificuldades articulatórias.',
      'A avaliação e o acompanhamento fonoaudiológico permitem identificar essas alterações e promover o equilíbrio das funções orofaciais de forma individualizada.'
    ]
  },
  voz: {
    title: 'Voz',
    content: [
      'A sua voz falha ou some quando chega o final do dia?',
      'Ardor, rouquidão, cansaço extremo ou dor física na região do pescoço ao falar?',
      'Se a voz for seu instrumento de trabalho (ensino, pregações e liderança), o desgaste mal cuidado pode causar alterações patológicas, silenciando a sua principal identidade no mundo.',
      'A avaliação fonoaudiológica identifica as causas dessas alterações e orienta o uso adequado da voz, prevenindo lesões e promovendo mais resistência, conforto e clareza ao falar.',
      'Cuidar da voz é preservar sua forma de se expressar no mundo.'
    ]
  },
  tea: {
    title: 'Transtorno do Espectro Autista (TEA)',
    content: [
      'O TEA é uma condição do neurodesenvolvimento que pode se manifestar de diferentes formas.',
      'Os sinais costumam aparecer na infância e variam em intensidade.',
      '- Atraso na fala ou ausência de linguagem verbal',
      '- Uso repetitivo ou incomum da linguagem, chamado de ecolalia (repetir uma palavra ou frase fora de contexto de forma imediata ou tardia)',
      '- Pouco contato visual',
      '- Movimentos repetitivos (como balançar o corpo ou as mãos)',
      '- Apego a rotinas e resistência a mudanças',
      '- Interesses intensos e específicos por determinados temas',
      '- Hipersensibilidade ou hipossensibilidade a sons, luzes, texturas ou cheiros',
      '- Busca por estímulos sensoriais (girar, pular, tocar objetos)',
      'Cada criança é única. A presença de alguns desses sinais não confirma o diagnóstico, mas indica a necessidade de avaliação profissional especializada.',
      'Com métodos baseados cientificamente, formamos pontes que trazem à tona a conexão social e leveza nas atividades cotidianas.',
      'Inclusive incluindo não só a família mas também a escola sempre que necessário, para que a proposta de inclusão se cumpra em sintonia (terapeutas, família e escola/trabalho).',
      'Essa independência transforma todo o futuro de quem você mais cuida e ama. Vamos juntos nessa jornada?'
    ]
  }
};

export default function ProcedimentoPage({ slug, onNavigate }: { slug: string, onNavigate: (path: string) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const details = procedimentoDetails[slug];
  
  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFDF6]">
        <div className="text-center">
          <h2 className="text-4xl font-serif text-warm-gray mb-4 leading-tight tracking-tight">Procedimento não encontrado</h2>
          <button onClick={() => onNavigate('/')} className="text-sunray font-bold uppercase tracking-widest hover:underline cursor-pointer">Voltar ao Início</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFDF6] relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-gradient-to-tr from-[#FEFDF6] via-[#FFFFFF] to-[#FDFBF2]">
        <div className="absolute top-[-10%] right-[5%] w-[45vw] h-[45vw] rounded-full opacity-95 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50vw] h-[50vw] rounded-full opacity-95 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_70%)]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-sm py-4 border-b border-blond">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
            <div 
              className="h-10 w-40 bg-warm-gray" 
              style={{ 
                maskImage: 'url(/logo.png)', 
                WebkitMaskImage: 'url(/logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'left center'
              }}
              role="img"
              aria-label="Conectare Logo"
            />
          </div>
          <button 
            onClick={() => onNavigate('/')}
            className="text-[11px] uppercase font-bold tracking-widest text-warm-gray hover:text-sunray transition-colors cursor-pointer"
          >
            Voltar
          </button>
        </div>
      </nav>

      <section className="pt-40 pb-24 container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-5 py-1.5 bg-blond rounded-full text-xs font-bold uppercase tracking-[0.2em] text-warm-gray mb-6">
            Especialidade
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-warm-gray mb-12 leading-[1.1] tracking-tight">
            {details.title}
          </h1>

          <div className="bg-white/60 backdrop-blur-md rounded-[3rem] p-8 md:p-14 shadow-lg border border-blond/50">
            <div className="space-y-6 text-lg text-gray-800 font-normal leading-relaxed">
              {details.content.map((paragraph, idx) => {
                if (paragraph.startsWith('- ')) {
                  return <div key={idx} className="flex items-start ml-4 md:ml-8 mb-2">
                    <span className="text-sunray mr-3 mt-1.5">◆</span>
                    <span className="flex-1">{paragraph.substring(2)}</span>
                  </div>;
                }
                return <p key={idx} className="mb-6">{paragraph}</p>;
              })}
            </div>

            <div className="mt-16 pt-10 border-t border-blond flex flex-col sm:flex-row items-center gap-6 justify-between">
              <p className="text-sm font-semibold text-warm-gray uppercase tracking-widest">Dê o primeiro passo hoje mesmo</p>
              <button 
                onClick={() => onNavigate('/diagnostico')}
                className="bg-sunray text-gray-900 px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.25em] hover:scale-105 transition-transform shadow-lg w-full sm:w-auto text-center cursor-pointer"
              >
                Agendar Avaliação
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
