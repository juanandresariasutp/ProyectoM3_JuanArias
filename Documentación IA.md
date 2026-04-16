# Documentación de uso de IA en el proyecto

Este documento registra cómo se utilizó IA (GitHub Copilot / GPT-5.3-Codex) durante el desarrollo del proyecto Vegeta Chat SPA.

## 1) Prompt: Estructura inicial del proyecto
Contexto: inicio desde cero con una guía por pasos.
Objetivo: crear base de carpetas y archivos para SPA + API serverless + tests.
Instrucciones principales: separar src, api, tests, variables de entorno y archivos de configuración.
Resultado aplicado: estructura completa creada con carpetas src, api, tests, public y archivos base.

## 2) Prompt: Construir HTML base con tres vistas
Contexto: se necesitaba una SPA con navegación interna.
Objetivo: crear vistas Home, Chat y About en un solo index.
Instrucciones principales: definir secciones con ids y navegación interna.
Resultado aplicado: index.html con header, nav y secciones home/chat/about.

## 3) Prompt: Estilos mobile-first con identidad temática
Contexto: interfaz inicial muy básica.
Objetivo: aplicar diseño responsivo con estilo Dragon Ball.
Instrucciones principales: paleta oscura, acentos dorados, mensajes tipo burbuja y media queries.
Resultado aplicado: styles.css con diseño mobile-first y mejoras para tablet/desktop.

## 4) Prompt: Routing SPA con History API
Contexto: navegación debía funcionar sin recargar.
Objetivo: cambiar entre /home, /chat y /about con pushState y popstate.
Instrucciones principales: mapear rutas, mostrar/ocultar secciones y fallback a /home.
Resultado aplicado: app.js con router funcional y manejo de back/forward.

## 5) Prompt: Chat local en memoria
Contexto: antes de conectar IA se debía validar UX del chat.
Objetivo: enviar mensajes y simular respuesta de Vegeta.
Instrucciones principales: guardar historial y renderizar burbujas en pantalla.
Resultado aplicado: chat funcional en frontend con historial en memoria.

## 6) Prompt: Serverless Function para Gemini
Contexto: no exponer API key en frontend.
Objetivo: crear proxy backend en Vercel.
Instrucciones principales: endpoint POST, lectura de mensajes + systemPrompt, llamada a Gemini y respuesta JSON.
Resultado aplicado: api/chat.js implementado con validaciones y manejo de errores.

## 7) Prompt: Definir personalidad de Vegeta
Contexto: respuestas debían mantener personaje.
Objetivo: crear system prompt consistente.
Instrucciones principales: tono orgulloso, directo, arrogante y con referencias DBZ.
Resultado aplicado: prompt centralizado en src/utils.js y usado en cada solicitud.

## 8) Prompt: Integrar frontend con backend
Contexto: reemplazar respuestas simuladas por respuestas reales IA.
Objetivo: usar fetch a /api/chat enviando historial completo.
Instrucciones principales: agregar loading, manejo de error y render de respuesta final.
Resultado aplicado: chat conectado a backend con estado de carga y errores controlados.

## 9) Prompt: Escribir tests unitarios con Vitest
Contexto: requisito académico de mínimo 4 tests.
Objetivo: validar utilidades clave del proyecto.
Instrucciones principales: testear formateo, sanitización, armado de historial y prompt.
Resultado aplicado: tests en tests/utils.test.js y tests/chat.test.js (7 tests en total).

## 10) Prompt: Configurar despliegue en Vercel
Contexto: la SPA debía funcionar en producción.
Objetivo: servir frontend y mantener endpoint serverless activo.
Instrucciones principales: definir build/output y rewrites para rutas SPA.
Resultado aplicado: vercel.json ajustado y deployment productivo funcional.

## 11) Prompt: Mejorar diseño visual de la interfaz
Contexto: solicitud de rediseño moderno.
Objetivo: renovar UI con estilo más actual.
Instrucciones principales: glassmorphism, sombras, tipografía consistente y jerarquía visual.
Resultado aplicado: rediseño completo de home/chat/about con mejor experiencia visual.

