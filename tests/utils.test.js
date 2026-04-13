import { describe, it, expect } from 'vitest';
import { formatMessage, buildGeminiHistory, sanitizeInput, getSystemPrompt } from '../src/utils.js';

describe('Funciones Utilitarias de utils.js', () => {

    describe('formatMessage', () => {
        it('debe devolver un objeto con role, text y un timestamp numérico', () => {
            const msg = formatMessage('user', 'Hola Vegeta');
            expect(msg.role).toBe('user');
            expect(msg.text).toBe('Hola Vegeta');
            expect(typeof msg.timestamp).toBe('number');
        });
    });

    describe('buildGeminiHistory', () => {
        it('debe transformar los mensajes al formato de Gemini', () => {
            const input = [
                { role: 'user', text: 'hola' },
                { role: 'vegeta', text: 'insecto' }
            ];
            const result = buildGeminiHistory(input);
            expect(result).toHaveLength(2);
            expect(result[0].role).toBe('user');
            expect(result[0].parts[0].text).toBe('hola');
            expect(result[1].role).toBe('model');
            expect(result[1].parts[0].text).toBe('insecto');
        });

        it('debe retornar array vacío si no se pasa array', () => {
            expect(buildGeminiHistory(null)).toEqual([]);
        });
    });

    describe('sanitizeInput', () => {
        it('debe eliminar espacios al inicio y al final', () => {
            expect(sanitizeInput('  insecto  ')).toBe('insecto');
        });

        it('debe retornar null si el input está vacío o son puros espacios', () => {
            expect(sanitizeInput('   ')).toBeNull();
            expect(sanitizeInput('')).toBeNull();
            expect(sanitizeInput(null)).toBeNull();
        });
    });

    describe('getSystemPrompt', () => {
        it('debe devolver el system prompt y no estar vacío', () => {
            const prompt = getSystemPrompt();
            expect(prompt).toBeTypeOf('string');
            expect(prompt.length).toBeGreaterThan(0);
            expect(prompt).toContain('Vegeta');
        });
    });
});
