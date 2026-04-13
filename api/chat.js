export default async function handler(req, res) {
  // Aceptar solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Falta la API Key de Gemini en el servidor.' });
    }

    const { messages, systemPrompt } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Formato de mensajes inválido.' });
    }

    // Adaptar el historial al formato de Gemini
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const geminiBody = {
      system_instruction: {
        parts: [{ text: systemPrompt || "Eres Vegeta, el Príncipe de los Saiyajins." }]
      },
      contents
    };

    // Fallback entre modelos para evitar caídas por alta demanda.
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite'
    ];

    let lastError = null;

    for (const model of candidateModels) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(geminiBody)
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No tengo respuesta para ti, insecto.';
        return res.status(200).json({ reply });
      }

      const errorData = await response.json();
      lastError = { status: response.status, body: errorData, model };
      console.error(`Error de Gemini (${model}):`, errorData);

      // Reintentamos con otro modelo solo en errores temporales.
      if (response.status !== 429 && response.status !== 503) {
        return res.status(response.status).json({ error: 'Error comunicándose con Gemini.' });
      }
    }

    console.error('Todos los modelos fallaron:', lastError);
    return res.status(503).json({ error: 'Gemini está ocupado en este momento. Intenta de nuevo en unos segundos.' });

  } catch (error) {
    console.error('Error interno del servidor:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
