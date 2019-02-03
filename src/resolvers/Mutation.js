import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from "../utils/generateToken";
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    // const emailTaken = await prisma.exists.User({ email: args.data.email });
    // if(emailTaken) {
    //   throw new Error('Email taken.');
    // }
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    }); // do not add info here as a second param for output. This will return all scalar fields. The info argument are the fields specified by the client that they want returned.  We specified that we wanted:
    //
    // user {
    //   id
    //   name
    //   email
    // }
    // But you can't pass that into prisma.mutation.createUser because there is no user field on the User type.

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async login(parent, args, { prisma }, info) {
    const user  = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });
    if(!user) {
      throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if(!isMatch) {
      throw new Error('Unable to login');
    }
    return {
      user,
      token: generateToken(user.id)
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({
        where: {
          id: userId
        }
      }, info);
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data: args.data
    }, info);
  }
};

export { Mutation as default };

