/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import AudioTestimonialsSection from './AudioTestimonialsSection';
import { ArrowLeft, MessageCircle, Star, CheckCircle2, Heart, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface DepoimentosPageProps {
  onNavigate: (path: string) => void;
}

const whatsappFeedbacks = [
  { image: '/Feedback1.jpeg', alt: 'Feedback WhatsApp 1' },
  { image: '/Feedback2.jpeg', alt: 'Feedback WhatsApp 2' },
  { image: '/Feedback3.jpeg', alt: 'Feedback WhatsApp 3' },
  { image: '/Feedback4.jpeg', alt: 'Feedback WhatsApp 4' },
  { image: '/FeedBack5.jpeg', alt: 'Feedback WhatsApp 5' },
];

export default function DepoimentosPage({ onNavigate }: DepoimentosPageProps) {
  return (
    <div className="min-h-screen bg-[#FEFDF6] text-warm-gray relative selection:bg-sunray/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-tr from-[#FEFDF6] via-[#FFFFFF] to-[#FDFBF2]">
        <div className="absolute top-[-10%] right-[5%] w-[45vw] h-[45vw] rounded-full opacity-90 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50vw] h-[50vw] rounded-full opacity-90 bg-[radial-gradient(circle_at_center,rgba(253,251,242,0.6)_0%,transparent_70%)]" />
      </div>

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blond py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-warm-gray hover:text-sunray transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Início</span>
          </button>

          <div 
            onClick={() => onNavigate('/')}
            className="h-9 w-36 bg-warm-gray cursor-pointer" 
            style={{ 
              maskImage: 'url(/logo.png)', 
              WebkitMaskImage: 'url(/logo.png)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center center'
            }}
            role="img"
            aria-label="Conectare Logo"
          />

          <button
            onClick={() => onNavigate('/diagnostico')}
            className="bg-sunray text-gray-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow cursor-pointer hidden sm:block"
          >
            Agendar Consulta
          </button>
        </div>
      </header>

      {/* Main Interactive Audio Testimonial Section */}
      <main className="relative z-10">
        <AudioTestimonialsSection onNavigate={onNavigate} isStandalonePage={true} />

        {/* WhatsApp Testimonials Visual Wall */}
        <section className="py-20 bg-white/60 border-t border-blond/40">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-warm-gray font-black uppercase text-xs tracking-[0.3em] mb-4 block">
                Galeria de Resultados
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-warm-gray">
                Feedbacks espontâneos via <span className="italic font-light text-sunray">WhatsApp</span>
              </h2>
              <p className="mt-4 text-sm text-gray-600 font-medium">
                Mensagens reais de carinho e gratidão enviadas diretamente às nossas fonoaudiólogas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whatsappFeedbacks.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-4 rounded-[2rem] border border-blond/40 shadow-sm hover:shadow-md hover:border-sunray/30 transition-all duration-300"
                >
                  <div className="rounded-2xl overflow-hidden bg-off-white">
                    <img 
                      src={item.image} 
                      alt={item.alt}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 px-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-warm-gray">
                    <span className="flex items-center gap-1.5 text-sunray">
                      <CheckCircle2 size={13} />
                      Mensagem Autêntica
                    </span>
                    <Heart size={13} className="text-sunray/50" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Final CTA */}
            <div className="mt-20 p-10 md:p-14 rounded-[3rem] bg-warm-gray text-white text-center max-w-3xl mx-auto shadow-xl">
              <h3 className="text-3xl md:text-4xl font-serif mb-4">
                Quer escrever a sua história de sucesso?
              </h3>
              <p className="text-sm text-white/80 max-w-lg mx-auto mb-8 leading-relaxed font-sans font-light">
                Agende uma triagem com Dra. Gabrielly Londero ou Dra. Carla Alves e receba um direcionamento humanizado e acolhedor.
              </p>
              <button
                onClick={() => onNavigate('/diagnostico')}
                className="bg-sunray text-gray-900 px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.25em] hover:scale-105 transition-all shadow-lg cursor-pointer"
              >
                Iniciar Diagnóstico Online
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="py-10 bg-[#1A1A1A] text-white/70 text-center text-xs tracking-widest uppercase">
        <p>© 2026 Conectare Fonoaudiologia On-line • Gabrielly Londero & Carla Alves</p>
      </footer>

    </div>
  );
}
