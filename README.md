# Vegeta Chat SPA 👑💬

## ⚡ Saiyajin Chat con IA

Aplicación SPA (Single Page Application) construida con JavaScript vanilla donde el usuario conversa con Vegeta usando Google Gemini.

Tiene 3 vistas principales:
- 🏠 Home
- 💬 Chat
- ℹ️ About

Incluye navegación SPA con History API, backend serverless en Vercel para proteger la API key y pruebas unitarias con Vitest.

---

## Índice

- [Demo en Producción](#demo)
- [Personalidad de Vegeta](#personalidad)
- [Tecnologías](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estructura del Proyecto](#estructura)
- [Requisitos Previos](#requisitos)
- [Variables de Entorno](#variables)
- [Instalación](#instalacion)
- [Ejecución Local](#ejecucion)
- [Scripts](#scripts)
- [Tests Unitarios con Vitest](#tests)
- [Despliegue en Vercel](#despliegue)
- [Uso de IA Durante el Desarrollo](#uso-ia)
- [Autor](#autor)

---

## 🌐 Demo en Producción <a id="demo"></a>

- https://vegeta-chat-spa.vercel.app

---

## 👑 Personalidad de Vegeta <a id="personalidad"></a>

Este proyecto no usa respuestas genéricas: el chat está diseñado para responder con el carácter de Vegeta.

Rasgos principales implementados:
- 💪 Orgulloso y dominante: se presenta como el Príncipe de los Saiyajins.
- ⚔️ Arrogante y competitivo: minimiza a los demás y marca superioridad.
- 🎯 Directo y cortante: evita respuestas largas y va al punto.
- 🎭 En personaje siempre: mantiene el rol de Dragon Ball Z en toda la conversación.
- 🌌 Referencias del universo DBZ: usa contexto de personajes, transformaciones y rivalidades.

Estilo esperado de respuesta:
- "Habla rápido, insecto."
- "Kakaroto no está a mi nivel."
- "Yo no doy explicaciones, doy órdenes."

---

## 🛠️ Tecnologías <a id="tecnologias"></a>

- HTML5
- CSS3 (mobile-first)
- JavaScript vanilla (ES Modules)
- Vite
- Vitest
- Vercel Serverless Functions
- Google Gemini API

---

## ✨ Funcionalidades <a id="funcionalidades"></a>

- Routing SPA entre /home, /chat y /about sin recarga completa.
- Chat con historial en memoria enviado completo al backend.
- Integración con Gemini usando system prompt de Vegeta.
- Manejo de errores en UI cuando falla red o API.
- Diseño responsive mobile-first con estilo temático Dragon Ball.

---

## 🗂️ Estructura del Proyecto <a id="estructura"></a>

```txt
ProyectoM3_JuanArias/
├── api/
│   └── chat.js
├── public/
│   └── images/
│       └── vegeta.png
├── src/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── chat-ui.js
│   └── utils.js
├── tests/
│   ├── utils.test.js
│   └── chat.test.js
├── .env.example
├── package.json
├── vercel.json
├── vite.config.js
└── vitest.config.js
```

---

## ✅ Requisitos Previos <a id="requisitos"></a>

- Node.js 18+
- npm
- Cuenta en Vercel
- API key de Gemini

---

## 🔐 Variables de Entorno <a id="variables"></a>

Crear un archivo .env en la raíz:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

No subas .env al repositorio.

---

## 📦 Instalación <a id="instalacion"></a>

```bash
npm install
```

---

## ▶️ Ejecución Local <a id="ejecucion"></a>

Para correr frontend y backend local:

1. Terminal 1
```bash
npx vercel dev
```

2. Terminal 2
```bash
npm run dev
```

Luego abre la URL de Vite (por ejemplo: http://localhost:5173).

Notas:
- Vite usa proxy para enviar /api a localhost:3000.
- Si 5173 está ocupado, Vite toma otro puerto automáticamente.

---

## 📜 Scripts <a id="scripts"></a>

```bash
npm run dev
npm run build
npm test
```

---

## 🧪 Tests Unitarios con Vitest <a id="tests"></a>

Ejecución:

```bash
npm test -- --run
```

Estado actual:
- 2 archivos de test
- 7 tests en total
- requisito mínimo de 4 tests cumplido

---

## 🚀 Despliegue en Vercel <a id="despliegue"></a>

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. En Settings > Environment Variables agrega:
   - GEMINI_API_KEY
4. Haz deploy.
5. Verifica rutas SPA y endpoint /api/chat.

---

## 🤖 Uso de IA Durante el Desarrollo <a id="uso-ia"></a>

Se usó GitHub Copilot para acelerar implementación y refactorización.

Prompts usados como referencia:
- "Implementa routing SPA con History API para /home, /chat y /about"
- "Conecta el frontend con /api/chat enviando historial completo"
- "Escribe tests unitarios con Vitest para utils.js"
- "Configura Vercel para SPA con serverless functions"

La arquitectura final y las validaciones fueron revisadas manualmente.

---

## Autor del proyecto ✍️

Juan Andrés Arias Tascón

🎓 Ingeniero de Sistemas | Desarrollador de Software  
👨‍💻 Desarrollador Web en formación – 2026

⭐ Proyecto creado con fines educativos y de práctica.

Módulo 3 - Proyecto Integrador  
Soy Henry - Bootcamp de Desarrollo Full Stack