## 12) Prompt: Integrar imagen local de Vegeta
Contexto: dependencia de imágenes externas poco estable.
Objetivo: usar asset local controlado en el proyecto.
Instrucciones principales: mover imagen a public/images y actualizar rutas.
Resultado aplicado: vegeta.png integrado y visible en header, portada y chat.

## 13) Prompt: Mejorar mensajes de error al usuario
Contexto: frontend mostraba errores genéricos.
Objetivo: exponer mensajes útiles desde backend.
Instrucciones principales: parsear respuesta JSON de error y renderizar texto claro.
Resultado aplicado: el chat ahora muestra causa real (falta key, cuota, etc.).

## 14) Prompt: Fallback de modelos Gemini
Contexto: intermitencias por saturación/cuota del modelo principal.
Objetivo: aumentar resiliencia de respuestas.
Instrucciones principales: intentar múltiples modelos en secuencia y devolver error consolidado.
Resultado aplicado: api/chat.js con fallback a modelos alternativos cuando falla el primario.

## 15) Prompt: Ajustar entorno local con Vite + Vercel Dev
Contexto: frontend y backend corrían en puertos distintos.
Objetivo: evitar errores de integración local.
Instrucciones principales: configurar root/publicDir y proxy /api en Vite.
Resultado aplicado: vite.config.js actualizado para flujo local estable.

## 16) Prompt: Corregir recarga en la ruta /chat
Contexto: al refrescar /chat se mostraba código fuente por colisión de ruta.
Objetivo: mantener la navegación SPA al recargar.
Instrucciones principales: renombrar módulo chat.js para evitar conflicto con ruta /chat.
Resultado aplicado: módulo renombrado a src/chat-ui.js e import actualizado en app.js.

## 17) Prompt: Asegurar descubrimiento de tests
Contexto: Vitest no detectaba tests fuera de src por herencia de config de Vite.
Objetivo: ejecutar pruebas desde raíz de forma consistente.
Instrucciones principales: crear config dedicada de Vitest y ajustar script test.
Resultado aplicado: vitest.config.js agregado y npm test funcionando con detección correcta.

## 18) Prompt: Documentación README técnica y visual
Contexto: faltaba documentación final de entrega.
Objetivo: cubrir instalación, ejecución, pruebas, deploy y uso de IA.
Instrucciones principales: estructurar README claro, con estilo visual y navegación interna.
Resultado aplicado: README.md completo con secciones técnicas y tabla de contenido.

## 19) Prompt: Publicación y control de cambios
Contexto: se necesitaba trazabilidad en entregas.
Objetivo: mantener historial limpio de commits por tema.
Instrucciones principales: commits semánticos en español y pushes controlados.
Resultado aplicado: historial organizado con cambios funcionales y de documentación separados.

## 20) Prompt: Variables de entorno seguras en producción
Contexto: la API key no estaba disponible en deployment.
Objetivo: habilitar la IA en Vercel sin exponer secretos.
Instrucciones principales: registrar GEMINI_API_KEY como variable de entorno del proyecto.
Resultado aplicado: chat operativo en producción con secretos fuera del código versionado.

## Buenas prácticas observadas con IA
- La IA se utilizó como asistente técnico y de documentación, no como reemplazo de validación humana.
- Cada cambio relevante se verificó con ejecución local, pruebas o validación en deployment.
- Se priorizó separación de responsabilidades entre frontend, utilidades, backend y configuración.
- Se mantuvo seguridad básica de secretos con .env local y variables en Vercel.
- Se trabajó con cambios incrementales para facilitar revisión y trazabilidad.

## Conclusión
La IA se utilizó de forma integral para diseñar, implementar, depurar, probar y documentar Vegeta Chat SPA.
El resultado final fue una SPA funcional, desplegable y mantenible, con identidad temática clara, backend seguro para Gemini y evidencia documental del proceso de desarrollo.
