/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Headphones
} from 'lucide-react';
import AudioOrbVisualizer from './AudioOrbVisualizer';

export interface TestimonialAudioItem {
  id: string;
  specialtyId: string;
  category: string;
  author: string;
  role: string;
  location: string;
  title: string;
  quote: string;
  audioSrc: string;
  durationSec: number;
  rating: number;
  initials: string;
  highlightText: string;
}

export const audioTestimonialsData: TestimonialAudioItem[] = [
  {
    id: 'manoel-infantil',
    specialtyId: 'infantil',
    category: 'Fala e Linguagem Infantil',
    author: 'Mãe do Manoel',
    role: 'Mãe de Paciente Infantil',
    location: 'Atendimento Conectare',
    title: '“O acompanhamento foi fundamental para o desenvolvimento da fala do Manoel.”',
    quote: 'Sempre que converso com outras mães, faço questão de falar o quanto foi fundamental o Manoel fazer esse acompanhamento com vocês da Conectare. Mesmo sendo online, o tratamento funciona muito bem e fez toda a diferença no desenvolvimento dele. É um cuidado muito especial e importante para a nossa família.',
    audioSrc: '/audio/depoimento-manoel-infantil.mp4',
    durationSec: 47,
    rating: 5,
    initials: 'MM',
    highlightText: 'Foi fundamental o Manoel fazer esse acompanhamento com vocês da Conectare. Fez toda a diferença no desenvolvimento dele.',
  },
  {
    id: 'voz-adulta',
    specialtyId: 'voz',
    category: 'Reabilitação Vocal',
    author: 'Paciente Conectare',
    role: 'Reabilitação e Saúde Vocal',
    location: 'Atendimento Conectare',
    title: '“Recuperei o conforto e a segurança na minha voz com a terapia.”',
    quote: 'Eu só tenho a agradecer imensamente à equipe Conectare por todo o carinho, paciência e dedicação no meu tratamento. A evolução na minha voz foi maravilhosa, sinto uma diferença enorme no meu dia a dia e agora consigo me comunicar com leveza e segurança. Muito obrigada!',
    audioSrc: '/audio/depoimento-voz-adulta.mp4',
    durationSec: 17,
    rating: 5,
    initials: 'PV',
    highlightText: 'A evolução na minha voz foi maravilhosa. Agora consigo me comunicar com leveza e segurança.',
  },
];

interface AudioTestimonialsSectionProps {
  onNavigate?: (path: string) => void;
  isStandalonePage?: boolean;
}

