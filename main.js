import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Members Data Array
const membersData = [
  {
    id: "monokuro",
    name: "モノクロ",
    bgColor: "#ff66b2", // pop-pink
    rotation: "-12deg",
    icon: "/monokuro-icon.webp",
    link: "https://lit.link/monokuro8neat",
    hoverColorClass: "hover:border-[#ff00ff]", // Neon pink border effect
    type: "member"
  },
  {
    id: "meiso",
    name: "迷走だだだ",
    bgColor: "var(--color-pop-orange)",
    rotation: "6deg",
    icon: "/dadada-icon.webp",
    link: "https://x.com/DadadaMeisou?s=20",
    hoverColorClass: "hover:border-[#ffaa00]", // brighter orange border effect
    iconGlitchClass: "icon-glitch-orange", // Custom orange noise
    mascotAnimClass: "animate-fast-bounce", // Comical fast floating jump
    type: "member"
  },
  {
    id: "asamo",
    name: "AsaMo",
    bgColor: "var(--color-pop-blue)",
    rotation: "-6deg",
    icon: "/asamo-icon.webp",
    link: "https://lit.link/asamo",
    hoverColorClass: "hover:border-[#00ffff]", // Cyan neon border effect
    iconGlitchClass: "icon-glitch-blue", // Custom pale blue noise
    mascotAnimClass: "animate-smooth-float", // Elegant digital float
    type: "member"
  },
  {
    id: "kometsubu",
    name: "米粒元気",
    bgColor: "white",
    rotation: "12deg",
    icon: "/kometsubu-icon.webp",
    link: "https://www.instagram.com/kometsubugenki/?igsh=aGxqYzY4azhwZzJ4#",
    hoverColorClass: "hover:border-[#ffffff]", // White neon border effect
    iconGlitchClass: "icon-glitch-white", // Custom white noise
    mascotAnimClass: "animate-spin-float", // Zero gravity spin float
    type: "member"
  },
  {
    id: "kawakami",
    name: "川上牧場",
    bgColor: "black",
    rotation: "-12deg",
    icon: "/kawakami-icon.jpg",
    link: "https://lit.link/kawakamifarm",
    hoverColorClass: "hover:border-[#333333]", // Dark gray glow effect
    iconGlitchClass: "icon-glitch-black", // Extreme monochrome noise
    mascotAnimClass: "animate-dynamic-float", // Dynamic celebratory float
    type: "member"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  generateGaBackground();
  generateGaLining('ga-lining-1', 0);
  generateGaLining('ga-lining-2', 1);
  initHeroAnimations();
  renderMembers(); 
  initStepUpAnimation();

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
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }
});

const popColors = [
  '#ff66b2', // Pink
  '#ffcc00', // Yellow
  '#00ccff', // Blue
  '#00e676', // Green
  '#111111'  // Black
];

function generateGaLining(containerId, offset) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create a continuous line of logos
  const count = 40; 
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const color = popColors[(i + offset) % popColors.length];
    el.className = 'ga-lining-item mask-ga';
    el.style.backgroundColor = color;
    container.appendChild(el);
  }

  // Animate the line (scrolling effect)
  gsap.to(container, {
    x: '-50%',
    duration: 20,
    ease: 'none',
    repeat: -1
  });
}

