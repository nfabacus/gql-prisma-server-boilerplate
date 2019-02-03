import getUserId from '../utils/getUserId';

const Query = {
  users (parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if(args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      }
    }
    return prisma.query.users(opArgs, info);
    // 1st param for request arguments, 2nd param is what we request as output.
    // Above, there are 3 options for the 2nd argument - null, string like "id name email age", or object
    // Using info, we do not manually type what is requested.

    // if(!args.query) {
    //   return db.users;
    // }
    // return db.users.filter(user => {
    //   return user.name.toLowerCase().includes(args.query.toLowerCase());
    // });
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({
      where: {
        id: userId
      }
    }, info);
  }
};

export { Query as default };