export default function AudioTestimonialsSection({
  onNavigate,
  isStandalonePage = false,
}: AudioTestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(audioTestimonialsData[0].durationSec);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const activeTestimonial = audioTestimonialsData[activeIndex];

  // Sync duration when active testimonial changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(activeTestimonial.durationSec);
    setIsLoadingAudio(false);
    setShowFullTranscript(false);

    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      audioElementRef.current.src = activeTestimonial.audioSrc;
      audioElementRef.current.load();

      if (isPlaying) {
        setIsLoadingAudio(true);
        audioElementRef.current.play().then(() => {
          setIsLoadingAudio(false);
        }).catch((err) => {
          console.warn('Playback interrupted:', err);
          setIsPlaying(false);
          setIsLoadingAudio(false);
        });
      }
    }
  }, [activeIndex]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoadingAudio(true);
    const onCanPlay = () => setIsLoadingAudio(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoadingAudio(true);
      audio.play().then(() => {
        setIsLoadingAudio(false);
      }).catch((err) => {
        console.warn('Audio play request failed:', err);
        setIsLoadingAudio(false);
      });
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (audioElementRef.current) {
      audioElementRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section 
      id="depoimentos-audio" 
      className={`relative overflow-hidden ${isStandalonePage ? 'pt-32 pb-24 min-h-screen' : 'py-20 md:py-32'}`}
    >
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioElementRef}
        src={activeTestimonial.audioSrc}
        preload="metadata"
      />

      {/* Decorative Subtle Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(233,190,95,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section Header - Minimalist & Refined */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunray/10 border border-sunray/20 text-sunray mb-4 backdrop-blur-sm">
            <Headphones size={13} className="text-sunray" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-warm-gray">
              Depoimentos em Áudio
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-warm-gray leading-tight tracking-tight">
            Vozes da <span className="italic font-light text-sunray">transformação</span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed max-w-lg mx-auto font-medium">
            Ouça relatos reais de quem recuperou a segurança, a fluência e a alegria de se comunicar.
          </p>
        </div>

        {/* Minimalist Segmented Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {audioTestimonialsData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-sunray text-gray-900 shadow-sm font-bold'
                    : 'bg-white/70 hover:bg-white text-warm-gray border border-blond/60 hover:border-sunray/30'
                }`}
              >
                {item.category.replace(' & Fluência Adulta', '').replace(' & Voz Profissional', '')}
              </button>
            );
          })}
        </div>

        {/* Main Acoustic Stage - Minimalist Obsidian Card with Conectare IDV */}
        <div className="relative rounded-[2.5rem] bg-[#151412] border border-sunray/15 text-white shadow-[0_25px_60px_-15px_rgba(20,19,17,0.3)] overflow-hidden max-w-4xl mx-auto">
          
          {/* Subtle Ambient Golden Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(233,190,95,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[radial-gradient(circle_at_bottom_left,rgba(248,240,219,0.05)_0%,transparent_70%)] pointer-events-none" />

          {/* Grid Layout: Left Content & Right 3D Visualizer */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center p-8 sm:p-10 md:p-12 relative z-10">
            
            {/* Left Column: Author Info, Highlight Quote & Minimalist Player */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Category Pill Tag */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sunray" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-sunray/90">
                    {activeTestimonial.category}
                  </span>
                </div>

                {/* Highlight Quote */}
                <blockquote className="text-xl sm:text-2xl font-serif text-white/95 font-light leading-snug tracking-tight">
                  “{activeTestimonial.highlightText}”
                </blockquote>

                {/* Patient Signature */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sunray/15 text-sunray font-serif font-bold flex items-center justify-center text-xs border border-sunray/30 shrink-0">
                    {activeTestimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white tracking-wide">
                      {activeTestimonial.author}
                    </div>
                    <div className="text-xs text-white/50 font-sans">
                      {activeTestimonial.role} • {activeTestimonial.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Expandable Full Transcript */}
              <div>
                <button
                  onClick={() => setShowFullTranscript(!showFullTranscript)}
                  className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-sunray transition-colors cursor-pointer"
                >
                  <span>{showFullTranscript ? 'Ocultar relato completo' : 'Ler relato completo'}</span>
                  {showFullTranscript ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
                {showFullTranscript && (
                  <p className="mt-3 text-xs sm:text-sm text-white/75 font-sans leading-relaxed italic border-l-2 border-sunray/40 pl-3 py-1">
                    "{activeTestimonial.quote}"
                  </p>
                )}
              </div>

              {/* Minimalist Integrated Audio Controller */}
              <div className="pt-2 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  {/* Primary Tactile Golden Play/Pause Button */}
                  <button
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? 'Pausar áudio' : 'Reproduzir áudio'}
                    className="w-12 h-12 rounded-full bg-sunray text-gray-900 flex items-center justify-center shadow-[0_0_20px_rgba(233,190,95,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shrink-0"
                  >
                    {isLoadingAudio ? (
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} className="translate-x-0.5" fill="currentColor" />
                    )}
                  </button>

                  {/* Scrubber Timeline */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="relative flex items-center group cursor-pointer">
                      <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        step={0.1}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#E9BE5F] focus:outline-none"
                      />
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-sunray rounded-lg pointer-events-none"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                      <span>{formatTime(currentTime)}</span>
                      {isPlaying && (
                        <div className="flex items-center gap-1 h-2.5" title="Áudio ativo">
                          <span className="w-0.5 bg-sunray rounded-full h-1.5 animate-pulse" />
                          <span className="w-0.5 bg-sunray rounded-full h-2.5 animate-pulse" />
                          <span className="w-0.5 bg-sunray rounded-full h-1 animate-pulse" />
                        </div>
                      )}
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Discreet Volume / Mute Button */}
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    title={isMuted ? 'Desmutar' : 'Mutar'}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>

                {/* Specialty Link */}
                <div className="pt-1">
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(`/procedimentos/${activeTestimonial.specialtyId}`);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-sunray/80 hover:text-sunray transition-colors cursor-pointer group font-medium"
                  >
                    <span>Conhecer tratamento para {activeTestimonial.category}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Audio Orb Visualizer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div 
                onClick={togglePlayPause}
                className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] flex items-center justify-center cursor-pointer group"
                title={isPlaying ? 'Clique para pausar' : 'Clique para ouvir'}
              >
                {/* Radial Glow underneath the Orb */}
                <div className={`absolute inset-4 rounded-full transition-all duration-700 pointer-events-none ${
                  isPlaying 
                    ? 'bg-[radial-gradient(circle,rgba(233,190,95,0.25)_0%,rgba(233,190,95,0.06)_50%,transparent_70%)] scale-110' 
                    : 'bg-[radial-gradient(circle,rgba(233,190,95,0.08)_0%,transparent_60%)] scale-95 group-hover:scale-100'
                }`} />

                {/* The Three.js WebGL Component */}
                <AudioOrbVisualizer
                  isPlaying={isPlaying}
                  audioElementRef={audioElementRef}
                  className="w-full h-full"
                />

                {/* Subtle Hover Play/Pause Indicator (Non-intrusive) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-sunray/90 text-gray-900 flex items-center justify-center shadow-lg backdrop-blur-xs">
                    {isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} className="translate-x-0.5" fill="currentColor" />
                    )}
                  </div>
                </div>
              </div>

              {/* Minimal caption below orb */}
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mt-2">
                {isPlaying ? '● Ressonância Acústica' : 'Clique para interagir'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
