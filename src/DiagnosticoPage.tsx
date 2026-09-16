import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageCircle, ArrowLeft } from 'lucide-react';

const STEPS_DATA = [
  {
    id: 1,
    question: 'Para quem você busca ajuda hoje?',
    description: 'Selecione a opção que melhor descreve quem precisa de atendimento.',
    options: [
      'Para meu filho(a) ou criança da família',
      'Para mim mesmo(a)',
      'Para um familiar adulto ou idoso',
      'Ainda não sei — preciso de orientação',
    ],
  },
  {
    id: 2,
    question: 'Qual dificuldade mais te preocupa neste momento?',
    description: 'Escolha a queixa principal para direcionarmos sua avaliação.',
    options: [
      'Fala e linguagem infantil (atraso na fala)',
      'Gagueira ou bloqueios ao falar',
      'Autismo (TEA) e comunicação',
      'Voz, dicção e oratória',
      'Dificuldade para entender o que ouve',
      'Dificuldade para engolir ou se alimentar',
      'Ainda não sei identificar',
    ],
  },
  {
    id: 3,
    question: 'Já fez acompanhamento fonoaudiológico antes?',
    description: 'Isso nos ajuda a entender em que etapa do cuidado você está.',
    options: [
      'Sim, faço acompanhamento atualmente',
      'Sim, já fiz, mas parei',
      'Sim, já fiz, mas faz muito tempo',
      'Nunca fiz acompanhamento',
    ],
  },
  {
    id: 4,
    question: 'Há quanto tempo essa dificuldade está presente?',
    description: 'Independentemente do período, quanto antes começarmos, melhor.',
    options: [
      'Menos de 3 meses',
      'Entre 3 e 6 meses',
      'Entre 6 meses e 1 ano',
      'Mais de 1 ano',
      'Ainda não consigo precisar',
    ],
  },
];

