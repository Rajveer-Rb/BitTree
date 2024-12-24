import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import connectDB from '@/db/connection';
import User from '@/models/user';

const handler = NextAuth({
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if (account.provider === 'github') {
          await connectDB();
          const currentUser = await User.findOne({ email: user.email });
          console.log('Current user:', currentUser);
      
          if (!currentUser) {
            console.log('Creating a new user in the database');
            try {
              const curr = await User.create({
                email: user.email,
                username: user.email.split('@')[0],
              });
              console.log('Logged in user:', curr);
            } catch (err) {
              console.error('Error creating user:', err);
            }
          }
          return true;
        }
        return false;
      },      
      async session({ session }) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }
        return session;
      },
    },
    debug: true,
  });
  
  export { handler as GET, handler as POST };