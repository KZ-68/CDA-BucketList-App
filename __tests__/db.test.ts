/**
 * @jest-environment node
*/

import { db } from '../lib/db';

describe('Prisma MongoDB Connection', () => {
    it('should connect to the database without error', async () => {
        await expect(db.$connect()).resolves.not.toThrow();
    });

  afterAll(async () => {
    await db.$disconnect();
  });
});

