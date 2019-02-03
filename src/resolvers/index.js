import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User';


const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
};

const fragmentReplacements = extractFragmentReplacements(resolvers); // This will import all the fragments specified in the resolvers.

export { resolvers, fragmentReplacements };
