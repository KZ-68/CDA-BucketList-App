/**
 * @jest-environment node
*/

import { db } from '../../lib/db';

describe('Prisma MongoDB Connection', () => {
    it('should connect to the database without error', async () => {
        await expect(db.$connect()).resolves.not.toThrow();
    });

  afterAll(async () => {
    await db.$disconnect();
  });
});

describe('Prisma MongoDB GET Collections', () => {
    it('should connect and fetch collections (even if empty)', async () => {
        const collections = await db.collection.findMany();
        expect(Array.isArray(collections)).toBe(true);
    });

    afterAll(async () => {
        await db.$disconnect();
    });
});

describe('Prisma MongoDB GET Goals', () => {
    it('should connect and fetch goals (even if empty)', async () => {
        const goals = await db.goal.findMany();
        expect(Array.isArray(goals)).toBe(true);
    });

    afterAll(async () => {
        await db.$disconnect();
    });
});