function generateGaBackground() {
  const container = document.getElementById('ga-bg-container');
  if (!container) return;

  // Use a more robust check or lower threshold
  const isMobile = window.innerWidth < 768 || window.matchMedia("(max-width: 767px)").matches;
  const numLogos = isMobile ? 15 : 45; // Even fewer for extreme clarity
  const windowHeight = document.documentElement.scrollHeight;
  const windowWidth = document.documentElement.scrollWidth;

  for (let i = 0; i < numLogos; i++) {
    const el = document.createElement('div');
    const color = popColors[Math.floor(Math.random() * popColors.length)];
    const size = Math.floor(Math.random() * (isMobile ? 180 : 350)) + 100;
    const top = Math.random() * windowHeight;
    const left = Math.random() * windowWidth;
    const rot = Math.random() * 360;
    
    const animRotDuration = (Math.random() * 25) + 15;
    const rotDir = Math.random() > 0.5 ? 1 : -1;

    // Mobile: Extremely faint (0.07) to ensure 100% readability
    const baseOpacity = isMobile ? 0.07 : 0.3; 
    el.className = 'absolute mask-ga pointer-events-none mix-blend-multiply';
    el.style.opacity = baseOpacity;

    if (color === '#111111') {
       el.classList.remove('mix-blend-multiply');
       el.style.opacity = isMobile ? '0.01' : '0.05';
    }

    Object.assign(el.style, {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      top: `${top}px`,
      left: `${left}px`,
      transform: `translate(-50%, -50%) rotate(${rot}deg)`,
      zIndex: -1
    });

    gsap.to(el, {
      rotation: rot + (360 * rotDir),
      duration: animRotDuration,
      repeat: -1,
      ease: "none"
    });

    container.appendChild(el);

    // Dynamic floating effect
    gsap.to(el, {
      x: `+=${(Math.random() - 0.5) * (isMobile ? 80 : 200)}`,
      y: `+=${(Math.random() - 0.5) * (isMobile ? 80 : 200)}`,
      duration: (Math.random() * 6) + 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Parallax
    const scrollSpeed = (Math.random() * 0.4) - 0.2; 
    gsap.to(el, {
      y: () => scrollSpeed * 1200,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  }
}

function renderMembers() {
  const grid = document.getElementById('members-grid');
  if (!grid) return;

  // DIRECT DATA DEFINITION (as requested)
  const members = [
    {name: 'モノクロ', icon: '/monokuro-icon.webp', link: 'https://lit.link/monokuro8neat', color: '#ff66b2'},
    {name: '迷走だだだ', icon: '/dadada-icon.webp', link: 'https://x.com/DadadaMeisou?s=20', color: '#ff9933'},
    {name: 'AsaMo', icon: '/asamo-icon.webp', link: 'https://lit.link/asamo', color: '#a0d8ef'},
    {name: '米粒元気', icon: '/kometsubu-icon.webp', link: 'https://www.instagram.com/kometsubugenki/', color: '#ffffff'},
    {name: '川上牧場', icon: '/kawakami-icon.jpg', link: 'https://lit.link/kawakamifarm', color: '#333333'}
  ];

  // PHYSICAL HTML RECONSTRUCTION (Strictly following provided snippet)
  grid.innerHTML = members.map(m => `
    <div style="width: 90vw; max-width: 450px; margin-bottom: 4rem; position: relative; opacity: 1 !important; visibility: visible !important;">
      <a href="${m.link}" target="_blank" style="display: block; width: 100%; height: 100%; text-decoration: none;">
        <img src="${m.icon}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border: 4px solid ${m.color}; border-radius: 12px; display: block; opacity: 1 !important; visibility: visible !important;">
        <div style="position: absolute; bottom: -1rem; left: 50%; transform: translateX(-50%); background: black; border: 2px solid ${m.color}; color: white; padding: 0.5rem 2rem; white-space: nowrap; font-weight: 900; font-size: 1.5rem; z-index: 50; display: block !important; opacity: 1 !important;">
          ${m.name}
        </div>
      </a>
    </div>
  `).join('');
}

function initMemberScrollAnimations() {
  gsap.utils.toArray('.reveal-init').forEach((panel) => {
    gsap.to(panel, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 85%", // When the top of the panel hits 85% of screen height
        toggleActions: "play none none none"
      }
    });
  });
}

function initMemberTapHandler() {
  const isMobile = window.innerWidth < 768;
  if (!isMobile) return;

  const links = document.querySelectorAll('.member-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Prevent immediate navigation to show glitch
      e.preventDefault();
      const parent = link.closest('.oto-panel');
      const href = link.href;

      // Trigger glitch
      if (parent) {
        parent.classList.add('is-glitching');
        // Navigate after a short burst of glitch
        setTimeout(() => {
          window.open(href, '_blank');
          parent.classList.remove('is-glitching');
        }, 150);
      }
    });
  });
}

function initHeroAnimations() {
  const logo = document.getElementById('logo-container');
  const mascot = document.getElementById('hero-mascot');
  const mascotImg = document.getElementById('hero-mascot-img');
  const copy = document.getElementById('hero-copy');
  
  const isMobile = window.innerWidth < 768;

  // Set initial states
  gsap.set(copy, { opacity: 0, y: 20 });
  // Mascot initially sleeping
  gsap.set(mascotImg, { rotation: 80, y: 40 });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top -5%', // Wake up after a slight scroll
    onEnter: () => activateGagaga(),
    onLeaveBack: () => deactivateGagaga(),
  });

  function activateGagaga() {
    // 1. Logo intensely glitches
    logo.classList.add('is-glitching');
    setTimeout(() => logo.classList.remove('is-glitching'), 600);

    // 2. Mascot floats up from sleep!
    gsap.to(mascotImg, {
      duration: 1,
      rotation: -10, // slightly tilted action pose
      y: isMobile ? -80 : -150, // Reduced float on mobile
      x: isMobile ? -20 : -50,
      ease: 'back.out(1.5)'
    });

    // 3. Show Copy with bounce
    gsap.to(copy, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'bounce.out',
      delay: 0.2
    });
    
    // Add random glitch to logo occasionally
    if(!window.logoGlitchInterval) {
      window.logoGlitchInterval = setInterval(() => {
        if(Math.random() > 0.6) {
          logo.classList.add('is-glitching');
          setTimeout(() => logo.classList.remove('is-glitching'), 300);
        }
      }, isMobile ? 3000 : 2000); // Less frequent glitches on mobile
    }
  }

  function deactivateGagaga() {
    // Back to sleep
    gsap.to(mascotImg, {
      duration: 0.8,
      rotation: 80,
      y: 40,
      x: 0,
      ease: 'power2.in'
    });

    gsap.to(copy, {
      opacity: 0,
      y: 20,
      duration: 0.3
    });
    
    clearInterval(window.logoGlitchInterval);
    window.logoGlitchInterval = null;
  }
}

function initStepUpAnimation() {
  const progressPercent = 75; // Approx 200 members

  ScrollTrigger.create({
    trigger: '#stepup',
    start: 'top 50%', 
    onEnter: () => {
      // Animate progress bar fill height
      gsap.to('#progress-fill', {
        height: `${progressPercent}%`,
        duration: 2.5,
        ease: 'power3.inOut'
      });

      // Animate mascot going up
      gsap.to('#progress-mascot', {
        bottom: `${progressPercent}%`,
        duration: 2.5,
        ease: 'power3.inOut'
      });
    },
    once: true
  });
}
