import { API_KEY } from '../utils/config.js';
import { isAuthenticated } from '../utils/authentication.js';

export function apiClient() {
    const baseUrl = 'https://v2.api.noroff.dev';

    function buildRequestHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': API_KEY
        };

        if (isAuthenticated()) {
            const token = localStorage.getItem('auth_token');
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    /**
     * Sends a request to the specified endpoint and returns the response.
     * @param {string} endpoint - API endpoint. Appended to the API base URL.
     * @param {object} options - Fetch options. Method defaults to GET if omitted, plus optional body.
     * @returns {Promise<void>}
     */
    async function request(endpoint, options = {}) {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            ...options,
            headers: buildRequestHeaders()
        });
        
        const body = await response.json();
        
        if (!response.ok) {
            throw new Error(body.errors?.[0]?.message ?? 'Unexpected error occurred');
        }
        
        return body.data ?? body;
    }
    
    return {
        get: (endpoint) => request(endpoint),
        post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
        put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
        delete: (endpoint) => request(endpoint, { method: 'DELETE' })
    }
}