export default function DiagnosticoPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const activeStepData = STEPS_DATA.find(s => s.id === currentStep)!;

  const handleSelectOption = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: option }));

    setTimeout(() => {
      if (currentStep < STEPS_DATA.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsProcessing(true);
      }
    }, 280);
  };

  const handleGoBack = () => {
    if (isProcessing) {
      setIsProcessing(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progressPercent = isProcessing ? 100 : (currentStep / STEPS_DATA.length) * 100;

  const whatsappMessage = `Olá! Finalizei o diagnóstico no site da Conectare. Busco ajuda para ${answers[1] || '...'}, com a queixa principal: ${answers[2] || '...'}. ${answers[3] || '...'} e a dificuldade está presente por ${answers[4] || '...'}. Gostaria de receber uma orientação personalizada.`;

  const whatsappLink = `https://wa.me/5547999021436?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-[#FEFDF6] relative overflow-hidden selection:bg-sunray/30">
      {/* Global Background Elements - mesmo IDV da Home */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-gradient-to-tr from-[#FEFDF6] via-[#FFFFFF] to-[#FDFBF2]">
        {/* Círculos Concêntricos - Canto Superior Direito */}
        <svg className="absolute -top-[10%] -right-[10%] w-[55vw] h-[55vw] text-sunray opacity-[0.09] md:opacity-[0.12]" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="80" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="260" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="320" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        </svg>

        {/* Círculos Concêntricos - Canto Inferior Esquerdo */}
        <svg className="absolute -bottom-[15%] -left-[15%] w-[60vw] h-[60vw] text-warm-gray opacity-[0.05] md:opacity-[0.08]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="260" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="300" r="340" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="300" cy="300" r="420" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Clusters de Pontinhos */}
        <svg className="absolute top-[18%] left-[6%] hidden md:block opacity-[0.15] md:opacity-[0.25] text-sunray" width="128" height="128" fill="currentColor">
          <defs>
            <pattern id="diag-dots-1" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
          </defs>
          <rect width="128" height="128" fill="url(#diag-dots-1)" />
        </svg>
        <svg className="absolute top-[42%] right-[8%] hidden md:block opacity-[0.1] md:opacity-[0.15] text-warm-gray" width="96" height="144" fill="currentColor">
          <defs>
            <pattern id="diag-dots-2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
          </defs>
          <rect width="96" height="144" fill="url(#diag-dots-2)" />
        </svg>

        {/* Brilhos de Iluminação */}
        <div className="absolute top-[-10%] right-[5%] w-[45vw] h-[45vw] rounded-full opacity-95 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50vw] h-[50vw] rounded-full opacity-95 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_70%)]" />
      </div>

      {/* Navigation */}
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

      {/* Content */}
      <section className="pt-40 pb-24 px-6 flex items-center justify-center relative z-10">
        <div className="w-full max-w-[720px]">
          <div className="mx-auto text-center mb-12">
            <span className="inline-block px-6 py-2 bg-blond rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Diagnóstico Online
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif text-warm-gray leading-[1.05] tracking-tight"
            >
              Descubra o <span className="italic font-light text-sunray">caminho ideal</span>
            </motion.h1>
            <p className="mt-4 text-gray-900 text-lg font-semibold max-w-xl mx-auto">
              Responda algumas perguntas rápidas e receba uma orientação personalizada da nossa equipe.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-[3rem] p-8 md:p-12 shadow-lg border border-blond/40 relative overflow-hidden">
            {/* Círculos sutis de fundo */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(233,190,95,0.12)_0%,transparent_70%)]" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(248,240,219,0.6)_0%,transparent_70%)]" />

            <div className="relative z-10">
              {/* Header com barra de progresso */}
              <div className="flex justify-between items-center mb-10">
                <div className="w-[120px] h-[6px] bg-blond rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sunray rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-warm-gray">
                  {isProcessing ? 'Concluído' : `Passo ${currentStep} de ${STEPS_DATA.length}`}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!isProcessing ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <h3 className="text-2xl md:text-4xl font-serif text-warm-gray leading-tight mb-3">
                      {activeStepData.question}
                    </h3>
                    <p className="text-sm text-warm-gray/80 mb-8">{activeStepData.description}</p>

                    <div className="flex flex-col gap-3">
                      {activeStepData.options.map((option) => {
                        const isSelected = answers[currentStep] === option;
                        return (
                          <button
                            key={option}
                            onClick={() => handleSelectOption(option)}
                            type="button"
                            className={`w-full rounded-full border px-5 py-4 text-left text-sm font-bold transition-all duration-300 cursor-pointer flex items-center justify-between gap-3
                              ${isSelected
                                ? 'border-sunray bg-sunray text-gray-900 shadow-lg shadow-sunray/20'
                                : 'border-blond bg-white text-warm-gray hover:border-sunray/50 hover:bg-blond/30'
                              }`}
                          >
                            <span>{option}</span>
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-gray-900 border-gray-900 text-sunray' : 'border-sunray/40 text-transparent'}`}>
                              <Check size={14} strokeWidth={3} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto bg-sunray text-gray-900 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(233,190,95,0.35)]">
                      <Check size={40} strokeWidth={3} />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif text-warm-gray mb-3">Diagnóstico Recebido!</h3>
                    <p className="text-sm text-warm-gray/80 mb-10 max-w-md mx-auto">
                      Analisamos suas respostas e preparamos uma orientação personalizada com base no seu perfil.
                    </p>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-sunray text-gray-900 px-10 py-5 rounded-full font-black uppercase text-xs tracking-[0.25em] shadow-[0_20px_40px_-10px_rgba(233,190,95,0.5)] hover:scale-105 hover:shadow-[0_24px_50px_-10px_rgba(233,190,95,0.6)] transition-all"
                    >
                      <MessageCircle size={18} />
                      Falar no WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Voltar */}
              <div className="mt-10 flex justify-start">
                {isProcessing || currentStep > 1 ? (
                  <button
                    onClick={handleGoBack}
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-warm-gray hover:text-sunray transition-colors cursor-pointer group"
                  >
                    <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                    Voltar
                  </button>
                ) : (
                  <span aria-hidden="true" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}