// Sealed Letter Handler
const sealedLetter = document.getElementById('sealedLetter');
const mainContainer = document.getElementById('mainContainer');

sealedLetter.addEventListener('click', () => {
  sealedLetter.classList.add('hidden');
  mainContainer.style.display = 'block';
  // Start music when letter is opened
  startMusicOnInteraction();
});

// Background Music Setup
const music = document.getElementById('backgroundMusic');
const startTimeInSeconds = 35;

// Cursor flower animation
let isHoveringButton = false;
document.addEventListener('mousemove', (e) => {
  // Check if hovering over a button
  const isButton = e.target.tagName === 'BUTTON' || e.target.closest('button');
  
  if (isButton && !isHoveringButton) {
    isHoveringButton = true;
    document.body.style.cursor = 'url("./open_flower.png") 64 64, pointer';
  } else if (!isButton && isHoveringButton) {
    isHoveringButton = false;
    document.body.style.cursor = 'url("./close_flower.png") 64 64, default';
  }
});

// Start music on first user interaction (required by browsers)
let musicStarted = false;
const startMusicOnInteraction = () => {
  if (musicStarted) return;
  musicStarted = true;
  
  music.currentTime = startTimeInSeconds;
  music.volume = 0;
  music.fadeIn = function (duration) {
    const step = 0.01;
    const interval = (duration * 1000) / (1 / step);
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.3) {
        vol += step;
        this.volume = Math.min(vol, 0.3);
      } else {
        clearInterval(fade);
      }
    }, interval);
  };
  music.fadeIn(12);
  music.play().catch((e) => console.log('Audio play prevented:', e));
};

// Trigger music on first click anywhere
document.addEventListener('click', (e) => {
  // Ignora clicks su pulsanti per far partire la musica
  if (!(e.target.tagName === 'BUTTON' || e.target.closest('button'))) {
    startMusicOnInteraction();
  }
});
document.addEventListener('touchstart', startMusicOnInteraction);

// Create floating hearts
const heartsContainer = document.getElementById("hearts");
const heartSymbols = ["💕", "💖", "💗", "💝", "❤️", "🌹"];

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = Math.random() * 10 + 10 + "s";
  heart.style.animationDelay = Math.random() * 5 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 20000);
}

// Create hearts periodically
setInterval(createHeart, 800);
for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, i * 300);
}

// Button handlers
const proposal = document.getElementById("proposal");
const yesResponse = document.getElementById("yesResponse");
const noResponse = document.getElementById("noResponse");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const reconsiderBtn = document.getElementById("reconsiderBtn");
// Make "No" button require multiple clicks
let noClickCount = 0;
yesBtn.addEventListener("click", () => {
  proposal.classList.add("hidden");
  yesResponse.classList.remove("hidden");
  
  // Initial flower explosion - many flowers
  for (let i = 0; i < 50; i++) {
    setTimeout(createPetal, i * 50);
  }

  // Extra celebration hearts
  for (let i = 0; i < 30; i++) {
    setTimeout(createHeart, i * 100);
  }
  
  // Start continuous flower falling
  startContinuousFlowers();
  
  // Update countdown
  updateCountdown();
});

noBtn.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount === 1) {
    noBtn.textContent = "Sei sicura? 🥺";
  } else if (noClickCount === 2) {
    noBtn.textContent = "Sicura sicura? 😢";
  } else if (noClickCount === 3) {
    noBtn.textContent = "Ma proprio sicura? 💔";
  } else {
    proposal.classList.add("hidden");
    noResponse.classList.remove("hidden");
  }
});

reconsiderBtn.addEventListener("click", () => {
  noResponse.classList.add("hidden");
  yesResponse.classList.remove("hidden");
  
  // Initial flower explosion - many flowers
  for (let i = 0; i < 50; i++) {
    setTimeout(createPetal, i * 50);
  }

  // Celebration hearts
  for (let i = 0; i < 30; i++) {
    setTimeout(createHeart, i * 100);
  }
  
  // Start continuous flower falling
  startContinuousFlowers();
  
  // Update countdown
  updateCountdown();
});

// Make "No" button slightly harder to click (fun interaction)
noBtn.addEventListener("mouseenter", () => {
  if (noClickCount === 5) {
    noBtn.textContent = "Ne sei sicura? 🥺";
  }
  noClickCount++;
});

// Rose petal creation - falls from top of page
const flowerSymbols = ['🌸', '🌺', '🌼', '🌻', '🌷', '💐', '🏵️'];

function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)];
  petal.style.left = Math.random() * 100 + '%';
  petal.style.top = '-50px'; // Start from top
  petal.style.fontSize = (Math.random() * 20 + 20) + 'px';
  petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
  document.body.appendChild(petal);
  
  setTimeout(() => petal.remove(), 8000);
}

// Continuous flower falling
let flowerInterval = null;

function startContinuousFlowers() {
  // Clear any existing interval
  if (flowerInterval) {
    clearInterval(flowerInterval);
  }
  
  // Create flowers continuously every 800ms
  flowerInterval = setInterval(createPetal, 800);
}

// Countdown to Valentine's Day
function updateCountdown() {
  const valentine = new Date('2026-02-14');
  const today = new Date();
  const diff = valentine - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    countdownEl.textContent = days + (days === 1 ? ' giorno' : ' giorni');
  }
}

// "Ti amo!" clickable with heart explosion
const loveText = document.getElementById('loveText');
if (loveText) {
  loveText.addEventListener('click', (e) => {
    // Create explosion of hearts from click position
    const rect = loveText.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        heart.style.animation = 'none';
        document.body.appendChild(heart);
        
        let posX = centerX;
        let posY = centerY;
        let opacity = 1;
        const gravity = 0.5;
        let velY = vy;
        
        const animate = () => {
          posX += vx * 0.016;
          posY += velY * 0.016;
          velY += gravity;
          opacity -= 0.01;
          
          heart.style.left = posX + 'px';
          heart.style.top = posY + 'px';
          heart.style.opacity = opacity;
          
          if (opacity > 0) {
            requestAnimationFrame(animate);
          } else {
            heart.remove();
          }
        };
        
        animate();
      }, i * 20);
    }
    
    // Add shake animation to text
    loveText.style.animation = 'none';
    setTimeout(() => {
      loveText.style.animation = 'heartPulse 1.5s ease-in-out infinite';
    }, 10);
  });
}
