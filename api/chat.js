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

    // Usando el modelo actual gemini-2.5-flash (el anterior gemini-pro/1.5-flash está descontinuado para tu cuenta)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geminiBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de Gemini:', errorData);
      return res.status(response.status).json({ error: 'Error comunicándose con Gemini.' });
    }

    const data = await response.json();
    
    // Extraer la respuesta del objeto que devuelve Gemini
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No tengo respuesta para ti, insecto.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error interno del servidor:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
