import { createServer } from 'http';
import request from 'supertest';
import app from './app.js';
import { redisClient } from './lib/index.js';

let server: ReturnType<typeof createServer>;

beforeAll(async () => {
  await redisClient.connect();
  server = createServer(app.callback());
});

afterAll(async () => {
  await redisClient.quit();
  server.close();
});

describe('E2E GraphQL - pixKey query', () => {
  it('should return pixKey details for a valid key and token', async () => {
    const query = `
      query {
        pixKey(key: "47742663023") {
          key
          keyType
          account {
            participant
            branch
            accountNumber
            accountType
            openingDate
          }
          owner {
            type
            taxIdNumber
            name
          }
          creationDate
          keyOwnershipDate
        }
      }
    `;

    const response = await request(server)
      .post('/graphql')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NjcxZThlLWExZjQtNGYxNS1iZTc1LTk4MGU1ZjVjNzg2MyIsImVtYWlsIjoiamVmZmVyc29uQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ3NzY2MjcxLCJleHAiOjE3NDc4NTI2NzF9.zLfk0n1fpDRq5ACQXQzNII79m1DIEUw-55igqqsQvRw')
      .set('Content-Type', 'application/json')
      .send({ query })
      .expect(200);

    expect(response.body.data.pixKey).toHaveProperty('key', '47742663023');
    expect(response.body.data.pixKey).toHaveProperty('account');
    expect(response.body.data.pixKey).toHaveProperty('owner');
    // Você pode continuar testando outras propriedades se necessário
  });
});