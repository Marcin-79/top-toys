const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
    test('GET /api/toys should return paginated results', async () => {
        const response = await request(app)
            .get('/api/toys')
            .set('x-api-key', process.env.API_KEY);
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pagination');
    });

    test('Should respect rate limits', async () => {
        // Make multiple requests
        const requests = Array(101).fill().map(() => 
            request(app).get('/api/toys')
        );
        
        const responses = await Promise.all(requests);
        const lastResponse = responses[responses.length - 1];
        
        expect(lastResponse.status).toBe(429);
    });
}); 