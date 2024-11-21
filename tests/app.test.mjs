import { expect, config } from "chai";
import request from 'supertest'
import app from "../app/app.mjs";

config.includeStack = true

describe('App Routes', async () => {
  describe('Error Handling', async () => {
    it('should return 404 for non-existent health endpoints', async () => {
      const response = await request(app)
        .get('/nonexistent')
      
      expect(response.status).to.be.eq(404);
    });

    it('should not allow external requests', async () => {
      try {
        await request('https://www.google.com').get('/');
      } catch (err) {
        expect(err.message).to.include('Nock: Disallowed net connect');
      }
    });
  });
});
