import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from "./resolvers";

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', //takes generated type definition from prisma.
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
});

export { prisma as default }
