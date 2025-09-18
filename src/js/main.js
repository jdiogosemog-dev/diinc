// Arquivo: /src/js/main.js (Versão Final para Fundo CSS)

// ---- IMPORTAÇÕES E PLUGINS ----
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import 'photoswipe/style.css';
import { createIcons, icons } from 'lucide';
import { initDataLayer } from './lib/tracking.js';
import { initMobileMenu } from './components/mobileMenu.js';
import { initGalleryModal } from './components/galleryModal.js';
import { initSimpleModal } from './components/simpleModal.js';
import { openModal as openLeadModal } from './components/modalForm.js';

// Registra o plugin do GSAP para animações baseadas em scroll
gsap.registerPlugin(ScrollTrigger);

// ---- FUNÇÕES DE COMPONENTES ----
function initAnimatedTabs() {
    const tabsContainer = document.querySelector('#plantas-tabs');
    if (!tabsContainer) return;

    const buttons = tabsContainer.querySelectorAll('.tab-button');
    const indicator = tabsContainer.querySelector('#tab-indicator');
    const contentPanels = document.querySelectorAll('#plantas-content .tab-content');
    let currentActiveButton = tabsContainer.querySelector('.text-diinc-red');

    function setIndicator(button) {
        gsap.set(indicator, {
            width: button.offsetWidth,
            x: button.offsetLeft
        });
    }

    setIndicator(currentActiveButton);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button === currentActiveButton) return;
            const targetId = button.dataset.targetTab;
            const targetContent = document.getElementById(targetId);
            const currentContent = document.querySelector('.tab-content:not(.hidden)');

            gsap.to(indicator, {
                width: button.offsetWidth,
                x: button.offsetLeft,
                duration: 0.4,
                ease: 'power3.inOut'
            });

            currentActiveButton.classList.remove('text-diinc-red');
            currentActiveButton.classList.add('text-urban-charcoal');
            button.classList.add('text-diinc-red');
            button.classList.remove('text-urban-charcoal');
            currentActiveButton = button;
            
            const tl = gsap.timeline();
            if (currentContent) {
                tl.to(currentContent, {
                    autoAlpha: 0,
                    y: -20,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => currentContent.classList.add('hidden')
                });
            }
            if (targetContent) {
                targetContent.classList.remove('hidden');
                tl.fromTo(targetContent, 
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                );
            }
        });
    });

    window.addEventListener('resize', () => {
        if (currentActiveButton) {
            setIndicator(currentActiveButton);
        }
    });
}

// ---- FUNÇÃO PRINCIPAL DA APLICAÇÃO ----
function App() {
    // ---- INICIALIZAÇÕES GERAIS ----
    initDataLayer();
    createIcons({ icons });
    initMobileMenu();
    initAnimatedTabs();
    initGalleryModal();
    initSimpleModal();

    // ---- COREOGRAFIAS CINÉTICAS (ANIMAÇÕES) ----

    // 1. Animação do HERO
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline.fromTo('.hero-bg', { scale: 1.15, autoAlpha: 0.8 }, { scale: 1, autoAlpha: 1, duration: 2.5 });
    heroTimeline.from('.hero-title', { y: 80, opacity: 0, duration: 1.2 }, "-=2");
    heroTimeline.from('.hero-subtitle', { y: 50, opacity: 0, duration: 1 }, "-=0.8");
    heroTimeline.from('.hero-button', { y: 50, opacity: 0, duration: 1 }, "-=0.8");
    gsap.to('.hero-button', { scale: 1.03, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: heroTimeline.duration() });

    // 2. Animação da seção EMPREENDIMENTO
    const empreendimentoSection = document.querySelector('#empreendimento');
    if (empreendimentoSection) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: empreendimentoSection, start: "top 80%", toggleActions: "play none none none" } });
        tl.from(empreendimentoSection.querySelector('[data-anim="fade-in-left"]'), { x: -100, opacity: 0, duration: 1.2, ease: "power3.out" })
          .from(empreendimentoSection.querySelector('[data-anim="fade-in-right"]'), { x: 100, opacity: 0, duration: 1.2, ease: "power3.out" }, "<")
          .from(empreendimentoSection.querySelectorAll('[data-anim="stagger-item"]'), { y: 30, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }, "-=0.5");
    }

    // 3. Animação da seção LANÇAMENTOS
    const lancamentosSection = document.querySelector('#lancamentos');
    if(lancamentosSection) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: lancamentosSection, start: "top 80%", toggleActions: "play none none none" } });
        tl.from(lancamentosSection.querySelector('[data-anim="fade-in-up"]'), { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
          .from(lancamentosSection.querySelectorAll('[data-anim="stagger-card"]'), { y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' }, "-=0.5");
    }

    // 4. Animação da seção LOCALIZAÇÃO
    const localizacaoSection = document.querySelector('#localizacao');
    if (localizacaoSection) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: localizacaoSection, start: "top 80%", toggleActions: "play none none none" } });
        tl.from(localizacaoSection.querySelector('[data-anim="fade-in-up"]'), { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
          .from(localizacaoSection.querySelector('[data-anim="map-reveal"]'), { opacity: 0, scale: 0.95, duration: 1.2, ease: 'power3.out' }, "-=0.5")
          .from(localizacaoSection.querySelector('[data-anim="details-reveal"]'), { opacity: 0, x: 50, duration: 1, ease: 'power3.out'}, "-=0.8")
          .from(localizacaoSection.querySelectorAll('[data-anim="stagger-point"]'), { opacity: 0, x: 50, stagger: 0.2, duration: 0.8, ease: 'power2.out'}, "-=0.5");
    }

    // 5. Animação da seção CONTATO (Grand Finale)
    const contatoSection = document.querySelector('#contato');
    if(contatoSection) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: contatoSection, start: "top 85%", toggleActions: "play none none none" } });
        tl.from(contatoSection.querySelector('[data-anim="final-cta-title"]'), { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' })
          .from(contatoSection.querySelector('[data-anim="final-cta-text"]'), { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
          .from(contatoSection.querySelector('[data-anim="final-cta-button"]'), { opacity: 0, y: 50, duration: 1, ease: 'bounce.out'}, "-=0.5");
    }

    // ---- EVENT LISTENERS GERAIS ----
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productInterest = button.dataset.productInterest || 'Interesse Geral';
            openLeadModal(productInterest);
        });
    });
}

// ---- INICIALIZAÇÃO DO APP ----
document.addEventListener('DOMContentLoaded', App);