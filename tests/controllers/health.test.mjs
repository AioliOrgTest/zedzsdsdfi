import { expect, config } from "chai";
import request from 'supertest'
import app from "../../app/app.mjs";

config.includeStack = true

describe('Health Routes', () => {
  describe('GET /public/health/v1/ping', () => {
    it('should return pong', async () => {
      const response = await request(app)
        .get('/public/health/v1/ping')

      expect(response.status).to.eq(200);
      expect(response.text).to.eq('pong');
    });
  });

  describe('GET /health/v1/all', () => {
    it('should return OK status', async () => {
      const response = await request(app)
        .get('/health/v1/all')

      expect(response.status).to.eq(200);
      expect(response.body).to.deep.eq({
        summary: 'OK',
        remote:  {
          summary: 'OK',
        },
        local: {
          summary: 'OK',
        },
      });
    });
  });
});
