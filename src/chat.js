let conversationHistory = [];

const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function renderMessage(role, text) {
  const msgEl = document.createElement('p');
  msgEl.classList.add('message');
  msgEl.classList.add(role === 'user' ? 'user' : 'vegeta');
  msgEl.textContent = text;
  messagesDiv.appendChild(msgEl);
  
  // Hacer auto-scroll hasta el final
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  // Agregar y renderizar mensaje del usuario
  conversationHistory.push({ role: 'user', text });
  renderMessage('user', text);
  
  // Limpiar el input
  userInput.value = '';

  // Simular respuesta de Vegeta
  setTimeout(() => {
    const vegetaReply = "¡No me des órdenes, sabandija!";
    conversationHistory.push({ role: 'vegeta', text: vegetaReply });
    renderMessage('vegeta', vegetaReply);
  }, 600);
}

// Listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});
