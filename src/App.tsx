/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import ProcedimentoPage from './ProcedimentoPage';
import DiagnosticoPage from './DiagnosticoPage';
import DepoimentosPage from './DepoimentosPage';
import AudioTestimonialsSection from './AudioTestimonialsSection';
import { 
  ChevronDown, 
  Menu, 
  X, 
  MessageCircle, 
  Video, 
  Users, 
  User,
  Mic,
  MessageSquare,
  Brain, 
  Stethoscope, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Phone, 
  Instagram,
  Quote,
  Star,
  Clock,
  Heart,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const specialties = [
  {
    id: 'infantil',
    title: 'Fala e Linguagem Infantil',
    icon: <Users className="w-6 h-6" />,
    description: 'Desenvolvimento da comunicação na infância. Você já sentiu a angústia de não compreender o que ele tenta comunicar? Intervenção lúdica, rápida e segura.',
  },
  {
    id: 'gagueira',
    title: 'Gagueira',
    icon: <Brain className="w-6 h-6" />,
    description: 'Infantil e Adulta. A gagueira vai muito além da fala: ela impacta a confiança e gera desgaste emocional. Terapia focada na fluência e resgate da autonomia.',
  },
  {
    id: 'diccao',
    title: 'Dicção e Oratória',
    icon: <Brain className="w-6 h-6" />,
    description: 'Comunicação profissional de impacto. Técnicas de oratória para aprimorar clareza, organização do discurso e segurança ao se comunicar.',
  },
  {
    id: 'pac',
    title: 'Processamento Auditivo Central (PAC)',
    icon: <Brain className="w-6 h-6" />,
    description: 'Dificuldade de entender o que se ouve. Treinamento auditivo guiado para recriar o processamento neuronal ideal.',
  },
  {
    id: 'disfagia',
    title: 'Disfagia',
    icon: <Stethoscope className="w-6 h-6" />,
    description: 'Dificuldade de deglutição e alimentação. Reabilitação para tornar a alimentação mais segura, confortável e tranquila.',
  },
  {
    id: 'afasia',
    title: 'Afasia',
    icon: <Brain className="w-6 h-6" />,
    description: 'Reabilitação pós-lesão neurológica. Reconstruir formas de se comunicar e retomar a participação nas interações do dia a dia.',
  },
  {
    id: 'motricidade',
    title: 'Motricidade Orofacial',
    icon: <Stethoscope className="w-6 h-6" />,
    description: 'Equilíbrio das funções orofaciais (respiração, mastigação, fala). Atuação em casos de bruxismo, ronco e apneia.',
  },
  {
    id: 'voz',
    title: 'Voz',
    icon: <Users className="w-6 h-6" />,
    description: 'Saúde vocal e reabilitação de disfonia. Para quem usa a voz como instrumento de trabalho (ensino, liderança).',
  },
  {
    id: 'tea',
    title: 'Transtorno do Espectro Autista (TEA)',
    icon: <Heart className="w-6 h-6" />,
    description: 'Comunicação e linguagem no autismo com métodos baseados cientificamente para inclusão em sintonia.',
  },
];

const team = [
  {
    name: 'Gabrielly Londero',
    crfa: 'CRFa 3-12738',
    experience: 'Com mais de 5 anos de experiência',
    education: 'Graduação em Fonoaudiologia pela PUC GOIÁS',
    specialties: [
      'Residência em Endocrinologia (HGG)',
      'Pós Graduanda em Comunicação Profissional e Oratória',
      'Aperfeiçoamento em Reabilitação Neurofuncional',
      'Aprimoramento em Disfagia, Voz e Afasia',
    ],
    image: '/fotogabi.jpeg',
    instagram: 'gabilondero.fono',
  },
  {
    name: 'Carla Alves',
    crfa: 'CRFa 3-12750',
    experience: 'Com mais de 5 anos de experiência',
    education: 'Graduação em Fonoaudiologia pela PUC GOIÁS',
    specialties: [
      'Residência em Saúde Funcional e Reabilitação (CRER)',
      'Pós-graduada em Neurociências (FAVENI)',
      'Pós-graduada em Audiologia Clínica (CEAFI)',
      'Aprimoramento em ABA Naturalista e Implante Coclear',
    ],
    image: '/fotocarla.jpeg',
    instagram: 'fonocarlaalves_',
  },
];

const testimonials = [
  { image: '/Feedback1.jpeg', alt: 'Feedback WhatsApp 1' },
  { image: '/Feedback2.jpeg', alt: 'Feedback WhatsApp 2' },
  { image: '/Feedback3.jpeg', alt: 'Feedback WhatsApp 3' },
  { image: '/Feedback4.jpeg', alt: 'Feedback WhatsApp 4' },
  { image: '/FeedBack5.jpeg', alt: 'Feedback WhatsApp 5' },
];

const specialtyMessages: Record<string, string> = {
  infantil: 'Olá! Gostaria de agendar uma consulta de fonoaudiologia sobre Fala e Linguagem Infantil para o meu filho(a) na Conectare.',
  gagueira: 'Olá! Gostaria de agendar uma consulta de fonoaudiologia especializada em Gagueira na Conectare.',
  diccao: 'Olá! Gostaria de agendar um treinamento/consulta de Dicção e Oratória na Conectare.',
  pac: 'Olá! Gostaria de agendar uma consulta para Processamento Auditivo Central (PAC) na Conectare.',
  disfagia: 'Olá! Gostaria de agendar uma avaliação fonoaudiológica de Disfagia na Conectare.',
  afasia: 'Olá! Gostaria de agendar uma consulta de reabilitação fonoaudiológica para Afasia na Conectare.',
  motricidade: 'Olá! Gostaria de agendar uma consulta de Motricidade Orofacial na Conectare.',
  voz: 'Olá! Gostaria de agendar uma avaliação de fonoaudiologia focada em Voz na Conectare.',
  tea: 'Olá! Gostaria de agendar uma consulta de fonoaudiologia especializada em Autismo (TEA) na Conectare.'
};

function SpecialtyCard({ item, variants, onNavigate }: { item: any; variants: any; key?: string, onNavigate?: (path: string) => void }) {
  return (
    <motion.div 
      variants={variants}
      onClick={() => onNavigate && onNavigate(`/procedimentos/${item.id}`)}
      className="relative p-8 md:p-10 rounded-[3rem] border transition-all duration-700 group cursor-pointer overflow-hidden flex flex-col h-full bg-white/40 border-blond/50 hover:border-sunray/40 hover:bg-white/60 shadow-sm hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 bg-sunray/5 text-sunray group-hover:bg-sunray/10">
            {item.icon}
          </div>
        </div>

        <h3 className="text-2xl font-serif mb-6 text-gray-900 font-semibold leading-tight">{item.title}</h3>
        
        <motion.div
          key="cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-auto flex items-center space-x-3 pt-6 opacity-80 group-hover:opacity-100 transition-opacity"
        >
          <div className="h-[1px] w-6 bg-sunray" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-warm-gray">Ver Detalhes</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Home({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Subtle Parallax for Hero
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const heroY = useTransform(scrollY, [0, 500], [0, 50]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const studioEase = [0.25, 1, 0.5, 1];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: studioEase }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: studioEase }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-sunray/30">
      {/* Global Background Elements - Design Geométrico Premium (Tons de Branco, Círculos Concêntricos e Clusters de Pontos) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-gradient-to-tr from-[#FEFDF6] via-[#FFFFFF] to-[#FDFBF2]">
        
        {/* 1. Círculos Concêntricos (Círculos dentro de círculos) - Canto Superior Direito */}
        <svg className="absolute -top-[10%] -right-[10%] w-[55vw] h-[55vw] text-sunray opacity-[0.09] md:opacity-[0.12]" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="80" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="260" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="320" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        </svg>

        {/* 2. Círculos Concêntricos - Canto Inferior Esquerdo */}
        <svg className="absolute -bottom-[15%] -left-[15%] w-[60vw] h-[60vw] text-warm-gray opacity-[0.05] md:opacity-[0.08]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="260" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="300" r="340" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="300" cy="300" r="420" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* 3. Conjuntos de Pontinhos (Dot Matrix Clusters) em posições estratégicas */}
        {/* Cluster 1: Superior Esquerdo */}
        <svg className="absolute top-[18%] left-[6%] hidden md:block opacity-[0.15] md:opacity-[0.25] text-sunray" width="128" height="128" fill="currentColor">
          <defs>
            <pattern id="grid-dots-1" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
          </defs>
          <rect width="128" height="128" fill="url(#grid-dots-1)" />
        </svg>

        {/* Cluster 2: Centro Direito */}
        <svg className="absolute top-[42%] right-[8%] hidden md:block opacity-[0.1] md:opacity-[0.15] text-warm-gray" width="96" height="144" fill="currentColor">
          <defs>
            <pattern id="grid-dots-2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
          </defs>
          <rect width="96" height="144" fill="url(#grid-dots-2)" />
        </svg>

        {/* Cluster 3: Inferior Direito */}
        <svg className="absolute bottom-[20%] left-[12%] hidden md:block opacity-[0.12] md:opacity-[0.2] text-sunray" width="160" height="96" fill="currentColor">
          <defs>
            <pattern id="grid-dots-3" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
          </defs>
          <rect width="160" height="96" fill="url(#grid-dots-3)" />
        </svg>

        {/* 4. Brilhos de Iluminação (Glows) super ultra suaves com radial gradients para performance mobile */}
        <div className="absolute top-[-10%] right-[5%] w-[45vw] h-[45vw] rounded-full opacity-95 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50vw] h-[50vw] rounded-full opacity-95 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_70%)]" />
        <div className="absolute top-[25%] left-[25%] w-[40vw] h-[40vw] rounded-full opacity-80 bg-[radial-gradient(circle_at_center,rgba(253,251,242,0.5)_0%,transparent_70%)]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm py-4 border-b border-blond' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
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
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-[11px] uppercase font-bold tracking-widest hover:text-sunray transition-colors border-b-2 border-sunray">Início</a>
            <a href="#depoimentos-audio" className="text-[11px] uppercase font-bold tracking-widest hover:text-sunray transition-colors flex items-center gap-1.5">
              <Headphones size={13} className="text-sunray" />
              <span>Depoimentos</span>
            </a>
            <a href="#especialidades" className="text-[11px] uppercase font-bold tracking-widest hover:text-sunray transition-colors">Especialidades</a>
            <a href="#equipe" className="text-[11px] uppercase font-bold tracking-widest hover:text-sunray transition-colors">Equipe</a>
            <button 
              onClick={() => onNavigate('/diagnostico')}
              className="text-[11px] uppercase font-bold tracking-widest hover:text-sunray transition-colors cursor-pointer"
            >
              Diagnóstico
            </button>
            <button 
              onClick={() => onNavigate('/diagnostico')}
              className="bg-sunray text-gray-900 px-8 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg cursor-pointer"
            >
              Agendar Consulta
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-warm-gray">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 bg-white z-40 md:hidden border-b border-blond"
          >
            <div className="flex flex-col p-6 space-y-4">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest">Início</a>
              <a href="#depoimentos-audio" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Headphones size={15} className="text-sunray" />
                <span>Depoimentos em Áudio</span>
              </a>
              <a href="#especialidades" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest">Especialidades</a>
              <a href="#equipe" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest">Equipe</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate('/diagnostico');
                }}
                className="text-sm font-bold uppercase tracking-widest text-left cursor-pointer"
              >
                Diagnóstico Online
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate('/diagnostico');
                }}
                className="bg-sunray text-gray-900 px-6 py-3 rounded-xl text-center font-bold uppercase tracking-widest cursor-pointer w-full"
              >
                Agendar Agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header id="inicio" className="relative pt-32 pb-32 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
          className="organic-blob w-[600px] h-[600px] bottom-[10%] -right-[10%]" 
          style={{ willChange: 'transform' }}
        />
        <motion.div 
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: [0.05, 0.15, 0.05],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="organic-blob w-[500px] h-[500px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          style={{ background: 'radial-gradient(circle at center, rgba(248, 240, 219, 0.2) 0%, transparent 70%)', willChange: 'transform' }}
        />
        
        {/* Slime/Gosma Pattern Watermark in Hero Background - Occupying the entire Hero section */}
        <div 
          className="absolute inset-0 opacity-[0.045] md:opacity-[0.065] pointer-events-none mix-blend-multiply"
          style={{ 
            backgroundImage: 'url(/padrao-gosma.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} 
        />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <motion.div {...fadeInUp} className="lg:col-span-6 xl:col-span-7">
            <span className="inline-block px-6 py-2 bg-blond rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Fonoaudiologia 100% On-line
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-warm-gray mb-10 leading-[1.05] tracking-tight">
              Fonoaudiologia especializada para <br />
              <span className="italic font-light text-sunray">todas as fases da vida</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-900 mb-12 max-w-xl leading-relaxed font-semibold">
              Atendimento online para crianças, adolescentes, adultos e idosos nas áreas de fala, linguagem, voz, comunicação, motricidade orofacial, disfagia, afasia e TEA.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => onNavigate('/diagnostico')}
                className="bg-sunray text-gray-900 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-sunray/20 cursor-pointer"
              >
                Quero saber como funciona
              </button>
              <a 
                href="#especialidades" 
                className="bg-white/40 backdrop-blur-md border border-blond text-warm-gray px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.25em] hover:bg-white/60 transition-all flex items-center justify-center text-center cursor-pointer"
              >
                Saiba Mais
              </a>
            </div>

            {/* Quick Hero Access Pill to Audio Testimonials */}
            <div className="mt-8 flex items-center">
              <a 
                href="#depoimentos-audio" 
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-blond/80 hover:border-sunray/60 text-warm-gray text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-sm group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-sunray/20 text-sunray flex items-center justify-center group-hover:bg-sunray group-hover:text-gray-900 transition-colors">
                  <Headphones size={13} className="animate-pulse" />
                </div>
                <span>Ouça Relatos Reais em Áudio (3D)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sunray animate-ping" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ scale: heroScale, y: heroY }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: studioEase }}
            className="lg:col-span-6 xl:col-span-5 relative mt-16 lg:mt-0 flex justify-center lg:justify-end"
          >
            <div className="p-4 rounded-[3rem] bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-warm-gray/10 animate-float w-full max-w-[400px]">
              {/* Tela Principal (Fonoaudióloga) */}
              <div className="relative overflow-hidden rounded-[2rem] h-[360px] w-full bg-gradient-to-br from-blond to-off-white flex flex-col items-center justify-center border border-white/20">
                {/* Imagem Principal Fonoaudiólogas */}
                <img src="/carlaegabi.jpeg" alt="Carla e Gabi" className="absolute inset-0 w-full h-full object-cover z-0" />

                {/* Tela Secundária (Paciente) - Posicionada acima dos controles */}
                <div className="absolute bottom-16 left-4 z-10 w-24 h-32 bg-white rounded-2xl border-[3px] border-white shadow-xl flex flex-col items-center justify-center overflow-hidden">
                  <div className="w-10 h-10 bg-blond/40 rounded-full flex items-center justify-center text-warm-gray mb-2">
                    <User size={18} className="opacity-70" />
                  </div>
                  <span className="text-xs font-bold text-warm-gray uppercase tracking-[0.15em]">Você</span>
                </div>
                
                {/* Gradiente de base */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-blond/40 to-transparent pointer-events-none"></div>
              </div>

              {/* Barra de Controles (Flutuando na borda) */}
              <div className="-mt-7 relative z-20 flex justify-center">
                <div className="bg-white/95 backdrop-blur-md rounded-full px-5 py-3 flex gap-3 shadow-xl border border-blond/10 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-warm-gray hover:bg-gray-100 transition-colors border border-gray-100">
                    <Mic size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sunray flex items-center justify-center text-white shadow-md animate-pulse">
                    <Video size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-warm-gray hover:bg-gray-100 transition-colors border border-gray-100">
                    <MessageSquare size={18} />
                  </div>
                  <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md">
                    <Phone size={18} className="rotate-[135deg]" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-[10px] text-warm-gray font-bold uppercase tracking-[0.2em]">Sessão Ao Vivo</p>
              </div>
            </div>
          </motion.div>
        </div>

      </header>

      {/* Audio Testimonials Section - Visualizador 3D Orb Conectare */}
      <AudioTestimonialsSection onNavigate={onNavigate} />

      {/* Stats - Artistic Style */}
      <section className="py-24 md:py-40 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="text-5xl font-serif text-warm-gray mb-3 group-hover:text-sunray transition-colors">2</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-warm-gray">Especialistas</div>
            </div>
            <div className="text-center group border-l border-blond/50">
              <div className="text-5xl font-serif text-warm-gray mb-3 group-hover:text-sunray transition-colors">9+</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-warm-gray">Áreas de Atuação</div>
            </div>
            <div className="text-center group border-l border-blond/50">
              <div className="text-5xl font-serif text-warm-gray mb-3 group-hover:text-sunray transition-colors">100%</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-warm-gray">Atendimento Virtual</div>
            </div>
            <div className="text-center group border-l border-blond/50">
              <div className="text-5xl font-serif text-sunray mb-3 italic">CRFa</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-warm-gray">Registro Ativo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Stages Highlight Section - Enhanced Editorial Grid */}
      <section className="py-32 relative overflow-hidden bg-white/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-sunray/40 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-warm-gray font-black uppercase text-xs tracking-[0.4em] mb-8 block">
              Cuidado Transversal
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-warm-gray leading-[1.1] max-w-5xl mx-auto">
              Atendimento em todas as <br />
              <span className="italic font-light text-sunray underline decoration-blond underline-offset-[12px] decoration-4">fases da vida</span>.
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto mt-12 md:mt-16">
            {/* Timeline Vertical Line */}
            <div className="absolute left-[32px] md:left-[48px] top-[40px] bottom-[40px] w-px bg-sunray/20" />
            
            <div className="flex flex-col gap-6 md:gap-10">
              {[
                { label: 'Infantil', focus: 'Desenvolvimento da fala, linguagem e amamentação.' },
                { label: 'Adolescente', focus: 'Comunicação assertiva, dicção e processamento auditivo.' },
                { label: 'Adulto', focus: 'Voz profissional, fonoaudiologia estética e reabilitação.' },
                { label: 'Idoso', focus: 'Deglutição, memória e manutenção da qualidade de vida.' }
              ].map((stage, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="group relative flex items-center w-full pl-[70px] md:pl-[100px]"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[32px] md:left-[48px] -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-sunray/30 shadow-[0_0_15px_rgba(233,190,95,0.1)] z-10 group-hover:border-sunray group-hover:scale-110 transition-all duration-500">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-sunray/50 group-hover:bg-sunray transition-colors duration-500" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-full p-8 md:p-10 rounded-[2.5rem] bg-white border border-blond/40 group-hover:border-sunray/30 group-hover:shadow-[0_20px_40px_-15px_rgba(233,190,95,0.15)] transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-3 md:mb-4">
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-sunray opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                      <div className="hidden md:block h-px w-8 bg-blond group-hover:bg-sunray/40 transition-colors" />
                      <h3 className="text-2xl md:text-3xl font-serif text-warm-gray">{stage.label}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-900 leading-relaxed font-semibold">
                      {stage.focus}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-24 text-center">
            <p className="text-sm font-semibold text-warm-gray italic">
              "Porque você e seus familiares merecem o melhor cuidado."
            </p>
          </div>
        </div>
      </section>

      {/* Team Section - Artistic Style */}
      <section id="equipe" className="py-24 md:py-48 relative overflow-hidden bg-blond/5">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="max-w-3xl mb-24">
            <span className="text-warm-gray font-bold uppercase tracking-[0.25em] text-xs">Quem cuidará de você</span>
            <h2 className="font-serif mt-6">Expertise que <br/><span className="italic font-light">acolhe e transforma.</span></h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto"
          >
            {team.map((prof, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group"
              >
                {/* Professional Card */}
                <div className="bg-white p-8 md:p-10 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(101,99,92,0.08)] border border-blond/40 hover:shadow-sunray/10 hover:border-sunray/20 transition-all duration-700 h-full flex flex-col">
                  
                  {/* Image Section */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-10 transition-all duration-1000 group-hover:scale-[1.02]">
                    <img 
                      src={prof.image} 
                      alt={prof.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* CRFa Badge - subtle and integrated */}
                    <div className="absolute bottom-6 right-6">
                      <span className="bg-warm-gray/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                        {prof.crfa}
                      </span>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="flex flex-col flex-grow">
                    <span className="text-sunray font-bold text-xs uppercase tracking-[0.3em] mb-4 block group-hover:translate-x-1 transition-transform">
                      {prof.experience}
                    </span>
                    
                    <h3 className="text-3xl lg:text-4xl font-serif mb-8 text-warm-gray leading-tight">
                      Dra. <span className="italic font-light">{prof.name.split(' ')[0]}</span><br />
                      {prof.name.split(' ').slice(1).join(' ')}
                    </h3>
                    
                    <div className="mt-auto space-y-8 pt-8 border-t border-sunray/10">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-sunray/5 flex items-center justify-center shrink-0">
                          <MapPin size={14} className="text-sunray" />
                        </div>
                        <p className="text-xs font-semibold leading-relaxed text-warm-gray italic">{prof.education}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {prof.specialties.map((s, i) => (
                          <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-off-white border border-blond rounded-full text-warm-gray">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Botão de Instagram da profissional */}
                      <button 
                        onClick={() => window.open(`https://www.instagram.com/${prof.instagram}`, '_blank')}
                        className="mt-4 flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-blond text-warm-gray font-semibold hover:text-sunray hover:border-sunray transition-all text-xs uppercase tracking-widest cursor-pointer"
                      >
                        <Instagram size={14} />
                        <span>Ver Perfil Profissional</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specialties - Artistic Cards & Accordion */}
      <section id="especialidades" className="py-24 md:py-48 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-warm-gray font-bold uppercase tracking-[0.25em] text-xs">Especialidades</span>
            <h2 className="font-serif mt-6">Como podemos <br/><span className="italic font-light">te ajudar</span></h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {specialties.map((item) => (
              <SpecialtyCard key={item.id} item={item} variants={itemVariants} onNavigate={onNavigate} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process - Numbered Journey */}
      <section className="py-24 md:py-48 relative overflow-hidden bg-white/60 shadow-[inset_0_0_100px_rgba(248,240,219,0.2)]">
        {/* Slime/Gosma Pattern Watermark - Subtle Left Side Background Decoration */}
        <div 
          className="absolute -left-24 bottom-10 w-[35vw] h-[35vw] max-w-[400px] opacity-[0.05] pointer-events-none mix-blend-multiply"
          style={{ 
            backgroundImage: 'url(/padrao-gosma.png)', 
            backgroundSize: 'contain', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'left bottom' 
          }} 
        />
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-warm-gray font-bold uppercase tracking-[0.25em] text-xs">Jornada do Cuidado</span>
            <h2 className="font-serif mt-6 italic font-light">Simples e acolhedor.</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { id: '01', title: 'Agendamento', desc: 'Entre em contato via WhatsApp. Nossa equipe responde para marcar seu melhor horário.', icon: <Calendar size={24}/> },
              { id: '02', title: 'Conexão', desc: 'Você recebe um link exclusivo. Entre na sala virtual sem complicações ou downloads.', icon: <Video size={24}/> },
              { id: '03', title: 'Terapia', desc: 'Sessões focadas no seu desenvolvimento, no conforto e privacidade da sua casa.', icon: <Heart size={24}/> }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-10 rounded-[2rem] shadow-sm border border-blond flex flex-col items-center text-center group"
              >
                <span className="text-4xl font-serif italic text-sunray mb-6 block group-hover:scale-110 transition-transform">{step.id}</span>
                <div className="w-16 h-16 bg-blond/30 rounded-2xl flex items-center justify-center text-sunray mb-8">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed italic">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-20 max-w-4xl mx-auto bg-warm-gray text-white p-10 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="w-16 h-16 bg-sunray text-gray-900 rounded-full flex items-center justify-center shrink-0">
              <Clock size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg font-serif italic mb-2">Atendimento 100% particular</p>
              <p className="text-xs font-bold leading-relaxed opacity-70 uppercase tracking-widest leading-loose">
                Qualidade com investimento justo. Horários flexíveis, incluindo opções noturnas em casos especiais.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('/diagnostico')}
              className="bg-sunray text-gray-900 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg cursor-pointer hover:scale-105 transition-all"
            >
              Consultar Vagas
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - WhatsApp Gallery Editorial Style */}
      <section id="feedbacks" className="py-32 md:py-48 overflow-hidden relative">
        {/* Neuron Connection Pattern repeating softly in Feedbacks */}
        <div 
          className="absolute inset-0 opacity-[0.035] md:opacity-[0.05] pointer-events-none"
          style={{ 
            backgroundImage: 'url(/padrao-neuronios.png)', 
            backgroundSize: '450px', 
            backgroundRepeat: 'repeat',
            mixBlendMode: 'multiply'
          }} 
        />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
            <div className="max-w-2xl">
              <span className="text-warm-gray font-black uppercase text-xs tracking-[0.4em] mb-6 block">
                Vozes da Conectare
              </span>
              <h2 className="text-6xl md:text-8xl font-serif text-warm-gray leading-[0.95] tracking-tighter">
                Histórias que <br />
                <span className="italic font-light text-sunray">nos inspiram</span>.
              </h2>
            </div>
            <div className="mt-12 md:mt-0 flex items-center space-x-6">
              <div className="w-16 h-16 rounded-3xl bg-sunray/5 flex items-center justify-center text-sunray border border-sunray/10">
                <MessageCircle size={28} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-warm-gray mb-1">Social Proof</p>
                <p className="text-sm font-semibold text-warm-gray">Feedbacks Reais via WhatsApp</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Coluna 1 - Feedback 4 (Muito longo - Branco) + Feedback 3 (Curto - Preto) */}
            <div className="flex flex-col gap-12 lg:gap-16">
              {[testimonials[3], testimonials[2]].map((t, idx) => (
                <motion.div
                  key={t.image}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Physical Card / Frame */}
                  <div className="group relative bg-white p-5 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(101,99,92,0.06)] border border-blond/40 hover:shadow-[0_50px_100px_-20px_rgba(233,190,95,0.15)] hover:border-sunray/30 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-700 ease-[0.25,1,0.5,1]">
                    <div className="rounded-[1.8rem] overflow-hidden bg-off-white relative flex items-center justify-center">
                      <img 
                        src={t.image} 
                        alt={t.alt} 
                        className="w-full h-auto object-contain transition-all duration-1000 group-hover:scale-[1.02]" 
                        loading="lazy"
                        decoding="async"
                      />
                      
                      {/* Glassy overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-warm-gray/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    
                    {/* Subtle Footer Info */}
                    <div className="mt-6 px-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={12} className="text-sunray" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-warm-gray group-hover:text-warm-gray transition-colors">
                          Feedback Verificado
                        </span>
                      </div>
                      <Heart size={12} className="text-sunray/40 group-hover:text-sunray transition-all scale-100 group-hover:scale-125" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coluna 2 - Feedback 1 (Médio - Preto) + Feedback 5 (Médio Curto - Branco) */}
            <div className="flex flex-col gap-12 lg:gap-16">
              {[testimonials[0], testimonials[4]].map((t, idx) => (
                <motion.div
                  key={t.image}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Physical Card / Frame */}
                  <div className="group relative bg-white p-5 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(101,99,92,0.06)] border border-blond/40 hover:shadow-[0_50px_100px_-20px_rgba(233,190,95,0.15)] hover:border-sunray/30 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-700 ease-[0.25,1,0.5,1]">
                    <div className="rounded-[1.8rem] overflow-hidden bg-off-white relative flex items-center justify-center">
                      <img 
                        src={t.image} 
                        alt={t.alt} 
                        className="w-full h-auto object-contain transition-all duration-1000 group-hover:scale-[1.02]" 
                        loading="lazy"
                        decoding="async"
                      />
                      
                      {/* Glassy overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-warm-gray/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    
                    {/* Subtle Footer Info */}
                    <div className="mt-6 px-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={12} className="text-sunray" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-warm-gray group-hover:text-warm-gray transition-colors">
                          Feedback Verificado
                        </span>
                      </div>
                      <Heart size={12} className="text-sunray/40 group-hover:text-sunray transition-all scale-100 group-hover:scale-125" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coluna 3 - Feedback 2 (Longo - Branco) */}
            <div className="flex flex-col gap-12 lg:gap-16">
              {[testimonials[1]].map((t, idx) => (
                <motion.div
                  key={t.image}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Physical Card / Frame */}
                  <div className="group relative bg-white p-5 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(101,99,92,0.06)] border border-blond/40 hover:shadow-[0_50px_100px_-20px_rgba(233,190,95,0.15)] hover:border-sunray/30 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-700 ease-[0.25,1,0.5,1]">
                    <div className="rounded-[1.8rem] overflow-hidden bg-off-white relative flex items-center justify-center">
                      <img 
                        src={t.image} 
                        alt={t.alt} 
                        className="w-full h-auto object-contain transition-all duration-1000 group-hover:scale-[1.02]" 
                        loading="lazy"
                        decoding="async"
                      />
                      
                      {/* Glassy overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-warm-gray/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    
                    {/* Subtle Footer Info */}
                    <div className="mt-6 px-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={12} className="text-sunray" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-warm-gray group-hover:text-warm-gray transition-colors">
                          Feedback Verificado
                        </span>
                      </div>
                      <Heart size={12} className="text-sunray/40 group-hover:text-sunray transition-all scale-100 group-hover:scale-125" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Large Spread */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-6xl bg-off-white/95 rounded-[4rem] p-16 md:p-32 text-center border border-blond shadow-sm relative overflow-hidden"
        >
          {/* Decorative Blobs */}
          <div className="organic-blob w-72 h-72 bg-sunray/10 -top-20 -right-20" />
          <div className="organic-blob w-64 h-64 bg-blond/40 -bottom-20 -left-20" />
          
          <h2 className="text-6xl md:text-8xl font-serif leading-[0.95] text-warm-gray mb-12 tracking-tighter">
            Pronto para melhorar <br />
            <span className="italic font-light text-sunray underline decoration-blond underline-offset-8">sua queixa</span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-900 mb-16 max-w-2xl mx-auto leading-relaxed font-semibold">
            Dê o primeiro passo hoje para uma melhor qualidade de vida sua, do seu filho ou seu familiar. Atendimento acolhedor e humanizado a um clique.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('/diagnostico')}
              className="bg-sunray text-gray-900 px-14 py-7 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(233,190,95,0.4)] flex items-center justify-center space-x-4 group cursor-pointer"
            >
              <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Agendar via WhatsApp</span>
            </button>
            <button 
              onClick={() => onNavigate('/diagnostico')}
              className="bg-white/40 backdrop-blur-md border border-blond text-warm-gray px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-white/60 transition-all flex items-center justify-center text-center cursor-pointer"
            >
              Diagnóstico Online
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-[#1A1A1A] text-white pt-32 pb-12 relative overflow-hidden">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sunray/30 to-transparent" />
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(233,190,95,0.05)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <div className="flex items-center mb-12">
                <div 
                  className="h-11 w-56 bg-white opacity-90" 
                  style={{ 
                    maskImage: 'url(/nome-sem-logo.png)', 
                    WebkitMaskImage: 'url(/nome-sem-logo.png)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'left center'
                  }}
                  role="img"
                  aria-label="Conectare Logo"
                />
              </div>
              <p className="text-white/80 max-w-md leading-[1.8] text-lg font-serif italic pr-12">
                "A excelência em fonoaudiologia não é apenas técnica, é a arte de restaurar conexões humanas através da voz e da escuta."
              </p>
              <div className="mt-12 flex space-x-6">
                <a 
                  href="https://www.instagram.com/fonoonline.conectare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-sunray hover:text-sunray transition-all"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://wa.me/5547999021436?text=Olá! Gostaria de falar com a Conectare fonoaudiologia." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-sunray hover:text-sunray transition-all"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-xs uppercase font-black tracking-[0.3em] text-sunray mb-12">Navegação</h4>
              <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                <li><a href="#inicio" className="hover:text-sunray transition-colors">Início</a></li>
                <li><a href="#depoimentos-audio" className="hover:text-sunray transition-colors">Depoimentos em Áudio</a></li>
                <li><a href="#especialidades" className="hover:text-sunray transition-colors">Especialidades</a></li>
                <li><a href="#equipe" className="hover:text-sunray transition-colors">Quem Somos</a></li>
                <li><a href="#feedbacks" className="hover:text-sunray transition-colors">Feedbacks WhatsApp</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <h4 className="text-xs uppercase font-black tracking-[0.3em] text-sunray mb-12">Contato</h4>
              <div className="space-y-10">
                <div 
                  onClick={() => window.open('mailto:contato@conectarefono.com.br')}
                  className="flex items-start space-x-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-sunray/10 transition-colors">
                    <MapPin size={20} className="text-sunray" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">Dúvidas?</p>
                    <p className="text-sm text-white/80 leading-relaxed">contato@conectarefono.com.br</p>
                  </div>
                </div>
                <div 
                  onClick={() => window.open('https://wa.me/5547999021436?text=Olá! Gostaria de falar com a Conectare.', '_blank')}
                  className="flex items-start space-x-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-sunray/10 transition-colors">
                    <MessageCircle size={20} className="text-sunray" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">WhatsApp</p>
                    <p className="text-sm text-white/80 leading-relaxed">(47) 99902-1436</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.4em] font-black text-white/70 text-center space-y-6 md:space-y-0">
            <p>© 2026 Fonoaudiologia Conectare • All Rights Reserved</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
              <span>GABRIELLY LONDERO - CRFa 3-12738</span>
              <span>CARLA ALVES - CRFa 3-12750</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (currentPath === '/diagnostico') {
    return <DiagnosticoPage onNavigate={navigate} />;
  }

  if (currentPath === '/depoimentos') {
    return <DepoimentosPage onNavigate={navigate} />;
  }

  if (currentPath.startsWith('/procedimentos/')) {
    const slug = currentPath.replace('/procedimentos/', '');
    return <ProcedimentoPage slug={slug} onNavigate={navigate} />;
  }

  return <Home onNavigate={navigate} />;
}
