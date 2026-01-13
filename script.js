/* =========================
   Corações animados apenas quando visíveis
========================= */
const heartsContainers = document.querySelectorAll('.hearts');

function createHeart(container) {
  const heart = document.createElement('span');
  heart.classList.add('heart');

  const riseDuration = 4 + Math.random() * 3;
  const pulseDuration = 0.8 + Math.random() * 0.8;

  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '0';
  heart.style.opacity = 0.4 + Math.random() * 0.6;
  heart.style.animationDuration = `${riseDuration}s, ${pulseDuration}s`;
  heart.style.transform = `scale(${0.6 + Math.random()}) rotate(-45deg)`;

  container.appendChild(heart);

  setTimeout(() => heart.remove(), riseDuration * 1000);
}

// Intersection Observer para ativar corações somente quando a section estiver visível
const heartsObserverOptions = {
  root: null,
  threshold: 0.1
};

const heartsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const container = entry.target.querySelector('.hearts');
      if (!container) return;

      // cria corações continuamente enquanto visível
      container.heartInterval = setInterval(() => createHeart(container), 400);
    } else {
      // para o intervalo de corações quando fora do viewport
      const container = entry.target.querySelector('.hearts');
      if (container && container.heartInterval) {
        clearInterval(container.heartInterval);
        container.heartInterval = null;
      }
    }
  });
}, heartsObserverOptions);

// Observa cada section que tem hearts
document.querySelectorAll('section').forEach(section => heartsObserver.observe(section));

/* =========================
   Efeito de digitação ao entrar no viewport
========================= */
const typingElements = document.querySelectorAll('.typing');

function typeText(el) {
  const text = el.dataset.text;
  let index = 0;

  function type() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100); // velocidade da digitação
    }
  }

  type();
}

// Intersection Observer para digitação
const typingObserverOptions = {
  root: null,
  threshold: 0.1
};

const typingObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeText(entry.target);
      observer.unobserve(entry.target); // digita apenas uma vez
    }
  });
}, typingObserverOptions);

typingElements.forEach(el => typingObserver.observe(el));

//Adicionando música

const music = document.getElementById('bg-music');

document.addEventListener('click', () => {
  if (music && music.paused) {
    music.play();
  }
}, { once: true });
