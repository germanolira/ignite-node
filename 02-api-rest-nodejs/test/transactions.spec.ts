import { it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()

    console.log('app.server', app.server)
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    console.log('response.headers', response.headers)
  })

  // it('should be able to list all transactions', async () => {
  //   const createTransactionResponse = await request(app.server)
  //     .post('/transactions')
  //     .send({
  //       title: 'New transaction',
  //       amount: 5000,
  //       type: 'credit',
  //     })

  //   console.log('createTransactionResponse', createTransactionResponse.body)

  //   const cookies = createTransactionResponse.get('Set-Cookie')

  //   console.log('cookies', cookies)

  //   const listTransactionsResponse = await request(app.server)
  //     .get('/transactions')
  //     .set('Cookie', cookies)
  //     .expect(200)

  //   expect(listTransactionsResponse.body.transactions).toEqual([
  //     expect.objectContaining({
  //       title: 'New transaction',
  //       amount: 5000,
  //     }),
  //   ])
  // })

  // Should pass the test above, but it doesn't. Why?
})
