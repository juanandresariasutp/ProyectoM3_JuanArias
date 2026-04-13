import { VEGETA_SYSTEM_PROMPT } from './utils.js';

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

// Función para mostrar indicador de carga
function renderLoading() {
  const msgEl = document.createElement('p');
  msgEl.classList.add('message', 'vegeta');
  msgEl.id = 'loading-message';
  msgEl.textContent = 'Escribiendo...';
  messagesDiv.appendChild(msgEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Función para remover el indicador de carga
function removeLoading() {
  const loadingEl = document.getElementById('loading-message');
  if (loadingEl) {
    loadingEl.remove();
  }
}

async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  // Agregar y renderizar mensaje del usuario
  conversationHistory.push({ role: 'user', text });
  renderMessage('user', text);
  
  // Limpiar el input y deshabilitar botón y campo
  userInput.value = '';
  userInput.disabled = true;
  sendBtn.disabled = true;

  renderLoading();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: conversationHistory,
        systemPrompt: VEGETA_SYSTEM_PROMPT
      })
    });

    removeLoading();

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      const backendMessage = errorPayload?.error || `Error en la red: ${response.status}`;
      throw new Error(backendMessage);
    }

    const data = await response.json();
    const vegetaReply = data.reply;

    conversationHistory.push({ role: 'vegeta', text: vegetaReply });
    renderMessage('vegeta', vegetaReply);
  } catch (error) {
    removeLoading();
    console.error('Error al conectar con la API:', error);
    renderMessage('vegeta', `Error: ${error.message}`);
  } finally {
    // Rehabilitar los controles
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
}

// Listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !sendBtn.disabled) handleSend();
});
