import './src/style.css'

// Scroll Reveal Logic
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', reveal);
reveal();

// --- Medium Priority Feature Logic ---

// 1. Chatbot Logic
const chatBubble = document.querySelector('.chat-bubble');
const chatWindow = document.querySelector('.chat-window');
const chatInput = document.querySelector('#chat-input');
const chatSend = document.querySelector('#chat-send');
const chatMessages = document.querySelector('#chat-messages');

chatBubble.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
});

const addMsg = (text, type) => {
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.innerText = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatSend.addEventListener('click', () => {
  const query = chatInput.value.trim().toLowerCase();
  if (!query) return;
  addMsg(chatInput.value, 'user');
  chatInput.value = '';

  setTimeout(() => {
    if (query.includes('price') || query.includes('cost')) {
      addMsg('Standard procedure is $850. Insurance often covers all but $250.', 'bot');
    } else if (query.includes('slot') || query.includes('time') || query.includes('book')) {
      addMsg('Check our Calendar section for live slots! Most Thursdays are open.', 'bot');
    } else {
      addMsg('Dr. Vance is currently in surgery. Would you like to escalate to WhatsApp staff?', 'bot');
    }
  }, 800);
});

// 2. Cost Calculator
const calcDeductible = document.querySelector('#calc-deductible');
const calcCopay = document.querySelector('#calc-copay');
const calcResult = document.querySelector('#calc-result');

const updateCalc = () => {
  const base = 850;
  const ded = parseFloat(calcDeductible.value) / 100;
  const copay = parseFloat(calcCopay.value);
  const total = (base * ded) + copay;
  calcResult.innerText = `Estimated Total: $${total.toFixed(2)}`;
};

calcDeductible.addEventListener('input', updateCalc);
calcCopay.addEventListener('input', updateCalc);

// 3. Calendar Slots
const grid = document.querySelector('#slot-grid');
const dateInput = document.querySelector('#calendar-date');

const genSlots = () => {
  grid.innerHTML = '';
  const times = ['08:00', '09:00', '10:30', '13:00', '14:30', '16:00'];
  times.forEach(t => {
    const div = document.createElement('div');
    div.className = 'nm-inset slot';
    div.innerText = t;
    div.onclick = () => {
      document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
      div.classList.add('selected');
    };
    grid.appendChild(div);
  });
};

dateInput.addEventListener('change', genSlots);
genSlots(); // init

// --- Existing Form Logic ---
document.querySelector('#booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = 'Requesting...';
    btn.disabled = true;
    setTimeout(() => {
        alert('Consultation request secured. Check email for details.');
        btn.innerText = 'Finalized';
    }, 1500);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});
