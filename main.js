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
  },
  { type: "placeholder", bgColor: "#ffcc00", content: "!" },
  { type: "placeholder", bgColor: "var(--color-pop-pink)", content: "?", textWhite: true },
  { type: "placeholder", bgColor: "var(--color-pop-blue)", content: "♬" },
  { type: "placeholder", bgColor: "#00e676", content: "ガガガ", isText: true },
  { type: "placeholder", bgColor: "white", content: "★" }
];

document.addEventListener('DOMContentLoaded', () => {
  generateGaBackground();
  initHeroAnimations();
  renderMembers(); // Add render call
  initStepUpAnimation();
});

const popColors = [
  '#ff66b2', // Pink
  '#ffcc00', // Yellow
  '#00ccff', // Blue
  '#00e676', // Green
  '#111111'  // Black
];

function generateGaBackground() {
  const container = document.getElementById('ga-bg-container');
  if (!container) return;

  const numLogos = 35; // Fewer logos for a cleaner pop art feel
  const windowHeight = document.documentElement.scrollHeight;
  const windowWidth = document.documentElement.scrollWidth;

  for (let i = 0; i < numLogos; i++) {
    const el = document.createElement('div');
    const color = popColors[Math.floor(Math.random() * popColors.length)];
    const size = Math.floor(Math.random() * 400) + 150; // 150px to 550px
    const top = Math.random() * windowHeight;
    const left = Math.random() * windowWidth;
    const rot = Math.random() * 360;
    
    // Playful rotation animation duration
    const animRotDuration = (Math.random() * 20) + 10;
    const rotDir = Math.random() > 0.5 ? 1 : -1;

    el.className = 'absolute mask-ga pointer-events-none mix-blend-multiply';
    if (color === '#111111') {
       el.classList.remove('mix-blend-multiply');
       el.style.opacity = '0.1'; // Make black logos very faint
    } else {
       el.style.opacity = '0.6'; // Colorful ones more solid
    }

    Object.assign(el.style, {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      top: `${top}px`,
      left: `${left}px`,
      transform: `translate(-50%, -50%) rotate(${rot}deg)`
    });

    // Make them slowly spin
    gsap.to(el, {
      rotation: rot + (360 * rotDir),
      duration: animRotDuration,
      repeat: -1,
      ease: "none"
    });

    container.appendChild(el);

    // Subtle parallax float
    const scrollSpeed = (Math.random() * 0.5) - 0.25; 
    gsap.to(el, {
      y: () => scrollSpeed * 1000,
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

  grid.innerHTML = membersData.map(member => {
    if (member.type === 'placeholder') {
      const textColor = member.textWhite ? 'text-white' : '';
      const textClass = member.isText ? 'font-display text-2xl font-black' : 'text-6xl font-black';
      return `
        <div class="group relative w-full aspect-square pop-border oto-panel pop-shadow-black flex items-center justify-center" style="background-color: ${member.bgColor}">
          <span class="${textClass} opacity-30 group-hover-shake ${textColor}">${member.content}</span>
        </div>
      `;
    }

    // Standard Member Rendering
    const textColor = member.bgColor === 'black' ? 'text-white' : 'text-black';
    const strokeClass = member.bgColor === '#ff66b2' ? 'text-white text-stroke-black' : '';
    const shadowClass = member.bgColor === 'black' ? 'pop-shadow-pink' : 'pop-shadow-black';
    
    // Customizations
    const iGlitch = member.iconGlitchClass || 'icon-glitch';
    const mAnim = member.mascotAnimClass || 'animate-bounce';
    
    // Icon rendering if present
    let contentHtml = `<span class="font-display ${member.name.length > 4 ? 'text-2xl' : 'text-3xl'} font-black ${textColor} ${strokeClass} group-hover-shake gagaga-text z-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" style="transform: rotate(${member.rotation});" data-text="${member.name}">${member.name}</span>`;
    
    if (member.icon && member.link) {
      contentHtml = `
        <a href="${member.link}" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-30 flex items-center justify-center p-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
          <img src="${member.icon}" alt="${member.name}" class="w-full h-full object-contain ${iGlitch} drop-shadow-xl hover:scale-110 transition-transform" />
        </a>
        <div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
          ${contentHtml}
        </div>
      `;
    }

    return `
      <div class="group relative w-full aspect-square cursor-pointer flex items-center justify-center pop-border oto-panel ${shadowClass} transition-colors duration-300 ${member.hoverColorClass || ''}" style="background-color: ${member.bgColor}">
        ${contentHtml}
        <div class="absolute inset-x-0 bottom-0 h-1/2 flex items-end justify-center translate-y-full group-hover:translate-y-4 transition-transform duration-200 z-10 pointer-events-none">
           <img src="/mascot.webp" class="w-full h-full object-cover ${mAnim} opacity-80 mix-blend-screen" alt="ひょっこり" />
        </div>
      </div>
    `;
  }).join('');
}

function initHeroAnimations() {
  const logo = document.getElementById('logo-container');
  const mascot = document.getElementById('hero-mascot');
  const mascotImg = document.getElementById('hero-mascot-img');
  const copy = document.getElementById('hero-copy');
  
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
      y: -150,
      x: -50,
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
      }, 2000);
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
