import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Members Data DEFINED LOCALLY as requested
const members = [
  {name: 'モノクロ', icon: '/monokuro-icon.webp', link: 'https://lit.link/monokuro8neat', color: '#ff66b2'},
  {name: '迷走だだだ', icon: '/dadada-icon.webp', link: 'https://x.com/DadadaMeisou?s=20', color: '#ff9933'},
  {name: 'AsaMo', icon: '/asamo-icon.webp', link: 'https://lit.link/asamo', color: '#a0d8ef'},
  {name: '米粒元気', icon: '/kometsubu-icon.webp', link: 'https://www.instagram.com/kometsubugenki/', color: '#ffffff'},
  {name: '川上牧場', icon: '/kawakami-icon.jpg', link: 'https://lit.link/kawakamifarm', color: '#333333'}
];

const popColors = ['#ff66b2', '#ff9933', '#a0d8ef', '#ffffff', '#333333'];

document.addEventListener('DOMContentLoaded', () => {
  generateGaLining('ga-lining-1', 0);
  generateGaLining('ga-lining-2', 1);
  renderMembers(); 
  generateMembersGlitchBg();
  initStepUpAnimation();
  initHeroAnimations();
  
  // URL Copy function
  const copyBtn = document.getElementById('copy-url-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const url = 'https://taida-no-gagaga-lp.vercel.app/';
      navigator.clipboard.writeText(url).then(() => {
        const btnText = copyBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = 'コピーしました！';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          btnText.textContent = originalText;
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }
});

function generateGaLining(containerId, offset) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const count = 40; 
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'ga-lining-item mask-ga';
    el.style.backgroundColor = popColors[(i + offset) % popColors.length];
    container.appendChild(el);
  }
  gsap.to(container, { x: '-50%', duration: 20, ease: 'none', repeat: -1 });
}

function renderMembers() {
  const grid = document.getElementById('members-grid');
  if (!grid) return;

  grid.innerHTML = members.map(m => `
    <div class="member-panel-container" style="width: 90vw; max-width: 450px; margin-bottom: 4rem; position: relative; opacity: 1 !important; visibility: visible !important; z-index: 20;">
      <a href="${m.link}" target="_blank" style="display: block; width: 100%; height: 100%; text-decoration: none;">
        <img src="${m.icon}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border: 4px solid ${m.color}; border-radius: 12px; display: block; opacity: 1 !important; visibility: visible !important; transition: transform 0.3s;" class="hover:scale-105">
        <div style="position: absolute; bottom: -1rem; left: 50%; transform: translateX(-50%); background: black; border: 2px solid ${m.color}; color: white; padding: 0.5rem 2rem; white-space: nowrap; font-weight: 900; font-size: 1.5rem; z-index: 50; display: block !important; opacity: 1 !important;" class="gagaga-text" data-text="${m.name}">
          ${m.name}
        </div>
      </a>
    </div>
  `).join('');
}

function generateMembersGlitchBg() {
  const container = document.getElementById('members-glitch-bg');
  if (!container) return;

  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 15 : 35;
  const assets = ['/mascot.png', '/logo-vertical.png'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const color = popColors[Math.floor(Math.random() * popColors.length)];
    const size = Math.floor(Math.random() * (isMobile ? 80 : 250)) + 50;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const rotation = Math.random() * 360;
    
    el.className = 'glitch-bg-item';
    el.style.width = `${size}px`;
    el.style.top = `${top}%`;
    el.style.left = `${left}%`;
    el.style.transform = `rotate(${rotation}deg)`;
    el.style.color = color;
    el.style.opacity = (Math.random() * 0.2) + 0.1;

    const img = document.createElement('img');
    img.src = asset;
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.filter = `sepia(1) saturate(10) hue-rotate(${Math.random() * 360}deg) brightness(0.8)`;
    
    el.appendChild(img);
    container.appendChild(el);

    // Parallax
    const speed = (Math.random() * 150) + 50;
    gsap.to(el, {
      y: i % 2 === 0 ? speed : -speed,
      ease: 'none',
      scrollTrigger: {
        trigger: '#members',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Flickering Glitch Effect via GSAP
    gsap.to(el, {
      opacity: 0.4,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      repeatDelay: Math.random() * 5,
      ease: "steps(1)"
    });
  }
}

function initStepUpAnimation() {
  ScrollTrigger.create({
    trigger: '#stepup',
    start: 'top 50%', 
    onEnter: () => {
      gsap.to('#progress-fill', { height: `75%`, duration: 2.5, ease: 'power3.inOut' });
      gsap.to('#progress-mascot', { bottom: `75%`, duration: 2.5, ease: 'power3.inOut' });
    },
    once: true
  });
}

function initHeroAnimations() {
  const logo = document.getElementById('logo-container');
  const mascotImg = document.getElementById('hero-mascot-img');
  const isMobile = window.innerWidth < 768;

  gsap.set(mascotImg, { rotation: 80, y: 40 });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top -5%',
    onEnter: () => {
      gsap.to(mascotImg, { duration: 1, rotation: -10, y: isMobile ? -80 : -150, ease: 'back.out(1.5)' });
      if(!window.logoGlitchInterval) {
        window.logoGlitchInterval = setInterval(() => {
          if(Math.random() > 0.7) {
            logo.classList.add('animate-shake');
            setTimeout(() => logo.classList.remove('animate-shake'), 300);
          }
        }, 2000);
      }
    }
  });
}
