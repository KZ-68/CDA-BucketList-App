import path from 'node:path'
import dotenv from 'dotenv';
import type { PrismaConfig } from 'prisma'

dotenv.config({ path: '.env.local' });

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema'),
} satisfies PrismaConfig